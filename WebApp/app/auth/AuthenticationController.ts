module OceanInformatics.Authentication
{
    interface ITokenData
    {
        access_token: string;
    }

    export class AuthenticationController
    {
        public static id = "authenticationController";

        public static $inject = ['authenticationService', '$state', '$window', '$http'];

        constructor(
            $authenticationService: AuthenticationService,
            $state: ng.ui.IStateService,
            $window: ng.IWindowService,
            $http: angular.IHttpService,
        )
        {
            const virtualDirectory = "/oceaninformatics";   // Major hack.
            const codeParams = /[\?&]code=([^&#]*)/i.exec(window.location.href);
            const redirectBackToSelf = encodeURIComponent($window.location.origin + virtualDirectory);

            if (codeParams == null) {
                // Just redirect back to the main location which will then redirect to /authenticate because ! cannot be a URI fragment in the redirect URI.
                $window.location.href = `https://clare.oceaninformatics.com/npscdrb2b/authorisation/oauth2/Authorize?response_type=code&client_id=nps.mlplus&redirect_uri=${redirectBackToSelf}&state=30fb55af4834416aaa2c2d4de27bfcfd`;
            }
            else {
                const code = codeParams[1];

                $http.post('https://clare.oceaninformatics.com/npscdrb2b/authorisation/oauth2/token', {
                    grant_type: 'authorization_code',
                    client_id: 'nps.mlplus',
                    redirect_uri: $window.location.origin + virtualDirectory,
                    code: code,
                }).then(response => {
                    var accessToken = (response.data as ITokenData).access_token;
                    $authenticationService.authenticatedUser(accessToken);
                    $state.go('patients');
                }, error => alert(error));
            }
        }
    }

    oceanInformaticsApp.controller(AuthenticationController.id, AuthenticationController);

    oceanInformaticsApp.config(['$stateProvider', function ($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state('authenticate', {
                url: '/authenticate',
                controller: 'authenticationController as vm'
            });
    }]);

}