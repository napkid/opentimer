import { createQuery } from "@tanstack/solid-query"
import { useApi } from "./useApi"
import DatabaseIntegrationService from "../services/integrations/BackgroundIntegrationService"
import TYPES from "../services/types"


const useAvailableIntegrations = () => {
    const api = useApi()

    return createQuery(() => ({
        queryKey: ['availableIntegrations'],
        queryFn: () => {
            const service = api.get<DatabaseIntegrationService>(TYPES.Integrations)

            return service.getAvailable()
        }
    }))
}

export default useAvailableIntegrations
