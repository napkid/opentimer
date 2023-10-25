import { inject, injectable } from "inversify";
import { notifications } from "webextension-polyfill";
import TYPES from "./types";
import type { Logger, LoggerService } from "../interfaces/Logger";

type NotificationOptions = {
    id: string,
    title: string,
    message: string
}

@injectable()
class NotificationService {

    private logger: Logger
    constructor(
        @inject(TYPES.Logger) loggerService: LoggerService
    ){
        this.logger = loggerService.getLogger('NotificationService')
    }

    create(opts: NotificationOptions){
        this.logger.log('create')
        this.logger.debug(opts)
        return notifications.create(opts.id, {
            type: "basic",
            title: opts.title,
            message: opts.message,
            eventTime: Date.now()
        })
    }
}

export default NotificationService
