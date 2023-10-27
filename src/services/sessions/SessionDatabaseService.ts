import { inject, injectable } from "inversify";
import SessionService from "../../interfaces/SessionService";
import TYPES from "../types";
import Database from "../database";
import { Session, State, Task } from "../../entities";
import type SettingsService from "../../interfaces/SettingsService";
import type { Logger, LoggerService } from "../../interfaces/Logger";


const defaultState: State = {
    id: 'main'
}

@injectable()
class SessionDatabaseService implements SessionService {

    async getState(){
        return await this.db.state.get('main') || defaultState
    }

    private logger: Logger
    constructor(
        @inject(TYPES.Database) private db: Database,
        @inject(TYPES.Timer) private timer: TimerService,
        @inject(TYPES.Settings) private settings: SettingsService,
        @inject(TYPES.Logger) loggerService: LoggerService
    ){
        this.logger = loggerService.getLogger('SessionDatabaseService')
    }

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
        this.logger.log('Set current session')
        this.logger.debug(session)
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
        if(!task.id){
            task.id = await this.db.tasks.add(task as Task)
        }
        const settings = await this.settings.getSettings()
        const session: Session = {
            taskId: task.id,
            startTime: Date.now(),
            duration: settings.sessionDuration
        }
        session.id = await this.db.sessions.add(session)
        await this.setCurrentSession(session)
        await this.timer.startTimer(session.duration)
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
            await this.timer.stopTimer()
        })
    }
}

export default SessionDatabaseService
