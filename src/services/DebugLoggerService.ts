import debug, { Debugger } from 'debug'
import TYPES from "./types";
import { inject, injectable } from 'inversify';
import { Logger, LoggerService } from '../interfaces/Logger';



@injectable()
class DebugLoggerService implements LoggerService {
    private _log: Debugger
    constructor(
        @inject(TYPES.Entrypoint) namespace: string
    ){
        debug.enable('*')
        this._log = debug(namespace)
    }

    getLogger(name: string) : Logger {
        return {
            debug: this._log.extend(name).extend('debug'),
            log: this._log.extend(name).extend('log'),
            warn: this._log.extend(name).extend('warn'),
            error: this._log.extend(name).extend('error'),
        }
    }
}

export default DebugLoggerService
