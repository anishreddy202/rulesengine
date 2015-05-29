/* jshint node: true */
'use strict';

var gulp = require('gulp'),
  g = require('gulp-load-plugins')({lazy: false}),
  noop = g.util.noop,
  es = require('event-stream'),
  bowerFiles = require('main-bower-files'),
  rimraf = require('rimraf'),
  queue = require('streamqueue'),
  lazypipe = require('lazypipe'),
  stylish = require('jshint-stylish'),
  clean = require('gulp-clean'),
  bower = require('./bower'),
  runSequence = require('run-sequence'),
  clean = require('gulp-clean'),
  nodemon = require('gulp-nodemon'),
  isWatching = false;

var htmlminOpts = {
  removeComments: true,
  collapseWhitespace: true,
  removeEmptyAttributes: false,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true
};

/**
 * Clean
 * @type {Object}
 */
var path = {
  tmp: './.tmp',
  dist: './dist'
};



function appHtmlDist () {
  return gulp.src('./src/app/app.html')
    .pipe(g.inject(gulp.src('./dist/vendors.min.{js,css}'), {ignorePath: '/dist', addRootSlash: false, starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(g.inject(gulp.src('./dist/' + bower.name + '.{js,css}'), {ignorePath: '/dist', addRootSlash: false}))
    .pipe(g.htmlmin(htmlminOpts))
    .pipe(gulp.dest('./dist/'));
}

function appHtml () {
  var opt = {read: false};
  return gulp.src('./src/app/app.html')
    .pipe(g.inject(gulp.src(bowerFiles(), opt), {ignorePath: 'bower_components', starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(g.inject(es.merge(appFiles(), cssFiles(opt)), {ignorePath: ['.tmp', 'src/app']}))
    .pipe(gulp.dest('./.tmp/'));
}

function index () {
  return gulp.src('./src/app/index.html')
    .pipe(g.inject(gulp.src('./.tmp/app.html'), {
      ignorePath: ['.tmp', 'src/app'],
      starttag: '<!-- inject:app:{{ext}} -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8');
      }
    }))
    .pipe(g.embedlr())
    .pipe(gulp.dest('./.tmp/'))
    .pipe(livereload());
}

function indexDist () {
  return gulp.src('./src/app/index.html')
    .pipe(g.inject(gulp.src('./dist/app.html'), {
      ignorePath: ['dist'],
      starttag: '<!-- inject:app:{{ext}} -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8');
      }
    }))
    .pipe(gulp.dest('./dist/'));
}
/**
 * Test files
 */
function testFiles() {
  return new queue({objectMode: true})
    .queue(gulp.src(fileTypeFilter(bowerFiles(), 'js')))
    .queue(gulp.src('./bower_components/angular-mocks/angular-mocks.js'))
    .queue(appFiles())
    .queue(gulp.src(['./src/app/**/*_test.js', './.tmp/src/app/**/*_test.js']))
    .done();
}

/**
 * All CSS files as a stream
 */
function cssFiles (opt) {
  return gulp.src('./.tmp/css/**/*.css', opt);
}

/**
 * All AngularJS application files as a stream
 */
function appFiles () {
  var files = [
    './.tmp/' + bower.name + '-templates.js',
    './.tmp/src/app/**/*.js',
    '!./.tmp/src/app/**/*_test.js',
    './src/app/**/*.js',
    '!./src/app/**/*_test.js'
  ];
  return gulp.src(files)
    .pipe(g.angularFilesort());
}

/**
 * All AngularJS templates/partials as a stream
 */
function templateFiles (opt) {
  return gulp.src(['./src/app/**/*.html', '!./src/app/index.html', '!./src/app/app.html', '!./src/app/comps/**/*.html'], opt)
    .pipe(opt && opt.min ? g.htmlmin(htmlminOpts) : noop());
}

/**
 * Build AngularJS templates/partials
 */
function buildTemplates () {
  return lazypipe()
    .pipe(g.ngHtml2js, {
      moduleName: bower.name,
      prefix: '/' + bower.name + '/',
      stripPrefix: '/src/app'
    })
    .pipe(g.concat, bower.name + '-templates.js')
    .pipe(gulp.dest, './.tmp')
    .pipe(livereload)();
}

/**
 * Filter an array of files according to file type
 *
 * @param {Array} files
 * @param {String} extension
 * @return {Array}
 */
function fileTypeFilter (files, extension) {
  var regExp = new RegExp('\\.' + extension + '$');
  return files.filter(regExp.test.bind(regExp));
}

/**
 * Concat, rename, minify
 *
 * @param {String} ext
 * @param {String} name
 * @param {Object} opt
 */
function dist (ext, name, opt) {
  opt = opt || {};
  return lazypipe()
    .pipe(g.concat, name + '.' + ext)
    .pipe(gulp.dest, './dist')
    .pipe(opt.ngAnnotate ? g.ngAnnotate : noop)
    .pipe(opt.ngAnnotate ? g.rename : noop, name + '.annotated.' + ext)
    .pipe(opt.ngAnnotate ? gulp.dest : noop, './dist')
    .pipe(ext === 'js' ? g.uglify : g.minifyCss)
    .pipe(g.rename, name + '.min.' + ext)
    .pipe(gulp.dest, './dist')();
}

/**
 * Livereload (or noop if not run by watch)
 */
function livereload () {
  return lazypipe()
    .pipe(isWatching ? g.livereload : noop)();
}

/**
 * Jshint with stylish reporter
 */
function jshint (jshintfile) {
  return lazypipe()
    .pipe(g.jshint, jshintfile)
    .pipe(g.jshint.reporter, stylish)();
}

// This Task cleans and removes the /deploy folder.
gulp.task('clean', function() {
  // Gulp-Clean bug for recursive folder deletion use return.
  return gulp.src([path.tmp, path.dist])
    .pipe(clean({force: true}));
});

/**
 * JS Hint
 */
gulp.task('jshint', function () {
  return gulp.src([
    './gulpfile.js',
    './src/app/**/*.js'
  ])
    .pipe(g.cached('jshint'))
    .pipe(jshint('./.jshintrc'))
    .pipe(livereload());
});

/**
 * CSS
 */
gulp.task('clean-css', function (done) {
  rimraf('./.tmp/css', done);
});

gulp.task('styles', ['clean-css'], function () {
  return gulp.src([
    './src/app/**/*.less',
    '!./src/app/**/_*.less'
  ])
    .pipe(g.less())
    .pipe(gulp.dest('./.tmp/css/'))
    .pipe(g.cached('built-css'))
    .pipe(livereload());
});

gulp.task('styles-dist', ['styles'], function () {
  return cssFiles().pipe(dist('css', bower.name));
});

gulp.task('csslint', ['styles'], function () {
  return cssFiles()
    .pipe(g.cached('csslint'))
    .pipe(g.csslint('./.csslintrc'))
    .pipe(g.csslint.reporter());
});

/**
 * Scripts
 */
gulp.task('scripts-dist', ['templates-dist'], function () {
  return appFiles().pipe(dist('js', bower.name, {ngAnnotate: true}));
});

/**
 * Templates
 */
gulp.task('templates', function () {
  return templateFiles().pipe(buildTemplates());
});

gulp.task('templates-dist', function () {
  return templateFiles({min: true}).pipe(buildTemplates());
});

/**
 * Vendors
 */
gulp.task('vendors', function () {
  var files = bowerFiles();
  var vendorJs = fileTypeFilter(files, 'js');
  var vendorCss = fileTypeFilter(files, 'css');
  var q = new queue({objectMode: true});
  if (vendorJs.length) {
    q.queue(gulp.src(vendorJs).pipe(dist('js', 'vendors')));
  }
  if (vendorCss.length) {
    q.queue(gulp.src(vendorCss).pipe(dist('css', 'vendors')));
  }
  return q.done();
});

/**
 * Index
 */
gulp.task('app-html', appHtml);
gulp.task('app-html-dist', appHtmlDist);
gulp.task('index', ['app-html', 'app-data'], index);
gulp.task('index-dist', ['app-html-dist'], indexDist);
gulp.task('build-all', function() { return runSequence('styles', 'templates', 'index');});
gulp.task('index-dist-create', indexDist);

/**
 * Assets
 */
gulp.task('assets', function () {
  return gulp.src('./src/assets/**')
    .pipe(gulp.dest('./dist/assets'));
});

/**
 * Data
 */
gulp.task('data', function () {
  return gulp.src('./src/**/*.json')
    .pipe(gulp.dest('./dist'));
});

/**
 * i18n resource files
 */
gulp.task('i18n', function () {
  return gulp.src('./src/i18n/**')
    .pipe(gulp.dest('./dist/i18n'));
});

/**
 * Dist
 */
gulp.task('dist', function() {
  console.log('>>> Starting tasks in sequence - vendors, assets, styles-dist, scripts-dist, index-dist');
  return runSequence('vendors', 'assets', 'data', 'i18n', 'styles-dist', 'scripts-dist', 'index-dist', function() {
    console.log('>>> Completed Initial Tasks');
  });
});

/**
 * Static file server
 */
gulp.task('statics', g.serve({
  port: 3000,
  root: ['./.tmp', './.tmp/src/app', './src/app', './bower_components']
}));

/**
 * Mock API server
 */
gulp.task('mockserver', function(){
  return nodemon({
    script: 'server.js',
    ignore: ['node_modules/**/node_modules'],
    verbose: true
  });
});

gulp.task('demon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development',
    },
    ignore: ['node_modules/**/node_modules'],
    verbose: true
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

/**
 * Watch
 */
gulp.task('serve', ['watch']);
gulp.task('watch', ['statics', 'default'], function () {
  isWatching = true;
  // Initiate livereload server:
  g.livereload.listen();
  gulp.watch('./src/app/**/*.js', ['jshint']).on('change', function (evt) {
    if (evt.type !== 'changed') {
      gulp.start('index');
    } else {
      g.livereload.changed(evt);
    }
  });
  gulp.watch('./src/app/index.html', ['index']);
  gulp.watch(['./src/app/**/*.html', '!./src/app/index.html', '!./src/app/app.html'], ['templates']);
  gulp.watch(['./src/styles/**/*.less'], ['csslint']).on('change', function (evt) {
    if (evt.type !== 'changed') {
      gulp.start('index');
    } else {
      g.livereload.changed(evt);
    }
  });
});

/**
 * Static file server
 */
gulp.task('dist_serve', g.serve({
  port: 3000,
  root: ['./dist']
}));

gulp.task('develop', function() {
  return runSequence('dist', 'dist_serve', 'mockserver');
});

gulp.task('dist_watch', function () {
  isWatching = true;
  // Initiate livereload server:
  g.livereload.listen();
  gulp.watch('./src/app/**/*.js', ['jshint']).on('change', function (evt) {
    if (evt.type !== 'changed') {
      gulp.start('index');
    } else {
      g.livereload.changed(evt);
    }
  });
  gulp.watch('./src/app/index.html', ['index']);
  gulp.watch(['./src/app/**/*.html', '!./src/app/index.html', '!./src/app/app.html'], ['templates']);
  gulp.watch(['./src/styles/**/*.less'], ['csslint']).on('change', function (evt) {
    if (evt.type !== 'changed') {
      gulp.start('index');
    } else {
      g.livereload.changed(evt);
    }
  });
});

/**
 * Default task
 */
gulp.task('default', function() {
  return runSequence('lint', 'build-all', function() {
    console.log('>>> lint (jshint, csslint) and build-all supposed to be completed by now');
  });
});

/**
 * Lint everything
 */
gulp.task('lint', function() {
  return runSequence('jshint', 'csslint', function() {
    console.log('>>> jshint and csslint should be completed by now');
  });
});

/**
 * Test
 */
gulp.task('test', ['templates'], function () {
  return testFiles()
    .pipe(g.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

/**
 * Inject all files for tests into karma.conf.js
 * to be able to run `karma` without gulp.
 */
gulp.task('karma-conf', ['templates'], function () {
  return gulp.src('./karma.conf.js')
    .pipe(g.inject(testFiles(), {
      starttag: 'files: [',
      endtag: ']',
      addRootSlash: false,
      transform: function (filepath, file, i, length) {
        return '  \'' + filepath + '\'' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(gulp.dest('./'));
});


