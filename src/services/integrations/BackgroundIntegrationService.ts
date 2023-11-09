import { inject, injectable } from "inversify";
import availableIntegrations from "../../integrations";
import TYPES from "../types";
import Database from "../database";

import { IntegrationSetting } from '../../entities'
import { FixedMatcher, Integration, IntegrationMatcher } from "../../integrations/types";
import type PermissionsService from "../../interfaces/PermissionsService";

@injectable()
class DatabaseIntegrationService {

    constructor(
        @inject(TYPES.Database) private db: Database,
        @inject(TYPES.Permissions) private permissions: PermissionsService
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

    private async enableOne(id: number){
        const settings = await this.getOne(id)
        return this.permissions.requestHosts(
            settings.integration.matchers
                .map(matcher => typeof matcher.hostPattern === 'function'
                    ? matcher.hostPattern(settings.configuration)
                    : matcher.hostPattern
                )
        )
    }

    async updateOne(settings: IntegrationSetting){
        await this.db.integrationSettings.update(settings.id, settings)
        if(settings.enabled){
            this.enableOne(settings.id)
        }
        return settings
    }

    async deleteOne(id: number){
        await this.db.integrationSettings.delete(id)
    }

    async getEnabled(){
        const settings = (await this.db.integrationSettings
            // That doesn't work because indexeddb cannot index booleans... shame. https://github.com/dexie/Dexie.js/issues/70
            // .where({
            //     enabled: true
            // })
            .toArray())
            .filter((is) => is.enabled)

        for(const s of settings){
            s.integration = availableIntegrations.find(i => i.id === s.integrationId)
        }
        return settings
    }

    async getMatchers() {
        
        const settings = await this.getEnabled()
        return settings.flatMap(s => s.integration.matchers.map(matcher => {
            const m = {}
            for(const key in matcher){
                if(typeof matcher[key] === 'function'){
                    m[key] = matcher[key](s.configuration)
                } else {
                    m[key] = matcher[key]
                }
            }
            return m as FixedMatcher
        }))
    }
}

export default DatabaseIntegrationService
