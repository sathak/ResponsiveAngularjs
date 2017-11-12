/*global describe, it, beforeEach, inject, expect*/
(function() {
    'use strict';

    describe('Userprofile Controller', function() {
        var _userProfileController, scope, _pageConfig = {},
            _dataservice, _$http, _$httpBackend, _authService, _q, _ngAuthSettings;
        var returnedJSON = {};
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        // Load the modules
        beforeEach(module('LocalStorageModule'));
        beforeEach(module('app'));
        beforeEach(module('app.core'));
        beforeEach(module('blocks.logger'));
        beforeEach(module('blocks.exception'));
        beforeEach(module('app.userprofile'));

        beforeEach(inject(function($controller, $rootScope, $httpBackend, ngAuthSettings) {
            scope = $rootScope.$new();
            _$httpBackend = $httpBackend;
            _ngAuthSettings = ngAuthSettings;
            _authService = {};
            _authService.authentication = {
                isAuth: false,
                userName: "Unit Test",
                userId: 1,
                useRefreshTokens: false,
                userRights: {},
                notification: {},
                Designation: "",
                Roles: {},
                version: ""
            };

            _ngAuthSettings.unitTest = true;

            var pageObj = readJSON('clientFields/administration/userProfileConfig.json');
            pageObj.data = {};
            _pageConfig = pageObj;

            _userProfileController = $controller('userprofile', {
                $scope: scope,
                pageConfig: _pageConfig,
                authService: _authService,
                ngAuthSettings: _ngAuthSettings
            });
        }));

        afterEach(function() {
            _$httpBackend.verifyNoOutstandingExpectation();
            _$httpBackend.verifyNoOutstandingRequest();
        });

        describe('userprofile', function() {

            // Test some basic expectations about the controller
            it('should have userId defined', function() {
                expect(_userProfileController.userId).toBeDefined();
            });

            it('should have userName defined', function() {
                expect(_userProfileController.userName).toBeDefined();
            });

            it('should have primaryKey defined', function() {
                expect(_userProfileController.primaryKey).toBeDefined();
            });

            it('should have readOnly defined', function() {
                expect(_userProfileController.readOnly).toBeDefined();
            });

            it('should have formManage defined', function() {
                expect(_userProfileController.formManage).toBeDefined();
            });

            it('should have pageConfig defined', function() {
                expect(_userProfileController.pageConfig).toBeDefined();
            });

            it('should have userProfileFields defined', function() {
                expect(_userProfileController.userProfileFields).toBeDefined();
            });

            it('should have changePasswordFields defined', function() {
                expect(_userProfileController.changePasswordFields).toBeDefined();
            });

        });
    });
}());