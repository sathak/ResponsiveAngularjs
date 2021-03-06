/* global toastr:false, moment:false */
(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('menuSettings', {
            data: []
        })
        .constant('ngAuthSettings', {
            apiServiceBaseUri: 'http://1.0.0.82/RMSBuildServices/api/',
            loginServiceUri: 'http://1.0.0.82/RMSBuildServices/',
            clientId: 'ngAuthApp',
            uploadPath: '',
            signalRServer: 'http://1.0.0.82/RMSBuildServices',
            reportBaseUri: 'http://localhost:59337/assets/images/ReportPreview/',
            appURL: 'http://localhost:59337/',
            relativeUrl: '../../',
            sessionTimeOut: 1800,
            sessionConfirmTimeOut: 30,
            enableSessionTimeOut: true,
            enableFieldLevelValidation: false,
            version: "1.0.0",
            environment: "development",
           // environment: "production",
            SSO: false,
            SSOLogoutUrl: 'http://1.0.0.82/RMSBuildServices/logout.aspx',
            SSOError: 'You do not have sufficient permission to access this application.',
            feedback: {
                "mailto":"p.fazil@navcon.ae",
                "cc":"",
                "bcc":"",
                "subject": "",
                "body":""
            },
            helpURL: "http://www.navconaerospace.com/"
        })
		.constant('apiEndUrl', {

		});
})();