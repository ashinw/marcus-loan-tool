import { IApplicantConfig } from "./ApplicantConfig.js"

export interface IBaseDataFrameConfig {
  dropFeaturesList: string[]
}

export interface IBaseLearningModelConfig {
  dataFrameConfig: IBaseDataFrameConfig
  orderedDataFrameFieldList: string[]
  ignoreDataFrameFieldList: string[]
  recommendationsCount: number
}

export interface ILearningModelLoader {
  loadTransformerModuleIntoExecutionContext(): void
  loadLearningModel(): Object
  loadTrainingDataDataFrame(): Object
}

export class LearningModelController {
  protected _learningModelConfig: IBaseLearningModelConfig
  protected _learningModel: Object
  protected _trainingDataDataFrame: Object

  public constructor(mdlCfg: IBaseLearningModelConfig) {
    this._learningModelConfig = mdlCfg
  }

  public loadLearningModelServices(ldr: ILearningModelLoader): void {
    this._learningModel = ldr.loadLearningModel()
    this._trainingDataDataFrame = ldr.loadTrainingDataDataFrame()
  }

  public acquireDataAsOrderedDataFrameFieldList(applCfg: IApplicantConfig): any[] {
    let ret = []
    for (let i = 0; i < this._learningModelConfig.orderedDataFrameFieldList.length; i++) {
      let fieldName = this._learningModelConfig.orderedDataFrameFieldList[i]
      let fieldValue = applCfg.userProvidedInformation[fieldName]
      if (fieldValue !== undefined) {
        ret.push(fieldValue)
      } else {
        fieldValue = applCfg.authorizedInformation[fieldName]
        if (fieldValue !== undefined) {
          ret.push(fieldValue)
        }
      }
    }
    return ret
  }
  
  public getFeaturesTrainingDataDataFrame(): Object {
    console.log(`droping dropFeaturesList: ${this._learningModelConfig.dataFrameConfig.dropFeaturesList}`)
    return null
  }

  public getIgnoreFieldList(): string[] {
    return this._learningModelConfig.ignoreDataFrameFieldList
  }
}