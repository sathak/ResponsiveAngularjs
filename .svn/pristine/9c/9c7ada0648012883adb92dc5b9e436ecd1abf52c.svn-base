"use strict";

angular.module("navconFramework").controller("navconFrameworkController",
    ['$scope', '$window', '$timeout', '$rootScope', '$location', 'routehelper', 'authService', 'dataservice', 'menuSettings', 'signalRHubProxy', 'logger', 'ngAuthSettings', 'localStorageService', 'Idle',
        function ($scope, $window, $timeout, $rootScope, $location, routehelper, authService, dataservice, menuSettings, signalRHubProxy, logger, ngAuthSettings, localStorageService, Idle) {

            var routes = routehelper.getRoutes();
            $scope.userName = "";
            $scope.UserFullName = "";
            $scope.Designation = "";
            $scope.commPageConfig = "",
            $scope.commItemId = "",
            $scope.commItemPage = "",
            $scope.currentMainmenu = "Home";
            $scope.currentSubmenu = "My Space";
            $scope.currentSubmenuURL = "/myspace".replace('/', '');
            $scope.currentMainmenuicon = "fa fa-home";
            $scope.idleTimeOut = 1800;
            $scope.idleConfirmTimeOut = 5;
            $scope.userProfileImage = "";
            $scope.aboutUsData = {};
            if (ngAuthSettings.sessionTimeOut !== undefined && ngAuthSettings.sessionTimeOut > 0) {
                $scope.idleTimeOut = ngAuthSettings.sessionTimeOut;
                if (ngAuthSettings.sessionTimeOut < 60)
                    $scope.idleTimeOut = 60;
            }

            if (ngAuthSettings.sessionConfirmTimeOut !== undefined && ngAuthSettings.sessionConfirmTimeOut > 0)
                $scope.idleConfirmTimeOut = ngAuthSettings.sessionConfirmTimeOut;

            $scope.feedback = "mailto:";
            if (ngAuthSettings.feedback !== undefined) {
                //$scope.feedback = $scope.feedback + ngAuthSettings.feedback.mailto + "?cc=" + ngAuthSettings.feedback.cc + "&bcc=" + ngAuthSettings.feedback.bcc + "&subject=" + ngAuthSettings.feedback.subject;
                $scope.feedback = $scope.feedback.concat(ngAuthSettings.feedback.mailto);
                if (ngAuthSettings.feedback.cc != '')
                    $scope.feedback = $scope.feedback.concat("?cc=" + ngAuthSettings.feedback.cc)
                if (ngAuthSettings.feedback.bcc != '')
                    $scope.feedback = $scope.feedback.concat("?bcc=" + ngAuthSettings.feedback.bcc)
                if (ngAuthSettings.feedback.subject != '')
                    $scope.feedback = $scope.feedback.concat("?subject=" + ngAuthSettings.feedback.subject)
            }

            $scope.userProfileClick = function () {
                $scope.currentMainmenu = "Home";
                $scope.currentMainmenuicon = "fa fa-home";
                $scope.currentSubmenu = "My Profile";

                $location.path('/userprofile');
            }

            $scope.notificationViewClick = function () {
                $scope.currentMainmenu = "Home";
                $scope.currentMainmenuicon = "fa fa-home";
                $scope.currentSubmenu = "Notifications";

                $location.path('/notifications');
            }

            $rootScope.isFeedback = false;
            $scope.feedbackClick = function () {
                $rootScope.isFeedback = true;
            }

            $scope.helpOpen = function () {
                if (ngAuthSettings.helpURL !== undefined && ngAuthSettings.helpURL !== "")
                    window.open(ngAuthSettings.helpURL, '_blank', 'location=yes,height=800,width=' + (window.outerWidth / 2)*1.25 + ',resizable=yes,scrollbars=yes,status=yes');
            }

            $scope.aboutUsClick = function () {
                getServerData("aboutUsConfig").then(function (data) {
                    if (data === undefined || data === null || data.length === 0) return;
                    $scope.aboutUsData = data.aboutUs;
                    var authData = localStorageService.get('authorizationData');
                    $scope.aboutUsData.version = authData.version;
                    navcon.openModal("aboutUs");
                    //$('#aboutUs').modal({
                    //    show: true
                    //});
                });
            }

            $scope.aboutUsSiteClick = function () {
                window.open($scope.aboutUsData.website.toString(), '_blank');
            }

            $scope.startTimer = function () {
                $scope.$broadcast('timer-start');
            };

            $scope.stopTimer = function () {
                $scope.$broadcast('timer-stop');
            };

            $scope.resetTimer = function () {
                $scope.$broadcast('timer-reset');
            };

            getNavRoutes();

            function getNavRoutes() {
                var authData = localStorageService.get('authorizationData');

                $scope.notification = [];
                if (authData !== undefined && authData !== null) {
                    $scope.userName = authData.userName;
                    if (authData.FirstName === undefined || authData.FirstName === null)
                        authData.FirstName = "";
                    if (authData.LastName === undefined || authData.LastName === null)
                        authData.LastName = "";
                    $scope.UserFullName = authData.FirstName + " " + authData.LastName;
                    $scope.Designation = authData.Designation;
                    loadNotification(authData.notification);
                }

                $scope.$on('ALERT-DATA-REFRESH', function (event, data, status) {
                    //if(authData === null){
                    authData = localStorageService.get('authorizationData');
                    $scope.userName = authData.userName;
                    $scope.UserFullName = authData.FirstName + " " + authData.LastName;
                    $scope.Designation = authData.Designation;
                    //}
                    if (status) {
                        loadNotification(data, true);
                    } else {
                        loadNotification(data, false);
                        authData.notification.push(data[0]);
                        localStorageService.set('authorizationData', authData);
                    }
                });

                $scope.$on('ALERT-DATA-DELETE', function (event, data, type) {
                    authData = localStorageService.get('authorizationData');
                    if (authData.notification.length > 0) {
                        var notification = deleteNotification(authData.notification, data, type);
                        loadNotification(notification, true);
                        authData.notification = notification;
                        localStorageService.set('authorizationData', authData);
                    }
                });

                $scope.$on('ALERT-DATA-DELETE-ALL', function (event, data, type) {
                    authData = localStorageService.get('authorizationData');
                    if (authData.notification.length > 0) {
                        var notification = [];
                        loadNotification(notification, true);
                        authData.notification = notification;
                        localStorageService.set('authorizationData', authData);
                    }
                });

                $scope.$on('SCREEN-IDLE', function (event, method, idleTimeOut, idleConfirmTimeOut) {
                    idleTimeoutSettings(method, idleTimeOut, idleConfirmTimeOut);
                });

                $scope.timeOutClose = function () {
                    navcon.closeModal('idletimeout');
                    $scope.stopTimer();
                    $timeout(function () {
                        $scope.resetTimer();
                    })
                };

                function idleTimeoutSettings(method, idleTimeOut, idleConfirmTimeOut) {
                    $scope.idleConfirmTimeOut = idleConfirmTimeOut;
                    if (method === 'IdleTimeout') {
                        navcon.closeModal('idletimeout');
                        $scope.stopTimer();
                        $timeout(function () {
                            $scope.resetTimer();
                        })
                        $('.modal').modal('hide');
                        $scope.logOut();
                    } else if (method === 'IdleStart') {
                        navcon.openModal('idletimeout', function () {
                            $scope.startTimer();
                        });
                    } else if (method === 'IdleEnd') {
                        $('.modal').modal('hide');
                        //$scope.logOut();
                    }
                }

                $scope.notificationClick = function (item) {
                    if (authData === null)
                        authData = localStorageService.get('authorizationData');

                    if (item.type.toString() === "1") {
                        if (item !== undefined && item !== null) {
                            if (item.NFDetailsId !== undefined && item.NFDetailsId !== null) {
                                var data = { NFDetailsId: item.NFDetailsId };
                                dataservice.putData("MySpace/Notification/Update", data).then(function (data) {
                                    item.status = true;
                                    for (var i = 0, len = authData.notification.length; i < len; i++) {
                                        if (authData.notification[i].NFDetailsId === item.NFDetailsId) {
                                            authData.notification[i].Status = true;
                                            localStorageService.set('authorizationData', authData);
                                            break;
                                        }
                                    }
                                    if ($location.$$url === '/notifications') {
                                        setTimeout(function () {
                                            $rootScope.$broadcast('NOTIFICATION-ALERT-DATA-REFRESH', data, function () { });
                                        }, 500)
                                    }
                                });
                            }
                        }
                    }

                    //if (item.type === 0) {
                    //    $location.path('/refresh');
                    //    $location.path('/' + item.page.toLowerCase());
                    //    setTimeout(function () {
                    //        $rootScope.$broadcast(item.page.toUpperCase() + '-ALERT-DATA-REFRESH', item.code, false);
                    //    }, 500)
                    //} else if (item.type === 2) {
                    //    $scope.commItemId = item.code;
                    //    $scope.commItemPage = item.page.toLowerCase();
                    //    //  $scope.modalId = "messagecomm";
                    //    navcon.openModal("messagecomm");
                    //}
                }

                $scope.navRoutes = []
                loadMenus(menuSettings.data);

                $scope.$on('MENU-SETTING-DATA-REFRESH', function (event, args) {
                    loadMenus(menuSettings.data);
                });

                $scope.menuClick = function (e) {
                    if ($('.page-sidebar').hasClass('hideMenu')) {
                        $('.profile').toggleClass('hideMenudetail');
                        $('.page-logo').toggleClass('hideMenudetail');
                        $('.page-sidebar').toggleClass('hideMenu');
                        $('#pagecontent').toggleClass('marginLeft0');
                        $('#Mainmenu li a div').toggleClass('hideMenudetail');
                        $('#Mainmenu li a span').toggleClass('hideMenudetail');
                        $('#Mainmenu li.active ul').toggleClass('hideMenudetail');
                    }
                    if ($(e.target).parents('li').hasClass('active')) {
                        $('#Mainmenu li').removeClass('active');
                        $('#Mainmenu li a span').removeClass('fa fa-chevron-circle-down');
                        $('#Mainmenu li a span').addClass('fa fa-chevron-circle-right');

                        if (e.target.localName == 'span' || e.target.localName == 'i' || e.target.localName == 'div') {
                            checkElement = $(e.target).parent().next();
                        }
                        else {
                            checkElement = $(e.target).next();
                        }

                        if (checkElement.is('ul')) {
                            //$(checkElement).css("display", "none");
                            $('#Mainmenu ul:visible').slideUp('normal');
                        }

                    } else {
                        $('#Mainmenu li').removeClass('active');
                        $('#Mainmenu li a span').removeClass('fa fa-chevron-circle-down');
                        $('#Mainmenu li a span').addClass('fa fa-chevron-circle-right');

                        var checkElement;
                        if (e.target.localName == 'span' || e.target.localName == 'i' || e.target.localName == 'div') {
                            checkElement = $(e.target).parent().next();
                        }
                        else {
                            checkElement = $(e.target).next();
                        }
                        $(e.target).parents('li').addClass('active')
                        if (e.target.localName == 'a')
                            $(e.target).find('span').addClass('fa fa-chevron-circle-down');
                        if (e.target.localName == 'span')
                            $(e.target).addClass('fa fa-chevron-circle-down');
                        if (e.target.localName == 'i')
                            $(e.target).next().next().addClass('fa fa-chevron-circle-down');
                        if (e.target.localName == 'div')
                            $(e.target).next().addClass('fa fa-chevron-circle-down');

                        if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                            return false;
                        }
                        if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                            $('#Mainmenu ul:visible').slideUp('normal');
                            checkElement.slideDown('normal');
                            return false;
                        }
                    }


                    //$('#Mainmenu li').removeClass('current-page');
                    //$(e.target).parent().addClass('current-page');

                };
                $scope.submenuClick = function (e, mainmenu, submenu) {//pagename
                    $scope.currentMainmenu = mainmenu.text;
                    $scope.currentMainmenuicon = mainmenu.IconClass;
                    $scope.currentSubmenu = submenu.text;
                    $scope.currentSubmenuURL = submenu.ConfigName;
                    $('#Mainmenu li').removeClass('current-page');
                    $(e.target).parent().addClass('current-page');
                    //$state.go(pagename);
                };


                //$scope.menuClick = function(item){
                //    $timeout(function(){
                //        $rootScope.$broadcast('SUBMENU-LOADING', item.ConfigName.toLowerCase()); 
                //    })
                //}


                $scope.mainMenuFilter = function (item) {
                    if (item.MenuType === 0 || item.MenuType === 1 || item.MenuType === 2) {
                        return true;
                    }
                    return false;
                };

                function loadMenus(data) {
                    if (data === undefined) return;
                    $scope.navRoutes = []
                    if (data.length === undefined) return;
                    $scope.menus = data;
                }

                function deleteNotification(data, id, type) {
                    var notification = [];
                    var field = "NotificationId";
                    if (type === 'user')
                        field = "NFDetailsId";
                    for (var i = 0, len = data.length; i < len; i++) {
                        var item = data[i];
                        if (item[field] === id)
                            continue;
                        notification.push(item);
                    }
                    return notification;
                }

                function loadNotification(data, status) {
                    if (data === undefined || data.length === 0) {
                        $scope.notification = [];
                        return;
                    }
                    if (status)
                        $scope.notification = [];
                    for (var i = 0, len = data.length; i < len ; i++) {
                        var item = data[i];
                        if (item.Message === undefined || item.Message === "") continue;
                        var obj = {
                            item: item.Message, page: item.PageKey, code: item.Id, status: item.Status || false, NotificationDetailId: item.NotificationDetailId,
                            NFDetailsId: item.NotificationDetailId,
                            date: navcon.dateFromUTCToLocal(item.LastUpdateDate, "DD/MM/YYYY HH:MM"), type: item.Type
                        };
                        $scope.notification.push(obj);
                    }
                }
            };

            $scope.logOut = function () {
                if ($('.page-sidebar').hasClass('hideMenu')) {
                    $('.profile').toggleClass('hideMenudetail');
                    $('.page-logo').toggleClass('hideMenudetail');
                    $('.page-sidebar').toggleClass('hideMenu');
                    $('#pagecontent').toggleClass('marginLeft0');
                    $('#Mainmenu li a div').toggleClass('hideMenudetail');
                    $('#Mainmenu li a span').toggleClass('hideMenudetail');
                    $('#Mainmenu li.active ul').toggleClass('hideMenudetail');
                }
                authService.logOut(function () {
                    $('.modal').modal('hide');
                    $scope.currentMainmenu = "Home";
                    $scope.currentMainmenuicon = "fa fa-home";
                    $scope.currentSubmenu = "My Space";

                    if (ngAuthSettings.SSO !== undefined && ngAuthSettings.SSO) {
                        if (ngAuthSettings.appURL !== undefined && ngAuthSettings.appURL !== "") {
                            window.location.href = ngAuthSettings.appURL + "logout.aspx";
                        } else {
                            $location.path('/login');
                        }
                    } else {
                        $location.path('/login');
                    }
                });
            };

            /*Cancel*/
            $scope.cancel = function (type) {
                navcon.closeModal(type);
            };

            var currentUrl = "";

            if ($location.$$path !== undefined)
                currentUrl = $location.$$path.substring(1, $location.$$path.length).toLowerCase();

            function getUserProfile() {
                if ($rootScope.userProfileImage === undefined || $rootScope.userProfileImage === oldValue || $rootScope.userProfileImage === "") {
                    var dataUser = getServerData('userProfileId').then(function (dataUser) {
                        if (dataUser !== undefined && dataUser !== null) {
                            var userImage = dataUser.img;

                            if (dataUser.img === undefined || dataUser.img === null || dataUser.img === "")
                                userImage = "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";

                            $rootScope.userProfileImage = userImage;
                        }
                    });
                }
            }

            $scope.firstIndex = function (indexNo, type) {
                if (type == "main") {
                    if (indexNo === 0) {
                        breadCrumbConfig("");
                        return "active";
                    } else
                        return "";
                } else if (type == "sub") {
                    if (indexNo === 0)
                        return "block";
                    else
                        return "none";
                }
            };

            function breadCrumbConfig(url) {
                var etarget, checkElement;
                if ($scope.menus !== undefined && $scope.menus !== null && $scope.menus.length !== 0) {
                    var allMenus = navcon.getDataFromTree($scope.menus, '', 0);
                    var filterMenus = $.grep(allMenus, function (e) {
                        return e.ConfigName !== undefined && e.ConfigName !== null && e.ConfigName !== "";
                    });
                    if (filterMenus.length > 0) {
                        if (url === "") url = filterMenus[0].text;


                        var subMenu = navcon.getItemByKeyValue(filterMenus, 'ConfigName', url, true);
                        if (subMenu !== -1) {

                            var mainMenu = navcon.getItemByKeyValue(allMenus, 'id', subMenu.ParentId, true);
                            if (mainMenu !== -1) {
                                $scope.currentMainmenu = mainMenu.text;
                                $scope.currentMainmenuicon = mainMenu.IconClass;

                                $('#Mainmenu li').removeClass('active');
                                $('#Mainmenu li a span').removeClass('fa fa-chevron-circle-down');
                                $('#Mainmenu li a span').addClass('fa fa-chevron-circle-right');

                                etarget = $($('#mainMenuId_' + mainMenu.id).children()[0]).children()[1]
                                $('#mainMenuId_' + mainMenu.id).addClass('active');
                                //$('#' + mainMenu.id).children().first().click();
                            }

                            $scope.currentSubmenu = subMenu.text;
                            $scope.currentSubmenuURL = url;


                            $('#Mainmenu li').removeClass('current-page');
                            $('#mainMenuSubId_' + subMenu.id).addClass('current-page');

                            if (etarget !== undefined && etarget !== null) {
                                if (etarget.localName == 'span' || etarget.localName == 'i' || etarget.localName == 'div') {
                                    checkElement = $(etarget).parent().next();
                                }
                                else {
                                    checkElement = $(etarget).next();
                                }

                                if (checkElement.is('ul')) {
                                    //$(checkElement).css("display", "none");
                                    $('#Mainmenu ul:visible').slideUp('normal');
                                    checkElement.slideDown('normal');
                                }
                            }
                        }
                    }
                }
            }

            $timeout(function () {
                if ($rootScope.configHeaderMenu !== undefined && $rootScope.configHeaderMenu !== null && $rootScope.configHeaderMenu !== "login")
                    getUserProfile();

                breadCrumbConfig(currentUrl);

                $rootScope.$broadcast('SUBMENU-LOADING', currentUrl);

                /*if ($(".main_menu_side .menuScrollbar").mCustomScrollbar.length !== 0)
                    $(".main_menu_side .menuScrollbar").mCustomScrollbar('destroy');*/
                if(!$(".page-sidebar").hasClass('mCustomScrollbar')){
                    $(".page-sidebar").mCustomScrollbar({
                        autoHideScrollbar: true,
                        scrollInertia: 0,
                        scrollbarPosition: "outside"
                    });
                }

                //$("#pagecontent").mCustomScrollbar({
                //    autoHideScrollbar: true,
                //    theme: "3d-dark",
                //    scrollInertia: 0,
                //    scrollbarPosition: "outside"
                //});
            })

            $scope.getTimeoutMinutes = function () {
                return $scope.idleTimeOut / 60;
            }

            function getServerData(type, rowId) {
                return dataservice.getServerData(type, rowId).then(function (data) {
                    return data;
                });
            };

            function activate() {

                if (authService.authentication.isAuth)
                    $rootScope.$broadcast('START-SESSION');
            };

            activate();
            Layout.initSidebar();

            $rootScope.$watch("userProfileImage", function (newValue, oldValue) {
                if (newValue !== undefined && newValue !== oldValue && newValue !== "") {
                    var imgSrc = "data:image/jpeg;base64," + newValue;
                    $scope.userProfileImage = imgSrc;
                }
            }, true);
        }
    ]);