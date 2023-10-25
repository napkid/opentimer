import { createQuery, useQueryClient } from "@tanstack/solid-query"
import { useApi } from "./useApi"


const useSessionsQuery = () => {
    const queryClient = useQueryClient()
    const api = useApi()

    const query = createQuery(() => ({
        suspense: true,
        queryKey: ['sessions'],
        queryFn: async () => {
            try {
                
                const sessions = await api.getSessions()
                console.log(sessions)
                return sessions
            } catch (error) {
                console.error(error);
                
            }
        }
    }))

    return query
    
}

export default useSessionsQuery
