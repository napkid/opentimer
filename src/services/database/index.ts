

import Dexie from 'dexie'
import { injectable } from 'inversify'

import { Session, State, Task } from '../../entities'


@injectable()
class Database extends Dexie {

    public sessions!: Dexie.Table<Session, number>
    public tasks!: Dexie.Table<Task, number>
    public state!: Dexie.Table<State, string>
    
    constructor(){
        super('opentimer')

        this.version(2)
            .stores({
                state: '++id',
                sessions: '++id, startTime, endTime, duration',
                tasks: '++id, name, description'
            })
    }

}

export default Database
