

export enum MessageStatus {
    Success = 'success',
    Error = 'error'
}

export type Message = {
    status?: MessageStatus,
    event: string,
    data?: any
}

export interface RequestMessage extends Omit<Message, 'status'> {
}


export interface ResponseMessage extends Message {
    status: MessageStatus,
    data: any
}

