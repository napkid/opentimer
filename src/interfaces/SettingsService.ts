import { Settings } from "../entities";


export default interface SettingsService {

    getSettings(): Promise<Settings>

    setSettings(settings: Partial<Settings>): Promise<Settings>
}