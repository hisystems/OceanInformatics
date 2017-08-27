var OceanInformatics;
(function (OceanInformatics) {
    var Library;
    (function (Library) {
        oceanInformaticsApp.directive("error", [function () {
                return {
                    restrict: 'E',
                    scope: {
                        error: "="
                    },
                    templateUrl: "app/library/Error.html",
                    replace: true
                };
            }]);
    })(Library = OceanInformatics.Library || (OceanInformatics.Library = {}));
})(OceanInformatics || (OceanInformatics = {}));
//# sourceMappingURL=Error.js.map