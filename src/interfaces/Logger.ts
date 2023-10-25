

export type Logger = {
    debug: (...arg0: any[]) => void,
    log: (...arg0: any[]) => void,
    warn: (...arg0: any[]) => void,
    error: (...arg0: any[]) => void,
}

export interface LoggerService {
    getLogger(name: string) : Logger
}