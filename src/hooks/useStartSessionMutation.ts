import { createMutation, useQueryClient } from "@tanstack/solid-query"
import { useApi } from "./useApi"
import SessionService from "../interfaces/SessionService"
import TYPES from "../services/types"
import { Task } from "../entities"


const useStartSessionMutation = () => {
    const queryClient = useQueryClient()
    const api = useApi()
    return createMutation(() => ({
        mutationKey: ['startSession'],
        mutationFn: async (task: Partial<Task>) => {
            await api.get<SessionService>(TYPES.Session)
            .startSession(task)
            queryClient.invalidateQueries({
                queryKey: ['currentSession']
            })
        }
    }))
}

export default useStartSessionMutation