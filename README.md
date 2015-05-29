rules
============

## Development

To start developing in the project run:

```bash
npm install
bower install
gulp prepare
gulp serve
CTRL+C
gulp develop
```

Then head to `http://localhost:3000` in your browser.

The `serve` tasks starts a static file server, which serves the AngularJS application, and a watch task which watches all files for changes and lints, builds and injects them into the index.html accordingly.

## Tests

To run tests run:

```bash
gulp test
```

**Or** first inject all test files into `karma.conf.js` with:

```bash
gulp karma-conf
```

Then you're able to run Karma directly. Example:

```bash
karma start --single-run
```

## Production ready build - a.k.a. dist

To make the app ready for deploy to production run:

```bash
gulp dist
```

Now there's a `./dist` folder with all scripts and stylesheets concatenated and minified, also third party libraries installed with bower will be concatenated and minified into `vendors.min.js` and `vendors.min.css` respectively.

## Full feature demo to Azure

To make the app ready for deploy to demo run at Azure:

```bash
1. merge master to deploy/azure
2. checkout deploy/azure
3. git remote add azure https://@vdms-rules.scm.azurewebsites.net:443/vdms-rules.git
4. git push azure master
5. password: [same old dev password :)]
```
