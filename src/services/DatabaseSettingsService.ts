import { inject, injectable } from 'inversify'
import SettingsService from '../interfaces/SettingsService'
import TYPES from './types'
import { Settings } from '../entities'
import Database from './database'
import type { Logger, LoggerService } from '../interfaces/Logger'


@injectable()
class DatabaseSettingsService implements SettingsService {

    private static KEY = 'main'
    private static defaultSettings : Settings = {
        id: 'main',
        sessionDuration: 25 * 60 * 1000
    }

    private logger: Logger
    constructor(
        @inject(TYPES.Database) private database: Database,
        @inject(TYPES.Logger) loggerService: LoggerService
    ){
        this.logger = loggerService.getLogger('DatabaseSettingsService')
    }

    async getSettings(){
        this.logger.log('Retrieve settings')
        const settings = await this.database.settings.get(
            DatabaseSettingsService.KEY
        )
        this.logger.debug(settings)
        return settings || DatabaseSettingsService.defaultSettings
    }

    async setSettings(settings: Partial<Settings>){
        const currentSettings = await this.database.settings.get(
            DatabaseSettingsService.KEY
        )
        this.logger.log('Changing settings')
        this.logger.debug(currentSettings, settings)
        if(!currentSettings){
            const newSettings = Object.assign({},
                DatabaseSettingsService.defaultSettings,
                settings
            )
            await this.database.settings.add(
                newSettings
            )
            return newSettings
        } else {
            await this.database.settings.update(
                DatabaseSettingsService.KEY,
                settings
            )
        }
    }

}

export default DatabaseSettingsService
