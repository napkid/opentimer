import { createMutation, useQueryClient } from "@tanstack/solid-query"
import { useApi } from "./useApi"
import SessionService from "../interfaces/SessionService"
import TYPES from "../services/types"
import { Session, Task } from "../entities"


const useStartSessionMutation = () => {
    const queryClient = useQueryClient()
    const api = useApi()
    return createMutation(() => ({
        mutationKey: ['startSession'],
        mutationFn: async (task: Partial<Task>) => {
            return await api.get<SessionService>(TYPES.Session)
            .startSession(task)
        },
        onSuccess: (session: Session) => {
            queryClient.setQueryData(['currentSession'], session)
        }
    }))
}

export default useStartSessionMutation