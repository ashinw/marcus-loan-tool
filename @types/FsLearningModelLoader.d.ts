import { IBaseDataFrameConfig, IBaseLearningModelConfig, ILearningModelLoader } from './LearningModelController.js';
export interface IFsDataFrameConfig extends IBaseDataFrameConfig {
    trainingDataSourcePath: string;
}
export interface IFsLearningModelConfig extends IBaseLearningModelConfig {
    customTransformerPythonModulePath: string;
    serialisedPickleLearningModelPath: string;
    dataFrameConfig: IFsDataFrameConfig;
}
export declare class FsLearningModelLoader implements ILearningModelLoader {
    private _modelCfg;
    constructor(mdlCfg: IFsLearningModelConfig);
    loadLearningModel(): Object;
    private _deserialiseLearningModel;
    loadTransformerModuleIntoExecutionContext(): void;
    loadTrainingDataDataFrame(): Object;
}
