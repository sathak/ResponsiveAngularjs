(function (navcon) {
    navcon.Menuroute = {
        getRoutes: function (ngAuthSettings) {
            var routes = [{
                url: '/login',
                config: {
                    templateUrl: function () {
                        return navcon.Menuroute.getTemplateUrl("login");
                    },
                    caseInsensitiveMatch: false,
                    controller: 'login',
                    controllerAs: 'vm',
                    title: 'login',
                    settings: {
                        nav: 88,
                        icon: 'fa fa-bookmark',
                        content: '</i> Favourite'
                    },
                    resolve: {
                        pageConfig: function (dataservice) {
                            return dataservice.getServerData("loginConfig").then(function (data) {
                                return navcon.jsonTransformed(data);
                            });
                        }
                        /*pageConfig: function (dataservice, $q, $rootScope) {
                            return $q.all(["loginConfig", "navconfieldhtml"].map(function (d) {
                                if (d == "navconfieldhtml" && $rootScope.fieldTemplate == undefined) {
                                    var environment = ngAuthSettings.environment;
                                    var prodPath = "start/";
                                    //var appPath = (environment === "production") ? prodPath + "navconFieldTemplate.html" : "ext-modules/navconField/navconFieldTemplate.html";
                                    var appPath = (environment === "production") ? prodPath + "navconFieldTemplate.html" : "start/navconFieldTemplate.html";
                                    return dataservice.getServerHtmlData(appPath).then(function (res) {
                                        var htmlObj = $('<html></html>');
                                        htmlObj.html(res.data);
                                        $rootScope.fieldTemplate = htmlObj;
                                        return;
                                    });
                                } else if (d == "navconfieldhtml" && $rootScope.fieldTemplate != undefined) {
                                    return;
                                } else {
                                    return dataservice.getServerData(d).then(function (data) {
                                        return navcon.jsonTransformed(data);
                                    });
                                }

                            }));
                        }*/
                    }
                }
            },
                {
                    url: '/404',
                    config: {
                        //templateUrl: 'app/404/404.html'
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("404");
                        },
                    }
                },
                {
                    url: '/dashboard',
                    config: {
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("dashboard");
                        },
                        title: 'My space',
                        display: false,
                        settings: {
                            nav: 12,
                            content: '<i class="fa fa-edit"></i> My space'
                        },
                        controller: function ($scope, pageConfig) {
                            $scope.pageConfig = pageConfig;
                        },
                        controllerAs: 'vm',
                        resolve: {
                            pageConfig: function (dataservice, $q) {
                                return null;
                            }
                        }
                    }
                },
                {
                    url: '/usermanagement',
                    config: {
                        //templateUrl: 'app/usermanagement/usermanagement.html',
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("usermanagement");
                        },
                        controller: 'usermanagement',
                        controllerAs: 'vm',
                        title: 'User Management',
                        display: false,
                        settings: {
                            nav: 12,
                            content: '<i class="fa fa-hand-o-up"></i> User Management'
                        },
                        resolve: {
                            pageConfig: function (dataservice) {
                                return dataservice.getServerData("userManagementConfig").then(function (data) {
                                    return navcon.jsonTransformed(data);
                                });
                            }
                        },
                        authorize: true
                    }
                },
                {
                    url: '/rolemanagement',
                    config: {
                        //templateUrl: 'app/rolemanagement/rolemanagement.html',
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("rolemanagement");
                        },
                        controller: 'rolemanagement',
                        controllerAs: 'vm',
                        title: 'Role Management',
                        display: false,
                        settings: {
                            nav: 12,
                            content: '<i class="fa fa-group"></i> Role Management'
                        },
                        resolve: {
                            pageConfig: function (dataservice) {
                                return dataservice.getServerData("roleManagementConfig").then(function (data) {
                                    return navcon.jsonTransformed(data);
                                });
                            }
                        },
                        authorize: false
                    }
                },
                {
                    url: '/useraccessrights',
                    config: {
                        //templateUrl: 'app/useraccessrights/useraccessrights.html',
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("useraccessrights");
                        },
                        controller: 'useraccessrights',
                        controllerAs: 'vm',
                        title: 'Security',
                        display: false,
                        settings: {
                            nav: 12,
                            content: '<i class="fa fa-book"></i> Security'
                        },
                        resolve: {
                            pageConfig: function (dataservice) {
                                return dataservice.getServerData("useraccessrightsConfig").then(function (data) {
                                    return navcon.jsonTransformed(data);
                                });
                            }
                        },
                        authorize: true
                    }
                },
                {
                    url: '/notificationsetup',
                    config: {
                        //templateUrl: 'app/notificationsetup/notificationsetup.html',
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("notificationsetup");
                        },
                        controller: 'notificationsetup',
                        controllerAs: 'vm',
                        title: 'Notification Setup',
                        display: false,
                        settings: {
                            nav: 12,
                            content: '<i class="fa fa-hand-o-up"></i> Notification Setup'
                        },
                        resolve: {
                            pageConfig: function (dataservice) {
                                return dataservice.getServerData("notificationSetupConfig").then(function (data) {
                                    return navcon.jsonTransformed(data);
                                });
                            }
                        },
                        authorize: true
                    }
                },
                {
                    url: '/notifications',
                    config: {
                        //templateUrl: 'app/notifications/notifications.html',
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("notifications");
                        },
                        controller: 'notifications',
                        controllerAs: 'vm',
                        title: 'Notifications',
                        display: false,
                        settings: {
                            nav: 12,
                            content: '<i class="fa fa-hand-o-up"></i> Notifications'
                        },
                        resolve: {
                            pageConfig: function (dataservice) {
                                return dataservice.getServerData("notificationsConfig").then(function (data) {
                                    return navcon.jsonTransformed(data);
                                });
                            }
                        },
                        authorize: true
                    }
                },
                {
                    url: '/userimport',
                    config: {
                        //templateUrl: 'app/userimport/userimport.html',
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("userimport");
                        },
                        controller: 'userimport',
                        controllerAs: 'vm',
                        title: 'User Import',
                        display: false,
                        settings: {
                            nav: 12,
                            content: '<i class="fa fa-hand-o-up"></i> User Import'
                        },
                        resolve: {
                            pageConfig: function (dataservice) {
                                return dataservice.getServerData("userImportConfig").then(function (data) {
                                    return navcon.jsonTransformed(data);
                                });
                            }
                        },
                        authorize: true
                    }
                },
                {
                    url: '/userprofile',
                    config: {
                        //templateUrl: 'app/userprofile/userprofile.html',
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("userprofile");
                        },
                        controller: 'userprofile',
                        controllerAs: 'vm',
                        title: 'User Profile',
                        display: true,
                        settings: {
                            nav: 12,
                            content: '<i class="fa fa-hand-o-up"></i> User Profile'
                        },
                        resolve: {
                            pageConfig: function (dataservice, authService, $q) {
                                return dataservice.getServerData("userProfileConfig").then(function (data) {
                                    return navcon.jsonTransformed(data);
                                });
                            }
                        },
                        authorize: true
                    }
                },
                {
                    url: '/changepassword',
                    config: {
                        //templateUrl: 'app/changepassword/changepassword.html',
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("changepassword");
                        },
                        controller: 'changepassword',
                        controllerAs: 'vm',
                        title: 'Change Password',
                        display: true,
                        settings: {
                            nav: 12,
                            content: '<i class="fa fa-hand-o-up"></i> Change Password'
                        },
                        resolve: {
                            pageConfig: function (dataservice, authService, $q) {
                                return $q.all(["changePasswordConfig", "userRegistrationId"].map(function (d) {
                                    if (d === "userRegistrationId") {
                                        return dataservice.getServerData(d, authService.authentication.userId).then(function (data) {
                                            return data;
                                        });
                                    } else {
                                        return dataservice.getServerData(d).then(function (data) {
                                            return navcon.jsonTransformed(data);
                                        });
                                    }
                                }));
                            }
                        },
                        authorize: true
                    }
                },
                {
                    url: '/directives',
                    config: {
                        //templateUrl: 'app/tiles/tiles.html',
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("tiles");
                        },
                        title: 'Directives',
                        controller: 'tiles',
                        controllerAs: 'vm',
                        display: true,
                        settings: {
                            nav: 4,
                            icon: 'fa fa-pencil-square-o',
                            content: '</i> Directives'
                        }
                    }
                },
                {
                    url: '/news',
                    config: {
                        //templateUrl: 'app/news/news.html',
                        templateUrl: function () {
                            return navcon.Menuroute.getTemplateUrl("news");
                        },
                        display: true,
                        controller: 'news',
                        controllerAs: 'vm',
                        title: 'news',
                        settings: {
                            nav: 1,
                            icon: 'fa fa-dashboard',
                            content: '</i> News Announcements'
                        },
                        resolve: {
                            pageConfig: function (dataservice) {
                                return dataservice.getServerData("newsAnnouncementsConfig").then(function (data) {
                                    return navcon.jsonTransformed(data);
                                });
                            }
                        },
                        authorize: true
                    }
                }
            ];
            return routes;

        },
        getTemplateUrl: function (path) {
            var environment = navcon.getApplicationEnvironment();
            var version = navcon.getApplicationVersion();
            var cacheBust = (new Date()).getTime();
            if (environment === "production")
                cacheBust = version.split('.').join(''); //version;
            var returnUrl = "";
            path = path.toLowerCase();

            var templateAppPath = (environment === "production") ? "/templates/app/" : "app/";
            var templateExtPath = (environment === "production") ? "/templates/ext-modules/" : "ext-modules/";

            if (path === "dashboard") {
                returnUrl = templateAppPath + 'dashboard/dashboardTemplate.html';
            } else if (path === "404") {
                returnUrl = templateAppPath + '404/404.html';
            } else if (path === "usermanagement") {
                returnUrl = templateAppPath + 'usermanagement/usermanagement.html';
            } else if (path === "rolemanagement") {
                returnUrl = templateAppPath + 'rolemanagement/rolemanagement.html';
            } else if (path === "useraccessrights") {
                returnUrl = templateAppPath + 'useraccessrights/useraccessrights.html';
            } else if (path === "userprofile") {
                returnUrl = templateAppPath + 'userprofile/userprofile.html';
            } else if (path === "changepassword") {
                returnUrl = templateAppPath + 'changepassword/changepassword.html';
            } else if (path === "photouploader") {
                returnUrl = templateAppPath + 'photo/egPhotoUploader.html';
            } else if (path === "navconchart") {
                returnUrl = templateAppPath + 'widgets/navconChart/navconChartTemplate.html';
                //} else if (path === "navcondashboard") {
                //    returnUrl = templateExtPath + 'navconDashboard/navconDashboardTemplate.html';
                //} else if (path === "navconwidgetbody") {
                //    returnUrl = templateExtPath + 'navconDashboard/navconWidgetBodyTemplate.html';
                //} else if (path === "navcondelete") {
                //    returnUrl = templateExtPath + 'navconDelete/navconDeleteTemplate.html';
                //} else if (path === "navconevaluation") {
                //    returnUrl = templateExtPath + 'navconEvaluation/navconEvaluationTemplate.html';
            } else if (path === "navconform") {
                returnUrl = templateExtPath + 'navconForm/navconFormTemplate.html';
            } else if (path === "navconframework") {
                returnUrl = templateExtPath + 'navconFramework/navconFrameworkTemplate.html';
            } else if (path === "navconuserprofile") {
                returnUrl = templateExtPath + 'navconFramework/navconUserProfile/navconUserProfileTemplate.html';
            } else if (path === "navconuserprofilesmall") {
                returnUrl = templateExtPath + 'navconFramework/navconUserProfile/navconUserProfileSmallTemplate.html';
            } else if (path === "navconmenu") {
                returnUrl = templateExtPath + 'navconMenu/navconMenuTemplate.html';
            } else if (path === "navconmenugroup") {
                returnUrl = templateExtPath + 'navconMenu/navconMenuGroupTemplate.html';
            } else if (path === "navconmenuitem") {
                returnUrl = templateExtPath + 'navconMenu/navconMenuItemTemplate.html';
            } else if (path === "navconmodal") {
                returnUrl = templateExtPath + 'navconModal/navconModalTemplate.html';
            } else if (path === "navconpagebar") {
                returnUrl = templateExtPath + 'navconPagebar/navconPagebarTemplate.html';
            } else if (path === "navconportlet") {
                returnUrl = templateExtPath + 'navconPortlet/navconPortletTemplate.html';
            } else if (path === "navconrating") {
                returnUrl = templateExtPath + 'navconRating/navconRatingTemplate.html';
            } else if (path === "navconreport") {
                returnUrl = templateExtPath + 'navconReport/navconReportTemplate.html';
            } else if (path === "navconreportpage") {
                returnUrl = templateExtPath + 'navconReport/navconReportPageTemplate.html';
            } else if (path === "navcontable") {
                returnUrl = templateExtPath + 'navconTable/navconTableTemplate.html';
            } else if (path === "navcontableeditor") {
                returnUrl = templateExtPath + 'navconTableEditor/navconTableEditorTemplate.html';
            } else if (path === "navcontree") {
                returnUrl = templateExtPath + 'navconTree/navconTreeTemplate.html';
            } else if (path === "navconfileupload") {
                returnUrl = templateExtPath + 'navconUpload/navconFileUploadTemplate.html';
            } else if (path === "navconphotoupload") {
                returnUrl = templateExtPath + 'navconUpload/navconPhotoUploadTemplate.html';

            } else if (path === "navconkendotemplate") {
                returnUrl = templateExtPath + 'navconKendo/navconKendoTemplate.html';
            } else if (path === "navconkendotable") {
                returnUrl = templateExtPath + 'navconKendo/navconKendoTable.html';
            } else if (path === "navconkendoschedule") {
                returnUrl = templateExtPath + 'navconKendo/navconKendoSchedule.html';
            } else if (path === "navconkendotree") {
                returnUrl = templateExtPath + 'navconKendo/navconKendoTree.html';

            } else if (path === "login") {
                returnUrl = templateAppPath + 'login/login.html';
            }

            if (environment !== "production") returnUrl + "?v=" + cacheBust;
            return returnUrl;
        }
    };
}(navcon || {}));