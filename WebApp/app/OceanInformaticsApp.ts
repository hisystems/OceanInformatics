const oceanInformaticsApp = angular.module("oceanInformaticsApp", ["ui.router", "ui.utils", "NgSwitchery", "ui.bootstrap"]);

const oceanInformaticsConfig: { webApiRootUri: string } = {

    webApiRootUri: "https://clare.oceaninformatics.com/npscdrb2b/fhir/"

};

oceanInformaticsApp.config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

            $urlRouterProvider.otherwise('patients');

        }
    ]
);