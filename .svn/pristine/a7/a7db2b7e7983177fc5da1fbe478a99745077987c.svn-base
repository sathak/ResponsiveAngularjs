(function() {
    'use strict';

    angular
        .module('app.photo')
        .directive('egFiles', egFiles);

    function egFiles () {

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                files: '=egFiles',
                hasFiles: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {                         
            //scope.files.length = 0;
            scope.fileList = [];
            element.bind('change', function () {
                scope.files.length = 0;
                scope.$apply(function () {
                    if (element[0].files) {
                        angular.forEach(element[0].files, function (f) {
                            scope.files.push(f);
                            scope.fileList.push(f);
                        });
                        scope.hasFiles = true;
                    }                    
                });
            });
                        
            if (element[0].form) {
                angular.element(element[0].form)
                        .bind('reset', function () {
                            scope.$apply(function () {
                                scope.files.length = 0;
                                scope.hasFiles = false;
                            });
                });
            }
        }
    }
})();