(function () {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', '$route', 'logger', 'routehelperConfig', 'authService', 'bsLoadingOverlayService', 'localStorageService'];

    // Must configure via the routehelperConfigProvider
    function routehelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $route, logger, routehelperConfig, authService, bsLoadingOverlayService, localStorageService) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $routeProvider = routehelperConfig.config.$routeProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts
        };

        init();

        return service;
        ///////////////

        function configureRoutes(routes) {
            routes.forEach(function (route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function (event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            hendleEvents();
            $route.reload();
        }

        function loginPageSetting() {
            $(".page-content").css("margin-left", "0px").css("background-color", "transparent");
            $(".page-sidebar-wrapper").css("display", "none");
            $(".top-menu").css("display", "none");
            $(".page-container").css("margin", "0px");
            $(".page-header").css("display", "none");
            $(".page-footer").css("display", "none");
            $("#pagewrapper").removeAttr('style');
            $("#pagewrapper").css("margin-top", "0px");
            //$(".page-container").css("margin-top", "0px");
            //$("html").css("background", "url('images/flynas_lgoin_Bg.png') no-repeat center center fixed");
            $(".top-menu").css("display", "none");
            //$(".loading-overlay").css("background", "url('images/flynas_lgoin_Bg.png') no-repeat center center fixed");
            $(".page-content-wrapper").removeClass("well-lg");
            //$(".shuffle-animation").css("height", "calc(100% - 30px)");
            // $(".page-content-wrapper").css("margin-top", "-60px");
            $(".page-content").addClass("login-content");
            //$(".page-content-wrapper").height($(window).height() + "px");
        }

        function allPageSetting() {
            if ($location !== undefined && $location.$$path !== undefined)
                $rootScope.configHeaderMenu = $location.$$path.replace("/", "");
            else
                $rootScope.configHeaderMenu = "";
            $(".page-content").css("margin-left", "230px").css("background-color", "#E6F0F1");
            $(".page-sidebar-wrapper").css("display", "none");
            $(".page-sidebar-wrapper").css("display", "inline");
            $(".top-menu").css("display", "block");
            $(".page-footer").css("display", "block");
            $(".page-header").css("display", "block");

            //$(".page-container").css("margin-top", "46px");
            // $("html").css("background-color", "#6ebebd").css("background-image", "none");
            $(".loading-overlay").css("background-image", "none");
            $(".page-content").removeClass("login-content");
            $("#pagewrapper").removeAttr('style');
            $("#pagewrapper").css("margin-top", "58px");
            //$(".page-content").css("margin-top", "0px");
            //$(".page-content-wrapper").css("margin-top", "0px");
            // $(".page-content-wrapper").height(($(window).height() - $(".page-header").height()) + "px");
            $(window).on("resize", function () {
                $('.profile').removeClass('hideMenudetail');
                $('.page-logo').removeClass('hideMenudetail');
                $('.page-sidebar').removeClass('hideMenu');
                $('#pagecontent').removeClass('marginLeft0');
                $(".page-sidebar").removeClass("hideMenu");
                $('#Mainmenu li a div').removeClass('hideMenudetail');
                $('#Mainmenu li a span').removeClass('hideMenudetail');
                $('#Mainmenu li.active ul').removeClass('hideMenudetail');
                if (window.matchMedia('(max-width: 768px)').matches) {
                    $("#menu_toggle").trigger("click");
                }
            })
            $(document).on("click", function (e) {
                if ($($(e.target).parents("ul[id='Mainmenu']")).length < 1) {
                    if (window.matchMedia('(max-width: 768px)').matches) {
                        if (!$(".page-sidebar").hasClass("hideMenu")) {
                            $(".page-sidebar").addClass("hideMenu");

                        }
                    }
                }

            });
        }


        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute && (route.display !== undefined && route.display !== false)) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }


        function hendleEvents() {
            $rootScope.$on('$routeChangeSuccess',
                function (event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title; // data bind to <title>
                    //bsLoadingOverlayService.stop();
                }
            );

            function routeChangeStart(event, next, current) {
                //bsLoadingOverlayService.start();
                //allPageSetting();

                //Look at the next parameter value to determine if a redirect is needed

                var authData = localStorageService.get('authorizationData');
                if (authData === undefined || authData === null || authData.authentication === undefined || authData.authentication.isAuth === undefined || authData.authentication.isAuth === null || authData.authentication.isAuth === "") {
                    if (authService == undefined || (authService !== undefined && authService.authentication != undefined && authService.authentication != null && authService.authentication.isAuth !== undefined && !authService.authentication.isAuth)) {
                        loginPageSetting();
                        $location.path('/login');
                        return;
                    } else {
                        allPageSetting();
                    }
                }

                if (next && next.$$route && next.$$route.originalPath == "/login") {
                    if (authData === undefined || authData === null || authData.authentication === undefined || authData.authentication.isAuth === undefined || authData.authentication.isAuth === null || authData.authentication.isAuth === "") {
                        loginPageSetting();
                        $location.path('/login');
                    }
                    else if (authService.authentication.isAuth) {
                        $rootScope.$evalAsync(function () {
                            $location.path('/dashboard');
                        });
                        return;
                    } else {
                        loginPageSetting();
                    }
                }

                if (next && next.$$route && next.$$route.authorize) {
                    allPageSetting();
                    if (!authService.authentication.isAuth) {
                        $rootScope.$evalAsync(function () {
                            loginPageSetting();
                            $location.path('/login');
                        });
                    }
                }

                if (next && next.$$route && !authService.authentication.isAuth) {
                    $rootScope.$evalAsync(function () {
                        loginPageSetting();
                        if ($location.$$url !== undefined && $location.$$url !== '' && $location.$$url.toLowerCase() === '/login#login')
                            $location.url("/login");
                        $location.path('/login');
                    });
                }
            }

            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                $rootScope.configSection = "";
                if (($rootScope.pageChange === undefined || $rootScope.pageChange === false) && current !== undefined && current.scope !== undefined && current.scope.vm !== undefined && current.scope.vm.pageChange !== undefined) {
                    var redirectPath = "/dashboard";
                    if (next && next.$$route && next.$$route.originalPath)
                        redirectPath = next.$$route.originalPath;
                    var changes = navcon.pageChanges(current.scope.vm.pageChange, current.scope.vm.pageSave, function (confirm) {
                        if (!confirm) {
                            $rootScope.$evalAsync(function () {
                                $rootScope.pageChange = true;
                                $location.path(redirectPath);
                                return;
                            })
                        }
                    });
                    //bsLoadingOverlayService.stop();
                    event.preventDefault();
                    return;

                } else {
                    routeChangeStart(event, next, current);
                }
                $rootScope.pageChange = false;
            });
        }
    }
})();