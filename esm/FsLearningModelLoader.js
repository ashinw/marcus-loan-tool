export class FsLearningModelLoader {
    constructor(mdlCfg) {
        this._modelCfg = mdlCfg;
    }
    loadLearningModel() {
        this.loadTransformerModuleIntoExecutionContext();
        let ret = this._deserialiseLearningModel();
        return ret;
    }
    _deserialiseLearningModel() {
        console.log(`deserialising pickle from: ${this._modelCfg.serialisedPickleLearningModelPath}`);
        return null;
    }
    loadTransformerModuleIntoExecutionContext() {
        console.log(`loading Py Transformer Module from: ${this._modelCfg.customTransformerPythonModulePath}`);
        console.log('dynamically execute Py src from loaded file');
    }
    loadTrainingDataDataFrame() {
        console.log(`loading Training data from: ${this._modelCfg.dataFrameConfig.trainingDataSourcePath}`);
        return null;
    }
}
//# sourceMappingURL=FsLearningModelLoader.js.map