import { inject, injectable } from "inversify";
import SettingsService from "../../interfaces/SettingsService";
import TYPES from "../types";
import ClientEventService from "../events/EventService";
import { Settings } from "../../entities";
import { EventTypes } from "../events/events";

@injectable()
class SettingsEventService implements SettingsService {
    constructor(
        @inject(TYPES.ClientEvent) private eventService: ClientEventService
    ){}

    getSettings(): Promise<Settings> {
        return this.eventService.sendMessage(
            EventTypes.GetSettings
        )
    }
    setSettings(settings: Partial<Settings>): Promise<Settings> {
        throw new Error("Method not implemented.");
    }

    
}


export default SettingsEventService