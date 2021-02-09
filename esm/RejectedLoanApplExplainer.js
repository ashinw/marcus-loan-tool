import { LearningModelController } from './LearningModelController.js';
export class RejectedLoanApplExplainer {
    constructor(applCfg, mdlCfg) {
        this._applicantConfig = applCfg;
        this._learningModelConfig = mdlCfg;
        this._modelController = new LearningModelController(this._learningModelConfig);
    }
    prepareAssessmentData(ldr) {
        this._modelController.loadLearningModelServices(ldr);
        let orderedData = this._modelController.acquireDataAsOrderedDataFrameFieldList(this._applicantConfig);
        console.log(`orderedData: ${orderedData}`);
        let featuresTrainingDataDataFrame = this._modelController.getFeaturesTrainingDataDataFrame();
        console.log(`featuresTrainingDataDataFrame: ${featuresTrainingDataDataFrame}`);
        let ignoreFieldList = this._modelController.getIgnoreFieldList();
        console.log(`ignoreFieldList: ${ignoreFieldList}`);
    }
    assessLowestThresholds() {
        console.log(`running assessor iterations`);
        this._standardiseLowestThresholds();
    }
    _standardiseLowestThresholds() {
        console.log(`standardise lowest thresholds`);
    }
    reportTopRecommendationsToChangeOutcome() {
        let recommendationsCount = this._learningModelConfig.recommendationsCount;
        console.log(`filtering assessment to top ${recommendationsCount} lowest thresholds`);
        return null;
    }
}
//# sourceMappingURL=RejectedLoanApplExplainer.js.map