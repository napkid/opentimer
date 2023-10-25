import type DatabaseService from "../../interfaces/DatabaseService";

import { inject, injectable } from "inversify";
import SessionService from "../../interfaces/SessionService";
import TYPES from "../types";
import Database from "../database";
import { Session, State, Task } from "../../entities";
import ClientEventService from "../events/EventService";


const defaultState: State = {
    id: 'main'
}


const settings = {
    sessionDuration: 25 * 60 * 1000,
}

@injectable()
class SessionDatabaseService implements SessionService {

    async getState(){
        return await this.db.state.get('main') || defaultState
    }

    constructor(
        @inject(TYPES.Database) private db: Database,
        @inject(TYPES.Timer) private timer: TimerService,
    ){}

    async getCurrentSession() {
        return this.db.transaction('r', [
            this.db.state,
            this.db.sessions,
            this.db.tasks
        ], async () => {
            const state = await this.getState()
            if (state?.currentSession) {
                const session = await this.db.sessions.get(state?.currentSession)
                if (session && session.taskId) {
                    session.task = await this.db.tasks.get(session.taskId)
                }
                return session
            }
        })
    }

    async setCurrentSession(session: Partial<Session>) {
        this.db.transaction('rw', [this.db.state], async () => {
            const state = await this.db.state.get('main')
            if (!state) {
                await this.db.state.add({
                    ...defaultState,
                    currentSession: session.id
                })
            } else {
                await this.db.state.update('main', {
                    currentSession: session.id
                })
            }
        })
    }

    async getSessionsTimeline(start: number, end: number): Promise<Session[]> {
        return this.db.transaction('r', ['tasks', 'sessions'], async () => {
            const sessions = await this.db.sessions.where('startTime')
                .between(
                    start,
                    end
                )
                .reverse()
                .sortBy('startTime')

            // const groupedByTask = sessions.reduce(
            //     (a, s) => {
            //         const sessions = a.get(s.taskId) || []
            //         sessions.push(s)
            //         return a.set(s.taskId, sessions)
            //     },
            //     new Map<number, Session[]>()
            // )

            // const tasks = await this._db.tasks.bulkGet([...groupedByTask.keys()])
            // for(const task of tasks){
            //     if(task?.id){
            //         task.sessions = groupedByTask.get(task.id) || []
            //     }
            // }

            // return tasks.filter(t => !!t) as Task[]
            return Promise.all(sessions.map(async s => {
                if (s.taskId) {
                    s.task = await this.db.tasks.get(s.taskId)
                }
                return s
            }))

        })
    }

    async getSessions() {
        return this.db.transaction('r', [this.db.tasks, this.db.sessions], async () => {
            const sessions = await this.db.sessions
                .orderBy('id')
                .reverse()
                .sortBy('startTime')
            return Promise.all(sessions.map(async s => {
                if (s.taskId) {
                    s.task = await this.db.tasks.get(s.taskId)
                }
                return s
            }))
        })
    }

    async startSession(task: Partial<Task>) {
        const session = await this.db.transaction("rw", ['tasks', 'state', 'sessions'], async () => {

            if (!task.id) {
                task.id = await this.db.tasks.add(task as Task)
            }
            const session: Session = {
                taskId: task.id,
                startTime: Date.now(),
                duration: settings.sessionDuration
            }
            session.id = await this.db.sessions.add(session)
            await this.setCurrentSession(session)
            return session
        })
        await this.timer.startTimer(25*1000)
        return session
    }

    async stopSession() {
        return this.db.transaction('rw', ['state', 'sessions'], async () => {
            const state = await this.db.state.get('main')
            if (!state?.currentSession) {
                return
            }
            await this.db.sessions.update(
                state.currentSession,
                {
                    endTime: Date.now()
                }
            )
            await this.setCurrentSession({ id: undefined })
        })
    }
}

export default SessionDatabaseService
