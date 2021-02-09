import fs from 'fs';
import process from 'process';
import { DefaultCliFlags } from "./AssessmentInputs.js";
class FailedLoadAppCli {
    async run() {
        await this._parseArgs();
        console.log(this._applicantConfig);
        console.log(this._lenderConfig);
        console.log(this._cliFlags);
    }
    async _parseArgs() {
        let showHelp = false;
        for (let i = 2, len = process.argv.length; i < len; i++) {
            if ([`-?`, '-h', '--help'].indexOf(process.argv[i]) !== -1)
                showHelp = true;
            else if (process.argv[i].charAt(1) === 'a')
                this._applicantConfig = await this._loadConfiguration(process.argv[++i]);
            else if (process.argv[i].charAt(1) === 'l')
                this._lenderConfig = await this._loadConfiguration(process.argv[++i]);
            else if (process.argv[i].charAt(1) === 'f')
                this._cliFlags = await this._loadConfiguration(process.argv[++i]);
        }
        if (process.argv.length === 1 || showHelp)
            this._prepareHelpMessage();
        else {
            if (!this._applicantConfig)
                throw new Error('No applicant configuration was provided');
            if (!this._lenderConfig)
                throw new Error('No lender configuration was provided');
            if (!this._cliFlags)
                this._cliFlags = new DefaultCliFlags();
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
        const HELP_MSG = `Failed Loan App command line interface
FailedLoadAppCli [options]
where options are:
  --help|-h|-?\t\t- prints this message
  -a <applicant JSON> 
  -l <lender JSON> 
  [-f <flags JSON>]
`;
        console.log(HELP_MSG);
    }
}
let app = new FailedLoadAppCli();
app.run();
//# sourceMappingURL=FailedLoanAppCli.js.map