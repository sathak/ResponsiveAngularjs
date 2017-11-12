(function () {
    'use strict';

    angular
        .module('app.tiles')
        .controller('tiles', tiles);

    /* @ngInject */
    function tiles($scope, dataservice, logger, menuSettings, $rootScope, $location) {
        var vm = this;
        vm.title = '';
        vm.menu = '';
        
        vm.menuCheck = function (subMenu) {
            return navcon.menuRightsCheck(menuSettings, vm.menu, subMenu.toLowerCase()) ? false : true;
        }
        
        vm.subMenus = [];
        
        $scope.$on('SUBMENU-LOADING', function(event, menu) {
            vm.menu = menu.toLowerCase();
            vm.subMenus = navcon.getSubMenus(menuSettings, vm.menu);
            vm.title = navcon.getMenuTitle(menuSettings, vm.menu);

        }); 
        
        vm.menu = $location.$$path.substring(1,$location.$$path.length).toLowerCase();
        vm.subMenus = navcon.getSubMenus(menuSettings, vm.menu);
        vm.title = navcon.getMenuTitle(menuSettings, vm.menu);
        
    }
})();