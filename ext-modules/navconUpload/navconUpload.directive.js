"use strict";
angular.module('app').directive('navconFileUpload', ['dataservice', 'appInfo', 'photoManager', 'logger', 'ngAuthSettings', '$timeout',
    function(dataservice, appInfo, photoManager, logger, ngAuthSettings, $timeout) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            scope: {
                myFiles: '=',
                mode: '=',
                type: '=',
                keyData: '=',
                keyName: '=',
                keyReturn: '=',
                multipleFile: '=',
                photoChangeable: '=',
                agreeText: '=',
                fileSize: '=',
                fileType: '=',
                sameFile: '=',
                showOnly: '='
            },
            //templateUrl: 'ext-modules/navconUpload/navconFileUploadTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconFileUpload");
            },
            link: function(scope, el, attrs) {
                scope.title = "test";
                scope.hasFiles = false;
                scope.photos = [];
                scope.upload = photoManager.upload;
                scope.appStatus = appInfo.status;
                scope.photoManagerStatus = photoManager.status;
                scope.isAgree = "no";
                scope.readonly = scope.$parent.readOnly != undefined ? scope.$parent.readOnly : (scope.$parent.readonly != undefined ? scope.$parent.readonly : false);

                scope.$watch("$parent.readOnly", function(newValue, oldValue) {
                    if (newValue != undefined) {
                        scope.readonly = newValue;
                        /*if(scope.readonly)
                            scope.showOnly = true;
                        else
                            scope.showOnly = false;*/
                    }
                });

                scope.$watch("$parent.readonly", function(newValue, oldValue) {
                    if (newValue != undefined)
                        scope.readonly = newValue;
                });

                scope.$watch("showOnly", function(newValue, oldValue) {
                    if (newValue != undefined)
                        scope.readonly = newValue;
                });

                if (scope.fileSize === undefined)
                    scope.fileSize = 0;

                if (scope.fileType === undefined)
                    scope.fileType = [];

                if (scope.sameFile === undefined)
                    scope.sameFile = false;

                if (scope.showOnly === undefined)
                    scope.showOnly = false;

                /*if (scope.agreeText !== undefined && scope.agreeText !== "")
                    scope.isAgreeVisible = true;
                else {
                    scope.isAgreeVisible = false;
                    scope.isAgree = "yes";
                }*/
                scope.$watch("agreeText", function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== "")
                        scope.isAgreeVisible = true;
                    else {
                        scope.isAgreeVisible = false;
                        scope.isAgree = "yes";
                    }
                });

                scope.remove = function(file) {
                    if (file.status === undefined || file.status === '') {
                        removeFile(file);
                        dataservice.fileDelete("download/Delete", file.id).then(function(status) {
                            removeFile(file);
                            logger.success("File(" + file.name + ") is removed successfully...", "", "");
                        });
                    } else {
                        removeFile(file);
                    }
                };

                scope.cancel = function(file) {
                    var retValue = "Cancel";
                    if (file.status === undefined || file.status === '')
                        retValue = 'Remove';
                    return retValue;
                };

                scope.openStatus = function(file) {
                    var retValue = true;
                    if (file.status === undefined || file.status === '')
                        retValue = false;
                    return retValue;
                };

                scope.openClick = function(file) {
                    dataservice.getFiles("", "", "download/GetById/" + file.id).then(function(response) {

                        var blob = new Blob([response], { type: "application/octet-stream" });
                        var url = window.URL.createObjectURL(blob);
                        //for microsoft IE
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(blob, file.name);
                        } else { //other browsers
                            var a = document.createElement('a');
                            a.style = "display:none";
                            a.href = url;
                            a.download = file.name;
                            a.click();
                            window.URL.revokeObjectURL(url);
                        }


                    });

                };

                scope.chooseClick = function() {
                    if (scope.multipleFile === undefined || !scope.multipleFile)
                        scope.myFiles = [];

                    $(el).find("#fileUpload").click();
                };


                scope.hideUpload = function() {
                    var newCount = 0;
                    angular.forEach(scope.myFiles, function(file) {
                        if (file.status !== undefined && file.status === "new") {
                            newCount++;
                        }
                    });

                    if (scope.keyData === undefined || scope.keyData.toString() === "0")
                        return true;
                    else if (newCount === 0 || (scope.mode !== undefined && (scope.mode.toLowerCase() === 'save' || scope.mode.toLowerCase() === 'saveas')))
                        return true;
                    else
                        return false;
                }

                scope.upload = function() {
                    var formData = new FormData();
                    angular.forEach(scope.myFiles, function(file) {
                        if (file.status !== undefined && file.status === "new") {
                            formData.append(file.name, file);
                        }
                    });

                    if (scope.keyData === undefined || scope.keyData === "" || scope.keyData === "0") {
                        scope.keyReturn = { "error": "No keyData" };
                        if (scope.$parent !== undefined && scope.$parent.item !== undefined && scope.$parent.item.templateOptions !== undefined)
                            scope.$parent.item.templateOptions.keyReturn = scope.keyReturn;
                    } else {
                        var dataInfo = {
                            folder: scope.type,
                            id: scope.keyData,
                            name: (scope.keyName !== undefined && scope.keyName !== '' ? scope.keyName : '')
                        };

                        formData.append("data", JSON.stringify(dataInfo));
                        dataservice.fileUpload(formData).then(function(uploadData) {
                            if (uploadData.Files !== undefined && uploadData.Files !== "" && uploadData.Files !== null && uploadData.Files.length > 0)
                                scope.myFiles = uploadData.Files;

                            logger.success("Files are uploaded successfully...", "", "");
                            scope.keyReturn = { "uploaded": scope.myFiles };
                            if (scope.$parent !== undefined && scope.$parent.item !== undefined && scope.$parent.item.templateOptions !== undefined)
                                scope.$parent.item.templateOptions.keyReturn = scope.keyReturn;
                        });
                    }
                };

                if (scope.multipleFile !== undefined && scope.multipleFile)
                    $(el).find("#fileUpload").attr("multiple", "multiple");
                else
                    $(el).find("#fileUpload").removeAttr("multiple");

                function removeFile(file) {
                    var index = navcon.getItemIndexByKeyValue(scope.myFiles, "name", file.name);
                    if (index !== -1) {
                        scope.myFiles.splice(index, 1);
                        scope.keyReturn = { "removed": scope.myFiles };
                        if (scope.$parent !== undefined && scope.$parent.item !== undefined && scope.$parent.item.templateOptions !== undefined)
                            scope.$parent.item.templateOptions.keyReturn = { "removed": scope.myFiles };
                    }
                };


                scope.$on('FILEUPLOAD-CLEAR', function(event, args, uploadClear) {
                    if (args && uploadClear)
                        clearFiles();
                });

                var clearFiles = function() {
                    $timeout(function() {
                        scope.$apply(function() {
                            scope.myFiles = [];
                        });
                    });
                };



            }
        };
    }
]).directive('navconPhotoUpload', ['dataservice', 'appInfo', 'photoManager', 'logger', 'ngAuthSettings', '$timeout',
    function(dataservice, appInfo, photoManager, logger, ngAuthSettings, $timeout) {
        return {
            /*E: Directive defined as an element. <navcon-table></navcon-table>
            A: Directive applied as an attribute on existing element. <div navcon-table></div>
            C: Directive applied as a css class to existing element <div class="navcon-table"></div>
            M: Directive applied as comment.*/
            restrict: 'E',
            scope: {
                myImage: '=',
                mode: '=',
                type: '=',
                keyData: '=',
                keyName: '=',
                photoChangeable: '=',
                fileSize: '=',
                fileType: '=',
                agreeText: '='
            },
            //templateUrl: 'ext-modules/navconUpload/navconPhotoUploadTemplate.html',
            templateUrl: function() {
                return navcon.Menuroute.getTemplateUrl("navconPhotoUpload");
            },
            link: function(scope, el, attrs) {
                scope.title = "test";
                scope.hasFiles = false;
                scope.photos = [];
                scope.upload = photoManager.upload;
                scope.appStatus = appInfo.status;
                scope.photoManagerStatus = photoManager.status;

                if (scope.fileSize === undefined)
                    scope.fileSize = 0;

                if (scope.fileType === undefined)
                    scope.fileType = [];

                scope.isAgree = "no";
                /*if (scope.agreeText !== undefined && scope.agreeText !== "")
                    scope.isAgreeVisible = true;
                else {
                    scope.isAgreeVisible = false;
                    scope.isAgree = "yes";
                }*/
                scope.$watch("agreeText", function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== "")
                        scope.isAgreeVisible = true;
                    else {
                        scope.isAgreeVisible = false;
                        scope.isAgree = "yes";
                    }
                });

                scope.readonly = scope.$parent.readOnly != undefined ? scope.$parent.readOnly : (scope.$parent.readonly != undefined ? scope.$parent.readonly : false);
                scope.$watch("$parent.readOnly", function(newValue, oldValue) {
                    if (newValue != undefined)
                        scope.readonly = newValue;
                });
                scope.$watch("$parent.readonly", function(newValue, oldValue) {
                    if (newValue != undefined)
                        scope.readonly = newValue;
                });

                scope.remove = function() {
                    scope.clearImage();
                    var file = scope.myImage[0];
                    if (file.status === undefined || file.status === '') {
                        //dataservice.fileDelete(scope.type, file.id).then(function (status) {
                        var id = file.id;
                        if (id === undefined) id = scope.keyData;
                        dataservice.fileDelete("download/Delete", id).then(function(status) {
                            var fileName = file.name;
                            if (fileName === undefined) fileName = scope.keyName;

                            scope.keyReturn = { "removed": scope.myImage };
                            if (scope.$parent !== undefined && scope.$parent.item !== undefined && scope.$parent.item.templateOptions !== undefined)
                                scope.$parent.item.templateOptions.keyReturn = scope.keyReturn;

                            logger.success("File(" + fileName + ") is removed successfully...", "", "");
                            scope.myImage = [];
                        });
                    } else {
                        var index = navcon.getItemIndexByKeyValue(scope.myImage, "name", file.name);
                        if (index !== -1) {
                            scope.myImage.splice(index, 1);
                            scope.keyReturn = { "removed": scope.myImage };
                            if (scope.$parent !== undefined && scope.$parent.item !== undefined && scope.$parent.item.templateOptions !== undefined)
                                scope.$parent.item.templateOptions.keyReturn = scope.keyReturn;
                        }
                    }
                };

                scope.cancel = function() {
                    //clearImage();
                    var retValue = "Cancel";
                    if (scope.myImage === undefined) return retValue;
                    if (scope.myImage !== undefined && scope.myImage.length < 1) return retValue;
                    var file = scope.myImage[0];
                    if (scope.myImage[0].URL !== null && (file.status === undefined || file.status === ''))
                        retValue = 'Remove';
                    return retValue;
                };

                scope.clearImage = function() {
                    $timeout(function() {
                        scope.$apply(function() {
                            scope.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                        })
                    });
                }

                scope.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

                scope.openStatus = function(file) {
                    var retValue = true;
                    if (file.status === undefined || file.status === '')
                        retValue = false;
                    return retValue;
                };

                scope.loadSrc = function() {
                    var uploadBase = ngAuthSettings.uploadPath;
                    if (scope.myImage !== undefined) //&& scope.myImage.length > 0 && scope.myImage[0].URL !== undefined && scope.myImage[0].URL !== ''
                        scope.src = 'data:image/jpeg;base64,' + scope.myImage; //uploadBase + scope.myImage[0].URL;
                    else
                        scope.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
                };

                scope.chooseClick = function() {
                    scope.myImage = [];
                    $(el).find("#photoUpload").click();
                };

                var base64ToBlob = function(b64Data, contentType) {
                    var byteCharacters = atob(b64Data.split(',')[1]);
                    var byteNumbers = new Array(byteCharacters.length);
                    for (var i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    var byteArray = new Uint8Array(byteNumbers);
                    var blob = new Blob([byteArray], { type: contentType });
                    return blob;
                }

                scope.upload = function() {
                    var formData = new FormData();
                    angular.forEach(scope.myImage, function(file) {
                        if (file.status !== undefined && file.status === "new") {
                            var blob = base64ToBlob(file.base64, file.type);
                            formData.append("blob", blob, file.name);
                            scope.keyName = file.name;
                        }
                    });

                    if (scope.keyData === undefined || scope.keyData === "" || scope.keyData === "0") {
                        scope.keyReturn = { "error": "No keyData" };
                        if (scope.$parent !== undefined && scope.$parent.item !== undefined && scope.$parent.item.templateOptions !== undefined)
                            scope.$parent.item.templateOptions.keyReturn = scope.keyReturn;
                    } else {
                        var dataInfo = {
                            folder: scope.type,
                            id: scope.keyData,
                            name: (scope.keyName !== undefined && scope.keyName !== '' ? scope.keyName : '')
                        };

                        formData.append("data", JSON.stringify(dataInfo));
                        dataservice.fileUpload(formData).then(function(uploadData) {
                            scope.myImage = uploadData.Files;
                            logger.success("Files are uploaded successfully...", "", "");
                            scope.keyReturn = { "uploaded": scope.myImage };
                            if (scope.$parent !== undefined && scope.$parent.item !== undefined && scope.$parent.item.templateOptions !== undefined)
                                scope.$parent.item.templateOptions.keyReturn = scope.keyReturn;
                        });
                    }
                };

                scope.$watch('myImage', function(newValue, oldValue) {
                    if (newValue !== undefined && newValue.length === 0)
                        scope.clearImage();
                    else(newValue !== undefined && newValue.length > 0)
                    scope.loadSrc();

                })

            }
        };
    }
]).directive('fileModel', ['$parse', '$timeout', 'logger', 'blockUI', function($parse, $timeout, logger, blockUI) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);

            var id = $(element).attr("id");
            var modelSetter = model.assign;
            var extList = [{ ext: 'exe' }, { ext: 'zip' }, { ext: 'bat' }]
            var allowExt = scope.fileType;
            element.bind('change', function() {
                if ($(element).val() == "")
                    return;

                if (scope.isAgreeVisible)
                    scope.isAgree = 'no';

                //blockUI.start();   

                $timeout(function() {
                    scope.$apply(function() {
                        if (element[0].files) {
                            angular.forEach(element[0].files, function(f) {
                                if (f.size !== undefined && f.size > 0 && scope.fileSize > 0) {
                                    if ((f.size / 1000) > scope.fileSize) {
                                        logger.warning("File size should be less than " + scope.fileSize.toString() + " kb");
                                        return 0;
                                    }
                                }

                                if ((f.size / 1000) > 2000 && scope.fileSize === "0") {
                                    logger.warning("File size should be less than 2mb");
                                    return 0;
                                }

                                if (scope.sameFile !== undefined && !scope.sameFile && navcon.getItemByKeyValue(scope.myFiles, "name", f.name) !== -1) {
                                    logger.warning("Can not upload the same file name (" + f.name + ")");
                                    return 0;
                                }

                                f["status"] = "new";
                                if (scope.myFiles == "")
                                    scope.myFiles = [];
                                var ext = f.name.split('.').pop().toLowerCase();

                                if (scope.fileType.length > 0 && scope.fileType.indexOf(ext) === -1) {
                                    logger.warning("File format " + scope.fileType.join(',') + " only supported");
                                    return 0;
                                }
                                if (navcon.getItemByKeyValue(extList, "ext", ext) === -1) {
                                    if (id.toLowerCase() === "photoupload") {
                                        getBase64(f, function(base64) {
                                            var fileData = {
                                                lastModified: f.lastModified,
                                                lastModifiedDate: f.lastModifiedDate,
                                                name: f.name,
                                                size: f.size,
                                                type: f.type,
                                                webkitRelativePath: f.webkitRelativePath,
                                                base64: base64,
                                                status: f.status || 'new'
                                            }
                                            $timeout(function() {
                                                scope.myImage.push(fileData);
                                                readURL(f);
                                            })
                                        })
                                    } else {
                                        getBase64(f, function(base64) {
                                            var fileData = {
                                                lastModified: f.lastModified,
                                                lastModifiedDate: f.lastModifiedDate,
                                                name: f.name,
                                                size: f.size,
                                                type: f.type,
                                                webkitRelativePath: f.webkitRelativePath,
                                                base64: base64,
                                                status: f.status || 'new'
                                            }
                                            $timeout(function() {
                                                scope.myFiles.push(fileData);
                                            })
                                        })
                                    }

                                } else {
                                    logger.warning("File format '." + ext + "' not supported.");
                                }
                            });
                            scope.hasFiles = true;
                        }
                        $(element).val("");
                    });
                })
            });

            function blobToDataURL(f, type, callback) {
                var fileReader = new FileReader();
                fileReader.readAsArrayBuffer(f);
                fileReader.onloadend = function(e) {
                    var ab = e.target.result;
                    var blob = new Blob([ab], { type: type });
                    callback(blob);
                };
            }


            function getBase64(file, callback) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function() {
                    callback(reader.result);
                };
                reader.onerror = function(error) {
                    console.log('Error: ', error);
                };
            }


            function readURL(file) {
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $timeout(function() {
                            scope.$apply(function() {
                                scope.src = e.target.result;
                            })
                        });
                    };
                    reader.readAsDataURL(file);
                }
            }

        }
    };
}]);