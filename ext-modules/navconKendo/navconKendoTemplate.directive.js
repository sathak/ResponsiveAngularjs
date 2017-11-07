"use strict";

angular.module('app').directive('navconKendoTemplate', ['dataservice', 'ngAuthSettings', '$timeout', '$compile',
function (dataservice, ngAuthSettings, $timeout, $compile) {
    return {
        /*E: Directive defined as an element. <navcon-table></navcon-table>
        A: Directive applied as an attribute on existing element. <div navcon-table></div>
        C: Directive applied as a css class to existing element <div class="navcon-table"></div>
        M: Directive applied as comment.*/
        restrict: 'E',
        replace: true,
        transclude: 'element',
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            navconData: '=',
            headerTitle: '@',
            templateType: '@'
        },
        templateUrl: function () {
            return navcon.Menuroute.getTemplateUrl("navconKendoTemplate");
        },
        link: function (scope, el, attrs, ctrl, transclude) {
            //$(el).attr("id", attrs.templateType + "-editor");
            //$($(el).find("div[type ='text/x-kendo-template']")).attr("id", attrs.templateType + "-editor");

            //var templateData = $($(el).find("script[id ='Approval']")).text();
            //$($(el).find("span[id='Approval']")).html(templateData);
            //$compile($($(el).find("span[id='Approval']")).contents())(scope);

            //var template='<script type="text/x-kendo-template"></script>'
            //$($(el).find("span[id='Approval']")).html(templateData);
            //$compile($($(el).find("span[id='Approval']")).contents())(scope);

            
            /*var data = $($(el).find("div[class ='kendotemplateInclude']")).children().html();
            var template = '<script type="text/x-kendo-template" id="' + attrs.templateType + '-editor">' + data + '</script>';
            //$compile(template)(scope)
            //var template = $($(el).find("script[type='text/x-kendo-template']")).append(data).html();
            //$(el).append($compile(template)(scope));
            $(el).append(template);
            
            $compile($($(el).find("script[id='" + attrs.templateType + "-editor']")).html())(scope);*/

            //var futureParent = element.children().eq(0);
            transclude(function (clone) {
                //var template = '<script type="text/x-kendo-template" id="' + attrs.templateType + '-editor">' + clone + '</script>';
                //el.append(template);

                //el.find("script[type='text/x-kendo-template']").attr("id", attrs.templateType + "-editor");
                
                el.find("script[type='text/html']").append(clone);
                //$compile(el.find("script[type='text/html']").contents())(scope);
            }, el);
        }/*,
        compile: function (el, attrs, transclude) {
            return function (scope, lElem, lAttrs) {
                // do the transclusion.
                transclude(scope, function (clone, innerScope) {
                    //clone is a copy of the transcluded DOM element content.
                    //$(el).attr("id", attrs.templateType + "-editor");
                    //$compile($(el).contents())(scope);

                    //var templateData = clone.html();
                    //$($(el).find("script[type ='text/x-kendo-template']")).attr("id", attrs.templateType + "-editor");
                    //$($(el).find("script[type ='text/x-kendo-template']").find("div[class='kendotemplateInclude']")).html(templateData);
                    //$compile($($(el).find("script[type ='text/x-kendo-template']").find("div[class='kendotemplateInclude']")).contents())(innerScope);


                    var template = '<script type="text/x-kendo-template" id="' + attrs.templateType + '"-editor">' + clone.html() + '</script>';
                    $(el).append($compile(template)(scope));
                    //$(el).append(template);
                    $compile($(el).contents())(scope);

                    console.log("chan");
                });
            }
        }*/
    };
}]);