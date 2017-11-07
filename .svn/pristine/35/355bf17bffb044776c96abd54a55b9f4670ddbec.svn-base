(function () {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    function exception(logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function (reason) {
                if(reason.status === 500 || reason.status === 415 || reason.status === 405 ) //InternalServerError or UnsupportedMediaType or MethodNotAllowed
                    logger.error(message, reason);
                else
                    logger.warning(message, reason);
            };
        }
    }
})();

