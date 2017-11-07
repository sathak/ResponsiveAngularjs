"use strict";

angular.module('navconMenu').directive('navconMenuItem', function() {
    return {
        require: '^navconMenu',
        scope: {
            label: '@',
            icon: '@',
            route: '@'
        },
        //templateUrl: 'ext-modules/navconMenu/navconMenuItemTemplate.html',
        templateUrl: function() {
            return navcon.Menuroute.getTemplateUrl("navconMenuItem");
        },
        link: function(scope, el, attr, ctrl) {

            scope.isActive = function() {
                return el === ctrl.getActiveElement();
            };

            scope.isVertical = function() {
                return ctrl.isVertical() || el.parents('.navcon-subitem-section').length > 0;
            }

            el.on('click', function(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                scope.$apply(function() {
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                });
            });
        }
    };
});