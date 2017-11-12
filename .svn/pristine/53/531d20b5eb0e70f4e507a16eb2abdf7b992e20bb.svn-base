"use strict";

angular.module("navconFramework").directive("navconFramework", function() {
    return {
        restrict: 'AE',
        replace: false,
        transclude: false,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@'
        },
        controller: "navconFrameworkController",
        //templateUrl: "ext-modules/navconFramework/navconFrameworkTemplate.html"
        templateUrl: function() {
            return navcon.Menuroute.getTemplateUrl("navconFramework");
        },

    };
});