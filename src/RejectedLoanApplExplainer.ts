import { IApplicantConfig } from "./ApplicantConfig.js"
import { IBaseLearningModelConfig, ILearningModelLoader, LearningModelController } from './LearningModelController.js'

export interface IChangeOutcomeRecommendation {
  fieldName: string
  value: any
}

export class RejectedLoanApplExplainer {
  protected _applicantConfig: IApplicantConfig
  protected _learningModelConfig: IBaseLearningModelConfig
  protected _modelController: LearningModelController

  public constructor(applCfg: IApplicantConfig, mdlCfg: IBaseLearningModelConfig) {
    this._applicantConfig = applCfg
    this._learningModelConfig = mdlCfg
    this._modelController = new LearningModelController(this._learningModelConfig)
  }

  public prepareAssessmentData(ldr: ILearningModelLoader): void {
    this._modelController.loadLearningModelServices(ldr)
    let orderedData = this._modelController.acquireDataAsOrderedDataFrameFieldList(this._applicantConfig)
    console.log(`orderedData: ${orderedData}`)
    let featuresTrainingDataDataFrame = this._modelController.getFeaturesTrainingDataDataFrame()
    console.log(`featuresTrainingDataDataFrame: ${featuresTrainingDataDataFrame}`)
    let ignoreFieldList = this._modelController.getIgnoreFieldList()
    console.log(`ignoreFieldList: ${ignoreFieldList}`)
  }

  public assessLowestThresholds(): void {
    console.log(`running assessor iterations`)
    this._standardiseLowestThresholds()
  }

  private _standardiseLowestThresholds(): void {
    console.log(`standardise lowest thresholds`)
  }

  public reportTopRecommendationsToChangeOutcome(): IChangeOutcomeRecommendation[] {
    let recommendationsCount = this._learningModelConfig.recommendationsCount
    console.log(`filtering assessment to top ${recommendationsCount} lowest thresholds`)
    return null
  }
}