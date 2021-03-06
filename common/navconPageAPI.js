(function (navcon) {
    navcon.route = {
        API: {
            aboutUsConfig: 'Generic/GetPageConfiguration?Page=administration&type=aboutUsConfig',

            /*Login*/
            loginConfig: 'Generic/GetPageConfiguration?Page=login&type=loginConfig',
            loginAll: 'login/GetALL',
            loginId: 'login/Get',
            loginSave: 'login/Create',
            loginUpdate: 'login/Update',
            /*Login*/

            /*user Profile*/
            userProfileConfig: 'Generic/GetPageConfiguration?Page=administration&type=userprofileConfig',
            userProfileId: 'myProfile/GetById',
            userProfileUpdate: 'myProfile/Update',

            /*Change Password*/
            changePasswordConfig: 'Generic/GetPageConfiguration?Page=administration&type=changePasswordConfig',
            changePasswordUpdate: 'myProfile/ChangePassword',
            /*Change Password*/

            /*User Management*/
            userManagementConfig: 'Generic/GetPageConfiguration?Page=administration&type=userManagementConfig',
            userManagementAll: 'userManagement/GetALL',
            userManagementId: 'userManagement/GetById',
            userManagementSave: 'userManagement/Create',
            userManagementUpdate: 'userManagement/Update',
            userManagementDelete: 'userManagement/DeleteById',
            userManagementGetDeptByLocationId: 'myProfile/GetDepartmentByLocationId',
            userManagementGetSecQn: 'userManagement/GetSecQuestion',
            forgotPasswordSave: 'userManagement/ForgotPassword',
            /*User Management*/

            /*master Configuration*/
            masterConfigurationConfig: 'Generic/GetPageConfiguration?Page=masterdata&type=masterdataConfig',
            masterConfigurationAll: 'Configuration/GetALL',
            masterConfigurationId: 'Configuration/GetById/',
            ConfigurationSave: 'Configuration/Create',
            ConfigurationUpdate: 'Configuration/Update',
            ConfigurationDelete: 'Configuration/DeleteById',
            /*master Configuration*/
            
            /*Notifications*/
            notificationsConfig: 'Generic/GetPageConfiguration?Page=administration&type=notificationsConfig',
            notificationsAll: 'Security/GetAllNotifications',
            notificationsUpdate: 'MySpace/AllNotification/Update',
            notificationsUpdateAll: 'MySpace/AllNotification/UpdateAll',

            /*Notification Setup*/
            notificationSetupConfig: 'Generic/GetPageConfiguration?Page=administration&type=notificationSetupConfig',
            notificationSetupAll: 'notificationSetup/GetALL',
            notificationSetupUpdate: 'notificationSetup/Update',
            notificationSetupTestMail: 'notificationSetup/TestMail',
            notificationSetupTestSMS: 'notificationSetup/TestSMS',

            /*Role Management*/
            roleManagementConfig: 'Generic/GetPageConfiguration?Page=administration&type=roleManagementConfig',
            roleManagementAll: 'roleManagement/GetALL',
            roleManagementId: 'roleManagement/GetById',
            roleManagementSave: 'roleManagement/Create',
            roleManagementUpdate: 'roleManagement/Update',
            roleManagementDelete: 'roleManagement/DeleteById',
            /*Role Management*/

            /*User Access Rights*/
            userAccessRightsConfig: 'Generic/GetPageConfiguration?Page=administration&type=userAccessRightsConfig',
            userMenusAll: 'Menu/GetALL',
            userAccessRightsAll: 'rights/GetALL',
            userAccessRightsRoleId: 'rights/GetRightsByRoleId',
            userAccessRightsSave: 'rights/Create',
            userAccessRightsUpdate: 'rights/Update',
            userAccessRightsDelete: 'rights/DeleteById',
            /*User Access Rights*/


            /*Reports*/
            reportsConfig: 'Generic/GetPageConfiguration?Page=Reports&type=reportsConfig',
            reportsAll: 'Reports/GetAll',
            reportsId: 'Reports/GetById',
            reportsSave: 'Reports/Create',
            /*Reports*/

            noConfig: '/'
        },
        UI: function (serviceBase, type, rowId) {
            var apiEndUrl = navcon.route.API;
            var returnData = serviceBase;

            /*Login*/
            if (type.toUpperCase() === "LOGINCONFIG") returnData += apiEndUrl.loginConfig;
            else if (type.toUpperCase() === "LOGINALL") returnData += apiEndUrl.loginAll;
            else if (type.toUpperCase() === "LOGINID") returnData += apiEndUrl.loginId;
            else if (type.toUpperCase() === "LOGINSAVE") returnData += apiEndUrl.loginSave;
            else if (type.toUpperCase() === "LOGINUPDATE") returnData += apiEndUrl.loginUpdate;

                /*User Management*/
            else if (type.toUpperCase() === "USERMANAGEMENTCONFIG") returnData += apiEndUrl.userManagementConfig;
            else if (type.toUpperCase() === "USERMANAGEMENTALL") returnData += apiEndUrl.userManagementAll;
            else if (type.toUpperCase() === "USERMANAGEMENTID") returnData += apiEndUrl.userManagementId;
            else if (type.toUpperCase() === "USERMANAGEMENTSAVE") returnData += apiEndUrl.userManagementSave;
            else if (type.toUpperCase() === "USERMANAGEMENTUPDATE") returnData += apiEndUrl.userManagementUpdate;
            else if (type.toUpperCase() === "USERMANAGEMENTDELETE") returnData += apiEndUrl.userManagementDelete;
            else if (type.toUpperCase() === "USERMANAGEMENTGETDEPTBYLOCATIONID") returnData += apiEndUrl.userManagementGetDeptByLocationId;
            else if (type.toUpperCase() === "USERMANAGEMENTGETSECQN") returnData += apiEndUrl.userManagementGetSecQn;
            else if (type.toUpperCase() === "FORGOTPASSWORDSAVE") returnData += apiEndUrl.forgotPasswordSave;


                /*Master Configuration*/
            else if (type.toUpperCase() === "MASTERCONFIGURATIONCONFIG") returnData += apiEndUrl.masterConfigurationConfig;
            else if (type.toUpperCase() === "MASTERCONFIGURATIONALL") returnData += apiEndUrl.masterConfigurationAll;
            else if (type.toUpperCase() === "MASTERCONFIGURATIONID") returnData += apiEndUrl.masterConfigurationId;
            else if (type.toUpperCase() === "CONFIGURATIONSAVE") returnData += apiEndUrl.ConfigurationSave;
            else if (type.toUpperCase() === "CONFIGURATIONUPDATE") returnData += apiEndUrl.ConfigurationUpdate;
            else if (type.toUpperCase() === "CONFIGURATIONDELETE") returnData += apiEndUrl.ConfigurationDelete;
                
                /*Notifications*/
            else if (type.toUpperCase() === "NOTIFICATIONSCONFIG") returnData += apiEndUrl.notificationsConfig;
            else if (type.toUpperCase() === "NOTIFICATIONSALL") returnData += apiEndUrl.notificationsAll;
            else if (type.toUpperCase() === "NOTIFICATIONSUPDATE") returnData += apiEndUrl.notificationsUpdate;
            else if (type.toUpperCase() === "NOTIFICATIONSUPDATEALL") returnData += apiEndUrl.notificationsUpdateAll;

                /*Notification Setup*/
            else if (type.toUpperCase() === "NOTIFICATIONSETUPCONFIG") returnData += apiEndUrl.notificationSetupConfig;
            else if (type.toUpperCase() === "NOTIFICATIONSETUPALL") returnData += apiEndUrl.notificationSetupAll;
            else if (type.toUpperCase() === "NOTIFICATIONSETUPUPDATE") returnData += apiEndUrl.notificationSetupUpdate;
            else if (type.toUpperCase() === "NOTIFICATIONSETUPTESTMAIL") returnData += apiEndUrl.notificationSetupTestMail;
            else if (type.toUpperCase() === "NOTIFICATIONSETUPTESTSMS") returnData += apiEndUrl.notificationSetupTestSMS;
                
                /*User Profile*/
            else if (type.toUpperCase() === "USERPROFILECONFIG") returnData += apiEndUrl.userProfileConfig;
            else if (type.toUpperCase() === "USERPROFILEID") returnData += apiEndUrl.userProfileId;
            else if (type.toUpperCase() === "USERPROFILEUPDATE") returnData += apiEndUrl.userProfileUpdate;

                /*Change Password*/
            else if (type.toUpperCase() === "CHANGEPASSWORDCONFIG") returnData += apiEndUrl.changePasswordConfig;
            else if (type.toUpperCase() === "CHANGEPASSWORDUPDATE") returnData += apiEndUrl.changePasswordUpdate;


            /*Notification Management*/
            if (type.toUpperCase() === "NOTIFICATIONMASTERCONFIG") returnData += apiEndUrl.notificationmasterConfig;
            if (type.toUpperCase() === "NOTIFICATIONMANAGEMENTALL") returnData += apiEndUrl.NotificationManagementAll;
            if (type.toUpperCase() === "NOTIFICATIONMASTERID") returnData += apiEndUrl.notificationmasterId;
            // if (type.toUpperCase() === "NOTIFICATIONMASTERSAVE") returnData += apiEndUrl.NEWSANNOUNCEMENTSSAVE;
            if (type.toUpperCase() === "NOTIFICATIONMASTERUPDATE") returnData += apiEndUrl.notificationmasterUpdate;
            if (type.toUpperCase() === "NOTIFICATIONMASTERDELETE") returnData += apiEndUrl.notificationmasterDelete;
                
                /*Role Management*/
            else if (type.toUpperCase() === "ROLEMANAGEMENTCONFIG") returnData += apiEndUrl.roleManagementConfig;
            else if (type.toUpperCase() === "ROLEMANAGEMENTALL") returnData += apiEndUrl.roleManagementAll;
            else if (type.toUpperCase() === "ROLEMANAGEMENTID") returnData += apiEndUrl.roleManagementId;
            else if (type.toUpperCase() === "ROLEMANAGEMENTSAVE") returnData += apiEndUrl.roleManagementSave;
            else if (type.toUpperCase() === "ROLEMANAGEMENTUPDATE") returnData += apiEndUrl.roleManagementUpdate;
            else if (type.toUpperCase() === "ROLEMANAGEMENTDELETE") returnData += apiEndUrl.roleManagementDelete;

                /*User Access Rights*/
            else if (type.toUpperCase() === "USERACCESSRIGHTSCONFIG") returnData += apiEndUrl.userAccessRightsConfig;
            else if (type.toUpperCase() === "USERMENUSALL") returnData += apiEndUrl.userMenusAll;
            else if (type.toUpperCase() === "USERACCESSRIGHTSALL") returnData += apiEndUrl.userAccessRightsAll;
            else if (type.toUpperCase() === "USERACCESSRIGHTSROLEID") returnData += apiEndUrl.userAccessRightsRoleId;
            else if (type.toUpperCase() === "USERACCESSRIGHTSSAVE") returnData += apiEndUrl.userAccessRightsSave;
            else if (type.toUpperCase() === "USERACCESSRIGHTSUPDATE") returnData += apiEndUrl.userAccessRightsUpdate;
            else if (type.toUpperCase() === "USERACCESSRIGHTSDELETE") returnData += apiEndUrl.userAccessRightsDelete;

            /* Reports */

            else if (type.toUpperCase() === "REPORTSSAVE") returnData += apiEndUrl.reportsSave;

            if (type.toUpperCase() === "CONTRIBUTINGFACTORSCHECKLISTCONFIG")
                returnData += ((rowId !== undefined && rowId !== "") ? +rowId : "");
            else returnData += ((rowId !== undefined && rowId !== "") ? "/" + rowId : "");

            return returnData;
        }
    };
}(navcon || {}));