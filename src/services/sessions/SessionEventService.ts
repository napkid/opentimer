


import { inject, injectable } from "inversify";
import { State, Session, Task } from "../../entities";
import SessionService from "../../interfaces/SessionService";
import ClientEventService from "../events/EventService";
import TYPES from "../types";
import { EventTypes } from "../events/events";


@injectable()
class SessionEventService implements SessionService {

    private eventService: ClientEventService

    constructor(
        @inject(TYPES.ClientEvent) eventService: ClientEventService
    ){
        this.eventService = eventService
    }

    getState(): Promise<State> {
        throw new Error("Method not implemented.");
    }
    public getCurrentSession(): Promise<Session> {
        return this.eventService.sendMessage(
            EventTypes.GetCurrentSession
        )
    }
    setCurrentSession(session: Partial<Session>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getSessionsTimeline(start: number, end: number): Promise<Session[]> {
        throw new Error("Method not implemented.");
    }
    getSessions(): Promise<Session[]> {
        throw new Error("Method not implemented.");
    }
    async startSession(task: Partial<Task>): Promise<Session> {
        return this.eventService.sendMessage(
            EventTypes.SessionStart,
            task
        )
    }
    stopSession(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}

export default SessionEventService
