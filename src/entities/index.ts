import { Integration, IntegrationConfiguration } from "../integrations/types"


export type Task = {
    id?: number,
    name: string,
    key?: string,
    description: string,
    sessions: Session[]
}

export type Session = {
    id?: number,
    startTime: number,
    endTime?: number,
    task?: Task,
    taskId: number,
    duration: number
}

export type State = {
    id: string,
    currentSession?: number
}

export type Settings = {
    id: string,
    sessionDuration: number
}

export type IntegrationSetting<T extends object = object> = {
    id?: number,
    name?: string,
    integrationId: string,
    integration?: Integration<any>,
    enabled: boolean,
    configuration?: T
}

