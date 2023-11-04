import { CreateMutationResult, CreateQueryResult, createMutation, createQueries, createQuery, useQueryClient } from "@tanstack/solid-query"
import { useApi } from "./useApi"
import TYPES from "../services/types"
import DatabaseIntegrationService from "../services/integrations/BackgroundIntegrationService"
import { IntegrationSetting } from "../entities"

function useIntegrationSettings(){
    const api = useApi()

    const queryClient = useQueryClient()

    const query = createQuery(() => ({
        queryKey: ['integrations'],
        queryFn: () => {
            const service = api.get<DatabaseIntegrationService>(TYPES.Integrations)
            return service.getSettings()
        },
        throwOnError: true
    }))

    const mutation = createMutation(() => ({
        mutationKey: ['configureIntegration'],
        mutationFn: (settings: IntegrationSetting) => {
            const service = api.get<DatabaseIntegrationService>(TYPES.Integrations)
            if(settings.id){
                return service.updateOne(settings)
            } else {
                return service.createOne(settings)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['integrations']
            })
        }
    }))

    return [query, mutation] as [typeof query, typeof mutation]
}

export default useIntegrationSettings
