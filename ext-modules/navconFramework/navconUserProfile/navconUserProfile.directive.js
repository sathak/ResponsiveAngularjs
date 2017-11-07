"use strict";

angular.module('navconFramework').directive('navconUserProfile', function() {
    return {
        //templateUrl: 'ext-modules/navconFramework/navconUserProfile/navconUserProfileTemplate.html'
        templateUrl: function() {
            return navcon.Menuroute.getTemplateUrl("navconUserProfile");
        },
    };
});