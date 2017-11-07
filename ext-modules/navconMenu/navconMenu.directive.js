"use strict";

angular.module('navconMenu').directive('navconMenu', ['$timeout', function($timeout) {
    return {
        scope: {

        },
        transclude: true,
        //templateUrl: 'ext-modules/navconMenu/navconMenuTemplate.html',
        templateUrl: function() {
            return navcon.Menuroute.getTemplateUrl("navconMenu");
        },
        controller: 'navconMenuController',
        link: function(scope, el, attr) {
            var item = el.find('.navcon-selectable-item:first');
            $timeout(function() {
                item.trigger('click');
            });
        }
    };
}]);