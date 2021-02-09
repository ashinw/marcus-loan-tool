import { IApplicantConfig } from "./ApplicantConfig.js";
export interface IBaseDataFrameConfig {
    dropFeaturesList: string[];
}
export interface IBaseLearningModelConfig {
    dataFrameConfig: IBaseDataFrameConfig;
    orderedDataFrameFieldList: string[];
    ignoreDataFrameFieldList: string[];
    recommendationsCount: number;
}
export interface ILearningModelLoader {
    loadTransformerModuleIntoExecutionContext(): void;
    loadLearningModel(): Object;
    loadTrainingDataDataFrame(): Object;
}
export declare class LearningModelController {
    protected _learningModelConfig: IBaseLearningModelConfig;
    protected _learningModel: Object;
    protected _trainingDataDataFrame: Object;
    constructor(mdlCfg: IBaseLearningModelConfig);
    loadLearningModelServices(ldr: ILearningModelLoader): void;
    acquireDataAsOrderedDataFrameFieldList(applCfg: IApplicantConfig): any[];
    getFeaturesTrainingDataDataFrame(): Object;
    getIgnoreFieldList(): string[];
}
