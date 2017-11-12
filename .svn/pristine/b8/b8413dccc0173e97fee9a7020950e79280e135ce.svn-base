"use strict";

angular.module('navconMenu').directive('navconMenuGroup', function() {
    return {
        require: '^navconMenu',
        transclude: true,
        scope: {
            label: '@',
            icon: '@'
        },
        //templateUrl: 'ext-modules/navconMenu/navconMenuGroupTemplate.html',
        templateUrl: function() {
            return navcon.Menuroute.getTemplateUrl("navconMenuGroup");
        },
        link: function(scope, el, attrs, ctrl) {
            scope.isOpen = false;
            scope.closeMenu = function() {
                scope.isOpen = false;
            };
            scope.clicked = function() {
                scope.isOpen = !scope.isOpen;

                if (el.parents('.navcon-subitem-section').length == 0)
                    scope.setSubmenuPosition();

                ctrl.setOpenMenuScope(scope);
            };
            scope.isVertical = function() {
                return ctrl.isVertical() || el.parents('.navcon-subitem-section').length > 0;
            };

            scope.setSubmenuPosition = function() {
                var pos = el.offset();
                $('.navcon-subitem-section').css({ 'left': pos.left + 20, 'top': 36 });
            };
        }
    };
});