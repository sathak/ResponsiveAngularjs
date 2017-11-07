"use strict";
angular.module('app').directive('navconRating', ['dataservice', 'appInfo', 'photoManager', 'logger', 'ngAuthSettings',
    function(dataservice, appInfo, photoManager, logger, ngAuthSettings) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            scope: {
                ngRating: '=',
                maxRating: '=',
                readOnly: '='
            },
            //templateUrl: 'ext-modules/navconRating/navconRatingTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconRating");
            },
            link: function(scope, el, attrs) {

                scope.maxRatings = [];
                if (scope.maxRating === undefined) scope.maxRating = 5;
                if (scope.ngRating === undefined) scope.ngRating = 0;
                for (var i = 1; i <= scope.maxRating; i++) {
                    scope.maxRatings.push({});
                };

                scope._rating = scope.ngRating;


                scope.click = function(param) {
                    if (scope.readOnly || scope.readOnly == 'true') return;
                    scope.ngRating = scope._rating = param;
                    scope.hoverValue = 0;
                };

                scope.mouseHover = function(param) {
                    if (scope.readOnly || scope.readOnly == 'true') return;

                    scope._rating = 0;
                    scope.hoverValue = param;
                };

                scope.mouseLeave = function(param) {
                    if (scope.readOnly || scope.readOnly == 'true') return;

                    scope._rating = scope.ngRating;
                    scope.hoverValue = 0;
                };
            }
        };
    }
]);