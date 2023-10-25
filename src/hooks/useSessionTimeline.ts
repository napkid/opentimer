import { createQuery } from "@tanstack/solid-query"
import { useApi } from "./useApi"
import SessionService from "../interfaces/SessionService"
import TYPES from "../services/types"


const useSessionTimeline = (
    timeStart: number,
    timeEnd: number
) => {

    const api = useApi()

    return createQuery(() => ({
        queryKey: ['sessionsTimeline'],
        queryFn: () => {
            return api.get<SessionService>(TYPES.Session)
            .getSessionsTimeline(
                timeStart,
                timeEnd
            )
        }
    }))
}

export default useSessionTimeline
