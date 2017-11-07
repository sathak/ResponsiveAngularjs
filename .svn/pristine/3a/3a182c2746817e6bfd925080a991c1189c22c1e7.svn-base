(function () {
    'use strict';

    angular
        .module('app.photo')
        .factory('photoManagerClient', photoManagerClient);

    photoManagerClient.$inject = ['$resource', 'ngAuthSettings'];

    function photoManagerClient($resource, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        return $resource(serviceBase + "photo/:fileName",
                { id: "@fileName" },
                {
                    'query': {method:'GET'},
                    'save': { method: 'POST', transformRequest: angular.identity, headers: { 'Content-Type': undefined } },
                    'remove':{method: 'DELETE', url: 'api/photo/:fileName', params:{name:'@fileName'}}
                });
    }
})();