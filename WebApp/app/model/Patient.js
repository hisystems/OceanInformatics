var OceanInformatics;
(function (OceanInformatics) {
    var Model;
    (function (Model) {
        var Patient = (function () {
            function Patient($http, resource) {
                this.$http = $http;
                this.resource = resource;
            }
            Object.defineProperty(Patient.prototype, "identifier", {
                get: function () {
                    return this.resource.identifier[0].value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Patient.prototype, "dateOfBirth", {
                get: function () {
                    return new Date(this.resource.birthDate);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Patient.prototype, "currentName", {
                get: function () {
                    return this.resource.name[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Patient.prototype, "familyName", {
                get: function () {
                    return this.currentName.family[0];
                },
                set: function (value) {
                    this.currentName.family[0] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Patient.prototype, "givenName", {
                get: function () {
                    return this.currentName.given[0];
                },
                set: function (value) {
                    this.currentName.given[0] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Patient.prototype, "gender", {
                get: function () {
                    return this.resource.gender.toLowerCase() == "male" ? Model.Gender.Male : Model.Gender.Female;
                },
                set: function (gender) {
                    this.resource.gender = gender == Model.Gender.Male ? "male" : "female";
                },
                enumerable: true,
                configurable: true
            });
            Patient.prototype.save = function () {
                return this.$http.put(oceanInformaticsConfig.webApiRootUri + "Patient/" + this.resource.id, this.resource, {
                    headers: {
                        'content-type': 'application/json+fhir',
                        'if-match': this.resource.meta.versionId
                    }
                });
            };
            return Patient;
        }());
        Model.Patient = Patient;
    })(Model = OceanInformatics.Model || (OceanInformatics.Model = {}));
})(OceanInformatics || (OceanInformatics = {}));
//# sourceMappingURL=Patient.js.map