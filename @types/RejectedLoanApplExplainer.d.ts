import { IApplicantConfig } from "./ApplicantConfig.js";
import { IBaseLearningModelConfig, ILearningModelLoader, LearningModelController } from './LearningModelController.js';
export interface IChangeOutcomeRecommendation {
    fieldName: string;
    value: any;
}
export declare class RejectedLoanApplExplainer {
    protected _applicantConfig: IApplicantConfig;
    protected _learningModelConfig: IBaseLearningModelConfig;
    protected _modelController: LearningModelController;
    constructor(applCfg: IApplicantConfig, mdlCfg: IBaseLearningModelConfig);
    prepareAssessmentData(ldr: ILearningModelLoader): void;
    assessLowestThresholds(): void;
    private _standardiseLowestThresholds;
    reportTopRecommendationsToChangeOutcome(): IChangeOutcomeRecommendation[];
}
