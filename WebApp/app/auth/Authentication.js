var OceanInformatics;
(function (OceanInformatics) {
    var Authentication;
    (function (Authentication) {
        var AuthenticationService = (function () {
            function AuthenticationService() {
            }
            AuthenticationService.prototype.authenticatedUser = function (accessToken) {
                // redirect to auth service - allow user to enter
                // redirect back to window.location
                this.accessTokenInternal = accessToken;
                localStorage["accessToken"] = accessToken;
            };
            // Clear the token so that authentication do not include the bearer token.
            AuthenticationService.prototype.unauthenticated = function () {
                localStorage["accessToken"] = this.accessTokenInternal = "";
            };
            Object.defineProperty(AuthenticationService.prototype, "accessToken", {
                get: function () {
                    if (!this.accessTokenInternal)
                        this.accessTokenInternal = localStorage["accessToken"];
                    return this.accessTokenInternal;
                },
                enumerable: true,
                configurable: true
            });
            AuthenticationService.id = "authenticationService";
            AuthenticationService.$inject = [];
            return AuthenticationService;
        }());
        Authentication.AuthenticationService = AuthenticationService;
        oceanInformaticsApp.service(AuthenticationService.id, AuthenticationService);
        oceanInformaticsApp.factory("authInterceptor", [
            "$q", AuthenticationService.id, "$location",
            function ($q, authenticationService, $location) {
                return {
                    request: function (config) {
                        config.headers = config.headers || {};
                        var accessToken = authenticationService.accessToken;
                        if (accessToken)
                            config.headers["Authorization"] = "Bearer " + accessToken;
                        return config || $q.when(config);
                    },
                    responseError: function (response) {
                        // If not authorized then redirect to the login page
                        if (response.status === 401) {
                            $location.url("/authenticate");
                            authenticationService.unauthenticated();
                        }
                        return $q.reject(response);
                    }
                };
            }
        ]);
        oceanInformaticsApp.config(['$httpProvider', function ($httpProvider) {
                $httpProvider.interceptors.push('authInterceptor');
            }]);
    })(Authentication = OceanInformatics.Authentication || (OceanInformatics.Authentication = {}));
})(OceanInformatics || (OceanInformatics = {}));
//# sourceMappingURL=Authentication.js.map