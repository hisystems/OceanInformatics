module OceanInformatics.Patients
{
    export class PatientsController
    {
        public static id = "patientsController";

        public static $inject = [OceanInformatics.Model.OceanInformaticsData.id, '$state', '$uibModal'];

        private genders = OceanInformatics.Model.Gender;
        private error: string;
        private patients: OceanInformatics.Model.Patient[];

        constructor(
            private oceanData: OceanInformatics.Model.OceanInformaticsData,
            private $state: ng.ui.IStateService,
            private $uibModal: angular.ui.bootstrap.IModalService)
        {
            this.load();
        }

        private load()
        {
            this.oceanData.patients.getAll()
                .then(patients => this.patients = patients)
                .catch(error => this.error = error);
        }

        private rowClicked(patient: OceanInformatics.Model.Patient) {

            PatientController.open(this.$uibModal, { patient: patient })
                .then(() => this.load());
        }
    }

    oceanInformaticsApp.controller(PatientsController.id, PatientsController);

    oceanInformaticsApp.config(['$stateProvider', function ($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state('patients', {
                url: '/patients',
                templateUrl: 'app/patients/Patients.html',
                controller: 'patientsController as vm'
            });
    }]);

}