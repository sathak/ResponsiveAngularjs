"use strict";
angular.module('app').directive('navconFchart', ['dataservice',
function (dataservice) {
    return {
        /*E: Directive defined as an element. <navcon-table></navcon-table>
        A: Directive applied as an attribute on existing element. <div navcon-table></div>
        C: Directive applied as a css class to existing element <div class="navcon-table"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            type: '@',
            data: '=',
            id: '@',
            chart: '@'
        },
        template: '<div id="{{id}}"></div>',
        link: function (scope, el, attrs) {
            scope.$watch("data", function (newValue, oldValue) {
                if (newValue != undefined && newValue !== "") {
                    scope.id = newValue.id;

                    scope.$on('DASHBOARD-RESIZE', function (event, width, height, id) {
                        var chart = FusionCharts.items[event.currentScope.chart.id];
                        if (id !== undefined && chart !== undefined && chart.options.dataSource.id === id) {
                            chart.resizeTo(width, height);
                            $($.find("tspan:contains('XT Trial')")).remove();
                        }

                    });

                    loadFusion(scope.data, scope.id, scope.data.type, scope, el);
                }
                $($.find("tspan:contains('XT Trial')")).remove();
            });
        }
    };
}]);

function loadFusion(datasource, id, type, scope, el) {
    FusionCharts.ready(function () {
        //var width = $(el).parent().parent().parent().parent().parent().parent().parent(".gridster-item").width();
        //var height = $(el).parent().parent().parent().parent().parent().parent().parent(".gridster-item").height();
        var width = $(el).parents(".gridster-item").width();
        var height = $(el).parents(".gridster-item").height();
        scope.chart = new FusionCharts({
            type: type,
            renderAt: id,
            width: width,
            height: (height - 60),
            dataFormat: 'json',
            dataSource: datasource
        }).render(function (evt) {
            $($.find("tspan:contains('XT Trial')")).remove();
        });

        //FusionCharts.addEventListener('DrawComplete', function (evt, at) {
        //    $($.find("tspan:contains('XT Trial')")).remove();
        //});

        //FusionCharts.addEventListener('renderComplete', function (evt, at) {
        //    $($.find("tspan:contains('XT Trial')")).remove();
        //    var width = $(evt.sender.ref).parents(".gridster-item").width();
        //    var height = $(evt.sender.ref).parents(".gridster-item").height();
        //    evt.sender.resizeTo(width, (height - 60));

        //    //$(evt.sender.ref).parents(".gridster-item").width(at.width);
        //    //$(evt.sender.ref).parents(".gridster-item").height(at.height);
        //    //evt.sender.resizeTo(at.width, (at.height - 40));
        //});
    });
};