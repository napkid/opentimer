// import browser from 'webextension-polyfill'
import { runtime } from 'webextension-polyfill';
import { inject, injectable } from 'inversify'
import { EventTypes } from './events';
import { MessageStatus, ResponseMessage } from './messages';
import TYPES from '../types';
import type { Logger, LoggerService } from '../../interfaces/Logger';

@injectable()
class ClientEventService {
    private logger: Logger

    constructor(
        @inject(TYPES.Logger) loggerService: LoggerService
    ){
        this.logger = loggerService.getLogger('ClientEventService')
    }
    sendMessage(event: EventTypes, data?: any): Promise<any> {
        this.logger.log(`Sending message event ${event}`)
        this.logger.debug(data)
        return runtime.sendMessage({
            event,
            data
        }).then((r: ResponseMessage) => {
            if(r.status === MessageStatus.Error){
                this.logger.log(`Error response for message event ${event}`)
                this.logger.debug(r.data)
                throw r.data
            }
            this.logger.log(`Success response for message event ${event}`)
            this.logger.debug(r.data)
            return r.data
        })
        .catch(err => {
            this.logger.error(err)
            throw err
        })
    }
}

export default ClientEventService
