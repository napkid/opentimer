import type SessionService from "../interfaces/SessionService";
import { inject, injectable } from "inversify";
import TYPES from "./types";
import TimerService from "./timer/TimerServerService";
import { MessageStatus, RequestMessage, ResponseMessage } from "./events/messages";
import { EventTypes } from "./events/events";
import type { Logger, LoggerService } from "../interfaces/Logger";
import type SettingsService from "../interfaces/SettingsService";


@injectable()
class BackgroundEventService {

    private sessionService: SessionService
    private timerService: TimerService
    private logger: Logger

    constructor(
        @inject(TYPES.Session) sessionService: SessionService,
        @inject(TYPES.Timer) timerService: TimerService,
        @inject(TYPES.Logger) loggerService: LoggerService,
        @inject(TYPES.Settings) private settingsService: SettingsService
    ) {
        this.sessionService = sessionService
        this.timerService = timerService
        this.logger = loggerService.getLogger('BackgroundEventService')
    }

    router(msg: RequestMessage): Promise<any> {
        switch (msg.event) {
            case EventTypes.GetCurrentSession:
                return this.sessionService.getCurrentSession()

            case EventTypes.SessionStart:
                return this.sessionService.startSession({
                    name: msg.data.name
                })
            case EventTypes.SessionStart:
                return this.sessionService.stopSession()
            case EventTypes.StartTimer:
                return this.timerService.startTimer(msg.data)
            case EventTypes.GetSettings:
                return this.settingsService.getSettings()
            default:
                return Promise.reject(new Error('Unhandled event ' + msg.event))
        }
    }

    handleMessage(msg: RequestMessage, _, sendResponse: (msg: ResponseMessage) => void): true {
        this.logger.log('Received message event : ' + msg.event)
        this.logger.debug(msg)

        this.router(msg)
            .then(data => {
                this.logger.log('Success response from router for event ' + msg.event)
                this.logger.debug(msg.data)
                return sendResponse({
                    status: MessageStatus.Success,
                    event: msg.event,
                    data: data
                })
            })
            .catch((err) => {
                this.logger.error('Error response from router for event ' + msg.event)
                this.logger.debug(err)
                return sendResponse({
                    status: MessageStatus.Error,
                    event: msg.event,
                    data: err
                })
            })

        return true
    }


}

export default BackgroundEventService
