(function () {
    'use strict';
    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger, $templateCache, ngAuthSettings, apiEndUrl) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var service = {
            getData: getData,
            putData: putData,
            getServerData: getServerData,
            postServerData: postServerData,
            putServerData: putServerData,
            deleteServerData: deleteServerData,
            getTemplateURL: getTemplateURL,
            getFields: getFields,
            fileUpload: fileUpload,
            excelFileUpload: excelFileUpload,
            fileDelete: fileDelete,
            JSONUrl: JSONUrl,
            getServerPath: getServerPath,
            getFiles: getFiles,
            getServerHtmlData: getServerHtmlData
        };
        var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

        // Define the string
        function JSONUrl(url) {

            return $http.get(url)
                .then(getDataComplete)
                .catch(function (message) {
                    //exception.catcher('XHR Failed')(message);
                    //$location.url('/');
                    return serverValidation(message);
                });

            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            }
        }

        function getFiles(type, page, endPoint) {
            var url = serviceBase + type + (page != undefined ? "/" + page : "");

            if (endPoint !== undefined && endPoint !== "")
                url = serviceBase + endPoint;

            return $http.get(url, { responseType: "arraybuffer" })
                .then(getDataComplete)
                .catch(function (message) {
                    return serverValidation(message);
                });

            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            }
        }

        function getServerPath(type, rowId) {
            var returnData = navcon.route.UI(serviceBase, type, rowId);
            return returnData.toString().replace(serviceBase, "");
        }

        function getData(type, page, endPoint) {
            var url = serviceBase + type + (page != undefined ? "/" + page : "");

            if (endPoint !== undefined && endPoint !== "")
                url = serviceBase + endPoint;

            return $http.get(url)
                .then(getDataComplete)
                .catch(function (message) {
                    return serverValidation(message);
                });

            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            }
        }

        function putData(type, data, endPoint) {
            var url = serviceBase + type;

            if (endPoint !== undefined && endPoint !== "")
                url = serviceBase + endPoint;
            if (data.hasOwnProperty('History')) {
                var Historydata = data["History"] != undefined ? data["History"] : "";
                data["History"] = Base64.encode(JSON.stringify(Historydata));
            }
            return $http.put(url, data, {
                headers: { 'Content-Type': 'application/json' }
            }).then(getDataComplete)
            .catch(function (message) {
                //exception.catcher('XHR Failed')(message);
                //$location.url('/');
                return serverValidation(message);
            });

            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            }
        }

        function getServerURL(type, rowId) {
            var returnData = '';
            returnData = navcon.route.UI(serviceBase, type, rowId);
            return returnData;
        }

        function getServerData(type, rowId, endPoint) {
            var url = getServerURL(type, rowId);
            if (endPoint !== undefined && endPoint !== "")
                url = serviceBase + endPoint;
            if (url !== "" && url != serviceBase) {
                return $http.get(url)
                    .then(getDataComplete)
                    .catch(function (message) {
                        if (message.status === 401) {
                            $location.path('/refresh');
                            $location.path('/login');
                        }
                        else {
                            //exception.catcher('XHR Failed')(message);
                            //$location.url('/');
                            return serverValidation(message);
                        }
                    });
            }

            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            }
        };

        function getServerHtmlData(endPoint) {
            var url;
            if (endPoint !== undefined && endPoint !== "")
                url = endPoint;
            if (url !== "" ) {
                return $http.get(url)
                    .then(getDataComplete)
                    .catch(function (message) {
                        if (message.status === 401) {
                            $location.path('/refresh');
                            $location.path('/login');
                        }
                        else {
                            //exception.catcher('XHR Failed')(message);
                            //$location.url('/');
                            return serverValidation(message);
                        }
                    });
            }

            function getDataComplete(returnData, status, headers, config) {
                return returnData;
            }
        };


        function postServerData(type, data, upload, formData, endPoint) {
            var url = getServerURL(type);

            if (endPoint !== undefined && endPoint !== "")
                url = serviceBase + endPoint;
            if (data.hasOwnProperty('History')) {
                var Historydata = data["History"] != undefined ? data["History"] : "";
                data["History"] = Base64.encode(JSON.stringify(Historydata));
            }

            //var jsonString = JSON.stringify(data);
            //var encodeRequest = Base64.encode(jsonString);

            return $http.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(getDataComplete)
            .catch(function (message) {
                //exception.catcher('XHR Failed')(message);
                return serverValidation(message);
            });

            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            };
        };

        function fileUpload(formData) {
            var url = serviceBase + "/upload";
            return $http.post(url, formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(getDataComplete)
            .catch(function (message) {
                //exception.catcher('XHR Failed')(message);
                return serverValidation(message);
            });

            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            };
        };

        function excelFileUpload(formData) {
            var url = serviceBase + "/readExcel/upload";
            return $http.post(url, formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(getDataComplete)
            .catch(function (message) {
                return serverValidation(message);
            });

            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            };
        };

        function fileDelete(type, id) {
            var url = serviceBase + "/" + type + "/" + id;
            return $http.delete(url).then(getDataComplete)
            .catch(function (message) {
                //exception.catcher('XHR Failed')(message);
                return serverValidation(message);
            });
            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            }
        };

        function putServerData(type, data) {
            var url = getServerURL(type);
            //var jsonString = JSON.stringify(data);
            //var encodeRequest = Base64.encode(jsonString);

            if (data.hasOwnProperty('History')) {
                var Historydata = data["History"] != undefined ? data["History"] : "";
                data["History"] = Base64.encode(JSON.stringify(Historydata));
            }
            return $http.put(url, data, {
                headers: { 'Content-Type': 'application/json' }
            }).then(getDataComplete)
            .catch(function (message) {
                //exception.catcher('XHR Failed')(message);
                //$location.url('/');
                return serverValidation(message);
            });

            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            }
        };

        function deleteServerData(type, data) {
            var url = getServerURL(type);
            if (data !== undefined || data !== "") url += "/" + data;

            return $http.delete(url).then(getDataComplete)
            .catch(function (message) {
                //exception.catcher('XHR Failed')(message);
                //$location.url('/');
                return serverValidation(message);
            });

            function getDataComplete(returnData, status, headers, config) {
                return returnData.data;
            }
        };

        function serverValidation(message) {
            var arrData = null;
            if (message.data !== undefined && message.data !== null) {
                if (message.data.ModelState !== undefined && message.data.ModelState !== null) {
                    arrData = message.data.ModelState[""];
                } else if (message.data !== undefined && typeof message.data === "object") {
                    arrData = message.data;
                }

                if (arrData !== undefined && arrData !== null && arrData.length !== undefined && arrData.length > 0) {
                    $.map(arrData, function (item, key) {
                        if (item !== undefined)
                            exception.catcher(item)(message);
                    });
                } else if (arrData !== undefined && arrData !== null) {
                    if (arrData.ExceptionMessage !== undefined) exception.catcher(arrData.ExceptionMessage)(message);
                } else if (message.data !== undefined && message.data !== "") {
                    exception.catcher(message.data)(message);
                }
            }

            return;
        }

        function getFields(type) {
            var defer = $q.defer();

            $http.get('/api/getData/' + type).then(function (response) {
                defer.resolve(response.data[0].data.results);
            }, function (response) {
                exception.catcher('XHR Failed')(message);
                $location.url('/');
                defer.reject(response);
            });

            return defer.promise;
        };

        function getTemplateURL(keyOrUrl) {
            var data = $templateCache.get(keyOrUrl);

            if (data) {
                return data;
            } else {
                return $http.get(keyOrUrl, { cache: true })
                .then(getDataComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed')(message);
                    $location.url('/');
                });
            }

            function getDataComplete(data, status, headers, config) {
                $templateCache.put('navconfield.html', data.data);
                return data.data;
            }
        };

        return service;
    }
})();