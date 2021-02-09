import fs from 'fs';
import process from 'process';
import { FsLearningModelLoader } from './FsLearningModelLoader.js';
import { RejectedLoanApplExplainer } from './RejectedLoanApplExplainer.js';
class RejectedLoanApplExplainerCli {
    async run() {
        await this._parseArgs();
        let explainer = new RejectedLoanApplExplainer(this._applicantConfig, this._learningModelConfig);
        let fsModelLoader = new FsLearningModelLoader(this._learningModelConfig);
        explainer.prepareAssessmentData(fsModelLoader);
        explainer.assessLowestThresholds();
        let topRecommendations = explainer.reportTopRecommendationsToChangeOutcome();
        let ret = JSON.stringify(topRecommendations);
        return ret;
    }
    async _parseArgs() {
        let showHelp = false;
        for (let i = 2, len = process.argv.length; i < len; i++) {
            if ([`-?`, '-h', '--help'].indexOf(process.argv[i]) !== -1)
                showHelp = true;
            else if (process.argv[i].charAt(1) === 'a')
                this._applicantConfig = await this._loadConfiguration(process.argv[++i]);
            else if (process.argv[i].charAt(1) === 'l')
                this._learningModelConfig = await this._loadConfiguration(process.argv[++i]);
        }
        if (process.argv.length === 1 || showHelp)
            this._prepareHelpMessage();
        else {
            if (!this._applicantConfig)
                throw new Error('No applicant configuration was provided');
            if (!this._learningModelConfig)
                throw new Error('No lender configuration was provided');
        }
    }
    async _loadConfiguration(uri) {
        let src = await this._readFileContents(uri);
        let ret = JSON.parse(src);
        return ret;
    }
    async _readFileContents(uri) {
        let ret = (await fs.promises.readFile(uri, 'utf8')).toString();
        return ret;
    }
    _prepareHelpMessage() {
        const HELP_MSG = `Rejected Loan App Explainer command line interface
RejectedLoanApplExplainerCli [options]
where options are:
  --help|-h|-?\t\t- prints this message
  -a <applicant JSON config> 
  -l <learning model JSON config> 
  [-f <flags JSON>]
`;
        console.log(HELP_MSG);
    }
}
let app = new RejectedLoanApplExplainerCli();
let result = await app.run();
console.log(result);
//# sourceMappingURL=RejectedLoanApplExplainerCli.js.map