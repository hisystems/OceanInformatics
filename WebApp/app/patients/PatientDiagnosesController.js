var MoleChecks;
(function (MoleChecks) {
    var Measure;
    (function (Measure) {
        var PatientDiagnosesController = (function () {
            function PatientDiagnosesController(moleChecks, authenticationService, $stateParams, $window) {
                var _this = this;
                this.moleChecks = moleChecks;
                this.authenticationService = authenticationService;
                this.$stateParams = $stateParams;
                this.$window = $window;
                this.model = MoleChecks.Model;
                this.genders = MoleChecks.Model.Gender;
                this.cellTypeDescription = function (cellType) { return MoleChecks.Model.enumFlagsDescription(MoleChecks.Model.CellType, cellType); };
                this.melanomaTypeOptions = MoleChecks.Model.melanomaTypeList;
                this.clarkLevelOptions = MoleChecks.Model.enumToList(MoleChecks.Model.ClarkLevel);
                this.bodyLocationOptions = MoleChecks.Model.enumToList(MoleChecks.Model.BodyLocation);
                this.imageTypeOptions = MoleChecks.Model.enumToList(MoleChecks.Model.ImageType);
                this.associatedNaevusTypeOptions = MoleChecks.Model.enumToList(MoleChecks.Model.AssociatedNaevusType);
                this.skinDamageOptions = MoleChecks.Model.enumToList(MoleChecks.Model.SkinDamage);
                this.ajccOptions = MoleChecks.Model.enumToList(MoleChecks.Model.AmericanJointCancerCouncilStaging);
                this.intensityOptions = MoleChecks.Model.enumToList(MoleChecks.Model.Intensity);
                this.editing = false;
                this.highlightImageId = $stateParams.highlightImageId;
                moleChecks.patients.get($stateParams.patientId)
                    .then(function (patient) {
                    _this.patient = patient;
                    return patient.getDiagnoses()
                        .then(function (patientDiagnoses) { return _this.diagnoses = patientDiagnoses; });
                });
            }
            PatientDiagnosesController.prototype.startEditing = function (index) {
                this.editing = true;
                this.edit = this.diagnoses[index].update();
            };
            PatientDiagnosesController.prototype.save = function (index) {
                var _this = this;
                this.edit.save().then(function () {
                    _this.edit.copyTo(_this.diagnoses[index]);
                    _this.editing = false;
                }).catch(function (error) { return _this.error = error; });
            };
            PatientDiagnosesController.prototype.cancelEditing = function () {
                this.editing = false;
            };
            Object.defineProperty(PatientDiagnosesController.prototype, "selectedTab", {
                get: function () {
                    var _this = this;
                    if (this.highlightImageId == null)
                        return 0;
                    else
                        return _.findIndex(this.diagnoses, function (diagnosis) { return _.findIndex(diagnosis.images, function (image) { return image.id == _this.highlightImageId; }) >= 0; });
                },
                enumerable: true,
                configurable: true
            });
            PatientDiagnosesController.id = "patientDiagnosesController";
            PatientDiagnosesController.$inject = [MoleChecks.Model.MoleChecksData.id, 'authenticationService', '$stateParams', '$window'];
            return PatientDiagnosesController;
        }());
        Measure.PatientDiagnosesController = PatientDiagnosesController;
        moleChecksApp.controller(PatientDiagnosesController.id, PatientDiagnosesController);
        moleChecksApp.config(['$stateProvider', function ($stateProvider) {
                $stateProvider
                    .state('master.patientDiagnoses', {
                    url: '/patients/:patientId/diagnoses',
                    templateUrl: 'app/patients/PatientDiagnoses.html',
                    controller: 'patientDiagnosesController as vm',
                    params: {
                        patientId: '@patientId',
                        highlightImageId: null
                    }
                });
            }]);
    })(Measure = MoleChecks.Measure || (MoleChecks.Measure = {}));
})(MoleChecks || (MoleChecks = {}));
//# sourceMappingURL=PatientDiagnosesController.js.map