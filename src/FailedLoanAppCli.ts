import fs from 'fs'
import process from 'process'
import { DefaultCliFlags, IApplicantConfig, ICliFlags, ILenderConfig } from "./AssessmentInputs.js"

class FailedLoanAppCli {
  private _applicantConfig: IApplicantConfig
  private _lenderConfig: ILenderConfig
  private _cliFlags: ICliFlags

  public async run(): Promise<void> {
    await this._parseArgs()
    console.log(this._applicantConfig)
    console.log(this._lenderConfig)
    console.log(this._cliFlags)
  }

  private async _parseArgs(): Promise<void> {
    let showHelp = false
    for (let i = 2, len = process.argv.length; i < len; i++) {
      if ([`-?`, '-h', '--help'].indexOf(process.argv[i]) !== -1) 
        showHelp = true
			else if (process.argv[i].charAt(1) === 'a')
        this._applicantConfig = <IApplicantConfig> await this._loadConfiguration(process.argv[++i])
      else if (process.argv[i].charAt(1) === 'l')
        this._lenderConfig = <ILenderConfig> await this._loadConfiguration(process.argv[++i])
      else if (process.argv[i].charAt(1) === 'f')
        this._cliFlags = <ICliFlags> await this._loadConfiguration(process.argv[++i])
    }
    if (process.argv.length === 1 || showHelp)
      this._prepareHelpMessage()
    else {
      if (!this._applicantConfig)
        throw new Error('No applicant configuration was provided')
      if (!this._lenderConfig)
        throw new Error('No lender configuration was provided')
      if (!this._cliFlags)
        this._cliFlags = new DefaultCliFlags()
    }
  }

  private async _loadConfiguration(uri: string): Promise<Object> {
    let src = await this._readFileContents(uri)
    let ret = JSON.parse(src)
    return ret
  }

  private async _readFileContents(uri: string): Promise<string> {
		let ret = (await fs.promises.readFile(uri, 'utf8')).toString()
		return ret
  }

  private _prepareHelpMessage(): void {
    const HELP_MSG = 
`Failed Loan App command line interface
FailedLoadAppCli [options]
where options are:
  --help|-h|-?\t\t- prints this message
  -a <applicant JSON> 
  -l <lender JSON> 
  [-f <flags JSON>]
` 
    console.log(HELP_MSG)
  }
}

let app = new FailedLoanAppCli()
app.run()