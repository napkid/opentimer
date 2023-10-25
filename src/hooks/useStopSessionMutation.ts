import { createMutation, useQueryClient } from "@tanstack/solid-query"
import { useApi } from "./useApi"
import SessionService from "../interfaces/SessionService"
import TYPES from "../services/types"


const useStopSessionMutation = () => {
    const queryClient = useQueryClient()
    const api = useApi()
    return createMutation(() => ({
        mutationKey: ['stopSession'],
        mutationFn: async () => {
            await api.get<SessionService>(TYPES.Session)
                .stopSession()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['currentSession']
            })
            queryClient.invalidateQueries({
                queryKey: ['sessionsTimeline']
            })
        }
    }))
}

export default useStopSessionMutation
