import { inject, injectable } from "inversify";
import NotificationService from "../NotificationService";
import TYPES from "../types";
import type { Logger, LoggerService } from "../../interfaces/Logger";

@injectable()
class TimerServerService implements TimerService {

    private timer: number | null
    private notificationService: NotificationService
    private logger: Logger

    constructor(
        @inject(TYPES.Notification) notificationService: NotificationService,
        @inject(TYPES.Logger) loggerService: LoggerService
    ) {
        this.notificationService = notificationService
        this.timer = null
        this.logger = loggerService.getLogger('TimerClientService')
    }

    private handleTimerEnd() {
        this.logger.log('Timer ended')
        this.notificationService.create({
            id: 'timer-end',
            title: 'Timer end !',
            message: 'Take a break'
        })
    }

    startTimer(duration: number) {
        this.timer = setTimeout(() => {
            this.handleTimerEnd()
        }, duration)
        this.logger.log('Timer started for '+duration+'ms')
        return Promise.resolve()
    }

    stopTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.logger.log('Timer stopped')
        }
        return Promise.resolve()
    }
}

export default TimerServerService
