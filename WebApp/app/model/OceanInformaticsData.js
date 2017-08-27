var OceanInformatics;
(function (OceanInformatics) {
    var Model;
    (function (Model) {
        var OceanInformaticsData = (function () {
            function OceanInformaticsData($http) {
                this.$http = $http;
            }
            Object.defineProperty(OceanInformaticsData.prototype, "patients", {
                get: function () {
                    return new Model.Patients(this.$http);
                },
                enumerable: true,
                configurable: true
            });
            OceanInformaticsData.$inject = ['$http', 'authenticationService'];
            OceanInformaticsData.id = "oceanInformaticsData";
            return OceanInformaticsData;
        }());
        Model.OceanInformaticsData = OceanInformaticsData;
        oceanInformaticsApp.service(OceanInformaticsData.id, OceanInformaticsData);
    })(Model = OceanInformatics.Model || (OceanInformatics.Model = {}));
})(OceanInformatics || (OceanInformatics = {}));
//# sourceMappingURL=OceanInformaticsData.js.map