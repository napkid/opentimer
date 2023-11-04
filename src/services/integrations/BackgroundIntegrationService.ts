import { inject, injectable } from "inversify";
import availableIntegrations from "../../integrations";
import TYPES from "../types";
import Database from "../database";

import { IntegrationSetting } from '../../entities'
import { Integration } from "../../integrations/types";


const defaultSettings: Partial<IntegrationSetting> = {
    integrationId: "",
    enabled: false
}

@injectable()
class DatabaseIntegrationService {

    constructor(
        @inject(TYPES.Database) private db: Database
    ) { }

    async getSettings() {
        const settings = await this.db.integrationSettings.toArray()
        return settings.map(s => {
            s.integration = availableIntegrations.find(i => s.integrationId === i.id)
            return s
        })
    }

    async getOne<T extends object>(id: number){
        const setting = await this.db.integrationSettings.get(id)
        setting.integration = availableIntegrations
            .find(i => setting.integrationId === i.id)
        return setting as IntegrationSetting<T>
    }

    async getAvailable(): Promise<Array<Integration>> {
        let configurable = [], standalone = []
        for (const integration of availableIntegrations) {
            if (integration.standalone) {
                standalone.push(integration)
            } else {
                configurable.push(integration)
            }
        }

        const standaloneSettings = await this.db.integrationSettings
            .where('integrationId')
            .anyOf(standalone.map(i => i.id))
            .keys()


        return [
            ...standalone.filter(s => !standaloneSettings.includes(s.id)),
            ...configurable
        ]
    }

    async createOne(settings: IntegrationSetting){
        settings.id = await this.db.integrationSettings.add(settings)
        return settings
    }

    async updateOne(settings: IntegrationSetting){
        await this.db.integrationSettings.update(settings.id, settings)
        return settings
    }

    async deleteOne(id: number){
        await this.db.integrationSettings.delete(id)
    }

    getMatchers() {
        return Promise.resolve(
            availableIntegrations.flatMap(i => i.matchers)
        )
    }
}

export default DatabaseIntegrationService
