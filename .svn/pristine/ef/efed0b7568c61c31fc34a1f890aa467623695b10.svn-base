(function () {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr', '$injector'];

    function logger($log, toastr, $injector) {

        var service = {
            showToasts: true,

            error: error,
            info: info,
            success: success,
            warning: warning,

            // straight to console; bypass toastr
            log: $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            var dataservice = $injector.get('dataservice');
            var $location = $injector.get('$location');

            var saveObj = {Message:message};
            dataservice.postServerData("", saveObj, false, '', "/Generic/Log/Create").then(function (data) {
                var errNo = "000";
                if(data !== undefined && data !== "")
                    errNo = data;
                var errMessage = errNo + " - Unexpected error. Please contact Administrator.";
                //toastr.error(errMessage, title, { allowHtml: true });

            })
            console.log('Error: ' + message);
            $log.error('Error: ' + message, data);
            //$location.path('/dashboard');
        }

        function info(message, data, title) {
            toastr.info(message, title, {allowHtml: true});
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title, { allowHtml: true });
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title, { allowHtml: true });
            /*$log.warn('Warning: ' + message, data);*/
        }
    }
}());