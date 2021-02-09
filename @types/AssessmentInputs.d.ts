export interface IIdentity {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}
export interface IPhysicalAddress {
    number: string;
    street: string;
    city: string;
    postcode: string;
}
export interface IContact {
    address: IPhysicalAddress;
    email: string;
    mobile: string;
}
export interface IApplicantConfig {
    identity: IIdentity;
    contact: IContact;
    annualIncome: number;
}
export interface IDataFrameConfig {
    trainingDataSource: string;
    ignoreFeaturesList: string[];
}
export interface ILenderConfig {
    customTransformerPythonModule: string;
    serialisedLearningModel: string;
    dataFrameConfig: IDataFrameConfig;
}
export interface ICliFlags {
    skipFields: string[];
}
export declare class DefaultCliFlags implements ICliFlags {
    skipFields: string[];
}
