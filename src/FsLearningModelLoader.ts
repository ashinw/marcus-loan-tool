import { IBaseDataFrameConfig, IBaseLearningModelConfig, ILearningModelLoader } from './LearningModelController.js'

export interface IFsDataFrameConfig extends IBaseDataFrameConfig {
  trainingDataSourcePath: string
}

export interface IFsLearningModelConfig extends IBaseLearningModelConfig {
  customTransformerPythonModulePath: string
  serialisedPickleLearningModelPath: string
  dataFrameConfig: IFsDataFrameConfig
}

export class FsLearningModelLoader implements ILearningModelLoader {
  private _modelCfg: IFsLearningModelConfig

  public constructor(mdlCfg: IFsLearningModelConfig) {
    this._modelCfg = mdlCfg
  }

  public loadLearningModel(): Object {
    this.loadTransformerModuleIntoExecutionContext()
    let ret = this._deserialiseLearningModel()
    return ret
  }

  private _deserialiseLearningModel(): Object {
    console.log(`deserialising pickle from: ${this._modelCfg.serialisedPickleLearningModelPath}`)
    return null
  }

  public loadTransformerModuleIntoExecutionContext(): void {
    console.log(`loading Py Transformer Module from: ${this._modelCfg.customTransformerPythonModulePath}`)
    console.log('dynamically execute Py src from loaded file')
  }

  public loadTrainingDataDataFrame(): Object {
    console.log(`loading Training data from: ${this._modelCfg.dataFrameConfig.trainingDataSourcePath}`)
    return null
  }
}