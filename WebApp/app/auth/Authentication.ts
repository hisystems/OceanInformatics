module OceanInformatics.Authentication
{
    export class AuthenticationService
    {
        public static id = "authenticationService";

        public static $inject = [];

        private accessTokenInternal: string;

        public authenticatedUser(accessToken: string)
        {
            // redirect to auth service - allow user to enter
            // redirect back to window.location
            this.accessTokenInternal = accessToken;
            localStorage["accessToken"] = accessToken;
        }

        // Clear the token so that authentication do not include the bearer token.
        public unauthenticated()
        {
            localStorage["accessToken"] = this.accessTokenInternal = "";
        }

        public get accessToken() {

            if (!this.accessTokenInternal)
                this.accessTokenInternal = localStorage["accessToken"];

            return this.accessTokenInternal;
        }
    }

    oceanInformaticsApp.service(AuthenticationService.id, AuthenticationService);

    oceanInformaticsApp.factory("authInterceptor", [
        "$q", AuthenticationService.id, "$location",
        ($q: angular.IQService, authenticationService: AuthenticationService, $location: angular.ILocationService) => {
            return {
                request: (config) => {
                    config.headers = config.headers || {};

                    var accessToken = authenticationService.accessToken;
                    if (accessToken)
                        config.headers["Authorization"] = "Bearer " + accessToken;

                    return config || $q.when(config);
                },
                responseError: (response) => {
                    // If not authorized then redirect to the login page
                    if (response.status === 401) {
                        $location.url("/authenticate");
                        authenticationService.unauthenticated();
                    }
                    return $q.reject(response);
                }
            }
        }
    ]);

    oceanInformaticsApp.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);
}