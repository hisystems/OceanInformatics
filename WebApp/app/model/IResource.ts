module OceanInformatics.Model
{
    export interface IResourceContainer {
        resource: IResource;
    }

    export interface IResource
    {
        id: string;
        identifier: IIdentifier[];
        name: IName[]
        meta: IResourceMetadata;
    }

    export interface IResourceMetadata
    {
        versionId: string
    }

    export interface IPatientResource extends IResource {
        gender: string;
        birthDate: string;
    }

    export interface IIdentifier {
        value: string;
    }

    export interface IName {
        family: string[];
        given: string[];
    }

    export enum Gender 
    {
        Male,
        Female
    }
}