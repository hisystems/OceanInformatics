var OceanInformatics;
(function (OceanInformatics) {
    var Patients;
    (function (Patients) {
        var PatientsController = (function () {
            function PatientsController(oceanData, $state, $uibModal) {
                this.oceanData = oceanData;
                this.$state = $state;
                this.$uibModal = $uibModal;
                this.genders = OceanInformatics.Model.Gender;
                this.load();
            }
            PatientsController.prototype.load = function () {
                var _this = this;
                this.oceanData.patients.getAll()
                    .then(function (patients) { return _this.patients = patients; })
                    .catch(function (error) { return _this.error = error; });
            };
            PatientsController.prototype.rowClicked = function (patient) {
                var _this = this;
                Patients.PatientController.open(this.$uibModal, { patient: patient })
                    .then(function () { return _this.load(); });
            };
            PatientsController.id = "patientsController";
            PatientsController.$inject = [OceanInformatics.Model.OceanInformaticsData.id, '$state', '$uibModal'];
            return PatientsController;
        }());
        Patients.PatientsController = PatientsController;
        oceanInformaticsApp.controller(PatientsController.id, PatientsController);
        oceanInformaticsApp.config(['$stateProvider', function ($stateProvider) {
                $stateProvider
                    .state('patients', {
                    url: '/patients',
                    templateUrl: 'app/patients/Patients.html',
                    controller: 'patientsController as vm'
                });
            }]);
    })(Patients = OceanInformatics.Patients || (OceanInformatics.Patients = {}));
})(OceanInformatics || (OceanInformatics = {}));
//# sourceMappingURL=PatientsController.js.map