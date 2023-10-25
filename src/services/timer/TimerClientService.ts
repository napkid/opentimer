import { inject, injectable } from "inversify";
import ClientEventService from "../events/EventService";
import TYPES from "../types";
import { EventTypes } from "../events/events";
import type { Logger, LoggerService } from "../../interfaces/Logger";

@injectable()
class TimerClientService implements TimerService {

    private logger: Logger

    constructor(
        @inject(TYPES.ClientEvent) private eventService: ClientEventService,
        @inject(TYPES.Logger) loggerService: LoggerService
    ){
        this.logger = loggerService.getLogger('TimerClientService')
    }

    startTimer(duration: number): Promise<void> {
        this.logger.log('Requesting timer start for ' + duration + 'ms')
        return this.eventService.sendMessage(
            EventTypes.StartTimer,
            duration
        )
    }

}

export default TimerClientService