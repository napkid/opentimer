import { Session, State, Task } from "../entities"


export default interface SessionService {
    getState(): Promise<State>
    getCurrentSession(): Promise<Session>
    setCurrentSession(session: Partial<Session>): Promise<void>
    getSessionsTimeline(start: number, end: number): Promise<Session[]>
    getSessions(): Promise<Session[]>
    startSession(task: Partial<Task>): Promise<Session>
    stopSession(): Promise<void>
}