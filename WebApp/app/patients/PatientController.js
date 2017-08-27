var OceanInformatics;
(function (OceanInformatics) {
    var Patients;
    (function (Patients) {
        var PatientController = (function () {
            function PatientController($uibModalInstance, params, $state) {
                this.$uibModalInstance = $uibModalInstance;
                this.params = params;
                this.$state = $state;
                this.error = null;
                this.genders = (_a = {},
                    _a[OceanInformatics.Model.Gender.Male] = "Male",
                    _a[OceanInformatics.Model.Gender.Female] = "Female",
                    _a);
                var _a;
            }
            PatientController.prototype.save = function (patient) {
                var _this = this;
                patient.save()
                    .then(function () { return _this.close(); })
                    .catch(function (error) { return _this.error = error; });
            };
            PatientController.prototype.close = function () {
                this.$uibModalInstance.close(true);
            };
            PatientController.open = function ($uibModal, params) {
                var options = {
                    templateUrl: 'app/patients/Patient.html',
                    controller: PatientController.id,
                    controllerAs: 'modal',
                    resolve: {
                        params: params
                    }
                };
                return $uibModal.open(options).result;
            };
            PatientController.id = "PatientController";
            PatientController.$inject = ['$uibModalInstance', 'params', '$state'];
            return PatientController;
        }());
        Patients.PatientController = PatientController;
        oceanInformaticsApp.controller(PatientController.id, PatientController);
    })(Patients = OceanInformatics.Patients || (OceanInformatics.Patients = {}));
})(OceanInformatics || (OceanInformatics = {}));
//# sourceMappingURL=PatientController.js.map