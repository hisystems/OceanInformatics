module OceanInformatics.Library
{
    oceanInformaticsApp.directive("error", [() => {
        return {
            restrict: 'E',
            scope: {
                error: "="
            },
            templateUrl: "app/library/Error.html",
            replace: true
        };
    }]);
}