import { createQuery } from "@tanstack/solid-query";
import { useApi } from "./useApi";
import SessionService from "../interfaces/SessionService";
import TYPES from "../services/types";


const useCurrentSessionQuery = () => {
    const api = useApi()
    try {

        console.log(api
            .get<SessionService>(TYPES.Session));
    } catch (err){
        console.error(err);
        
    }
    
    return createQuery(() => ({
        queryKey: ['currentSession'],
        queryFn: async () => {
            return await api
                .get<SessionService>(TYPES.Session)
                .getCurrentSession() || null

        }
    }))
}

export default useCurrentSessionQuery
