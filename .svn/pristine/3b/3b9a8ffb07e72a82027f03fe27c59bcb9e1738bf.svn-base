(function (navcon) {
    navcon.alert = {
        load: function (signalRHubProxy, ngAuthSettings, logger, authService, $rootScope){
            var clientPushHubProxy = signalRHubProxy(ngAuthSettings.signalRServer, 'NotificationHub', { logging: true });
            
            clientPushHubProxy.on('addNewNotification', function (data){
                 navcon.alert.displayAllNotification(data, authService.authentication.userId, logger, $rootScope);  
            });
            
            clientPushHubProxy.on('DeleteNotificationDetail', function (id){
                 navcon.alert.deleteUserNotification(id, authService.authentication.userId, logger, $rootScope);     
            });
            
            clientPushHubProxy.on('DeleteNotification', function (id){
                 navcon.alert.deleteAllNotification(id, authService.authentication.userId, logger, $rootScope);       
            });
        },
        displayAllNotification: function(data, loginId, logger, $rootScope){
            
            if(data.NotificationDetail === undefined) return;
            for(i=0, len = data.NotificationDetail.length; i < len ; i++){
                var item = data.NotificationDetail[i];
                if(item.UserId === loginId){
                    displayNotification(item.ReadStatus, item.NotificationDetailId);
                    break;
                } 
            }
            
            function displayNotification(readStatus,notificationId){
                data.NFDetailsId = notificationId;
                data.NotificationDetailId = notificationId;
                var items = [];
                items.push(data);
                $rootScope.$broadcast('ALERT-DATA-REFRESH', items, false);
                logger.info(data.Message || "Notification received..", "", "");
            }
        },
        deleteUserNotification: function(id, loginId, logger, $rootScope){
            $rootScope.$broadcast('ALERT-DATA-DELETE', id, "user");
        },
        deleteAllNotification: function(id, loginId, logger, $rootScope){
            $rootScope.$broadcast('ALERT-DATA-DELETE', id, "all");
        }
        
    };
}(navcon || {}));