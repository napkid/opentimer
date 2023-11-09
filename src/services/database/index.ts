

import Dexie from 'dexie'
import { injectable } from 'inversify'

import { IntegrationSetting, Session, Settings, State, Task } from '../../entities'


@injectable()
class Database extends Dexie {

    public sessions!: Dexie.Table<Session, number>
    public tasks!: Dexie.Table<Task, number>
    public state!: Dexie.Table<State, string>
    public settings!: Dexie.Table<Settings, string>
    public integrationSettings!: Dexie.Table<IntegrationSetting, number>
    
    constructor(){
        super('opentimer')

        this.version(4)
            .stores({
                state: '++id',
                sessions: '++id, startTime, endTime, duration',
                tasks: '++id, name, description',
                settings: 'id',
                integrationSettings: '++id, integrationId'
            })
    }

}

export default Database
