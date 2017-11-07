(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/404/404.html',
    '<div id="site" class="clearfix">\n' +
    '\n' +
    '\n' +
    '    <h2>Page Not Found</h2>\n' +
    '    <div class="userPrompt">\n' +
    '       \n' +
    '        <img src="Content/layout/img/404.jpg" />\n' +
    '        <div>\n' +
    '            <p>Sorry, we can\'t find that page! It might be an old link or it might have been moved.</p>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/changepassword/changepassword.html',
    '<!--Pagebar-->\n' +
    '<navcon-pagebar breadcrumbs="vm.breadcrumbs"></navcon-pagebar>\n' +
    '<!--Pagebar-->\n' +
    '<!--content-->\n' +
    '<div class="row">\n' +
    '    <!--changepassword-->\n' +
    '    <div class="col-md-5">\n' +
    '        <navcon-portlet title="Change Password" navcon-data="vm" class="box blue-hoki" icon="fa fa-cogs" tools-disp="" tools-collapse="false" is-title="false">\n' +
    '            <navcon-form navcon-data="vm" footer=\'S\' field-data="vm.changePasswordFields" type="changePassword">\n' +
    '                <div class="form-group row">\n' +
    '                    <navcon-field class="col-md-10 col-md-push-1" field-key="OldPassword"></navcon-field>\n' +
    '                </div>\n' +
    '                <div class="form-group row">\n' +
    '                    <navcon-field class="col-md-10 col-md-push-1" field-key="NewPassword"></navcon-field>\n' +
    '                </div>\n' +
    '                <div class="form-group row">\n' +
    '                    <navcon-field class="col-md-10 col-md-push-1" field-key="ConfirmPassword"></navcon-field>\n' +
    '                </div>\n' +
    '            </navcon-form>\n' +
    '        </navcon-portlet>\n' +
    '    </div>\n' +
    '    <!--changepassword-->\n' +
    '</div>\n' +
    '<!--content-->\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/dashboard/dashboardTemplate.html',
    '<div class="row">\n' +
    '    <div class="col-md-12 col-sm-12">\n' +
    '        <navcon-portlet title="" navcon-data="vm" class="" icon="" type="" tools-disp="">\n' +
    '            <!-- <navcon-dashboard navcon-data="vm" page-config="pageConfig"></navcon-dashboard>-->\n' +
    '        </navcon-portlet>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/delete/delete.html',
    '<navcon-form navcon-data="vm" field-data="deleteRemarksSubmitFields" footer=\'\' type="deleteRemarks"\n' +
    '             form-manage="formManage" read-only="readonly" ng-if="deleteRemarksSubmitFields != undefined">\n' +
    '    <div class="form-group row" style="padding:5px;">\n' +
    '        <navcon-field field-key="Remarks" label-class="col-md-2" field-class="col-md-8"></navcon-field>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="form-grow row">\n' +
    '        <navcon-field field-key="ITARWarning" label-class="" field-class="col-md-push-2 col-md-8 IncreaseWidth"></navcon-field>\n' +
    '    </div>\n' +
    '\n' +
    '    <br/>\n' +
    '    <br/>\n' +
    '    <br/>\n' +
    '\n' +
    '    <div class="row text-center">\n' +
    '        <navcon-button icon="fa fa-thumbs-o-up" class="btn btn-success no-margin-right" text="Yes . I am sure"\n' +
    '                       ng-disabled="!itarwarning" ng-click="save(\'delete\',deleteRemarksSubmitFields)"></navcon-button>\n' +
    '        <navcon-button icon="fa fa-stop" class="btn btn-info btn-cancel no-margin-right" text="Cancel"\n' +
    '                       ng-click="cancel(\'DeleteRemarks\')"></navcon-button>\n' +
    '    </div>\n' +
    '\n' +
    '</navcon-form>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/login/login.html',
    '<style>\n' +
    '    html, body {\n' +
    '        height: 100% !important;\n' +
    '    }\n' +
    '\n' +
    '    .pageContainer {\n' +
    '        bottom: 10px;\n' +
    '        margin-top: 10% !important;\n' +
    '    }\n' +
    '\n' +
    '\n' +
    '    .page-content {\n' +
    '        padding: 0;\n' +
    '        height: 100% !important;\n' +
    '        overflow: hidden;\n' +
    '    }\n' +
    '\n' +
    '    #pagecontent {\n' +
    '        margin: 0;\n' +
    '        padding: 0px !important;\n' +
    '    }\n' +
    '\n' +
    '    #pagewrapper {\n' +
    '        height: 100% !important;\n' +
    '    }\n' +
    '\n' +
    '    #loginDiv {\n' +
    '        background-image: linear-gradient(to top, rgb(172, 203, 238) 0%, rgb(231, 240, 253) 100%);\n' +
    '        overflow: auto;\n' +
    '    }\n' +
    '\n' +
    '    i {\n' +
    '        color: #a8a8a8;\n' +
    '    }\n' +
    '\n' +
    '    .fpwd > a {\n' +
    '        color: #fff;\n' +
    '    }\n' +
    '\n' +
    '    .field-group > input {\n' +
    '        height: 50px;\n' +
    '        font-size: 20px;\n' +
    '        font-family: \'loginBold\';\n' +
    '    }\n' +
    '\n' +
    '    .btncolor {\n' +
    '        padding: 8px;\n' +
    '        font-size: 20px;\n' +
    '        width: 150px;\n' +
    '        float: right;\n' +
    '        border-radius: 5px !important;\n' +
    '    }\n' +
    '\n' +
    '    .fontLetter {\n' +
    '        font-size: 20px;\n' +
    '    }\n' +
    '\n' +
    '    .ssoerror {\n' +
    '        text-align: center;\n' +
    '        font-size: 24px;\n' +
    '        color: red;\n' +
    '    }\n' +
    '\n' +
    '    .ssoinprogress {\n' +
    '        text-align: center;\n' +
    '        font-size: 24px;\n' +
    '        color: green;\n' +
    '    }\n' +
    '\n' +
    '    #footer {\n' +
    '        position: relative;\n' +
    '        right: 0;\n' +
    '        bottom: 0;\n' +
    '        left: 0;\n' +
    '        padding: 1rem;\n' +
    '        text-align: center;\n' +
    '    }\n' +
    '\n' +
    '    #mainview {\n' +
    '        padding: 0 !important;\n' +
    '    }\n' +
    '\n' +
    '    .modal {\n' +
    '        max-width: 750px !important;\n' +
    '        transform: translate(25%);\n' +
    '    }\n' +
    '\n' +
    '    .imgLogo {\n' +
    '        width: auto;\n' +
    '    }\n' +
    '\n' +
    '    #loginDiv .modal-header {\n' +
    '        background-color: #4f5390 !important;\n' +
    '    }\n' +
    '\n' +
    '    .modal-content {\n' +
    '        border: none;\n' +
    '    }\n' +
    '\n' +
    '    @media only screen and (max-width: 991px) {\n' +
    '        .modal {\n' +
    '            max-width: 750px !important;\n' +
    '            transform: translate(0%);\n' +
    '        }\n' +
    '    }\n' +
    '</style>\n' +
    '\n' +
    '<div id="loginDiv" style="height:100%;width:100%" class="col-md-12 col-sm-12">\n' +
    '    <div >\n' +
    '        <div style="padding-top:10px;">\n' +
    '            <a href="">\n' +
    '                <img class="imgLogo" src="../../Assets/images/companylogo.png" style="padding: 0px 5px 0px 5px;" />\n' +
    '            </a>\n' +
    '        </div>\n' +
    '        <div class="col-md-4 col-sm-4"></div>\n' +
    '        <div class="col-md-4 col-sm-4"></div>\n' +
    '    </div>\n' +
    '    <div class="clearfix"></div>\n' +
    '    <!-- Begin page content -->\n' +
    '    <div class="pageContainer col-md-12 col-sm-12">\n' +
    '        <navcon-form navcon-data="vm" footer=\'\' field-data="vm.loginFields" type="loginPage">\n' +
    '            <center>\n' +
    '                <div class="center-block" style="max-width:400px;">\n' +
    '                    <div class="modal-dialog" style="margin-bottom:0">\n' +
    '                        <h3 style="font-family: \'loginBold\'; text-transform: uppercase; letter-spacing: 25px;text-align:center; font-size: 60px; color: #4f5390;">RMS</h3>\n' +
    '                        <div class="modal-content">\n' +
    '                            <div class="modal-header">\n' +
    '                                <h3 class="modal-title">LOGIN</h3>\n' +
    '                            </div>\n' +
    '                            <div class="modal-body">\n' +
    '\n' +
    '                                <fieldset>\n' +
    '                                    <div class="form-group row">\n' +
    '                                        <!--<label class="loginicon" style="z-index:99"><i class="fa fa-user" style="z-index:99"></i></label>-->\n' +
    '                                        <div class="inner-addon left-addon">\n' +
    '                                            <i class="glyphicon fa fa-user" style="z-index:99; font-size: 20px;"></i>\n' +
    '                                            <navcon-field class="col-md-12" field-key="username" login-enter="vm.enterKey()" style="float:left;"></navcon-field>\n' +
    '                                        </div>\n' +
    '\n' +
    '\n' +
    '                                    </div>\n' +
    '                                    <div class="form-group row">\n' +
    '\n' +
    '                                        <div class="inner-addon left-addon">\n' +
    '                                            <i class="glyphicon fa fa-lock" style="z-index:99; font-size: 20px;"></i>\n' +
    '                                            <navcon-field class="col-md-12 inner-addon left-addon" field-key="userpassword" login-enter="vm.enterKey()"></navcon-field>\n' +
    '                                        </div>\n' +
    '\n' +
    '                                    </div>\n' +
    '\n' +
    '                                    <div class="form-group row" style="clear:both;padding-top:20px;padding-right:5px;padding-bottom:12px;">\n' +
    '\n' +
    '                                        <div style="float:right;">\n' +
    '                                            <navcon-button icon="glyphicon" text="Login" class="col-md-12 warningLogin" ng-click="vm.login()" custom-class="btn login-button btn-group-lg btn-block btncolor"></navcon-button>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </fieldset>\n' +
    '\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="clearfix"></div>\n' +
    '                <div id="footer">\n' +
    '                    <div class="container text-center">\n' +
    '                        <p>\n' +
    '                            &copy; <a href="#" style="color: #4f5390;">NAVCON Aerospace. All rights reserved. </a>\n' +
    '                            <a href=""  style="color: #4f5390;">Privacy policy</a>\n' +
    '                        </p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </center>\n' +
    '\n' +
    '            <div class="ssoinprogress" ng-if="vm.SSOProgress">Login in progress.....</div>\n' +
    '            <div class="ssoerror">{{vm.ssoError}}</div>\n' +
    '        </navcon-form>\n' +
    '    </div>\n' +
    '\n' +
    '    \n' +
    '</div>\n' +
    '\n' +
    '<navcon-modal navcon-data="this" title="ITAR Warning" icon="" id="warning" footer="">\n' +
    '    <div style="width:100%;height:100%;margin: 0px; padding:0px" class="col-md-12">\n' +
    '        <div style="font-size:16px;" class="col-md-8">\n' +
    '            <!--<h4 style="font-weight: bold">ITAR Warning!</h4>-->\n' +
    '            <p>I confirm that any information I upload does not violate the security classifications approved for this site and network.</p>\n' +
    '            <p>I further confirm that the content is not technical data, as defined by <b> International Traffic in Arms Regulations (ITAR)</b> or technology, as defined by <b> Export Administration Regulations (EAR)</b>.</p>\n' +
    '        </div>\n' +
    '        <div style="width: 25%;margin: 56px -15px 0px;" class="col-md-4">\n' +
    '            <i class="fa fa-warning" style="font-size: 140px;color:#da4f49"></i>\n' +
    '        </div>\n' +
    '        <!--<div style="width: 25%; margin: 56px 0px 0px; float: right; padding: 10px;" class="col-lg-8">\n' +
    '            <i class="fa fa-warning" style="font-size: 140px;color:#da4f49"></i>\n' +
    '        </div>\n' +
    '        <div style="width:70%;margin: 0px; padding:0px;float:left;padding-top: 10px;padding-left: 3%;font-size: 16px;text-align: justify;" class="col-lg-4">\n' +
    '            <h4 style="font-weight: bold">ITAR Warning!</h4>\n' +
    '            <p>I confirm that any information I upload does not violate the security classifications approved for this site and network.</p>\n' +
    '            <p>I further confirm that the content is not technical data, as defined by <b> International Traffic in Arms Regulations (ITAR)</b> or technology, as defined by <b> Export Administration Regulations (EAR)</b>.</p>\n' +
    '\n' +
    '        </div>-->\n' +
    '    </div>\n' +
    '    <div class="form-group row">&nbsp;</div>\n' +
    '    <div class="col-md-12 text-center" style="margin-top: 10px;text-align: center;">\n' +
    '        <navcon-button icon="fa fa-unlock" aria-hidden="true" class="btn btn-success" text="I Agree, Login" ng-click="vm.login()" style="width: 200px;border:none !important"></navcon-button>\n' +
    '        <navcon-button icon="fa fa-lock" aria-hidden="true" class="btn btn-danger" text="Logout" ng-click="vm.logout()" style="width: 200px;margin-left:0px !important;" data-dismiss="modal"></navcon-button>\n' +
    '\n' +
    '        <!--<a href="#" icon="fa fa-sign-in" class="btn btn-success" aria-hidden="true" ng-click="vm.login()" style="width: 200px">I Agree, Login</a>-->\n' +
    '        <!--<a href="#" class="btn btn-danger" aria-hidden="true" ng-click="vm.logout()" data-dismiss="modal" style="width: 200px">Logout</a>-->\n' +
    '    </div>\n' +
    '</navcon-modal>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/photo/egPhotoUploader.html',
    '<form name="newPhotosForm" role="form" enctype="multipart/form-data" ng-disabled="appStatus.busy || photoManagerStatus.uploading">\n' +
    '    <div class="form-group" ng-hide="hasFiles">\n' +
    '        <label for="newPhotos">select and upload new photos</label>\n' +
    '        <input type="file" id="newPhotos" class="uploadFile" accept="image/*" eg-files="photos" has-files="hasFiles" multiple>\n' +
    '    </div>\n' +
    '    <div class="form-group" ng-show="hasFiles && !photoManagerStatus.uploading">\n' +
    '        <ul class="list-inline">\n' +
    '            <li><strong>files:</strong></li>\n' +
    '            <li ng-repeat="photo in photos"> {{photo.name}}</li>\n' +
    '        </ul>\n' +
    '        <input class="btn btn-primary" type="button" eg-upload="upload(photos)" value="upload">\n' +
    '        <input class="btn btn-warning" type="reset" value="cancel" />\n' +
    '    </div>\n' +
    '    <div class="form-group" ng-show="photoManagerStatus.uploading">\n' +
    '        <p class="help-block">uploading</p>\n' +
    '    </div>\n' +
    '</form>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/photo/photos.html',
    '<div ng-cloak>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-12">\n' +
    '            <h3>{{vm.title}}</h3>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-9">\n' +
    '            <ul class="list-group">\n' +
    '                <li class="list-group-item list-group-item-info active">\n' +
    '                    <div class="row">\n' +
    '                        <div class="col-lg-5 col-md-5 col-sm-11 col-xs-10">name</div>\n' +
    '                        <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">size (kb)</div>\n' +
    '                        <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">created on</div>\n' +
    '                        <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">modified on</div>\n' +
    '                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-2"></div>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="list-group-item" ng-show="vm.photos.length === 0" ng-mouseenter="vm.setPreviewPhoto()">no photos</li>\n' +
    '                <li ng-repeat="photo in vm.photos" class="list-group-item" ng-mouseenter="vm.setPreviewPhoto(photo)" ng-mouseleave="vm.setPreviewPhoto()">\n' +
    '                    <div class="row">\n' +
    '                        <div class="col-lg-5 col-md-5 col-sm-11 col-xs-10 wraptext">{{photo.name}}</div>\n' +
    '                        <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">{{photo.size}}</div>\n' +
    '                        <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">{{photo.created | date: short}}</div>\n' +
    '                        <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">{{photo.modified | date: short}}</div>\n' +
    '                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-2">\n' +
    '                            <button type="button" class="btn btn-xs btn-danger" ng-click="vm.remove(photo)">\n' +
    '                                <span class="glyphicon glyphicon-remove"></span>\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <eg-photo-uploader></eg-photo-uploader>\n' +
    '        </div>        \n' +
    '        <div class="col-md-3 hidden-sm hidden-xs" style="height: 150px; width: 150px; margin-bottom: 5px;">\n' +
    '            <img ng-src="album/{{vm.previewPhoto.name}}" style="max-height: 150px" ng-show="vm.previewPhoto" class="img-responsive" alt="vm.previewPhoto.name" />\n' +
    '        </div>            \n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-9">\n' +
    '            <eg-app-status></eg-app-status>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/rolemanagement/rolemanagement.html',
    '\n' +
    '\n' +
    '<div class="row">\n' +
    '    <div class="col-md-12">\n' +
    '        <navcon-portlet title="Role Management" navcon-data="vm" class="" icon="" type="rolemanagement" tools-disp="">\n' +
    '            <navcon-kendo-table table-settings="vm.roleManagementTable" navcon-data="vm" type="rolemanagement" fields="vm.roleManagementFields"></navcon-kendo-table>\n' +
    '\n' +
    '            <navcon-kendo-schedule calendar-setting="vm.planYearCalender" navcon-data="vm" type="Plan" fields="vm.roleManagementFields"></navcon-kendo-schedule>\n' +
    '\n' +
    '            <!--<navcon-table table-settings="vm.roleManagementTable" type="rolemanagement" navcon-data="vm" css-class="rowPointer"></navcon-table>\n' +
    '            <navcon-button class="btn btn-primary center" icon="fa fa-plus" text="Add New Role" ng-if="vm.rights.Add" ng-click="vm.showHide(\'Role\',\'add\')"></navcon-button>\n' +
    '            <div class="form-group row">\n' +
    '                &nbsp;\n' +
    '            </div>\n' +
    '            <div class="pull-right statusdiv" style="display: block;" ng-if="vm.readOnly">\n' +
    '                <ul class="nav navbar-right panel_toolbox" style="margin-top: 0px !important;">\n' +
    '                    <li data-toggle="tooltip" title="Edit" data-original-title="Edit" ng-if="vm.rights.Edit && !vm.isEdit">\n' +
    '                        <a class="collapse-link" ng-click="vm.edit();">\n' +
    '                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <li data-toggle="tooltip" title="History" data-original-title="History" ng-if="vm.showHistory">\n' +
    '                        <a class="close-link" ng-click="HistoryChanges()"><i class="fa fa-history"></i></a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '            <div class="collapse center" id="Role">\n' +
    '                <div class="form-group row">\n' +
    '                    &nbsp;\n' +
    '                </div>\n' +
    '                <div class="well">\n' +
    '                    <navcon-form navcon-data="vm" footer=\'\' field-data="vm.roleManagementFields" type="rolemanagement" form-manage="vm.formManage" ng-if="vm.roleManagementFields!=undefined" read-only="vm.readOnly">\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="RoleName"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row" ng-hide="vm.isSave">\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="AddExistingSystemRole"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row" ng-if="vm.showExistingRoles">\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="ExistingSystemRoleId"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="RoleStatus"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="Remarks"></navcon-field>\n' +
    '                        </div>\n' +
    '                    </navcon-form>\n' +
    '                </div>\n' +
    '                <div class="form-group row; col-md-12 text-center">\n' +
    '                    <div class="form-group row">\n' +
    '                        &nbsp;\n' +
    '                    </div>\n' +
    '                    <navcon-button class="btn btn-danger center" icon="fa fa-trash" text="Delete" ng-if="!vm.readOnly && vm.rights.Delete" ng-click="vm.delete()" ng-hide="vm.isDelete"></navcon-button>\n' +
    '                    <navcon-button class="btn btn-primary center" icon="fa fa-floppy-o" text="Save" ng-click="vm.formManage.save(\'Save\')" ng-hide="vm.isSave" ng-disabled="!itarwarning"></navcon-button>\n' +
    '                    <navcon-button class="btn btn-primary center" icon="fa fa-floppy-o" ng-if="!vm.readOnly && vm.rights.Edit" text="Update" ng-click="vm.formManage.save(\'Update\')" ng-hide="vm.isUpdate" ng-disabled="!itarwarning"></navcon-button>                    \n' +
    '                    <navcon-button class="btn btn-warning center" icon="fa fa-stop" text="Cancel" ng-if="!vm.readOnly" ng-click="vm.cancel()" ng-hide="vm.isCancel"></navcon-button>\n' +
    '                </div>\n' +
    '            </div>-->\n' +
    '        </navcon-portlet>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<navcon-modal navcon-data="vm" field-data="" title="Role" icon="" id="RoleDeleteModal" footer=\'Yes|No\' size="navcon-modal-sm" overflow="hide">\n' +
    '    <navcon-form navcon-data="vm" footer=\'\' field-data="" type="RoleDeleteModal" size="navcon-modal-xs">\n' +
    '        <div>\n' +
    '            <h2 style="text-align:center">Are you sure you want to delete this role?</h2>\n' +
    '        </div>\n' +
    '        <hr />\n' +
    '        <button style="float:right;" type="button" class="btn btn-danger" ng-click="vm.closePopup(\'RoleDeleteModal\',\'No\')">No</button>\n' +
    '        <button style="float:right;" type="button" class="btn btn-success" ng-click="vm.closePopup(\'RoleDeleteModal\',\'Yes\')">Yes</button>\n' +
    '    </navcon-form>\n' +
    '</navcon-modal>\n' +
    '\n' +
    '<!--History With Data-->\n' +
    '<navcon-modal navcon-data="this" title="{{HistoryTitle}}" icon="fa fa-info-circle" id="review" footer="" size="navcon-modal-xs">\n' +
    '    <navcon-form navcon-data="this" field-data="vm.roleManagementHistoryFields" footer=\'\' type="review" form-manage="formManage" ng-if="vm.roleManagementHistoryFields!=undefined">\n' +
    '        <div class="form-group row">\n' +
    '            <navcon-history navcon-data="this" ng-if="isHistory"></navcon-history>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-if="historyState==\'Save\'">\n' +
    '            <navcon-field field-key="HistoryRemarks" label-class="col-md-2" field-class="col-md-8"></navcon-field>\n' +
    '        </div>\n' +
    '        <div class="form-grow row" style="padding:5px;" ng-if="historyState==\'Save\'">\n' +
    '            <navcon-field field-key="ITARWarning" label-class="" field-class="col-md-push-1 col-md-10 IncreaseWidth"></navcon-field>\n' +
    '        </div>\n' +
    '        <br />\n' +
    '        <div class="form-group row" style="text-align:right;" ng-if="historyState==\'Save\'">\n' +
    '            <navcon-button icon="fa fa-floppy-o" class="btn btn-primary no-margin-left" text="Save" ng-click="saveChanges();" ng-disabled="!historyItarWarning"></navcon-button>\n' +
    '            <navcon-button icon="fa fa-stop" class="btn btn-default no-margin-right" text="Cancel" ng-click="cancel(\'review\');"></navcon-button>\n' +
    '        </div>\n' +
    '    </navcon-form>\n' +
    '</navcon-modal>\n' +
    '\n' +
    '<!--History With No-Data-->\n' +
    '<navcon-modal navcon-data="this" title="{{HistoryTitle}}" icon="fa fa-info-circle" id="notFound" footer="" size="navcon-modal-xs">\n' +
    '    <div class="form-group row">\n' +
    '        <h4>No Changes Found</h4>\n' +
    '    </div>\n' +
    '</navcon-modal>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/tiles/tiles.html',
    '<!-- BEGIN PAGE HEADER-->\n' +
    '<div class="page-bar">\n' +
    '    <ul class="page-breadcrumb">\n' +
    '        <li>\n' +
    '            <i class="fa fa-pencil-square-o"></i>\n' +
    '            <a href="#/{{vm.menu}}">{{vm.title}}</a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '    <div class="page-toolbar">\n' +
    '        <div class="btn-group pull-right">\n' +
    '            <button type="button" class="btn btn-fit-height grey-salt dropdown-toggle" data-toggle="dropdown" dropdown-menu-hover data-delay="1000" data-close-others="true">\n' +
    '                Actions <i class="fa fa-angle-down"></i>\n' +
    '            </button>\n' +
    '            <ul class="dropdown-menu pull-right" role="menu">\n' +
    '                <li>\n' +
    '                    <a href="#">\n' +
    '                        <i class="icon-user"></i> New User\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <a href="#">\n' +
    '                        <i class="icon-present"></i> New Event <span class="badge badge-success">4</span>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <a href="#">\n' +
    '                        <i class="icon-basket"></i> New order\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="divider">\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <a href="#">\n' +
    '                        <i class="icon-flag"></i> Pending Orders <span class="badge badge-danger">4</span>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <a href="#">\n' +
    '                        <i class="icon-users"></i> Pending Users <span class="badge badge-warning">12</span>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<!-- END PAGE HEADER-->\n' +
    '<!-- BEGIN MAIN CONTENT -->\n' +
    '<!-- UI Select Begin -->\n' +
    '<div class="tiles">\n' +
    '    <div ng-repeat = "item in vm.subMenus | filter:{MenuType:1}" ng-class="item.TileClass" ng-hide="vm.menuCheck(item.ConfigName)">\n' +
    '        <a href="#{{item.ConfigName.toLowerCase()}}">\n' +
    '            <div class="tile-body">\n' +
    '                <i ng-class="item.IconClass"></i>\n' +
    '            </div>\n' +
    '            <div class="tile-object">\n' +
    '                <div class="name">{{item.text}}</div>\n' +
    '                <div class="number">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </a>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<!-- UI Select End -->\n' +
    '<!-- END MAIN CONTENT -->\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/useraccessrights/useraccessrights.html',
    '\n' +
    '<div class="row">\n' +
    '    <div class="col-md-12">\n' +
    '        <navcon-portlet title="Security" navcon-data="vm" class="" icon="" type="userAccessRights" tools-disp="">\n' +
    '            <navcon-form navcon-data="vm" footer=\'\' field-data="vm.userAccessRightsFields" type="userAccessRights" form-manage="vm.formManage" ng-if="vm.userAccessRightsFields!=undefined">\n' +
    '                <div class="form-group row">\n' +
    '                    <input type="text" id="rightsForm" ng-hide="true" />\n' +
    '                    <navcon-field label-class="col-md-2 col-md-pull-1" field-class="col-md-3 col-md-pull-1" field-key="RoleId"></navcon-field>\n' +
    '                    <navcon-button class="btn btn-success center" icon="fa fa-list" text="Show" ng-click="vm.showRights()"></navcon-button>\n' +
    '                    <navcon-button class="btn btn-primary center" icon="fa fa-undo" text="Reset" ng-click="vm.reset()" ng-if="vm.showReset"></navcon-button>\n' +
    '                </div>\n' +
    '                <div class="pull-right statusdiv" style="display: block;">\n' +
    '                    <ul class="nav navbar-right panel_toolbox" style="margin-top: 0px !important;">                       \n' +
    '                        <li data-toggle="tooltip" title="History" data-original-title="History" ng-if="vm.showHistory">\n' +
    '                            <a class="close-link" ng-click="HistoryChanges()"><i class="fa fa-history"></i></a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <div class="collapse center" id="User">\n' +
    '                    <div class="">\n' +
    '                        <navcon-tree field-set="userAccessRightsFields" options="options" navcon-data="vm" type="userAccessRights" tree-settings="vm.userAccessRightsTree" is-expand="true">\n' +
    '                        </navcon-tree>\n' +
    '                    </div>\n' +
    '                    <div class="form-group row; col-md-12 text-center">\n' +
    '                        <div class="form-group row">\n' +
    '                            &nbsp;\n' +
    '                        </div>\n' +
    '                        <navcon-button class="btn btn-primary center" icon="fa fa-floppy-o" text="Save" ng-if="!vm.isSave && vm.rights.Edit" ng-click="vm.formManage.save(\'Save\')"></navcon-button>\n' +
    '                        <navcon-button class="btn btn-primary center" icon="fa fa-floppy-o" text="Update" ng-if="!vm.isUpdate && vm.rights.Edit" ng-click="vm.formManage.save(\'Update\')"></navcon-button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </navcon-form>\n' +
    '        </navcon-portlet>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<!--History With Data-->\n' +
    '<navcon-modal navcon-data="this" title="{{HistoryTitle}}" icon="fa fa-info-circle" id="review" footer="" size="navcon-modal-xs">\n' +
    '    <navcon-form navcon-data="this" field-data="vm.userAccessRightsHistoryFields" footer=\'\' type="review" form-manage="formManage" ng-if="vm.userAccessRightsHistoryFields!=undefined">\n' +
    '        <div class="form-group row">\n' +
    '            <navcon-history navcon-data="this" ng-if="isHistory"></navcon-history>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-if="historyState==\'Save\'">\n' +
    '            <navcon-field field-key="HistoryRemarks" label-class="col-md-2" field-class="col-md-8"></navcon-field>\n' +
    '        </div>\n' +
    '        <div class="form-grow row" style="padding:5px;" ng-if="historyState==\'Save\'">\n' +
    '            <navcon-field field-key="ITARWarning" label-class="" field-class="col-md-push-1 col-md-10 IncreaseWidth"></navcon-field>\n' +
    '        </div>\n' +
    '        <br />\n' +
    '        <div class="form-group row" style="text-align:right;" ng-if="historyState==\'Save\'">\n' +
    '            <navcon-button icon="fa fa-floppy-o" class="btn btn-primary no-margin-left" text="Save" ng-click="saveChanges();" ng-disabled="!historyItarWarning"></navcon-button>\n' +
    '            <navcon-button icon="fa fa-stop" class="btn btn-default no-margin-right" text="Cancel" ng-click="cancel(\'review\');"></navcon-button>\n' +
    '        </div>\n' +
    '    </navcon-form>\n' +
    '</navcon-modal>\n' +
    '\n' +
    '<!--History With No-Data-->\n' +
    '<navcon-modal navcon-data="this" title="{{HistoryTitle}}" icon="fa fa-info-circle" id="notFound" footer="" size="navcon-modal-xs">\n' +
    '    <div class="form-group row">\n' +
    '        <h4>No Changes Found</h4>\n' +
    '    </div>\n' +
    '</navcon-modal>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/userimport/userimport.html',
    '\n' +
    '\n' +
    '<div class="row">\n' +
    '    <div class="col-md-12">\n' +
    '        <navcon-portlet title="User Import" navcon-data="vm" class="" icon="" type="userimport" tools-disp="">\n' +
    '            <navcon-form navcon-data="vm" footer=\'\' field-data="vm.userImportFields" type="userimport" ng-if="vm.userImportFields!=undefined" form-manage="vm.formManage">\n' +
    '                <div class="form-group row">\n' +
    '                    &nbsp;\n' +
    '                </div>\n' +
    '                <!--<div class="form-group row">\n' +
    '                    <navcon-field label-class="col-md-1" field-class="col-md-3" field-key="ProjectId"></navcon-field>\n' +
    '                    <navcon-field label-class="col-md-2" field-class="col-md-3" field-key="BaseId"></navcon-field>\n' +
    '                </div>\n' +
    '                <div class="form-group row">\n' +
    '                    &nbsp;\n' +
    '                </div>-->\n' +
    '                <div class="form-group row">\n' +
    '                    <navcon-field label-class="col-md-2" field-class="col-md-2" field-key="fuattachments"></navcon-field>\n' +
    '                </div>\n' +
    '                <div class="form-group row; col-md-12 text-center">\n' +
    '                    <navcon-button class="btn btn-success center" icon="fa fa-file" text="Import" ng-click="vm.process()"></navcon-button>\n' +
    '                    <navcon-button class="btn btn-primary center" icon="fa fa-download" text="Download Excel Format" ng-click="vm.download()"></navcon-button>\n' +
    '                </div>\n' +
    '\n' +
    '            </navcon-form>\n' +
    '        </navcon-portlet>\n' +
    '        <div class="collapse center" id="ResultsTable">\n' +
    '            <navcon-portlet title="User Import" navcon-data="vm" class="" icon="" type="userimport" tools-disp="">\n' +
    '                <navcon-form navcon-data="vm" footer=\'\' field-data="vm.userImportFields" type="userimport" ng-if="vm.userImportFields!=undefined" form-manage="vm.formManage">\n' +
    '                    <navcon-table table-settings="vm.userImportTable" type="userimport" navcon-data="vm"></navcon-table>\n' +
    '                    <div class="form-group row; col-md-12 text-center">\n' +
    '                        <div class="form-group row">\n' +
    '                            &nbsp;\n' +
    '                        </div>\n' +
    '                        <navcon-button class="btn btn-warning center" icon="fa fa-stop" text="Close" ng-click="vm.close()"></navcon-button>\n' +
    '                    </div>\n' +
    '\n' +
    '                </navcon-form>\n' +
    '            </navcon-portlet>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/usermanagement/usermanagement.html',
    '<div class="row">\n' +
    '    <div class="col-md-12">\n' +
    '        <navcon-portlet title="Sample Kendo Fields" navcon-data="vm" class="" icon="" type="kendofields" tools-disp="">\n' +
    '            <div class="center" id="User">\n' +
    '                <div class="form-group row">\n' +
    '                    &nbsp;\n' +
    '                </div>\n' +
    '                <div class="well">\n' +
    '                    <navcon-form navcon-data="vm" footer=\'\' field-data="vm.kendofieldsFields" type="kendofields" form-manage="vm.formManage" ng-if="vm.kendofieldsFields!=undefined" read-only="vm.readOnly">\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-kendofield label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="BaseId"></navcon-kendofield>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-kendofield label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="DepartmentId"></navcon-kendofield>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="ClockNumber"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="UserName"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="FirstName"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="MiddleName"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="LastName"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="PhoneNumber"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="Email"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-kendofield label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="ProjectUser"></navcon-kendofield>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-kendofield label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="Roles"></navcon-kendofield>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="EDATrained"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3 col-sm-12" field-class="col-md-6 col-sm-12" field-key="UserStatusId"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <!--<div class="form-group row; col-md-12 text-center" ng-hide="vm.isITAR">\n' +
    '                            <navcon-field field-key="ITARWarning" label-class="" field-class="col-md-12 IncreaseWidth"></navcon-field>\n' +
    '                        </div>-->\n' +
    '                    </navcon-form>\n' +
    '                </div>\n' +
    '                <div class="form-group row; col-md-12 text-center">\n' +
    '                    <div class="form-group row">\n' +
    '                        &nbsp;\n' +
    '                    </div>\n' +
    '                    <navcon-button class="btn btn-primary center" icon="fa fa-floppy-o" text="Save" ng-click="vm.formManage.save(\'Save\')" ng-hide="vm.isSave"></navcon-button>\n' +
    '                    <navcon-button class="btn btn-primary center" icon="fa fa-floppy-o" ng-if="!vm.readOnly && vm.rights.Edit" text="Update" ng-click="vm.formManage.save(\'Update\')" ng-hide="vm.isUpdate"></navcon-button>\n' +
    '                    <navcon-button class="btn btn-warning center" icon="fa fa-stop" text="Cancel" ng-if="!vm.readOnly" ng-click="vm.cancel()" ng-hide="vm.isCancel"></navcon-button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </navcon-portlet>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/userprofile/userprofile.html',
    '<!--<navcon-pagebar breadcrumbs="vm.breadcrumbs"></navcon-pagebar>-->\n' +
    '<div class="row">\n' +
    '    <div class="col-md-12">\n' +
    '        <navcon-portlet title="My Profile" navcon-data="vm" class="" icon="" type="userprofile" tools-disp="">\n' +
    '            <!--<div class="pull-right statusdiv" style="display: block;" ng-if="!vm.isEdit" >\n' +
    '                <ul class="nav navbar-right panel_toolbox" style="margin-top: 0px !important;">\n' +
    '                    <li data-toggle="tooltip" title="Edit" data-original-title="Edit">\n' +
    '                        <a class="collapse-link" ng-click="vm.edit();">\n' +
    '                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>-->\n' +
    '            <div class="center">\n' +
    '            \n' +
    '                <div class="well">\n' +
    '                    <div class="form-group row">\n' +
    '                        <div class="col-md-6 col-md-push-1">\n' +
    '                            <navcon-form navcon-data="vm" footer=\'\' field-data="vm.userProfileFields" type="userprofile" form-manage="vm.formManage" ng-if="vm.userProfileFields!=undefined" read-only="vm.readOnly">\n' +
    '                                <legend>My Profile</legend>\n' +
    '                                <div class="form-group row">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="ClockNumber"></navcon-field>\n' +
    '                                </div>\n' +
    '                                <div class="form-group row">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="UserName"></navcon-field>\n' +
    '                                </div>\n' +
    '                                <div class="form-group row">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="FirstName"></navcon-field>\n' +
    '                                </div>\n' +
    '                                <div class="form-group row">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="LastName"></navcon-field>\n' +
    '                                </div>\n' +
    '                                <div class="form-group row">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="PhoneNumber"></navcon-field>\n' +
    '                                </div>\n' +
    '                                <div class="form-group row">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="Email"></navcon-field>\n' +
    '                                </div>\n' +
    '                                <div class="form-group row">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="BaseId"></navcon-field>\n' +
    '                                </div>\n' +
    '                                <div class="form-group row">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="DepartmentId"></navcon-field>\n' +
    '                                </div>\n' +
    '                                <div class="form-group row">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="ProjectUser"></navcon-field>\n' +
    '                                </div>\n' +
    '                                <div class="form-group row">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="Roles"></navcon-field>\n' +
    '                                </div>\n' +
    '                                <!--<div class="form-group row; col-md-10 text-center" ng-if="!vm.isUpdate">\n' +
    '                                    <navcon-field field-key="ITARWarning" label-class="" field-class="col-md-12 IncreaseWidth"></navcon-field>\n' +
    '                                </div>-->\n' +
    '                            </navcon-form>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-6">\n' +
    '                            <navcon-form navcon-data="vm" footer=\'\' field-data="vm.userProfileFields" type="userprofile" form-manage="vm.formManage">\n' +
    '                                <!--<div class="form-group row text-center">\n' +
    '                                    <navcon-field field-key="ITARWarning" label-class="" field-class="col-md-12 IncreaseWidth"></navcon-field>\n' +
    '                                </div>-->\n' +
    '                                <div class="form-group row margin-top-20">\n' +
    '                                    <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="img"></navcon-field>\n' +
    '                                </div>\n' +
    '                            </navcon-form>\n' +
    '                            <navcon-form navcon-data="vm" footer=\'\' field-data="vm.changePasswordFields" type="changePassword" form-manage="vm.formManage" ng-if="!vm.SSOStatus">\n' +
    '                                <!--<div class="form-group row">\n' +
    '                                    <navcon-button class="btn btn-primary left" icon="fa fa-key" text="Change Password" ng-click="vm.showPassword()"></navcon-button>\n' +
    '                                </div>-->\n' +
    '                                <div class="panel panel-default">\n' +
    '                                    <div class="panel-heading" ng-click="vm.togglePanel(\'ChangePassword\')">\n' +
    '                                        <h4 class="panel-title collapsed">\n' +
    '                                            <a data-toggle="collapse" href="">Change Password</a>\n' +
    '                                        </h4>\n' +
    '                                    </div>\n' +
    '                                    <div class="panel-body collapse" id="ChangePassword">\n' +
    '                                        <br />\n' +
    '                                        <div class="form-group row">\n' +
    '                                            <navcon-field label-class="col-md-5" field-class="col-md-4" field-key="OldPassword"></navcon-field>\n' +
    '                                        </div>\n' +
    '                                        <div class="form-group row">\n' +
    '                                            <navcon-field label-class="col-md-5" field-class="col-md-4" field-key="NewPassword"></navcon-field>\n' +
    '                                        </div>\n' +
    '                                        <div class="form-group row">\n' +
    '                                            <navcon-field label-class="col-md-5" field-class="col-md-4" field-key="ConfirmPassword"></navcon-field>\n' +
    '                                        </div>\n' +
    '                                        <div class="form-group row; text-center">\n' +
    '                                            <label><b>Note:</b> Password must have minimum 8 and maximum 20 characters with at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character.</label>\n' +
    '                                        </div>\n' +
    '                                        <div class="form-group row; col-md-12 text-center">\n' +
    '                                           <br />\n' +
    '                                            <navcon-button class="btn btn-primary center" icon="fa fa-floppy-o" text="Change Password" ng-click="vm.formManage.save(\'changePassword\')"></navcon-button>\n' +
    '                                            <navcon-button class="btn btn-warning center" icon="fa fa-stop" text="Cancel" ng-click="vm.cancel(\'changePassword\')"></navcon-button>\n' +
    '                                        </div>\n' +
    '\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </navcon-form>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!--<div class="form-group row; col-md-12 text-center">\n' +
    '                    <div class="form-group row">\n' +
    '                        &nbsp;\n' +
    '                    </div>\n' +
    '                    <navcon-button class="btn btn-primary center" icon="fa fa-floppy-o" text="Update" ng-click="vm.formManage.save(\'userprofile\')" ng-if="!vm.isUpdate" ng-disabled="!vm.itarwarning"></navcon-button>\n' +
    '                    <navcon-button class="btn btn-warning center" icon="fa fa-stop" text="Cancel" ng-if="!vm.readOnly && !vm.isCancel" ng-click="vm.cancel(\'userprofile\')"></navcon-button>\n' +
    '                </div>-->\n' +
    '            </div>\n' +
    '        </navcon-portlet>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/news/news.html',
    '<!--<navcon-pagebar breadcrumbs="vm.breadcrumbs"></navcon-pagebar>-->\n' +
    '\n' +
    '<div class="row">\n' +
    '    <div class="col-md-12">\n' +
    '        <navcon-portlet title="Bulletin Management" navcon-data="vm" class="" icon="" type="NewsAnnouncements" tools-disp="">\n' +
    '            <navcon-table table-settings="vm.newsTable" navcon-data="vm" type="NewsAnnouncements" css-class="rowPointer"></navcon-table>\n' +
    '            <navcon-button class="btn btn-primary center" icon="fa fa-plus" text="Add New" ng-click="vm.addNew(\'NewsAnnouncements\')"></navcon-button>\n' +
    '\n' +
    '            <div class="pull-right statusdiv" style="display: block;" ng-if="vm.isEdit">\n' +
    '                <ul class="nav navbar-right panel_toolbox" style="margin-top: 0px !important;">\n' +
    '                    <li data-toggle="tooltip" data-original-title="Edit" ng-if="vm.isEdit" ng-hide="!vm.isSaveHide">\n' +
    '                        <a class="collapse-link" ng-click="vm.edit(\'NewsAnnouncements\');">\n' +
    '                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                    <!--<li data-toggle="tooltip" title="Print" data-original-title="Print">\n' +
    '                        <a class="close-link"><i class="fa fa-print" ng-click="print()"></i></a>\n' +
    '                    </li>-->\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="collapse center" id="NewsAnnouncements">\n' +
    '                <div class="form-group row">\n' +
    '                    &nbsp;\n' +
    '                </div>\n' +
    '                <div class="well">\n' +
    '                    <navcon-form navcon-data="vm" footer=\'\' field-data="vm.newsFields" type="NewsAnnouncements" form-manage="vm.formManage" ng-if="vm.newsFields!=undefined" read-only="vm.readOnly">\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="NewsTitle"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-4" field-key="EffectiveDate"></navcon-field>\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-3" field-key="Important"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="ExpiryDate"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field field-key="fuattachments" class="col-md-offset-2 col-md-8"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="IsPublish"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row">\n' +
    '                            <navcon-field label-class="col-md-3" field-class="col-md-6" field-key="Summary"></navcon-field>\n' +
    '                        </div>\n' +
    '                        <div class="form-group row; col-md-12 text-center" ng-if="!vm.isSaveHide">\n' +
    '                            <navcon-field field-key="ITARWarning" label-class="" field-class="col-md-12 IncreaseWidth"></navcon-field>\n' +
    '                        </div>\n' +
    '                    </navcon-form>\n' +
    '                </div>\n' +
    '                <div class="form-group row; col-md-12 text-center">\n' +
    '                    <div class="form-group row">\n' +
    '                        &nbsp;\n' +
    '                    </div>\n' +
    '                    <navcon-button class="btn btn-primary center" icon="fa fa-floppy-o" text="Save" ng-click="vm.formManage.save(\'NewsAnnouncements\',\'Save\')" ng-hide="vm.isSaveHide" ng-disabled="!vm.itarwarning"></navcon-button>\n' +
    '                    <navcon-button class="btn btn-warning center" icon="fa fa-stop" text="Close" ng-click="vm.cancel(\'NewsAnnouncements\')" ng-if="vm.newsFields.mode.toLowerCase() ===\'save\'" ng-hide="vm.isSaveHide"></navcon-button>\n' +
    '\n' +
    '                    <navcon-button class="btn btn-warning center" icon="fa fa-stop" text="Cancel" ng-click="vm.cancel(\'NewsAnnouncements\')" ng-if="vm.newsFields.mode.toLowerCase() ===\'update\'" ng-hide="vm.isSaveHide"></navcon-button>\n' +
    '\n' +
    '                    <div class="col-md-4 text-right">\n' +
    '                        <navcon-button class="btn btn-danger center" icon="fa fa-trash" text="Delete" ng-click="vm.delete(\'NewsAnnouncements\')" ng-if="vm.newsFields.mode.toLowerCase() ===\'update\'" ng-hide="vm.isSaveHide"></navcon-button>\n' +
    '                    </div>\n' +
    '                </div>                \n' +
    '            </div>\n' +
    '        </navcon-portlet>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<navcon-delete navcon-data="vm" title="Deletion Warning !" class="" icon="fa fa-cogs" footer=\'\' type="NewsAnnouncements" size="navcon-modal-sm">\n' +
    '    <div>\n' +
    '        <h2 style="text-align:center">Are you sure you want to delete this Bulletin Management?</h2>\n' +
    '    </div>\n' +
    '    <hr />\n' +
    '    <button style="float:right;" type="button" class="btn btn-danger" ng-click="vm.tableRowDelete(\'NewsAnnouncements\',\'No\')">No</button>\n' +
    '    <button style="float:right;" type="button" class="btn btn-success" ng-click="vm.tableRowDelete(\'NewsAnnouncements\',\'Yes\')">Yes</button>\n' +
    '</navcon-delete>\n' +
    '\n' +
    '<!--<navcon-modal navcon-data="vm" field-data="" title="Role" icon="" id="newsDeleteModal" footer=\'Yes|No\' size="navcon-modal-sm" overflow="hide">\n' +
    '    <navcon-form navcon-data="vm" footer=\'\' field-data="" type="newsDeleteModal" size="navcon-modal-xs">\n' +
    '        <div>\n' +
    '            <h2 style="text-align:center">Are you sure you want to delete this Bulletin Management?</h2>\n' +
    '        </div>\n' +
    '        <hr />\n' +
    '        <button style="float:right;" type="button" class="btn btn-danger" ng-click="vm.closePopup(\'NewsDeleteModal\',\'No\')">No</button>\n' +
    '        <button style="float:right;" type="button" class="btn btn-success" ng-click="vm.closePopup(\'NewsDeleteModal\',\'Yes\')">Yes</button>\n' +
    '    </navcon-form>\n' +
    '</navcon-modal>-->\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/dashboard/directives/mycountTemplate.html',
    '<div class="row">\n' +
    '    <div ng-repeat="cnt in causesData" class="col-md-2 navcon-dashboardcount-template">\n' +
    '        <div class="row form-row-seperated navcon-dashboardtemplate">\n' +
    '            <div class="col-md-3 navcon-dashboardcount {{\'ndc_\'+$index}}">{{cnt.count}}</div>\n' +
    '            <div class="col-md-9 navcon-dashboard-tile {{\'ndt_\'+$index}}" title="{{cnt.title}}" data-toggle="tooltip" data-original-title="{{cnt.title}}"data-placement="top"><i class="fa fa-clock-o navcon-dashboard-icon"></i>{{cnt.title}}</div>\n' +
    '            <!--<div class="col-md-3 dashboardcount-data text-center">\n' +
    '                <div class="caption navcon-dashboard-count">{{cnt.count}}</div>\n' +
    '            </div>\n' +
    '            <div class="col-md-9 dashboardcount-data">\n' +
    '                <div class="dashboardcount-title"><i class="fa fa-clock-o navcon-dashboard-icon"></i>{{cnt.title}}</div>\n' +
    '                <div class="dashboardcount-icon">\n' +
    '                    <i ng-hide="cnt.ratio===0" class="navcon-dashboard-icon {{cnt.ratioIcon!==null?cnt.ratioIcon : \'fa fa-sort\'}}" style="color:{{cnt.color !== null? cnt.color: \'black\'}} !important;"></i>\n' +
    '                </div>\n' +
    '                <div class="dashboardcount-ratio">\n' +
    '                    <label ng-hide="cnt.ratio===0">{{cnt.ratio}}% {{cnt.ratioTitle}}</label>\n' +
    '                </div>\n' +
    '            </div>-->\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/dashboard/directives/myreportTemplate.html',
    '<navcon-portlet title="{{title}}" navcon-data="this" class="" icon="" type="mySpaceReport" tools-disp="">\n' +
    '    <navcon-report navcon-data="navconData" report-id="reportdiv2" report-source="report.source" report-title="report.title" page="yes"></navcon-report>\n' +
    '</navcon-portlet>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/dashboard/directives/myriskmatrixTemplate.html',
    '<navcon-portlet title="{{title}}" navcon-data="this" class="" icon="" type="myRiskMatrix_{{widgetId}}" tools-disp="" show-caption="true">\n' +
    '    <!--<div class="row" ng-hide="reportList.length <= 1 || !options.filter">\n' +
    '        <div class="col-md-push-6 col-md-6" style="padding-right: 25px;">\n' +
    '            <div id="reportrange_{{widgetId}}" class="pull-right" style="background: #fff; cursor: pointer; padding: 4px 8px; border: 1px solid #ccc">\n' +
    '                <i class="glyphicon glyphicon-calendar fa fa-calendar navcon-dashboard-icon" style="color: green;"></i>\n' +
    '                <span ng-model="chartFilterData"></span>&nbsp;<b class="caret"></b>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>-->\n' +
    '    <div class="form-grow row" ng-if="showRiskMatrixTable">\n' +
    '        <div class="col-md-12" style="padding: 5px;">\n' +
    '            <table class="col-md-12">\n' +
    '                <tr>\n' +
    '                    <th style="border: none;"></th>\n' +
    '                    <th colspan="{{SeverityTable.length}}" style="text-align:center;background-color:#243649;color:#E7E7E7">Severity</th>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <th style="text-align:center;background-color:#243649;color:#E7E7E7">Probability</th>\n' +
    '                    <th style="text-align:center" ng-repeat="item in SeverityTable track by $index">{{item.severity}}</th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="item in riskMatrixData track by $index">\n' +
    '                    <th style="text-align:center">{{item.probability}}</th>\n' +
    '                    <!--<td ng-repeat="itemData in item.list track by $index" ng-show="!readOnly">\n' +
    '                        <select ng-model="riskC" ng-change="changeRiskClass(item,itemData)">\n' +
    '                            <option value="{{riskC}}" ng-selected="itemData.level===riskC.Class" ng-repeat="riskC in riskClasses track by $index">{{riskC.Class}}</option>\n' +
    '                        </select>\n' +
    '                    </td>-->\n' +
    '                    <td ng-repeat="itemData in item.list track by $index" ng-show="readOnly" ng-attr-style="text-align:center;font-weight:bolder;color:{{itemData.color}};background:{{itemData.background}}">\n' +
    '                        <label title="{{itemData.severity}}" ng-attr-style="text-align:center;font-weight:bolder;color:{{itemData.color}};">{{itemData.level}}</label>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</navcon-portlet>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/dashboard/directives/mysummaryTemplate.html',
    '<navcon-portlet title="{{title}}" navcon-data="this" class="" icon="" type="mySpaceSummary_{{summaryId}}" tools-disp="" show-caption="true">\n' +
    '    <div class="dashboard-widget-content summaryTemplate">\n' +
    '        <ul class="list-unstyled timeline widget">\n' +
    '            <li ng-repeat="noteData in data  | orderBy : \'-NewsAnnouncementId\'">\n' +
    '                <div class="block {{\'summaryRow_\'+$index}}">\n' +
    '                    <div>\n' +
    '                        <div style="float:left; padding-right: 10px;" class="profile text-center" ng-hide="noteData.documents==null || noteData.documents==\'\'">\n' +
    '                            <div class="profile_pic">\n' +
    '                                <!--<img src="Content/layout/img/avatar3.jpg" alt="..." class="summaryTemplate-image">-->\n' +
    '                                <!--<img style=\'width:75%;height:45%\' ng-src="{{noteData.ContentType + noteData.img}}" class=\'img img-rounded servimg summaryTemplate-image\' alt=\'Summary\'>-->\n' +
    '                                <!--<img style="width: 170px; height: 110px;" ng-src="{{noteData.ContentType + noteData.img}}" class=\'img img-rounded servimg summaryTemplate-image\' alt=\'Summary\' ng-click="openImage(noteData.NewsTitle,noteData.CreateDate,noteData.UpdatedByName,noteData.Summary)">-->\n' +
    '                                <!--<i class="fa fa-file-image-o" style="font-size:48px;color:black;cursor:pointer;padding:18px;" ng-click="openImage(noteData)"></i>-->\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="block_content">\n' +
    '                        <h2 class="title"> <a ng-style="noteData.Important!=null && noteData.Important==true ? {\'color\':\'red\',\'font-style\':\'italic\',\'font-weight\':\'bold\'} : {}" ng-click="openImage(noteData)">{{noteData.NewsTitle}}</a> </h2>\n' +
    '                        <div class="byline">\n' +
    '                            <span>{{navcon.dateFromUTCToLocal(noteData.CreateDate)}}</span> by\n' +
    '                            <a style="cursor:default;">{{noteData.UpdatedByName}}</a>\n' +
    '\n' +
    '                        </div>\n' +
    '                        <!--<p class="excerpt" style="word-wrap: break-word;" navcon-readmore content="{{noteData.Summary}}" limit="500">\n' +
    '                        </p>-->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '</navcon-portlet>\n' +
    '\n' +
    '<div class="modal fade" tabindex="-1" role="dialog" id="modalImg">\n' +
    '    <div class="modal-dialog">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
    '                <div class="modal-title ng-binding" style="font-size :16px;font-weight :bold;width :25em;overflow: hidden;text-overflow :ellipsis;white-space :nowrap;">{{NewsTitle}}</div>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <div ng-if="documentId!=null && documentId!=\'\'">\n' +
    '                    <img id="imgModal" style="width: 100%; height: 100%;" ng-src="{{Img}}" />\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="block_content">\n' +
    '                    <b class="title" style="font-size:1.4em">{{NewsTitle}}</b>\n' +
    '                    <div class="byline">\n' +
    '                        <span>{{navcon.dateFromUTCToLocal(CreateDate)}}</span> by\n' +
    '                        <a style="cursor:default;">{{UpdatedByName}}</a>\n' +
    '\n' +
    '                    </div>\n' +
    '                    <div ng-bind-html="Summary" style="padding-top:20px;font-size:15px;">\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '            </div>\n' +
    '        </div><!-- /.modal-content -->\n' +
    '    </div><!-- /.modal-dialog -->\n' +
    '</div><!-- /.modal -->\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/login/directives/loginTemplate.html',
    '<navcon-form footer=\'\' field-data="loginfields" type="loginform" navcon-data="navconData">\n' +
    '    <div class="form-group input-group">\n' +
    '        <navcon-field field-data="loginfields" field-key="username"></navcon-field>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="form-group input-group">\n' +
    '        <navcon-field field-data="loginfields" field-key="userpassword"></navcon-field>\n' +
    '    </div>\n' +
    '    <div class="form-group">\n' +
    '        <navcon-button icon="glyphicon" text="Submit" ng-click="login()"></navcon-button>\n' +
    '        <navcon-button icon="glyphicon" text="Back" ng-click="login()"></navcon-button>\n' +
    '        <div data-ng-hide="message == \'\'" class="alert alert-danger">\n' +
    '            {{message}}\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</navcon-form>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/app/widgets/navconChart/navconChartTemplate.html',
    '<navcon-portlet title="{{title}}" navcon-data="this" class="" icon="" type="mySpaceChart_{{widgetId}}" tools-disp="" show-caption="true">\n' +
    '    <div class="row" ng-hide="reportList.length <= 1 || !options.filter">\n' +
    '        <div class="col-md-push-6 col-md-6" style="padding-right: 25px;">\n' +
    '            <div id="reportrange_{{widgetId}}" class="pull-right" style="background: #fff; cursor: pointer; padding: 4px 8px; border: 1px solid #ccc">\n' +
    '                <i class="glyphicon glyphicon-calendar fa fa-calendar navcon-dashboard-icon" style="color: green;"></i>\n' +
    '                <span ng-model="chartFilterData"></span>&nbsp;<b class="caret"></b>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-12">\n' +
    '            <navcon-fchart data="data" events="events"></navcon-fchart>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</navcon-portlet>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconDashboard/navconDashboardTemplate.html',
    '<div class="row">\n' +
    '    <div class="col-md-12">\n' +
    '        <div class="form-group row {{(!isModuleAvailable) ? \'\': \'navcon-dashboardproject\'}}" style="padding: 5px;">\n' +
    '            <div class="{{projectData.length <= 1 ? \'col-md-push-9\' : \'col-md-push-6\'}} col-md-3 text-right" ng-hide="!isModuleAvailable">\n' +
    '                <div class="row">\n' +
    '                    <div class="col-md-5">\n' +
    '                        <label class="field-label" style="color: #dfdfdf;padding-right: 0px !important;">Module:</label>\n' +
    '                    </div>\n' +
    '                    <!--<select class="text-left col-md-8" style="color: #000;" ng-model="userModule" ng-options="x for x in moduleData"></select>-->\n' +
    '                    <ui-select name="module" theme="select2" ng-model="userModule" class="text-left col-md-7" ng-click="onClick(\'module\',$select.selected,$event)">\n' +
    '                        <!--ng-blur="onBlur($event)" on-select="dropdownSelect($item, item.selectOptions.items)">-->\n' +
    '                        <ui-select-match placeholder="Select module"><span ng-bind-html="$select.selected || $select.search"></span></ui-select-match>\n' +
    '                        <ui-select-choices repeat="itm in moduleData | filter: $select.search">\n' +
    '                            <!--refresh="selectRefreshResults($select)" refresh-delay="0">-->\n' +
    '                            <span ng-bind-html="itm | highlight: ($select.search)"></span>\n' +
    '                        </ui-select-choices>\n' +
    '                    </ui-select>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="{{moduleData.length < 1 ? \'col-md-push-9\' : \'col-md-push-6\'}} col-md-3 text-right" ng-hide="(!isModuleAvailable || projectData.length <= 1)">\n' +
    '                <div class="row">\n' +
    '                    <div class="col-md-3">\n' +
    '                        <label class="field-label" style="color: #dfdfdf;padding-right: 0px !important;">Project:</label>\n' +
    '                    </div>\n' +
    '                    <!--<select style="color: #000;" ng-model="userProject" ng-options="x.ProjectName for x in projectData"></select>-->\n' +
    '                    <ui-select name="project" theme="select2" ng-model="userProject" class="text-left col-md-9" ng-click="onClick(\'project\',$select.selected,$event)">\n' +
    '                        <!--ng-blur="onBlur($event)" ng-click="onClick(item.key,$event)" on-select="dropdownSelect($item, item.selectOptions.items)">-->\n' +
    '                        <ui-select-match placeholder="Select project"><span ng-bind-html="$select.selected[\'ProjectName\'] || $select.search"></span></ui-select-match>\n' +
    '                        <ui-select-choices repeat="itm in projectData | filter: $select.search">\n' +
    '                            <!--refresh="selectRefreshResults($select)" refresh-delay="0">-->\n' +
    '                            <span ng-bind-html="itm[\'ProjectName\'] | highlight: ($select.search)"></span>\n' +
    '                        </ui-select-choices>\n' +
    '                    </ui-select>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row">\n' +
    '            <div class="col-md-12">\n' +
    '                <div gridster="gridsterOpts" class="margin-bottom-40">\n' +
    '                    <ul>\n' +
    '                        <li gridster-item="item" ng-repeat="item in widgets" ng-class="\'dashboardWidget_\'+item.widgetId">\n' +
    '                            <navcon-widget-body page-config="pageConfig" item="item" widgets="widgets">\n' +
    '\n' +
    '                            </navcon-widget-body>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconDashboard/navconWidgetBodyTemplate.html',
    '<div class="navcon-widget-body">\n' +
    '    <div class="navcon-widget-menu-area btn-group">\n' +
    '        <!--<a class="collapse-link" ng-hide="!reportSetting" data-toggle="collapse"><i class="fa fa-chevron-up navcon-dashboard-icon"></i></a>-->\n' +
    '        <a ng-if="options.reportSetting" navcon-popover items="reportList" template-settings="templateSettings" report-data="reportList" default-report="defaultReport" widget-id="widgetId"><i class="glyphicon glyphicon-cog navcon-dashboard-icon"></i></a>\n' +
    '        <a ng-if="options.close" ng-click="close()"><i class="fa fa-close navcon-dashboard-icon"></i></a>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconEvaluation/navconEvaluationTemplate.html',
    '<div class="row">\n' +
    '    <div class="evaluation-body">\n' +
    '        <div class="row evaluation-header">\n' +
    '            <div class="col-md-5"><div class="">Title</div></div>\n' +
    '            <div class="col-md-3 text-center"><div class="">Grade</div></div>\n' +
    '            <div class="col-md-4 text-center"><div class="">Remarks</div></div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '            <div ng-repeat="item in items" ng-include="\'navconNodes\'"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<script type="text/ng-template" id="navconNodeData">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-5">\n' +
    '            <label id="{{item.id}}_text" style="padding-left: {{item.depth * 20}}px" class="navcon-select control-label evaluation-text" \n' +
    '                   ng-model="item.data[textFields]">{{item.data[textFields]}}</label>\n' +
    '        </div>\n' +
    '        <div class="col-md-3" ng-hide="item.children.length>0">\n' +
    '            <ui-select id="{{item.id}}_grade" theme="selectize" class="evaluation-select evaluation-mandatory"\n' +
    '                       ng-model="item.data[gradeFields]"\n' +
    '                       ng-change="gradeChange(item.data[gradeFields],item,this)">\n' +
    '                <ui-select-match><span ng-bind-html="$select.selected[optionText]"></span></ui-select-match>\n' +
    '                <ui-select-choices repeat="itm in (optionData) | filter: ($select.search)">\n' +
    '                    <span ng-bind-html="itm[optionText] | highlight: $select.search"></span>\n' +
    '                </ui-select-choices>\n' +
    '            </ui-select>\n' +
    '        </div>\n' +
    '        <div class="col-md-4" ng-hide="item.children.length>0">\n' +
    '            <textarea id="{{item.id}}_remarks" class="form-control evaluation-remarks" rows="1"\n' +
    '                      ng-style=\'{"width": "100%"}\'\n' +
    '                      ng-model="item.data[remarksFields]"\n' +
    '                      ng-change="RemarkChange(item.data[remarksFields],this,item.id)"></textarea>\n' +
    '            <span id="{{item.id}}_spnremarks" style="display:none;"></span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="text/ng-template" id="navconNodes">\n' +
    '    <div class="evaluation-row" ng-include="templateUrl"></div>\n' +
    '    <div ng-model="item.children" ng-repeat="item in item.children  | filter: searchText.search" ng-include="\'navconNodes\'"></div>\n' +
    '</script>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconField/navconFieldMessagesTemplate.html',
    '<script type="text/ng-template" id="form-messages">\n' +
    '  <div ng-message="required">Cannot be blank</div>\n' +
    '  <div ng-message="minlength">Too short</div>\n' +
    '  <div ng-message="maxlength">Too long</div>\n' +
    '  <div ng-message="email">Invalid email</div>\n' +
    '  <div ng-message="pattern">You did not enter the value in the correct format</div>\n' +
    '  <div ng-message="password-characters">\n' +
    '    Your password must consist of alphabetical or numeric characters.\n' +
    '    It must also contain at least one special character, a number as well as an uppercase letter.\n' +
    '  </div>\n' +
    '</script>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconField/navconFieldTemplate.html',
    '<script type="html/template" id="input">\n' +
    '    <label class="field-label  {{labelClass}}" ng-class="{ \'has-error\': form[item.key].$touched && form[item.key].$invalid}" ng-hide="item.templateOptions.label == \'\'">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly && (item.templateOptions.hyperlink==undefined|| item.templateOptions.hyperlink==\'no\')" ng-bind="item.readOnlyText"></label>\n' +
    '    <a class="field-label-readonly {{fieldClass}}" href="" ng-click="redirectURL(item.data)" data-hyperlink="yes" ng-if="readOnly && (item.templateOptions.hyperlink!=undefined && item.templateOptions.hyperlink==\'yes\')" target="_blank">{{item.data}}</a>\n' +
    '\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <input name="{{item.key}}" focus-me="item.templateOptions.focus" placeholder="{{item.templateOptions.placeholder}}" class="form-control  {{item.templateOptions.customClass}}" compare-to="item.templateOptions.compareTo" type="text"\n' +
    '               is-exist\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-model="item.data"\n' +
    '               ng-paste="onPaste($event)"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled" spellcheck={{item.templateOptions.spellcheck}}>\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage && !item.setFocus">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareToMessage.length*7)+\'px\'}" ng-message="compareTo">{{item.templateOptions.compareToMessage || \'Mismatch...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invaid Date...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.isExistMessage.length*7)+\'px\'}" ng-message="isExist">{{item.templateOptions.isExistMessage || \'Already available...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="email">\n' +
    '    <!--<form name="form" novalidate>\n' +
    '        <div class="navcon-group" ng-class="{ \'has-error\': form[item.key].$touched && form[item.key].$invalid }" ng-hide="item.hidden">-->\n' +
    '    <label class="field-label  {{labelClass}}" ng-hide="item.templateOptions.label == \'\'">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <input name="{{item.key}}" focus-me="item.templateOptions.focus" placeholder="{{item.templateOptions.placeholder}}" class="form-control  {{item.templateOptions.customClass}}" type="email"\n' +
    '               is-exist\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-model="item.data"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled">\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.emailMessage.length*7)+\'px\'}" ng-message="email">{{item.templateOptions.emailMessage || \'Mismatch...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.isExistMessage.length*7)+\'px\'}" ng-message="isExist">{{item.templateOptions.isExistMessage || \'Already available...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--</div>\n' +
    '    </form>-->\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="password">\n' +
    '    <label class="field-label  {{labelClass}}" ng-hide="item.templateOptions.label == \'\'">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly">\n' +
    '        <input name="{{item.key}}" placeholder="{{item.templateOptions.placeholder}}" compare-to="item.templateOptions.compareTo" class="form-control  {{item.templateOptions.customClass}}" type="password"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-model="item.data"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-disabled="item.disabled">\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareToMessage.length*7)+\'px\'}" ng-message="compareTo">{{item.templateOptions.compareToMessage || \'Mismatch...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="colorpicker">\n' +
    '    <label class="field-label  {{labelClass}}" ng-hide="item.templateOptions.label == \'\'">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <div class="field-group {{fieldClass}}">\n' +
    '        <input name="{{item.key}}" placeholder="{{item.templateOptions.placeholder}}" class="colorpicker-input"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-model="item.data"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-disabled="true" style="width: 30% !important;border-radius: 0px !important" disabled>\n' +
    '        <spectrum-colorpicker ng-model="item.data" options="colorpickerOptions" format="\'hex\'" on-show="colorpickerShow(color)" on-before-show="colorpickerBeforeShow(color)" on-move="colorpickerMove(color)">\n' +
    '        </spectrum-colorpicker>\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="number">\n' +
    '    <label class="field-label  {{labelClass}}" ng-hide="item.templateOptions.label == \'\'">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label {{fieldClass}}" ng-if="readOnly" style="text-align:left;font-weight:normal !important;" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <input name="{{item.key}}" placeholder="{{item.templateOptions.placeholder}}" compare-to="item.templateOptions.compareTo" class="form-control  {{item.templateOptions.customClass}}" type="number"\n' +
    '               is-exist\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-model="item.data"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               min="{{item.templateOptions.min}}" ,\n' +
    '               max="{{item.templateOptions.max}}"\n' +
    '               ng-min="{{item.templateOptions.min}}"\n' +
    '               ng-max="{{item.templateOptions.max}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-disabled="item.disabled">\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minMessage.length*7)+\'px\'}" ng-message="min">{{item.templateOptions.minMessage || \'Invalid value...\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxMessage.length*7)+\'px\'}" ng-message="max">{{item.templateOptions.maxMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareToMessage.length*7)+\'px\'}" ng-message="compareTo">{{item.templateOptions.compareToMessage || \'Mismatch...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.isExistMessage.length*7)+\'px\'}" ng-message="isExist">{{item.templateOptions.isExistMessage || \'Already available...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="textarea">\n' +
    '\n' +
    '    <label class="field-label  {{labelClass}}" ng-style=\'{"width":(item.templateOptions.hideLabel?"0px":"none")}\' ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <textarea focus-me="item.templateOptions.focus" name="{{item.key}}" ng-attr-placeholder="{{item.templateOptions.placeholder}}" class="form-control {{item.templateOptions.customClass}}" rows="{{item.rows}}" cols="{{item.cols}}"\n' +
    '                  is-exist\n' +
    '                  ng-style=\'{"width":(item.templateOptions.hideLabel?"100%":"none")}\'\n' +
    '                  ng-blur="onBlur($event)"\n' +
    '                  ng-click="onClick()"\n' +
    '                  ng-model="item.data"\n' +
    '                  ng-required="item.templateOptions.required == \'yes\'"\n' +
    '                  ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '                  ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '                  ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '                  ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '                  ng-disabled="item.disabled" spellcheck={{item.templateOptions.spellcheck}}></textarea>\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.isExistMessage.length*7)+\'px\'}" ng-message="isExist">{{item.templateOptions.isExistMessage || \'Already available...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="autocomplete">\n' +
    '    <label class="field-label  {{labelClass}}" ng-class="{ \'has-error\': form[item.key].$touched && form[item.key].$invalid}" ng-hide="item.templateOptions.label == \'\'">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '\n' +
    '        <!--<form name="form" novalidate>\n' +
    '            <div class="navcon-group" ng-class="{ \'has-error\': form[item.key].$touched && form[item.key].$invalid }" ng-hide="item.hidden">\n' +
    '                <label class="control-label" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip" ng-hide="item.templateOptions.label == \'\'">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>-->\n' +
    '        <input name="{{item.key}}" focus-me="item.templateOptions.focus" placeholder="{{item.templateOptions.placeholder}}" class="typeahead form-control  {{item.templateOptions.customClass}}" compare-to="item.templateOptions.compareTo" type="text"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-model="item.data"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled"\n' +
    '               spellcheck={{item.templateOptions.spellcheck}}>\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareToMessage.length*7)+\'px\'}" ng-message="compareTo">{{item.templateOptions.compareToMessage || \'Mismatch...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invaid Date...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.isExistMessage.length*7)+\'px\'}" ng-message="isExist">{{item.templateOptions.isExistMessage || \'Already available...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--</form>-->\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="checkbox">\n' +
    '    <!--<form name="form" novalidate>\n' +
    '        <div class="navcon-group control-checkbox" ng-class="{ \'has-error\': form[item.key].$touched && form[item.key].$invalid }" ng-hide="item.hidden">-->\n' +
    '    <label class="field-label  {{labelClass}}" ng-hide="item.templateOptions.hideLabel" id="lbl{{item.templateOptions.label}}">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <span class="field-checkbox-span {{fieldClass}}" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <input name="{{item.key}}" data-checkbox="icheckbox_flat-green" class="field-checkbox-input {{item.templateOptions.customClass}}" type="checkbox"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-model="item.data"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-disabled="item.disabled" check-required ng-if="!readOnly" />\n' +
    '        <label ng-if="!readOnly" data-toggle="tooltip" class="field-checkbox-label" ng-show="item.templateOptions.suffixLabelHide">{{item.templateOptions.suffixLabel}}</label>\n' +
    '        <label class="field-checkbox-label" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    </span>\n' +
    '    <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched &&  item.showMessage">\n' +
    '        <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="checkRequired">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '    </div>\n' +
    '    <!--</div>\n' +
    '    </form>-->\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="checkboxlist">\n' +
    '    <div ng-repeat="grp in item.data" ng-if="item.listDisplay === undefined">\n' +
    '        <div class="col-md-4" style="padding-top: 15px;">\n' +
    '            <div class="" ng-show="grp[$parent.item.templateOptions.item.displayField || groupname]" style="font-size:large; color:#666666; padding-left: 20px; ">\n' +
    '                {{grp[$parent.item.templateOptions.item.displayField || groupname]}}\n' +
    '            </div>\n' +
    '            <div class="row" ng-if="readOnly">\n' +
    '                &nbsp;\n' +
    '            </div>\n' +
    '            <div class="navcon-radio-group" style="padding-left: 60px;">\n' +
    '                <div class="field-checkbox-span" ng-repeat="itm in grp.data  | filter: checkboxlistFilter">\n' +
    '                    <input name="checkbox_{{itm[$parent.item.templateOptions.item.dataField || id]}}"\n' +
    '                           data-checkbox="icheckbox_flat-green"\n' +
    '                           class="field-checkbox-input {{item.templateOptions.customClass}}" type="checkbox"\n' +
    '                           ng-blur="onBlur($event)"\n' +
    '                           ng-click="onClick()"\n' +
    '                           ng-model="itm.value"\n' +
    '                           ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '                           ng-disabled="item.disabled" check-required ng-if="!readOnly" />\n' +
    '                    <!--<input class="field-checkbox-input" type="checkbox" data-checkbox="icheckbox_flat-green" ng-model="itm.value"\n' +
    '                           name="checkbox_{{itm[$parent.item.templateOptions.item.dataField || id]}}" />-->\n' +
    '\n' +
    '                    <label class="navcon-radio control-label checkboxlist-label-suffix" ng-show="itm[$parent.item.templateOptions.item.displayField || EventName]">\n' +
    '                        {{itm[$parent.item.templateOptions.item.displayField || EventName]}}\n' +
    '                    </label>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="clearfix" style="padding-top: 25px;" ng-style="{display: ((($index + 1) % 3) === 0 ? \'block\': \'none\')}"></div>\n' +
    '    </div>\n' +
    '    <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched &&  item.showMessage">\n' +
    '        <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="checkRequired">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="groupcheckboxlist">\n' +
    '    <div ng-repeat="itm in item.data  | filter: checkboxlistFilter" ng-if="item.listDisplay">\n' +
    '        <div style="padding-top: 15px;">\n' +
    '            <div ng-if="itm.ParentID == 0" style="font-size:large; color:#666666; padding-left: 20px; ">\n' +
    '                {{itm[$parent.item.templateOptions.item.displayField || groupname]}}\n' +
    '            </div>\n' +
    '            <div class="navcon-radio-group row" style="padding-left: 60px;" ng-if="itm.ParentID != 0">\n' +
    '                <div class="field-checkbox-span">\n' +
    '                    <input name="checkbox_{{itm[$parent.item.templateOptions.item.dataField || id]}}"\n' +
    '                           data-checkbox="icheckbox_flat-green"\n' +
    '                           class="field-checkbox-input" type="checkbox"\n' +
    '                           ng-blur="onBlur($event)"\n' +
    '                           ng-click="onClick()"\n' +
    '                           ng-model="itm.value"\n' +
    '                           ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '                           ng-disabled="item.disabled" check-required ng-if="!readOnly" />\n' +
    '                    &nbsp;&nbsp;\n' +
    '                    <label class="navcon-radio control-label checkboxlist-label-suffix" ng-show="itm[$parent.item.templateOptions.item.displayField || EventName]">\n' +
    '                        {{itm[$parent.item.templateOptions.item.displayField || EventName]}} <b>{{itm.BoldEventValue}}</b>\n' +
    '                    </label>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched &&  item.showMessage">\n' +
    '        <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="checkRequired">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="switch">\n' +
    '    <div class="navcon-group" ng-hide="item.hidden">\n' +
    '        <label class="navcon-checkbox control-label" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}</label>\n' +
    '        <input bs-switch type="checkbox" switch-on-text="{{item.swithcOptions.onText}}" switch-off-text="{{item.swithcOptions.offText}}" switch-on-color="{{item.swithcOptions.onColor}}" switch-off-color="{{item.swithcOptions.offColor}}"\n' +
    '               ng-model="item.data"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-disabled="item.disabled" />\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="radio">\n' +
    '    <!--<div class="navcon-group" ng-hide="item.hidden">-->\n' +
    '    <label class="field-label  {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-hide="itm.suffixLabel" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-radio-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <div class="navcon-radio-group" style="{{itm.style}}" ng-repeat="itm in item.templateOptions.items">\n' +
    '            <label class="navcon-radio control-label radio-label" ng-hide="itm.suffixLabel">{{itm.label}}</label>\n' +
    '            <input name="{{item.key}}" class="navcon-input-radio form-control {{$parent.item.customClass}}" type="radio"\n' +
    '                   ng-model="$parent.item.data" name="{{$parent.item.group}}"\n' +
    '                   ng-class="$parent.item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '                   ng-click="$parent.radioClick($event,$parent.item)"\n' +
    '                   ng-required="$parent.item.templateOptions.required == \'yes\'"\n' +
    '                   ng-disabled="$parent.item.disabled" ng-value="itm.value" ng-if="!readOnly" />\n' +
    '            <label class="navcon-radio control-label radio-label-suffix" ng-show="itm.suffixLabel">{{itm.label}}</label>\n' +
    '        </div>\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched &&  item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="label">\n' +
    '    <label class="field-label  {{labelClass}} {{item.templateOptions.customClass}}" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip" ng-hide="item.hidden"\n' +
    '           ng-disabled="item.disabled">{{item.templateOptions.label}}</label>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="labeldata">\n' +
    '    <label class="field-label  {{labelClass}}" ng-class="{ \'has-error\': form[item.key].$touched && form[item.key].$invalid}" ng-hide="item.templateOptions.label == \'\'"\n' +
    '           data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-style="item.templateOptions.cellStyle">\n' +
    '        <a href ng-click="labelDataClick(item)">\n' +
    '            <label ng-style="item.templateOptions.fontStyle" class="data-label {{item.templateOptions.customClass}}" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip" ng-hide="item.hidden"\n' +
    '                   ng-disabled="item.disabled" ng-bind-html="item.data"></label>\n' +
    '        </a>\n' +
    '    </div>\n' +
    '\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="value">\n' +
    '    <div class="navcon-value">\n' +
    '        <input class="form-control {{fieldclass}}" type="text" ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-disabled="item.disabled" />\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="search">\n' +
    '    <div class="navcon-group" ng-hide="item.hidden">\n' +
    '        <span class="navcon-search">\n' +
    '            <i class="fa fa-search"></i>\n' +
    '        </span>\n' +
    '        <input type="text" class="form-control" placeholder="Search...."\n' +
    '               ng-model="item.data"\n' +
    '               ng-disabled="item.disabled">\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="date">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <div class="field-date-div-group date date-picker" data-date-format="dd/mm/yyyy">\n' +
    '            <span class="input-group field-date-span ">\n' +
    '                <input name="{{item.key}}" type="text" class="form-control field-date-input" placeholder="{{item.templateOptions.placeholder}}"\n' +
    '                       compare-date="item.templateOptions.compareDateTo"\n' +
    '                       ng-model="item.data"\n' +
    '                       ng-blur="onBlur($event)"\n' +
    '                       ng-click="onClick()"\n' +
    '                       ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '                       ng-required="item.templateOptions.required == \'yes\'"\n' +
    '                       ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '                       ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '                       ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '                       ng-disabled="item.disabled"\n' +
    '                       style="width:128px !important;">\n' +
    '                <button class="date-button btn default" type="button"\n' +
    '                        ng-hide="item.disabled">\n' +
    '                    <i class="fa fa-calendar"></i>\n' +
    '                </button>\n' +
    '            </span>\n' +
    '        </div>\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invalid date...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="kendodate">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '\n' +
    '        <input name="{{item.key}}" type="text" class="form-control field-date-input" placeholder="{{item.templateOptions.placeholder}}"\n' +
    '               compare-date="item.templateOptions.compareDateTo"\n' +
    '               ng-model="item.data"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled"\n' +
    '               style="width:128px !important;" field-required="item.templateOptions.required" />\n' +
    '\n' +
    '\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invalid date...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="kendodatetime">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '\n' +
    '        <input name="{{item.key}}" type="text" class="form-control field-date-input" placeholder="{{item.templateOptions.placeholder}}"\n' +
    '               compare-date="item.templateOptions.compareDateTo"\n' +
    '               ng-model="item.data"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled"\n' +
    '               style="width:128px !important;" field-required="item.templateOptions.required" />\n' +
    '\n' +
    '\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invalid date...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '<script type="html/template" id="kendocombobox">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '\n' +
    '        <input name="{{item.key}}" type="text" class="form-control field-date-input" placeholder="{{item.templateOptions.placeholder}}"\n' +
    '               compare-date="item.templateOptions.compareDateTo"\n' +
    '               ng-model="item.data"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled"\n' +
    '               style="width:128px !important;" field-required="item.templateOptions.required" />\n' +
    '\n' +
    '\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invalid date...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '<script type="html/template" id="kendonumerictextbox">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '\n' +
    '        <input name="{{item.key}}" type="text" class="form-control field-date-input" placeholder="{{item.templateOptions.placeholder}}"\n' +
    '               ng-model="item.data"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled"\n' +
    '               style="width:128px !important;" field-required="item.templateOptions.required" />\n' +
    '\n' +
    '\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invalid date...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '<script type="html/template" id="kendomaskedtextbox">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '\n' +
    '        <input name="{{item.key}}" type="text" class="form-control field-date-input" placeholder="{{item.templateOptions.placeholder}}"\n' +
    '               ng-model="item.data"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled"\n' +
    '               style="width:128px !important;" field-required="item.templateOptions.required" />\n' +
    '\n' +
    '\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invalid date...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="kendocolorpicker">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '\n' +
    '        <input name="{{item.key}}" type="text" class="form-control field-date-input" placeholder="{{item.templateOptions.placeholder}}"\n' +
    '               ng-model="item.data"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled"\n' +
    '               style="width:128px !important;" field-required="item.templateOptions.required" />\n' +
    '\n' +
    '\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invalid date...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="kendotime">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '\n' +
    '        <input name="{{item.key}}" type="text" class="form-control field-date-input" placeholder="{{item.templateOptions.placeholder}}"\n' +
    '               compare-date="item.templateOptions.compareDateTo"\n' +
    '               ng-model="item.data"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled"\n' +
    '               style="width:128px !important;" field-required="item.templateOptions.required" />\n' +
    '\n' +
    '\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invalid date...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '<script type="html/template" id="kendoswitch">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '\n' +
    '        <input name="{{item.key}}" type="text" class="form-control field-date-input" placeholder="{{item.templateOptions.placeholder}}"\n' +
    '               compare-date="item.templateOptions.compareDateTo"\n' +
    '               ng-model="item.data"\n' +
    '               ng-blur="onBlur($event)"\n' +
    '               ng-click="onClick()"\n' +
    '               ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '               ng-required="item.templateOptions.required == \'yes\'"\n' +
    '               ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '               ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '               ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '               ng-disabled="item.disabled"\n' +
    '               style="width:128px !important;" field-required="item.templateOptions.required" />\n' +
    '\n' +
    '\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invalid date...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '<script type="html/template" id="datetime">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">\n' +
    '        {{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em>\n' +
    '    </label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <div class="field-date-div-group date">\n' +
    '            <span class="input-group field-date-span">\n' +
    '                <input name="{{item.key}}" type="text" class="form-control field-date-input" placeholder="{{item.templateOptions.placeholder}}"\n' +
    '                       compare-date="item.templateOptions.compareDateTo"\n' +
    '                       ng-model="item.data"\n' +
    '                       ng-blur="onBlur($event)"\n' +
    '                       ng-click="onClick(this,$event)"\n' +
    '                       ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '                       ng-required="item.templateOptions.required == \'yes\'"\n' +
    '                       ng-minlength="{{item.templateOptions.minlength}}"\n' +
    '                       ng-maxlength="{{item.templateOptions.maxlength}}"\n' +
    '                       ng-pattern="{{item.templateOptions.pattern}}"\n' +
    '                       ng-disabled="item.disabled">\n' +
    '                <button class="input-group-addon date-button btn default" type="button"\n' +
    '                        ng-hide="item.disabled">\n' +
    '                    <i class="glyphicon glyphicon-calendar"></i>\n' +
    '                </button>\n' +
    '            </span>\n' +
    '        </div>\n' +
    '        <div class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.compareDateMessage.length*7)+\'px\'}" ng-message="compareDate">{{item.templateOptions.compareDateMessage || \'Invalid date...\'}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="select">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <ui-select name="{{item.key}}" theme="select2" field-required="item.templateOptions.required"\n' +
    '                   ng-blur="onBlur($event)"\n' +
    '                   ng-click="dropdownClick(item.key,$event)"\n' +
    '                   ng-change="onChange(item.key)"\n' +
    '                   ng-model="item.data"\n' +
    '                   ng-required="item.templateOptions.required == \'yes\'"\n' +
    '                   ng-disabled="item.disabled" on-select="dropdownSelect($item, item.selectOptions.items)">\n' +
    '            <ui-select-match placeholder="{{item.templateOptions.placeholder}}"><span ng-bind-html="$select.selected[item.selectOptions.item.selectedField || item.selectOptions.item.displayField] || $select.search"></span></ui-select-match>\n' +
    '            <ui-select-choices group-by="item.selectOptions.item.groupBy" repeat="itm in (item.selectOptions.filterItems || item.selectOptions.items) | filter: $select.search" refresh="selectRefreshResults($select)" refresh-delay="0">\n' +
    '                <span ng-bind-html="itm[$parent.item.selectOptions.item.displayField || text] | highlight: ((item.selectOptions.customFilter !== undefined && item.selectOptions.customFilter) ? \'\' : $select.search)" ng-if="!$parent.item.selectOptions.isCustomFormat"></span>\n' +
    '                <span ng-bind-html="$parent.getFormat(itm) | highlight: ((item.selectOptions.customFilter !== undefined && item.selectOptions.customFilter) ? \'\' : $select.search)" ng-if="$parent.item.selectOptions.isCustomFormat"></span>\n' +
    '            </ui-select-choices>\n' +
    '        </ui-select>\n' +
    '        <div name="{{item.key}}" class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && form[item.key].$invalid && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="fieldRequired">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="kendoselect">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <select name="{{item.key}}" ng-blur="onBlur($event)"\n' +
    '                ng-click="onClick(item.key)"\n' +
    '                ng-model="item.data"\n' +
    '                ng-required="item.templateOptions.required == \'yes\'" field-required="item.templateOptions.required"></select>\n' +
    '    </div>\n' +
    '    <div name="{{item.key}}" class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && form[item.key].$invalid && item.showMessage">\n' +
    '        <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '        <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '        <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '        <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '        <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="fieldRequired">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="multiselect">\n' +
    '\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '        <ui-select multiple require-multiple name="{{item.key}}" theme="select2" field-required="item.templateOptions.required"\n' +
    '                   ng-blur="onBlur($event)"\n' +
    '                   ng-click="onClick(item.key)"\n' +
    '                   ng-change="onChange(item.key)"\n' +
    '                   ng-model="item.data"\n' +
    '                   ng-required="item.templateOptions.required == \'yes\'"\n' +
    '                   ng-disabled="item.disabled" on-select="dropdownSelect($item, item.selectOptions.items)">\n' +
    '            <ui-select-match placeholder="{{item.templateOptions.placeholder}}">{{$item[item.selectOptions.item.displayField]}};</ui-select-match>\n' +
    '            <ui-select-choices group-by="item.selectOptions.item.groupBy" repeat="itm in item.selectOptions.items | filter: ($select.search || item.search)" refresh="selectRefreshResults($select)" refresh-delay="0">\n' +
    '                <!--<div ng-style="{color: ((form[item.parentKey][\'$modelValue\'][item.parentKeyId]===itm[$parent.item.selectOptions.item.dataField || \'id\']) ? \'#FF4500\': \'#000\')}"-->\n' +
    '                <div ng-style="{\'font-weight\': multiSelectGroupBold($parent.item,itm)}" ng-bind-html="itm[$parent.item.selectOptions.item.displayField || text] | highlight: $select.search"></div>\n' +
    '            </ui-select-choices>\n' +
    '        </ui-select>\n' +
    '        <div name="{{item.key}}" class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && form[item.key].$invalid && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="fieldRequired">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '\n' +
    '<script type="html/template" id="multiselectcheckbox">\n' +
    '\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div class="field-group {{fieldClass}}" ng-show="!readOnly" data-original-title="{{item.templateOptions.tooltip}}" data-placement="top" data-toggle="tooltip">\n' +
    '\n' +
    '        <div name="{{item.key}}" ng-dropdown-multiselect="" options="item.selectOptions.items" ng-model="item.data" selected-model="item.data"\n' +
    '             ng-if="item.selectOptions.items!=undefined" checkboxes="true" parent-list="item" extra-settings="$parent.$parent[$parent.item.selectOptions.customFormat]"></div>\n' +
    '\n' +
    '        <div name="{{item.key}}" class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && form[item.key].$invalid && item.showMessage">\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '            <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '            <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="fieldRequired">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '<script type="html/template" id="kendomultiselect">\n' +
    '    <label class="field-label {{labelClass}}" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}<em ng-show="item.templateOptions.required == \'yes\'">*</em></label>\n' +
    '    <label class="field-label-readonly {{fieldClass}}" ng-if="readOnly" ng-bind="item.readOnlyText"></label>\n' +
    '    <div name="{{item.key}}" ng-show="!readOnly">\n' +
    '        <select name="{{item.key}}" ng-blur="onBlur($event)"\n' +
    '                ng-click="onClick(item.key)"\n' +
    '                ng-model="item.data"\n' +
    '                ng-required="item.templateOptions.required == \'yes\'" field-required="item.templateOptions.required"></select>\n' +
    '    </div>\n' +
    '    <div name="{{item.key}}" class="error-messages error-margin" ng-messages="form[item.key].$error" ng-if="form[item.key].$touched && form[item.key].$invalid && item.showMessage">\n' +
    '        <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="required">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '        <div ng-style="{width: (item.templateOptions.minlengthMessage.length*7)+\'px\'}" ng-message="minlength">{{item.templateOptions.minlengthMessage || \'It\\\'s too short\'}} </div>\n' +
    '        <div ng-style="{width: (item.templateOptions.maxlengthMessage.length*7)+\'px\'}" ng-message="maxlength">{{item.templateOptions.maxlengthMessage || \'It\\\'s too long\'}}</div>\n' +
    '        <div ng-style="{width: (item.templateOptions.patternMessage.length*7)+\'px\'}" ng-message="pattern">{{item.templateOptions.patternMessage || \'Invalid value...\'}}</div>\n' +
    '        <div ng-style="{width: (item.templateOptions.requiredMessage.length*7)+\'px\'}" ng-message="fieldRequired">{{item.templateOptions.requiredMessage || \'Shouldn\\\'t be empty...\'}}</div>\n' +
    '\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="fileupload">\n' +
    '    <navcon-portlet id="portletfileupload" title="{{item.templateOptions.label}}" class="box blue-hoki" icon="" tools-disp="C" show-caption="true">\n' +
    '        <navcon-file-upload my-files="item.data" mode="items.mode" type="item.templateOptions.folderType" key-data="keyData" key-name="keyName" agree-text="item.templateOptions.agreeText" key-return="item.templateOptions.keyReturn" multiple-file="item.templateOptions.multipleFile" photo-changeable="item.ischangeable" file-size="item.templateOptions.fileSize" file-type="item.templateOptions.fileType" same-file="item.templateOptions.sameFile" show-only="item.templateOptions.showOnly"></navcon-file-upload>\n' +
    '    </navcon-portlet>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="photoupload">\n' +
    '    <navcon-photo-upload my-image="item.data" mode="items.mode" type="item.templateOptions.folderType" key-data="keyData" key-name="keyName" agree-text="item.templateOptions.agreeText" key-return="item.templateOptions.keyReturn" photo-changeable="item.ischangeable" file-size="item.templateOptions.fileSize" file-type="item.templateOptions.fileType"></navcon-photo-upload>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="tableeditor">\n' +
    '    <navcon-table-editor navcon-data="navconData" table-read-only="item.readonly" settings="item.tableeditorSettings" data="item.data" show-add="item.templateOptions.showAdd" show-update="item.templateOptions.showUpdate" show-del="item.templateOptions.showDel" showover-allsave="item.templateOptions.showoverAllsave" show-itar="item.templateOptions.showItar" show-slno="item.templateOptions.showSlno" save-buttontext="item.templateOptions.SaveButtonText" ng-class="item.disabled === true ? \'disable-control\' : \'\'"></navcon-table-editor>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="rating">\n' +
    '    <navcon-rating ng-rating="item.data" max-rating="item.ratingOptions.max" read-only="item.ratingOptions.readOnly"></navcon-rating>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="listview">\n' +
    '    <div class="navcon-group"\n' +
    '    <div class="navcon-group" ng-hide="item.hidden">\n' +
    '        <!--<label class="control-label" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}</label>-->\n' +
    '        <ol class="navcon-select {{item.templateOptions.customClass}}"\n' +
    '            ng-model="item.data"\n' +
    '            ng-class="item.disabled === true ? \'navcon-disable\' : \'\'"\n' +
    '            ng-disabled="item.disabled">\n' +
    '            <li ng-repeat="itm in item.selectOptions.items" ng-click="tabClick(item,itm)">\n' +
    '                <label class="control-label {{itm.customClass}}" style="width: 100%; text-align: left; padding-left: 8px;" ng-hide="{{item.templateOptions.listtype.toUpperCase() !== \'LABEL\'}}">\n' +
    '                    {{itm[$parent.item.selectOptions.item.displayField || text]}}\n' +
    '                </label>\n' +
    '                <textarea class="{{itm.customClass}}" ng-attr-placeholder="{{itm.placeholder}}" rows="{{itm.rows}}" style="width: 100%;"\n' +
    '                          ng-hide="{{item.templateOptions.listtype.toUpperCase() !== \'TEXT\'}}">\n' +
    '                    {{itm[$parent.item.selectOptions.item.displayField || text]}}\n' +
    '                </textarea>\n' +
    '            </li>\n' +
    '        </ol>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="html/template" id="tab">\n' +
    '    <div class="navcon-group" ng-hide="item.hidden">\n' +
    '        <label class="navcon-select control-label" ng-hide="item.templateOptions.hideLabel">{{item.templateOptions.label}}</label>\n' +
    '        <ul class="nav nav-pills nav-justified" style="background-color: #eee;"\n' +
    '            ng-model="item.data"\n' +
    '            ng-disabled="item.disabled">\n' +
    '            <li ng-repeat="itm in item.selectOptions.items" ng-click="tabClick(item,itm)" ng-mouseover="tabMouseOver($event, item, itm)"\n' +
    '                ng-class="{\'active\':item.data == itm[$parent.item.selectOptions.item.dataField || id]}">\n' +
    '                <label class="{{itm.customClass}}" style="width: 98%; color: #000000; background-color: {{itm[$parent.item.selectOptions.item.color]}}"\n' +
    '                       ng-hide="{{item.templateOptions.listtype.toUpperCase() !== \'LABEL\'}}">\n' +
    '                    {{itm[$parent.item.selectOptions.item.displayField || text]}}\n' +
    '                </label>\n' +
    '                <a class="{{itm.customClass}}" data-toggle="pill" href=\'javascript:;\' style=" color #000000; background-color {{itm[$parent.item.selectOptions.item.color]}} "\n' +
    '                   data-target="#{{itm[$parent.item.selectOptions.item.dataField || id]}}"\n' +
    '                   ng-hide="{{item.templateOptions.listtype.toUpperCase() !== \'LINK\'}}"\n' +
    '                   ng-class="{\'navcontabact\':item.data == itm[$parent.item.selectOptions.item.dataField || id]}">\n' +
    '                    {{itm[$parent.item.selectOptions.item.displayField || text]}}\n' +
    '                </a>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script type="text/ng-template" id="messages">\n' +
    '    <div ng-message="required">Cannot be blank</div>\n' +
    '    <div ng-message="minlength">Too short</div>\n' +
    '    <div ng-message="maxlength">Too long</div>\n' +
    '    <div ng-message="email">Invalid email</div>\n' +
    '    <div ng-message="pattern">You did not enter the value in the correct format</div>\n' +
    '    <div ng-message="password-characters">\n' +
    '        Your password must consist of alphabetical or numeric characters.\n' +
    '        It must also contain at least one special character, a number as well as an uppercase letter.\n' +
    '    </div>\n' +
    '</script>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconDelete/navconDeleteTemplate.html',
    '<div class="modal container fade" tabindex="-1">\n' +
    '    <div class="modal-content">\n' +
    '        <div class="modal-header" style="cursor: move">\n' +
    '            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
    '            <h4 class="modal-title">{{title}}</h4>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <div class="row">\n' +
    '                <div class="col-lg-12 text-center" ng-transclude="">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="modal-footer">\n' +
    '            <button ng-show="footer.split(\'|\')[0].length > 0" type="button" ng-click="delete(type,type+\'delete\')" class="btn default box">{{footer.split(\'|\')[0]}}</button>\n' +
    '            <button ng-show="footer.split(\'|\')[1].length > 0" type="button" data-dismiss="modal" class="btn default box">{{footer.split(\'|\')[1]}}</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconForm/navconFormTemplate.html',
    '<div>\n' +
    '    <form name="form">\n' +
    '        <div ng-transclude="" ng-class="readOnly === true ? \'disable-control\' : \'\'">\n' +
    '\n' +
    '        </div>\n' +
    '    </form>\n' +
    '\n' +
    '    <div class="text-right" ng-hide="footer === \'\'">\n' +
    '        <span id="Approval" class="margin-right-10" ng-show="footer.indexOf(\'A\') !== -1" ng-hide="items.mode !== \'Print\' || approvalKey === \'\'">\n' +
    '            <script type="html/template" id="Approval">\n' +
    '                <navcon-approvaldetail navcon-data="navconData" page="approvalPage" page-config="approvalConfig" approval-id="approvalId"\n' +
    '                                       modal-id="modalId" approval-title="approvalTitle" item-id="itemId" source="source" class="approve"></navcon-approvaldetail>\n' +
    '            </script>\n' +
    '        </span>\n' +
    '        <button ng-show="footer.indexOf(\'S\') !== -1" type="button" ng-click="save(type)" class="btn default box save">{{items.mode || \'Save\'}}</button>\n' +
    '        <button ng-show="footer.indexOf(\'N\') !== -1" type="button" ng-click="save(type, \'send\')" class="btn default box send">Send</button>\n' +
    '        <button ng-show="footer.indexOf(\'O\') !== -1" type="button" ng-click="navconData.ok(type)" class="btn default box">{{items.mode || \'Ok\'}}</button>\n' +
    '        <button ng-show="footer.indexOf(\'C\') !== -1" type="button" ng-click="cancel(type)" class="btn default box">Cancel</button>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconFramework/navconFrameworkTemplate.html',
    '<style>\n' +
    '    html, body {\n' +
    '        height: 100%;\n' +
    '    }\n' +
    '</style>\n' +
    '\n' +
    '<!-- BEGIN HEADER -->\n' +
    '<div class="page-header navbar navbar-fixed-top" style="display:none;">\n' +
    '    <!-- BEGIN HEADER INNER -->\n' +
    '    <div class="page-header-inner">\n' +
    '        <!-- BEGIN LOGO -->\n' +
    '        <div class="page-logo">\n' +
    '            <a href="#">\n' +
    '                <img src="../../Assets/images/company_logowhite.png" alt="logo" style="width:100%;padding: 0px 5px 0px 5px;" class="logo-default" />\n' +
    '            </a>\n' +
    '            <div class="menu-toggler sidebar-toggler hide">\n' +
    '                <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- END LOGO -->\n' +
    '        <!-- Toggle -->\n' +
    '        <div class="nav toggle">\n' +
    '            <a id="menu_toggle"><i class="fa fa-bars" style="color:#73879C;"></i></a>\n' +
    '        </div>\n' +
    '        <!-- Toggle -->\n' +
    '\n' +
    '        <div class="breadcrumbdiv">\n' +
    '            <ol class="breadcrumb">\n' +
    '                <li class="breadcrumb-item"><a href=""><i style="color:#73879C;font-size:16px" class="{{currentMainmenuicon}}"></i>{{currentMainmenu}}</a></li>\n' +
    '                <li class="breadcrumb-item"><a href="">{{currentSubmenu}}</a></li>\n' +
    '            </ol>\n' +
    '        </div>\n' +
    '        <div class="appTitle">\n' +
    '            <h3 style="color:#4f5390;letter-spacing:5px;">RMS</h3>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- END RESPONSIVE MENU TOGGLER -->\n' +
    '        <!-- BEGIN TOP NAVIGATION MENU -->\n' +
    '        <div class="top-menu">\n' +
    '            <ul class="nav navbar-nav pull-right">\n' +
    '                <li class="dropdown dropdown-extended ">\n' +
    '                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" style="padding-top: 11px;padding-bottom: 14px;padding-right:10px" ng-click="helpOpen()">\n' +
    '                        <i class="fa fa-question-circle" aria-hidden="true" style="font-size:20px;color:blue;"></i>Help\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <!-- BEGIN NOTIFICATION DROPDOWN -->\n' +
    '                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->\n' +
    '                <li class="dropdown dropdown-extended dropdown-tasks" id="header_task_bar">\n' +
    '                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">\n' +
    '                        <i class="icon-bell"></i>\n' +
    '                        <span class="badge badge-default tasks">\n' +
    '                            {{notification.length}}\n' +
    '                        </span>\n' +
    '                    </a>\n' +
    '                    <ul class="dropdown-menu extended tasks">\n' +
    '                        <li class="external">\n' +
    '                            <h3>You have <span class="bold">{{notfiltered.length}} pending</span> notifications</h3><br />\n' +
    '                            <a ng-click="notificationViewClick()">View All</a>\n' +
    '                            <!--<a href="#/notifications/1">View All</a>-->\n' +
    '                        </li>\n' +
    '                        <li>\n' +
    '                            <ul class="dropdown-menu-list slimscrollbar" data-handle-color="#637283">\n' +
    '                                <li ng-repeat="r in notification | orderBy:\'date\':true | filter:{ status: false, type: \'1\' } as notfiltered ">\n' +
    '                                    <a href="javascript:;" ng-click="notificationClick(r)">\n' +
    '                                        <span class="desc">{{r.item}}</span>\n' +
    '                                    </a>\n' +
    '                                </li>\n' +
    '                            </ul>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </li>\n' +
    '                <!-- END NOTIFICATION DROPDOWN -->\n' +
    '                <!-- BEGIN USER LOGIN DROPDOWN -->\n' +
    '                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->\n' +
    '                <li class="dropdown dropdown-user">\n' +
    '                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">\n' +
    '                        <img alt="" class="img-circle" ng-src="{{userProfileImage}}" />\n' +
    '                        <span class="username username-hide-on-mobile" style="">\n' +
    '                            {{userName}}\n' +
    '                        </span>\n' +
    '                        <i class="fa fa-angle-down"></i>\n' +
    '                    </a>\n' +
    '                    <ul class="dropdown-menu dropdown-menu-default">\n' +
    '                        <li class="tooltips" data-ng-class="isCurrent(item)" data-ng-repeat="item in navRoutes | filter:{ MenuType: 3}">\n' +
    '                            <a href="#{{item.ConfigName.toLowerCase()}}" ng-click="menuClick(item)">\n' +
    '                                <i ng-class="item.IconClass"></i>\n' +
    '                                <span class="title" data-ng-bind-html="item.text"></span>\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                        <li>\n' +
    '                            <a ng-click="userProfileClick()">\n' +
    '                                <i class="fa fa-user"></i> My Profile\n' +
    '                            </a>\n' +
    '                            <a href={{feedback}} ng-click="feedbackClick()">\n' +
    '                                <i class="fa fa-envelope"></i>\n' +
    '                                Feedback\n' +
    '                            </a>\n' +
    '                            <a ng-click="aboutUsClick()">\n' +
    '                                <i class="fa fa-info-circle"></i> About RMS\n' +
    '                            </a>\n' +
    '                            <hr size="1" style="margin: 0px;" />\n' +
    '                            <a ng-click="logOut()">\n' +
    '                                <i class="icon-key"></i> Log Out\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </li>\n' +
    '                <!-- END USER LOGIN DROPDOWN -->\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <!-- END TOP NAVIGATION MENU -->\n' +
    '    </div>\n' +
    '    <!-- END HEADER INNER -->\n' +
    '</div>\n' +
    '<!-- END HEADER -->\n' +
    '\n' +
    '\n' +
    '<navcon-modal navcon-data="this" title="Session Timeout" icon="glyphicon glyphicon-map-marker" footer=\'\' id="idletimeout" size="navcon-modal-sm">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-12">\n' +
    '            <timer ng-attr-countdown="idleConfirmTimeOut" interval="1000" autostart=false>\n' +
    '                <h4>Session has been idle in past <span style="color:blue; font-weight:600">{{$parent.getTimeoutMinutes()}} </span> minutes. It will be automatically signout in after <span style="color:red; font-weight:600">{{countdown}}</span> Seconds.</h4>\n' +
    '                <div class="progress">\n' +
    '                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em;width: {{progressBar}}%;">\n' +
    '                        {{progressBar}}%\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </timer>\n' +
    '            <div class="text-center">\n' +
    '                <navcon-button icon="" text="Cancel" ng-click="timeOutClose()"></navcon-button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</navcon-modal>\n' +
    '\n' +
    '<!--<navcon-modal navcon-data="this" title="About" icon="fa fa-info-circle" footer=\'\' id="aboutUs" size="navcon-modal-md">-->\n' +
    '<div id="aboutUs" class="modal fade">\n' +
    '    <div class="modal-dialog" role="document">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span class="{{aboutUsData.titleIcon}}" aria-hidden="true"></span>\n' +
    '                </button>\n' +
    '                <h4 class="modal-title">{{aboutUsData.title}}</h4>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <div class="form-group row text-center">\n' +
    '                    <div class="h3 col-md-12" style="color:#f26521;letter-spacing:5px;">{{aboutUsData.companyName}}</div>\n' +
    '                </div>\n' +
    '                <div class="form-group row text-center">\n' +
    '                    <div class="col-md-12" style="color:#f26521;letter-spacing:5px;"><span style="color: black; margin: 0px;" class="h6">{{aboutUsData.version}}</span></div>\n' +
    '                </div>\n' +
    '                <div class="form-group row">\n' +
    '                    <div class="col-md-12 text-center">\n' +
    '                        <!--<p style="text-align: justify">{{aboutUsData.description}}</p>-->\n' +
    '                        <p>{{aboutUsData.description}}</p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <div class="row">\n' +
    '                    <div class="col-lg-12 text-center">\n' +
    '                        <p>\n' +
    '                            Copyright <!--<i class="fa fa-copyright" style="color: black;"></i>--> {{aboutUsData.yearBy}}\n' +
    '                            <a class="link blue" ng-click="aboutUsSiteClick()"> {{aboutUsData.copyWriter}}</a>\n' +
    '                        </p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<!--</navcon-modal>-->\n' +
    '\n' +
    '<div class="clearfix">\n' +
    '</div>\n' +
    '\n' +
    '<!-- BEGIN CONTAINER -->\n' +
    '<div class="page-container">\n' +
    '    <!-- BEGIN SIDEBAR -->\n' +
    '    <!--<div data-cc-sidebar when-done-animating="vm.sidebarReady()" data-ng-controller="Sidebar as vm">-->\n' +
    '    <!--<div>-->\n' +
    '    <div class="page-sidebar-wrapper" style="display: inline;height: 100%;position:absolute;">\n' +
    '        <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->\n' +
    '        <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->\n' +
    '        <div class="page-sidebar" style="display: inline-block;height: 100%;z-index: 1000 !important;position:absolute">\n' +
    '            <!-- BEGIN SIDEBAR MENU -->\n' +
    '            <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->\n' +
    '            <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->\n' +
    '            <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->\n' +
    '            <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->\n' +
    '            <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->\n' +
    '            <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->\n' +
    '            <div class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-bottom: 50px;">\n' +
    '                <div class="profile text-center">\n' +
    '                    <div class="profile_pic">\n' +
    '                        <img style="width:150px;height:150px;" ng-src="{{userProfileImage}}" alt="..." class="img-circle profile_img">\n' +
    '                    </div>\n' +
    '                    <div class="profile_info">\n' +
    '                        <h2>{{UserFullName}}</h2>\n' +
    '                        <!--<h2>{{userName}}</h2>-->\n' +
    '                        <!--<span>{{Designation}}</span>-->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div id="sidebar-menu1" class="main_menu_side hidden-print main_menu">\n' +
    '                    <div class="menu_section active">\n' +
    '                        <ul style="" class="nav side-menu" id="Mainmenu">\n' +
    '                            <li id="mainMenuId_{{menu.id}}" class="{{$index==0?\'active\':\'\'}}" ng-cloak ng-repeat="menu in menus">\n' +
    '                                <a ng-cloak ng-click="menuClick($event)"><i class="{{menu.IconClass}}"></i> <div style="display:inline-block;">{{menu.text}}</div><span class="{{$index===0?\'fa fa-chevron-down\' :\'fa fa-chevron-right\'}}"></span></a>\n' +
    '                                <ul style="display:{{$index==0?\'block\':\'none\'}}" class="nav child_menu">\n' +
    '                                    <li id="mainMenuSubId_{{submenu.id}}" class="{{$index==0 && $parent.$index==0?\'current-page\':\'\'}}" ng-repeat="submenu in menu.children" ng-if="submenu.MenuType!=2"><a ng-click="submenuClick($event,menu,submenu)" href="{{submenu.ConfigName}}">{{submenu.text}} </a></li>\n' +
    '                                </ul>\n' +
    '                            </li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->\n' +
    '                <!--<li class="sidebar-toggler-wrapper">-->\n' +
    '                <!-- BEGIN SIDEBAR TOGGLER BUTTON -->\n' +
    '                <!--<div class="sidebar-toggler">\n' +
    '                </div>-->\n' +
    '                <!-- END SIDEBAR TOGGLER BUTTON -->\n' +
    '                <!--<!-- </li>-->\n' +
    '                <!-- BEGIN DYNAMIC LINK -->\n' +
    '                <!--<li class="tooltips" data-ng-class="isCurrent(item)" data-ng-repeat="item in navRoutes | filter: mainMenuFilter">\n' +
    '                    <a href="#{{item.ConfigName.toLowerCase()}}" ng-click="menuClick(item)">\n' +
    '                        <i ng-class="item.IconClass"></i>\n' +
    '                        <span class="title" data-ng-bind-html="item.text"></span>\n' +
    '                    </a>\n' +
    '                </li>-->\n' +
    '                <!-- END DYNAMIC LINK -->\n' +
    '            </div>\n' +
    '            <!-- END SIDEBAR MENU -->\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--</div>-->\n' +
    '    <!-- END SIDEBAR -->\n' +
    '    <!-- BEGIN CONTENT -->\n' +
    '    <div id="pagewrapper" class="page-content-wrapper loading-overlay bs-loading-container">\n' +
    '        <!--bs-loading-overlay bs-loading-overlay-template-options="{radius:8, width:5, length: 15, color: \'orange\', opacity : 3, backdrop: true}" bs-loading-overlay-delay="500">-->\n' +
    '        <div id="pagecontent" class="page-content">\n' +
    '            <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->\n' +
    '            <div class="modal fade" id="portlet-config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display:none;">\n' +
    '                <div class="modal-dialog">\n' +
    '                    <div class="modal-content">\n' +
    '                        <div class="modal-header">\n' +
    '                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
    '                            <h4 class="modal-title">Modal title</h4>\n' +
    '                        </div>\n' +
    '                        <div class="modal-body">\n' +
    '                            Widget settings form goes here\n' +
    '                        </div>\n' +
    '                        <div class="modal-footer">\n' +
    '                            <button type="button" class="btn blue">Save changes</button>\n' +
    '                            <button type="button" class="btn default" data-dismiss="modal">Close</button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- /.modal-content -->\n' +
    '                </div>\n' +
    '                <!-- /.modal-dialog -->\n' +
    '            </div>\n' +
    '            <!-- /.modal -->\n' +
    '            <!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->\n' +
    '            <!-- BEGIN STYLE CUSTOMIZER -->\n' +
    '            <!-- END STYLE CUSTOMIZER -->\n' +
    '            <!-- BEGIN ACTUAL CONTENT -->\n' +
    '            <div id="mainview" data-ng-view class="shuffle-animation viewlogin col-md-12 col-sm-12"></div>\n' +
    '            <!--<div ngplus-overlay ngplus-overlay-delay-in="50" ngplus-overlay-delay-out="700" ngplus-overlay-animation="dissolve-animation">\n' +
    '                <img src="images/busy.gif" />-->\n' +
    '            <!-- <div class="page-spinner-message overlay-message">{{vm.busyMessage}}</div>-->\n' +
    '            <!--</di\n' +
    '            v>-->\n' +
    '            <!--<div\n' +
    '            ui-view class="fade-in-up">\n' +
    '\n' +
    '            </div> -->\n' +
    '            <!--END\n' +
    '            ACTUAL CONTENT -->\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '<!--</div>\n' +
    '</div>-->\n' +
    '<!-- END CONTENT -->\n' +
    '<!-- END CONTAINER -->\n' +
    '<!-- BEGIN FOOTER\n' +
    '<div class="page-footer">\n' +
    '    <div class="page-footer-inner">\n' +
    '    </div>\n' +
    '    <div class="scroll-to-top">\n' +
    '        <i class="icon-arrow-up"></i>\n' +
    '    </div>\n' +
    '</div> -->\n' +
    '<!-- END FOOTER -->\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconKendo/navconKendoSchedule.html',
    '<navcon-portlet header-title="" navcon-data="vm" class="box blue-hoki" icon="" tools-disp="" is-title="false">\n' +
    '    <div class="form-group row">\n' +
    '        <div class="paginationBtns col-md-12 nopadding" ng-hide="true">\n' +
    '            <!--<div class="col-md-1" ng-if="1=2">\n' +
    '                <select class="schedulerPage" ng-model="schedulerPage.data" style="width: 50%;"></select>\n' +
    '            </div>-->\n' +
    '            <div class="col-md-9">\n' +
    '                <select class="schedulerMS col-md-12" ng-model="schedulerGroup.data"></select>\n' +
    '                <!--<button class="schedulerMSB col-md-1" ng-if="1=2" ng-click="multiselectGroup()">Group</button>-->\n' +
    '            </div>\n' +
    '            <div class="col-md-2 text-right nopadding">\n' +
    '                <button class="k-button k-primary btnPrev" ng-click="prevPage()"><span class="k-icon k-i-collapse-w"></span> Prev</button>\n' +
    '                <button class="k-button k-primary btnNext" ng-click="nextPage()">Next <span class="k-icon k-i-expand-w"></span></button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-12">\n' +
    '            <div class="kendoSchedule"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</navcon-portlet>\n' +
    '\n' +
    '<script id="groupHeaderTemplate" type="text/x-kendo-template">\n' +
    '    <strong style="color: #=color#">#=text#</strong>\n' +
    '</script>\n' +
    '<!--<script id="event-template1" type="text/x-kendo-template">\n' +
    '    <div>Title: #: title #</div>\n' +
    '    <div>\n' +
    '        Attendees:\n' +
    '        # for (var i = 0; i < resources.length; i++) { #\n' +
    '        #: resources[i].text #\n' +
    '        # } #\n' +
    '    </div>\n' +
    '</script>\n' +
    '<script>\n' +
    '      function getColor(data) {\n' +
    '        if (data.title === "The Help") {\n' +
    '          return "red";\n' +
    '        } else {\n' +
    '          return "blur";\n' +
    '        }\n' +
    '      }\n' +
    '</script>\n' +
    '<script id="event-template2" type="text/x-kendo-template">\n' +
    '    <div class="movie-template" style="background-color:#:getColor(data)#">\n' +
    '        <img src="#= image #">\n' +
    '        <p>\n' +
    '            #: kendo.toString(start, "hh:mm") # - #: kendo.toString(end, "hh:mm") #\n' +
    '        </p>\n' +
    '        <h3>#: title #</h3>\n' +
    '        <a href="#= imdb #">Movie in IMDB</a>\n' +
    '    </div>\n' +
    '</script>-->\n' +
    '<!--<p>#: description #</p>-->\n' +
    '\n' +
    '<script id="event-template" type="text/x-kendo-template">\n' +
    '    <div class="k-scheduler-event-title" style="background-color:#: color #">\n' +
    '        <!--<div class="k-events k-button">-->\n' +
    '            <div class="k-event-template k-event-time">#: kendo.toString(start, "hh:mm") # - #: kendo.toString(end, "hh:mm") #</div>\n' +
    '            <div class="k-event-template">#: title #</div>\n' +
    '        <!--</div>-->\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script id="editor1" type="text/x-kendo-template">\n' +
    '    <h3>Edit meeting</h3>\n' +
    '    <p>\n' +
    '        <label>Title: <input name="title" /></label>\n' +
    '    </p>\n' +
    '    <p>\n' +
    '        <label>Start: <input data-role="datetimepicker" name="start" /></label>\n' +
    '    </p>\n' +
    '    <p>\n' +
    '        <label>End: <input data-role="datetimepicker" name="end" /></label>\n' +
    '    </p>\n' +
    '</script>\n' +
    '\n' +
    '<script id="editor2" type="text/x-kendo-template">\n' +
    '    <div class="boxc-col">\n' +
    '        <form role="form" class="form-horizontal">\n' +
    '\n' +
    '            <div class="form-group">\n' +
    '                <label class="col-md-3">Start</label>\n' +
    '                <div class="col-md-6">\n' +
    '                    <input kendo-date-picker k-ng-model="dataItem.start" />\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label class="col-md-3">End</label>\n' +
    '                <div class="col-md-6">\n' +
    '                    <input kendo-date-picker k-ng-model="dataItem.end" />\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label class="col-md-3">Comment</label>\n' +
    '                <div class="col-md-7">\n' +
    '                    <textarea data-bind="value:comment" rows="2" cols="25" class="form-control" placeholder="Comment"></textarea>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</script>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconKendo/navconKendoTable.html',
    '<div class="kendoGrid"></div>\n' +
    '<!--<script id="detail-template" type="text/x-kendo-template">\n' +
    '    <div>\n' +
    '        Name: #: name #\n' +
    '    </div>\n' +
    '    <div>\n' +
    '        Age: #: age #\n' +
    '    </div>\n' +
    '</script>\n' +
    '    <script id="row-template" type="text/x-kendo-template">\n' +
    '    <tr data-uid="#= uid #">\n' +
    '        <td colspan="2">\n' +
    '            <strong>#: name #</strong>\n' +
    '            <strong>#: age #</strong>\n' +
    '        </td>\n' +
    '    </tr>\n' +
    '</script>\n' +
    '<script id="popup-editor" type="text/x-kendo-template">\n' +
    '    <h3>Edit Person</h3>\n' +
    '    <p>\n' +
    '        <label>Name:<input name="name" /></label>\n' +
    '    </p>\n' +
    '    <p>\n' +
    '        <label>Age: <input data-role="numerictextbox" name="age" /></label>\n' +
    '    </p>\n' +
    '</script>\n' +
    '<script id="template" type="text/x-kendo-template">\n' +
    '<a class="k-button" href="\\#" onclick="return toolbar_click()">Command</a>\n' +
    '</script>\n' +
    '-->\n' +
    '<!--<script src="https://kendo.cdn.telerik.com/2017.3.913/js/pako_deflate.min.js"></script>-->\n' +
    '<script id="print-template" type="x/kendo-template">\n' +
    '    <div class="k-page-template">\n' +
    '        <div class="header">            \n' +
    '            #=title#\n' +
    '        </div>\n' +
    '        <div class="watermark">Navcon Aerospace</div>\n' +
    '        <div class="footer">\n' +
    '            <div style="float: left">Date #=date#</div>\n' +
    '            <div style="float: right">\n' +
    '                Page #: pageNum # of #: totalPages #\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '<script id="toolbar-template" type="text/x-kendo-template">\n' +
    '    <a class="k-button" href="\\#" onclick="return toolbar_click()">Command</a>\n' +
    '</script>\n' +
    '<script>\n' +
    '    function toolbar_click() {\n' +
    '        console.log("Toolbar command is clicked!");\n' +
    '        return false;\n' +
    '    }\n' +
    '</script>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconKendo/navconKendoTemplate.html',
    '<div>\n' +
    '    <script type="text/html" id="Rating-editor">\n' +
    '    </script>\n' +
    '\n' +
    '    <div class="kendotemplateInclude" ng-transclude="">\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconMenu/navconMenuGroupTemplate.html',
    '\n' +
    '<li class="navcon-selectable-item" ng-click="clicked()" ng-class="{\'navcon-item-horizontal\': !isVertical()}">\n' +
    '    <div class="navcon-noselect">\n' +
    '        <i class="fa {{icon}} navcon-menu-icon"></i>\n' +
    '        {{label}}\n' +
    '        <i ng-if="isVertical()"\n' +
    '           class="fa fa-chevron-left navcon-group-indicator-left"\n' +
    '           ng-class="{\'fa-rotate-270\': isOpen}"></i>\n' +
    '    </div>\n' +
    '</li>\n' +
    '<div ng-show="isOpen" class="navcon-subitem-section navcon-fade-in-animation" ng-class="{\'navcon-popup-menu\': !isVertical() }">\n' +
    '    <ul ng-transclude></ul>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconMenu/navconMenuItemTemplate.html',
    '<li class="tooltips" ng-class="{\'navcon-item-horizontal\': !isVertical()}" >\n' +
    '    <a href="#/{{label}}">\n' +
    '        <i class="fa {{icon}}"></i>\n' +
    '        <span class="title">{{label}}</span>\n' +
    '    </a>\n' +
    '</li>\n' +
    '\n' +
    '<!--\n' +
    '<li class="tooltips ng-scope" data-ng-class="vm.isCurrent(r)" data-ng-repeat="r in vm.navRoutes">\n' +
    '                    <a href="#/samples1">\n' +
    '                        <i class="fa fa-pencil-square-o"></i>\n' +
    '                        <span class="title ng-binding" data-ng-bind-html="r.settings.content"> Samples1</span>\n' +
    '                    </a>\n' +
    '                </li>-->');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconMenu/navconMenuTemplate.html',
    '\n' +
    '<div>\n' +
    '    <ul class="navcon-menu" ng-transclude></ul>\n' +
    '    <a class="btn navcon-menu-layout-button"\n' +
    '       ng-show="allowHorizontalToggle"\n' +
    '       ng-class="{\'navcon-layout-button-horizontal\': !isVertical}"\n' +
    '       ng-click="toggleMenuOrientation()">\n' +
    '        <i class="fa"\n' +
    '           ng-class="{\'fa-chevron-up\': isVertical, \'fa-chevron-left\': !isVertical}"></i>\n' +
    '    </a>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconModal/navconModalTemplate.html',
    '<div class="modal container fade" tabindex="-1" style="display: none;" data-backdrop="static" data-keyboard="false">\n' +
    '    <div class="content"  style="cursor: default">\n' +
    '        <div class="modal-header" style="cursor: move">\n' +
    '            <button class="close" type="button"  ng-click="cancel(type)"></button>\n' +
    '            <h4 class="modal-title {{icon}}"> <span style="font-family: \'Open Sans\', sans-serif; font-size: 16px;">{{title}}</span></h4>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <div class="row">\n' +
    '                <div class="col-lg-12"  ng-transclude="">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="modal-footer" fields="fields" style="cursor: move">\n' +
    '            <button ng-show="footer.indexOf(\'S\') !== -1" type="button" ng-click="save(type)" class="btn default box">{{navconData.mode || \'Save\'}}</button>\n' +
    '            <button ng-show="footer.indexOf(\'O\') !== -1" type="button" ng-click="navconData.ok(type)" class="btn default box">Ok</button>\n' +
    '            <button ng-show="footer.indexOf(\'C\') !== -1" type="button" ng-click="navconData.cancel(type)" class="btn default box">Cancel</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconPagebar/navconPagebarTemplate.html',
    '<div class="page-bar">\n' +
    '    <ul class="page-breadcrumb">\n' +
    '        <li data-ng-repeat="item in breadcrumbs">\n' +
    '            <i class="{{item.class}}"></i>\n' +
    '            <a href="#/{{item.url}}">{{item.title}}</a>\n' +
    '            <i ng-show="!$last" class="fa fa-angle-right"></i>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconRating/navconRatingTemplate.html',
    '<div style=\'display: inline-block; margin: 0px; padding: 0px; cursor:pointer;\' ng-repeat=\'idx in maxRatings track by $index\'>\n' +
    '    <img ng-src=\'{{((hoverValue + _rating) <= $index) && "http://www.codeproject.com/script/ratings/images/star-empty-lg.png" || "http://www.codeproject.com/script/ratings/images/star-fill-lg.png"}}\' ng-Click=\'click($index + 1)\' ng-mouseenter=\'mouseHover($index + 1)\' ng-mouseleave=\'mouseLeave($index + 1)\'></img>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconPortlet/navconPortletTemplate.html',
    '<div class="portlet {{class}}">\n' +
    '    <div class="portlet-title" ng-show="isTitle == \'true\'">\n' +
    '        <div class="caption" ng-show="showCaption == \'true\'">\n' +
    '            <i class="{{icon}}"></i>{{title}}\n' +
    '        </div>\n' +
    '        <div style="padding-top: 10px; float:left;">\n' +
    '            &nbsp;&nbsp;{{subTitle}}\n' +
    '        </div>\n' +
    '        <div class="tools">\n' +
    '            <a ng-show="toolsDisp.indexOf(\'C\') !== -1" href="javascript:;" style="position: relative;" class="{{toolCollapse ? \'expand\' : \'collapse\'}}"></a>\n' +
    '            <a ng-show="toolsDisp.indexOf(\'F\') !== -1" href="javascript:;" class="fullscreen fa fa-expand"></a>\n' +
    '            <a ng-show="toolsDisp.indexOf(\'R\') !== -1" href="javascript:;" style="top:-3px;position: relative;" class="fa fa-refresh" ng-click="refresh($event)"></a>\n' +
    '            <a ng-show="toolsDisp.indexOf(\'P\') !== -1" href="javascript:;" class="fa fa-print" ng-click="print()"></a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="portlet-body">\n' +
    '        <div class="form-body" ng-transclude="">\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconReport/navconReportPageTemplate.html',
    '<div id="reportpreview">\n' +
    '    <div class="row">\n' +
    '        <div class="col-sm-4">\n' +
    '            <div class="panel-group" id="accordion">\n' +
    '                <div class="panel panel-default" id="panel1">\n' +
    '                    <div class="panel-heading" data-toggle="collapse" data-target=\'#collapse1\' id="panelHeading1" ng-click="expandCollapse(\'panelHeading1\',\'panelTitle1\',\'collapse1\')">\n' +
    '                        <h4 class="panel-title collapsed" data-toggle="collapse" data-target=\'#collapse1\' data-parent="#panelHeading1" id="panelTitle1">My Favourites</h4>\n' +
    '                    </div>\n' +
    '                    <div class="panel-collapse collapse" id="collapse1">\n' +
    '                        <div class="panel-body padding0">\n' +
    '                            <div id="myFav" class="report-list">\n' +
    '                                <ul>\n' +
    '                                    <li ng-repeat="favorite in favorites" ng-click="reportClick($event, favorite)">{{favorite.ReportName}}</li>\n' +
    '                                </ul>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="panel panel-default" id="panel2">\n' +
    '                    <div class="panel-heading" data-toggle="collapse" data-target=\'#collapse2\' id="panelHeading2" ng-click="expandCollapse(\'panelHeading2\',\'panelTitle2\',\'collapse2\')">\n' +
    '                        <h4 class="panel-title collapsed" data-toggle="collapse" data-target=\'#collapse2\' data-parent="#panelHeading2" id="panelTitle2">All Reports</h4>\n' +
    '                    </div>\n' +
    '                    <div class="panel-collapse collapse" id="collapse2">\n' +
    '                        <div class="panel-body padding0">\n' +
    '                            <div id="allReports" class="report-list">\n' +
    '                                <ul>\n' +
    '                                    <li ng-repeat="report in reports" ng-click="reportClick($event, report)">{{report.ReportName}}</li>\n' +
    '                                </ul>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-sm-8">\n' +
    '            <!-- Right container -------------------------------------------------------------->\n' +
    '            <div id="graph_placeholder">\n' +
    '                <!--<img id="dummy" src="images/report-preview.png">-->\n' +
    '                <img id="dummy" ng-src="{{report.previewImage}}" alt="...">\n' +
    '                <div class="text-center" style="margin-bottom:20px; margin-top:20px;">\n' +
    '                    <navcon-button icon="" class="btn btn-success" text="Generate" ng-hide="rportId == undefined" ng-click="generate()"></navcon-button>\n' +
    '                </div>\n' +
    '                <!--<div ng-hide="rportId == undefined" ng-click="generate()" class="text-center"><a id="addtemplate" class="btn btn-info" style="margin-bottom:20px; margin-top:20px;"><span class="glyphicon"></span>Generate</a></div>-->\n' +
    '            </div>\n' +
    '\n' +
    '            <!-- Right container End -------------------------------------------------------------->\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<div id="reportgenerate" style="display:none;">\n' +
    '    <div id="returntoreport" style="padding:10px 0px 10px 10px; border:0px solid #000; text-align:center; background-color:#D8D8D8;">\n' +
    '        {{report.title}}\n' +
    '        <span style="float:right;margin-top: -8px;margin-right: -4px;">\n' +
    '            <navcon-button icon="" class="btn btn-success btnRight" text="Return to report list" ng-hide="rportId == undefined" ng-click="returntoreport()"></navcon-button>\n' +
    '        </span>\n' +
    '        <!--<span ng-click="returntoreport()" id="return-to-report-list" style="background-color:#900; padding:10px;color:#FFF; margin-top:-10px; float:right">\n' +
    '        <span class="glyphicon glyphicon-arrow-left"></span> Return to report list\n' +
    '        </span>-->\n' +
    '    </div>\n' +
    '    </p>\n' +
    '    <div>\n' +
    '        <div id="icons" style="width:75px; float:left;">\n' +
    '            <!-- List container -------------------------------------------------------------->\n' +
    '            <div class="display-result" data="favourite">\n' +
    '                <span ng-class="isFavorite ? \'glyphicon-star\' : \'glyphicon-star-empty\'" ng-click="favoriteClick($event)" class="star glyphicon glyphicon-star-empty"></span>\n' +
    '            </div>\n' +
    '            <div ng-click="compare()" class="display-result" data="compare"><img src="images/compare.png"></div>\n' +
    '            <!-- List container End -------------------------------------------------------------->\n' +
    '        </div><!-- End left container ----------------------->\n' +
    '        <div style="overflow:hidden;">\n' +
    '            <!-- Right container -------------------------------------------------------------->\n' +
    '            <div class="row">\n' +
    '                <!-- Inner Left container -------------------------------------------------------------->\n' +
    '                <div id="report1" ng-class="isSplit?\'col-xs-6\':\'col-xs-12\'" style="background-color:#F2F2F2; border:1px solid #CCC; text-align:center; padding-right:0px !important;">\n' +
    '                    <navcon-report navcon-data="navconData" report-id="reportdiv1" report-source="report.source" report-title="report.title" page="yes"></navcon-report>\n' +
    '                </div><!-- End Inner List container -------------------------------------------------------------->\n' +
    '                <!-- Inner Right container -------------------------------------------------------------->\n' +
    '                <div ng-if="isSplit" id="report2" class="col-xs-6" style="background-color:#F2F2F2; border:1px solid #CCC; text-align:center; padding-left:1px !important;">\n' +
    '                    <navcon-report navcon-data="navconData" report-id="reportdiv2" report-source="report.source" report-title="report.title" page="yes"></navcon-report>\n' +
    '                </div><!-- End Inner Right container -------------------------------------------------------------->\n' +
    '            </div> <!-- Row end -->\n' +
    '        </div><!-- End right container ----------------------->\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconReport/navconReportTemplate.html',
    '<navcon-modal  ng-if="page == \'no\' && export == \'false\'" navcon-data="this" field-data="" title="{{reportTitle}}" icon="fa fa-flask" footer="" id="reports_{{reportId}}" type="reports_{{reportId}}" size="navcon-modal-report">\n' +
    '    <div class="col-md-12">\n' +
    '        <iframe id="reportIframe"style="border: transparent;"></iframe>\n' +
    '    </div>\n' +
    '    <div class="col-md-1 col-md-offset-11">\n' +
    '        <navcon-button text="Close" ng-click="closeReport();"></navcon-button>\n' +
    '    </div>\n' +
    '</navcon-modal>\n' +
    '\n' +
    '<div ng-if="page == \'yes\'" class="row">\n' +
    '    <div class="col-md-12">\n' +
    '        <iframe style="border: transparent;"></iframe>\n' +
    '\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<div ng-if="page == \'no\' && export == \'true\'" navcon-data="navconData" class="row">\n' +
    '    <div class="col-md-12">\n' +
    '        <iframe id="reportIframe" style="border: transparent;display:none;"></iframe>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconTable/navconTableTemplate.html',
    '<div class="table-scrollable">\n' +
    '    <!--<table class="table table-striped table-bordered table-hover dt-responsive nowrap"></table>-->\n' +
    '    <table class="table table-striped table-bordered table-hover {{cssClass}}"></table>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconTableEditor/navconTableEditorTemplate.html',
    '<div class="table-editor">\n' +
    '    <table class="table table-striped table-bordered table-hover dt-responsive">\n' +
    '        <thead>\n' +
    '            <tr class="table-editor-header-row">\n' +
    '                <td class="table-editor-header-data col-xs-1" ng-if="showSlno">SI. No.</td>\n' +
    '                <td class="table-editor-header-data {{field.class}}" ng-repeat="field in settings.fields" ng-if="(field.titlenotrequired==undefined) && field.name!=undefined && field.name!=\'\'">\n' +
    '                    {{field.name}}\n' +
    '                </td>\n' +
    '                <td class="table-editor-header-data" ng-if="!readOnly && data.length==0 && showAdd">\n' +
    '                    <button class="btn btn-primary" ng-click="action.addNew()" data-toggle="tooltip" data-original-title="Add" title="Add"><i class="fa fa-plus" /></button>\n' +
    '                </td>\n' +
    '                <td class="table-editor-header-data" ng-if="!readOnly && data.length>0 && (showAdd || showUpdate ||showDel)">\n' +
    '                    &nbsp;\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '            <tr class="table-editor-body-row" ng-repeat="item in data">\n' +
    '                <td class="table-editor-sno" ng-if="showSlno">{{item.fields.sno}}</td>\n' +
    '                <td class="table-editor-data {{field.class}}" ng-repeat="field in item.fields" ng-if="field.titlenotrequired==undefined && field.name!=undefined?true:false ">\n' +
    '                    <navcon-form field-data="item.fields" footer=\'\' type="fileldtype1" navcon-data="navconData" read-only="readOnly" >\n' +
    '                        <navcon-field label-class="labelhide" field-key="{{field.key}}" ng-show="field.visible!=undefined?field.visible:true"></navcon-field>\n' +
    '                        <navcon-field label-class="labelhide" field-key="{{field.addtionalField}}" ng-show="field.addtionalFieldVisible!=undefined?field.addtionalFieldVisible:false" ng-if="field.addtionalField!==undefined"></navcon-field>\n' +
    '                    </navcon-form>\n' +
    '                    <!--<navcon-form field-data="item.fields" footer=\'\' type="fileldtype1" navcon-data="navconData"  ng-if="field.templateOptions.hyperlink!=undefined&&field.templateOptions.hyperlink==\'yes\'">\n' +
    '                        <navcon-field label-class="labelhide" field-key="{{field.key}}" ng-show="field.visible!=undefined?field.visible:true" ng-disabled="readOnly"></navcon-field>\n' +
    '                    </navcon-form>-->\n' +
    '                </td>\n' +
    '                <td class="table-editor-save" ng-if="showUpdate && !readOnly">\n' +
    '                    <button class="btn btn-floppy" ng-click="save($index)" data-toggle="tooltip" data-original-title="Save" title="Save"><i class="fa fa-floppy-o" /></button>\n' +
    '                </td>\n' +
    '                <td class="table-editor-del" ng-if="$last && showAdd && !readOnly">\n' +
    '                    <button class="btn btn-primary " ng-click="action.addNew()" data-toggle="tooltip" data-original-title="Add" title="Add"><i class="fa fa-plus" /></button>\n' +
    '                </td>\n' +
    '                <td class="table-editor-del" ng-if="showDel && !readOnly && data.length>1">\n' +
    '                    <button class="btn btndelete" ng-click="delete($index)" data-toggle="tooltip" data-original-title="Delete" title="Delete"><i class="fa fa-trash-o" /></button>\n' +
    '                </td>\n' +
    '\n' +
    '            </tr>\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '\n' +
    '    <div class="row table-editor-bottom" ng-if="showoverAllsave && !readOnly">\n' +
    '        <button class="btn btn-success rightSide table-editor-add" ng-click="save()" data-toggle="tooltip" data-original-title="Save" title="Save"> {{saveButtontext !="" ? saveButtontext:\'Save\'}} <i class="fa fa-floppy-o" /></button>\n' +
    '    </div>\n' +
    '    <div class="row table-editor-bottom" ng-if="showItar && !readOnly">\n' +
    '        <label style="padding:10px"><input type="checkbox" ng-model="itarwarningChk"><span style="padding:4px">I confirm that any information I upload does not violate the security classifications approved for this site and network. I further confirm that the content is not technical data, as defined by International Traffic in Arms Regulations (ITAR), or technology, as defined by Export Administration Regulations (EAR).</span></label>\n' +
    '        <button class="btn btn-success rightSide table-editor-add" ng-click="save()" data-toggle="tooltip" data-original-title="Save" title="Save" ng-disabled="!itarwarningChk"> {{saveButtontext !="" ? saveButtontext:\'Save\'}}  <i class="fa fa-floppy-o" /></button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconTree/navconTreeTemplate.html',
    '<div class="row">\n' +
    '    <div class="col-md-4 text-left" style="padding-top:7px;">\n' +
    '        <div class="navcon-group">\n' +
    '            <input data-checkbox="icheckbox_flat-green" class="icheck form-control" type="checkbox" ng-model="isExpand" />\n' +
    '            <label class="navcon-checkbox control-label">{{typeText}}</label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div id="tree_filter" class="dataTables_filter col-md-6 col-md-pull-2">\n' +
    '        <label>\n' +
    '            <span class="input-inline dtFilterSearch"><i class="fa fa-search"></i></span>\n' +
    '            <input type="search" class="form-control input-medium input-inline" placeholder="" aria-controls="DataTables_Table_13" style="margin-left: -3px !important;">\n' +
    '        </label>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div type="tree"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconUpload/navconFileUploadTemplate.html',
    '<div class="form-group">\n' +
    '    <table class="table table-hover table-bordered table-striped">\n' +
    '        <thead>\n' +
    '            <tr style="background:#243649;color:#fff;">\n' +
    '                <th style="width:12%;">Sl. No.</th>\n' +
    '                <th style="width:55%;">Name</th>\n' +
    '                <th style="width:10%;">Size</th>\n' +
    '                <th style="width:30%;" ng-if="!readonly || showOnly">Settings</th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '            <tr ng-repeat="file in myFiles">\n' +
    '                <td>{{$index+1}}</td>\n' +
    '                <td>{{file.name}}</td>\n' +
    '                <td>{{(file.status !== undefined && file.status == "new") ? ((file.size/1024).toFixed() + "KB") : file.size}}</td>\n' +
    '                <td ng-if="!readonly || showOnly">\n' +
    '                    <div class="btn-group">\n' +
    '                        <a ng-disabled="$parent.openStatus(file)" ng-click="$parent.openClick(file)" class="btn btn-mini btn-info" ng-click="file.retry()">\n' +
    '                            Open\n' +
    '                        </a>\n' +
    '                        <span ng-hide="photoChangeable == false"  ng-if="!readonly">\n' +
    '                            <a class="btn btn-mini btn-danger" ng-click="$parent.remove(file)">\n' +
    '                                Remove\n' +
    '                            </a>\n' +
    '                        </span>\n' +
    '                    </div>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '    <div class="navcon-group fileupload-confirm" ng-show="(isAgreeVisible && !readonly)">\n' +
    '        <input type="checkbox" class="icheck form-control ng-pristine ng-valid ng-touched" ng-model="isAgree" ng-true-value="\'yes\'" ng-false-value="\'no\'">\n' +
    '        <label class="navcon-checkbox  control-label">{{agreeText}}</label>\n' +
    '    </div>\n' +
    '    <input type="file" id="fileUpload" accept="*.*" file-model="myFiles" style="visibility: hidden; position: absolute;">\n' +
    '    <button ng-disabled="(multipleFile == undefined || !multipleFile)  && myFiles.length >= 1 || isAgree == \'no\'" type="button" ng-click="chooseClick()" class="btn default box" ng-hide="photoChangeable == false" ng-if="!readonly">Choose Files</button>\n' +
    '    <button type="button" ng-click="upload()" class="btn default box" ng-hide="hideUpload()">Upload</button>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconUpload/navconMultipleUploadTemplate.html',
    '<div flow-init="" flow-files-submitted="$flow.upload()" class="ng-scope">\n' +
    '    <div class="drop" flow-drop="" ng-class="dropClass">\n' +
    '        <span class="btn btn-default" flow-btn="">Upload File<input type="file" multiple="multiple" style="visibility: hidden; position: absolute;"></span>\n' +
    '        <span class="btn btn-default" flow-btn="" flow-directory="" ng-show="$flow.supportDirectory">Upload Folder<input type="file" multiple="multiple" webkitdirectory="webkitdirectory" style="visibility: hidden; position: absolute;"></span>\n' +
    '        <b>OR</b> Drag And Drop your file here\n' +
    '    </div>\n' +
    '    <br>\n' +
    '    <table class="table table-hover table-bordered table-striped" flow-transfers>\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th style="width:5%;">Sl. No.</th>\n' +
    '                <th style="width:30%;">Name</th>\n' +
    '                <th style="width:8%;">Size</th>\n' +
    '                <th style="width:27%;">Complete</th>\n' +
    '                <th style="width:30%;">Settings</th>\n' +
    '</tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '            <tr ng-repeat="file in transfers">\n' +
    '                <td>{{$index+1}}</td>\n' +
    '                <td>{{file.name}}</td>\n' +
    '                <td>{{file.size}}</td>\n' +
    '                <td>\n' +
    '                    <div class="flow-progress-bar progress progress-striped" ng-class="{active: file.isUploading()}">\n' +
    '                        <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" ng-style="{width: (file.progress() * 100) + \'%\'}" style="width: 100%;">\n' +
    '                            <span class="sr-only ng-binding">1% Complete</span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </td>\n' +
    '                <td>\n' +
    '                    <div class="btn-group">\n' +
    '                        <a class="btn btn-mini btn-warning" ng-click="file.pause()" ng-hide="file.paused">\n' +
    '                            Pause\n' +
    '                        </a>\n' +
    '                        <a class="btn btn-mini btn-warning" ng-click="file.resume()" ng-show="file.paused">\n' +
    '                            Resume\n' +
    '                        </a>\n' +
    '                        <a class="btn btn-mini btn-danger" ng-click="file.cancel()">\n' +
    '                            Cancel\n' +
    '                        </a>\n' +
    '                        <a class="btn btn-mini btn-info" ng-click="file.retry()" ng-show="file.error">\n' +
    '                            Retry\n' +
    '                        </a>\n' +
    '                    </div>\n' +
    '</td>\n' +
    '            </tr>\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconUpload/navconPhotoUploadTemplate.html',
    '<div class="form-group">\n' +
    '    <span ng-hide="true">{{myImage[0].name}}</span>\n' +
    '    <div class="fileinput-new thumbnail" style="width: 160px; height: 160px;">\n' +
    '        <img id="photoPreview" ng-src="{{src}}" alt="" style="width: 150px; height: 150px;">\n' +
    '    </div>\n' +
    '    <div class="navcon-group fileupload-confirm" ng-hide="!isAgreeVisible || (photoChangeable == false || myImage.length >= 1)">\n' +
    '        <input type="checkbox" class="icheck form-control ng-pristine ng-valid ng-touched" ng-model="isAgree" ng-true-value="\'yes\'" ng-false-value="\'no\'">\n' +
    '        <label class="navcon-checkbox  control-label">{{agreeText}}</label>\n' +
    '    </div>\n' +
    '\n' +
    '    <input type="file" id="photoUpload" accept="image/*" file-model="myImage" style="visibility: hidden; position: absolute;">\n' +
    '    <button type="button" ng-click="chooseClick()" class="btn default box" ng-disabled="isAgree == \'no\'" ng-hide="photoChangeable == false || myImage.length >= 1">Choose</button>\n' +
    '    <button type="button" ng-click="upload()" class="btn default box" ng-hide="photoChangeable == false || mode.toLowerCase() == \'save\' || myImage[0].status === undefined || myImage[0].status === \'\' ">Upload</button>\n' +
    '    <button type="button" ng-click="remove()" ng-if="!readonly" class="btn default box" ng-hide="photoChangeable == false || myImage.length === 0">{{cancel()}}</button>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconFramework/navconUserProfile/navconUserProfileSmallTemplate.html',
    '\n' +
    '<div class="navcon-user-profile-small pull-right">\n' +
    '    <img src="images/employee-don.png" alt="user image" />\n' +
    '    <span>Sadique</span>\n' +
    '    <button class="btn btn-default btn-sm">\n' +
    '        <i class="fa fa-chevron-down"></i>\n' +
    '    </button>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rmsPartials');
} catch (e) {
  module = angular.module('rmsPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/ext-modules/navconFramework/navconUserProfile/navconUserProfileTemplate.html',
    '<!--\n' +
    '<div class="navcon-user-profile" ng-if="isMenuVertical && !isMenuButtonVisible">\n' +
    '    <img src="images/employee-don.png" alt="user image"/>\n' +
    '    <div>\n' +
    '        <p>Sadique</p>\n' +
    '        <p></p>\n' +
    '        <button class="btn btn-default btn-sm">\n' +
    '            <i class="fa fa-chevron-down"></i>\n' +
    '        </button>\n' +
    '    </div>\n' +
    '</div>-->\n' +
    '<li class="dropdown dropdown-user">\n' +
    '\n' +
    '    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">\n' +
    '        <img alt="" class="img-circle" src="../../../Assets/images/content/layout/img/avatar3_small.jpg">\n' +
    '       \n' +
    '        <span class="username username-hide-on-mobile">\n' +
    'Ali </span>\n' +
    '        <i class="fa fa-angle-down"></i>\n' +
    '    </a>\n' +
    '    <ul class="dropdown-menu dropdown-menu-default">\n' +
    '        <li>\n' +
    '            <a href="extra_profile.html">\n' +
    '                <i class="icon-user"></i> My Profile </a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <a href="page_calendar.html">\n' +
    '                <i class="icon-calendar"></i> My Calendar </a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <a href="inbox.html">\n' +
    '                <i class="icon-envelope-open"></i> My Inbox <span class="badge badge-danger">\n' +
    '3 </span>\n' +
    '            </a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <a href="page_todo.html">\n' +
    '                <i class="icon-rocket"></i> My Tasks <span class="badge badge-success">\n' +
    '7 </span>\n' +
    '            </a>\n' +
    '        </li>\n' +
    '        <li class="divider">\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <a href="extra_lock.html">\n' +
    '                <i class="icon-lock"></i> Lock Screen </a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <a href="login.html">\n' +
    '                <i class="icon-key"></i> Log Out </a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '\n' +
    '</li>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '');
}]);
})();
