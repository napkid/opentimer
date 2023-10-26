

export type Task = {
    id?: number,
    name: string,
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