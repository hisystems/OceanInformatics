var OceanInformatics;
(function (OceanInformatics) {
    var Authentication;
    (function (Authentication) {
        var AuthenticationController = (function () {
            function AuthenticationController($authenticationService, $state, $window, $http) {
                var virtualDirectory = "/oceaninformatics"; // Major hack.
                var codeParams = /[\?&]code=([^&#]*)/i.exec(window.location.href);
                var redirectBackToSelf = encodeURIComponent($window.location.origin + virtualDirectory);
                if (codeParams == null) {
                    // Just redirect back to the main location which will then redirect to /authenticate because ! cannot be a URI fragment in the redirect URI.
                    $window.location.href = "https://clare.oceaninformatics.com/npscdrb2b/authorisation/oauth2/Authorize?response_type=code&client_id=nps.mlplus&redirect_uri=" + redirectBackToSelf + "&state=30fb55af4834416aaa2c2d4de27bfcfd";
                }
                else {
                    var code = codeParams[1];
                    $http.post('https://clare.oceaninformatics.com/npscdrb2b/authorisation/oauth2/token', {
                        grant_type: 'authorization_code',
                        client_id: 'nps.mlplus',
                        redirect_uri: $window.location.origin + virtualDirectory,
                        code: code,
                    }).then(function (response) {
                        var accessToken = response.data.access_token;
                        $authenticationService.authenticatedUser(accessToken);
                        $state.go('patients');
                    }, function (error) { return alert(error); });
                }
            }
            AuthenticationController.id = "authenticationController";
            AuthenticationController.$inject = ['authenticationService', '$state', '$window', '$http'];
            return AuthenticationController;
        }());
        Authentication.AuthenticationController = AuthenticationController;
        oceanInformaticsApp.controller(AuthenticationController.id, AuthenticationController);
        oceanInformaticsApp.config(['$stateProvider', function ($stateProvider) {
                $stateProvider
                    .state('authenticate', {
                    url: '/authenticate',
                    controller: 'authenticationController as vm'
                });
            }]);
    })(Authentication = OceanInformatics.Authentication || (OceanInformatics.Authentication = {}));
})(OceanInformatics || (OceanInformatics = {}));
//# sourceMappingURL=AuthenticationController.js.map