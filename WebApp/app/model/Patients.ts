module OceanInformatics.Model
{
    interface IResponse
    {
        entry: IResourceContainer[];
    }

    export class Patients
    {
        constructor(private $http: angular.IHttpService) {
        }

        public getAll(): ng.IPromise<Model.Patient[]> {

            return this.$http.get(oceanInformaticsConfig.webApiRootUri + "Patient?_summary=false")
                .then(response => {
                    return _.map((response.data as IResponse).entry as IResourceContainer[], resourceContainer => new Patient(this.$http, resourceContainer.resource as IPatientResource));
                });
        }
    }
}