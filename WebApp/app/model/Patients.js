var OceanInformatics;
(function (OceanInformatics) {
    var Model;
    (function (Model) {
        var Patients = (function () {
            function Patients($http) {
                this.$http = $http;
            }
            Patients.prototype.getAll = function () {
                var _this = this;
                return this.$http.get(oceanInformaticsConfig.webApiRootUri + "Patient?_summary=false")
                    .then(function (response) {
                    return _.map(response.data.entry, function (resourceContainer) { return new Model.Patient(_this.$http, resourceContainer.resource); });
                });
            };
            return Patients;
        }());
        Model.Patients = Patients;
    })(Model = OceanInformatics.Model || (OceanInformatics.Model = {}));
})(OceanInformatics || (OceanInformatics = {}));
//# sourceMappingURL=Patients.js.map