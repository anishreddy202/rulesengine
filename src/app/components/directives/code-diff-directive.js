var JsDiff = JsDiff || undefined;

angular.module('rules.components.directives')
    .directive('codeDiff', function () {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: '/rules/components/directives/code-diff.html',
            link: function (scope, element, attrs) {
                var newLines = 0, deletedLines = 0;
                var buildDiffXML = function (diffString, symbol) {
                    var diffLines = diffString.split('\n');

                    angular.forEach(diffLines, function (line) {
                        if (line.length > 0) {
                            var lineObject = {};
                            if (symbol === '+') {
                                lineObject.line_number2 = scope.parsedDiffXML.length + 1;
                                lineObject.isAdded = true;
                                newLines +=1;
                            } else if (symbol === '-') {
                                lineObject.line_number1 = scope.parsedDiffXML.length + 1;
                                deletedLines +=1;
                                lineObject.isRemoved = true;
                            } else {
                                lineObject.line_number2 = lineObject.line_number1 = scope.parsedDiffXML.length + 1;
                            }
                            lineObject.value = line;
                            lineObject.symbol = symbol;
                            scope.parsedDiffXML.push(lineObject);
                        }
                    });
                };
                var showDiff = function(string1,string2){
                    scope.parsedDiffXML=[];
                    newLines = deletedLines = 0;
                    var diff = JsDiff.diffLines(string1, string2);
                    for (var i = 0; i < diff.length; i++) {
                        if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
                            var swap = diff[i];
                            diff[i] = diff[i + 1];
                            diff[i + 1] = swap;
                        }
                        if (diff[i].removed) {
                            buildDiffXML(diff[i].value, '-');
                        } else if (diff[i].added) {
                            buildDiffXML(diff[i].value, '+');
                        } else {
                            buildDiffXML(diff[i].value, '');
                        }
                    }
                    scope.$parent.newLines = newLines;
                    scope.$parent.deletedLines = deletedLines;
                };
                scope.$watch(attrs.old,function(value){
                    if(!value || value.length === 0) {
                      return;
                    }
                    if(value === '-1') {
                      value=attrs.new;
                    }
                    showDiff(value, attrs.new);
                });
            }
        };
    });
