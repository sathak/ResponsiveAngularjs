(function () {
    var Utilities = (function () {
        function Utilities($window) {
            this.$window = $window;
            //this.globalsService = globalsService;
            var that = this;
            var pleaseWaitDiv = angular.element('<div class="modal hide fade in" id="globalPleaseWaitDialog" data-backdrop="static" data-keyboard="false">' +
                '  <div class="modal-dialog">' +
                '    <div class="modal-content">' +
                '      <div class="modal-header">' +
                '         <h1>Processing...</h1>' +
                '      </div>' +
                '      <div class="modal-body" id="globallPleaseWaitDialogBody">' +
                '         <div class="progress progress-striped active">' +
                '           <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
                '           </div>' +
                '         </div>' +
                '        <div class="progress-bar progress-striped active"><div class="bar" style="width: 100%;"></div></div>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>');
            var messageDiv = angular.element('<div class="modal hide fade in" id="globalMessageDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="true">' +
                '  <div class="modal-dialog">' +
                '    <div class="modal-content">' +
                '      <div class="modal-header">' +
                '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '        <h4 class="modal-title"></h4>' +
                '      </div>' +
                '      <div class="modal-body">' +
                '      </div>' +
                '      <div class="modal-footer">' +
                '       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>');
            var resize = function (event) {
                var dialog = angular.element('#' + event.data.name + ' .modal-dialog');
                dialog.css('margin-top', (angular.element(that.$window).height() - dialog.height()) / 2 - parseInt(dialog.css('padding-top')));
                resizeHtmlDialog(dialog);
            };
            var animate = function (event) {
                var dialog = angular.element('#' + event.data.name + ' .modal-dialog');
                dialog.css('margin-top', 0);
                var margin = (angular.element(that.$window).height() - dialog.height()) / 2 - parseInt(dialog.css('padding-top'));
                if (margin < 0) {
                    margin = 0;
                }
                dialog.animate({ 'margin-top': margin }, 'fast', function () {
                    if (event.data.name === 'globalMessageDialog') {
                        resizeHtmlDialog(messageDiv.find('.modal-body'));
                    }
                });
                pleaseWaitDiv.off('shown.bs.modal', animate);
            };
            this.showPleaseWait = function () {
                angular.element($window).on('resize', null, { name: 'globalPleaseWaitDialog' }, resize);
                pleaseWaitDiv.on('shown.bs.modal', null, { name: 'globalPleaseWaitDialog' }, animate);
                pleaseWaitDiv.modal();
            };
            this.hidePleaseWait = function () {
                pleaseWaitDiv.modal('hide');
                angular.element($window).off('resize', resize);
            };
            var resizeHtmlDialog = function (element) {
                var height = angular.element(that.$window).height() * 0.8;
                var width = angular.element(that.$window).width() * 0.8;
                messageDiv.find('.modal-dialog').css('width', width.toString() + 'px');
                messageDiv.find('.modal-dialog').css('height', height.toString() + 'px');
                var dialog = angular.element('#globalMessageDialog .modal-dialog');
                var margin = (angular.element(that.$window).height() - dialog.height()) / 2 - parseInt(dialog.css('padding-top'));
                console.log(margin);
                var frame = element.find('iframe');
                if (frame.length) {
                    frame.attr("width", width - 100);
                    frame.attr("height", height - 100 - parseInt(angular.element('.modal-dialog').css('margin-top')) / 2);
                }
            };
            this.showMessage = function (content, isHtml, buttons, header) {
                angular.element($window).on('resize', null, { name: 'globalMessageDialog' }, resize);
                if (isHtml) {
                    var element = angular.element(content);
                    messageDiv.find('.modal-body').html(element);
                    resizeHtmlDialog(element);
                }
                else {
                    messageDiv.find('.modal-dialog').css('width', '');
                    messageDiv.find('.modal-dialog').css('height', '');
                    messageDiv.find('.modal-body').text(content);
                }
                messageDiv.on('shown.bs.modal', null, { name: 'globalMessageDialog' }, animate);
                if (buttons) {
                    messageDiv.find('.modal-header').children().remove('button');
                    var footer = messageDiv.find('.modal-footer');
                    footer.empty();
                    angular.forEach(buttons, function (button) {
                        var newButton = angular.element('<button type="button" class="btn"></button>');
                        newButton.text(button.label);
                        if (button.mehtod) {
                            newButton.click(function () {
                                messageDiv.modal('hide');
                                button.mehtod();
                            });
                        }
                        else {
                            newButton.click(function () {
                                messageDiv.modal('hide');
                            });
                        }
                        footer.append(newButton);
                    });
                }
                else {
                    messageDiv.find('.modal-header').html('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"></h4>');
                    messageDiv.find('.modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
                }
                messageDiv.find('.modal-title').text((header || ''));
                messageDiv.modal();
            };
        }
        return Utilities;
    }());

    angular.module('app.core')
    .factory('utilities', ['$window', function ($window) {
        return new Utilities($window);
    }]);
})();
