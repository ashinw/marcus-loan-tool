export class LearningModelController {
    constructor(mdlCfg) {
        this._learningModelConfig = mdlCfg;
    }
    loadLearningModelServices(ldr) {
        this._learningModel = ldr.loadLearningModel();
        this._trainingDataDataFrame = ldr.loadTrainingDataDataFrame();
    }
    acquireDataAsOrderedDataFrameFieldList(applCfg) {
        let ret = [];
        for (let i = 0; i < this._learningModelConfig.orderedDataFrameFieldList.length; i++) {
            let fieldName = this._learningModelConfig.orderedDataFrameFieldList[i];
            let fieldValue = applCfg.userProvidedInformation[fieldName];
            if (fieldValue !== undefined) {
                ret.push(fieldValue);
            }
            else {
                fieldValue = applCfg.authorizedInformation[fieldName];
                if (fieldValue !== undefined) {
                    ret.push(fieldValue);
                }
            }
        }
        return ret;
    }
    getFeaturesTrainingDataDataFrame() {
        console.log(`droping dropFeaturesList: ${this._learningModelConfig.dataFrameConfig.dropFeaturesList}`);
        return null;
    }
    getIgnoreFieldList() {
        return this._learningModelConfig.ignoreDataFrameFieldList;
    }
}
//# sourceMappingURL=LearningModelController.js.map