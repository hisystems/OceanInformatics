module OceanInformatics.Patients {

    export interface IPatientParams {
        patient: Model.Patient;
    }

    export class PatientController {

        public static id = "PatientController";

        public static $inject = ['$uibModalInstance', 'params', '$state'];

        private error: string = null;
        private genders = {
            [Model.Gender.Male]: "Male",
            [Model.Gender.Female]: "Female"
        };

        constructor(
            private $uibModalInstance: angular.ui.bootstrap.IModalInstanceService,
            private params: IPatientParams,
            private $state: ng.ui.IStateService) {
        }

        private save(patient: Model.Patient) {

            patient.save()
                .then(() => this.close())
                .catch(error => this.error = error);
        }

        private close() {
            this.$uibModalInstance.close(true);
        }

        public static open($uibModal: angular.ui.bootstrap.IModalService, params: IPatientParams): ng.IPromise<boolean> {

            var options = {
                templateUrl: 'app/patients/Patient.html',
                controller: PatientController.id,
                controllerAs: 'modal',
                resolve: {
                    params: params
                }
            } as angular.ui.bootstrap.IModalSettings;

            return $uibModal.open(options).result;
        }
    }

    oceanInformaticsApp.controller(PatientController.id, PatientController);
}