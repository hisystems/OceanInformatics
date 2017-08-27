module OceanInformatics.Model
{
    export class Patient
    {
        constructor(
            private $http: angular.IHttpService,
            private resource: IPatientResource) {
        }

        public get identifier(): string {

            return this.resource.identifier[0].value;
        }

        public get dateOfBirth(): Date {

            return new Date(this.resource.birthDate);
        }

        private get currentName(): IName 
        {
            return this.resource.name[0];
        }

        public get familyName(): string {

            return this.currentName.family[0];
        }

        public set familyName(value: string) {

            this.currentName.family[0] = value;
        }

        public get givenName(): string  {

            return this.currentName.given[0];
        }

        public set givenName(value: string) {

            this.currentName.given[0] = value;
        }

        public get gender(): Gender {

            return this.resource.gender.toLowerCase() == "male" ? Gender.Male : Gender.Female;
        }

        public set gender(gender: Gender) {

            this.resource.gender = gender == Gender.Male ? "male" : "female";
        }

        public save(): ng.IPromise<any> {

            return this.$http.put(oceanInformaticsConfig.webApiRootUri + "Patient/" + this.resource.id, this.resource, {
                headers: {
                    'content-type': 'application/json+fhir',
                    'if-match': this.resource.meta.versionId
                }
            });
        }
    }
}