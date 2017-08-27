module OceanInformatics.Model
{
    interface ITokenData {
        access_token: string;
        account_name: string;
        role: string;
    }

    export class OceanInformaticsData
    {
        public static $inject = ['$http', 'authenticationService'];

        public static id = "oceanInformaticsData";

        constructor(private $http: angular.IHttpService)
        {
        }

        public get patients(): Patients
        {
            return new Patients(this.$http);
        }
    }

    oceanInformaticsApp.service(OceanInformaticsData.id, OceanInformaticsData);
}