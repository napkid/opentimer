import { CreateMutationResult, CreateQueryResult, createMutation, createQueries, createQuery, useQueryClient } from "@tanstack/solid-query"
import { useApi } from "./useApi"
import TYPES from "../services/types"
import DatabaseIntegrationService from "../services/integrations/BackgroundIntegrationService"
import { IntegrationSetting } from "../entities"

function useIntegrationSetting<T extends object>(id: number) {
    const api = useApi()

    const queryClient = useQueryClient()

    const query = createQuery(() => ({
        queryKey: ['integrations', id],
        queryFn: () => {
            const service = api.get<DatabaseIntegrationService>(TYPES.Integrations)
            return service.getOne<T>(id)
        },
        throwOnError: true
    }))

    const deletion = createMutation(() => ({
        mutationKey: ['deleteIntegration', id],
        mutationFn: () => {
            const service = api.get<DatabaseIntegrationService>(TYPES.Integrations)
            return service.deleteOne(id)
        },
        onSuccess: () => {
            queryClient.setQueryData(
                ['integrations'],
                (current: IntegrationSetting[]) => current
                    .filter(is => is.id !== id)
            )
            queryClient.removeQueries({
                queryKey: ['integrations', id]
            })
        }
    }))

    const update = createMutation(() => ({
        mutationKey: ['configureIntegration'],
        mutationFn: (settings: IntegrationSetting) => {
            const service = api.get<DatabaseIntegrationService>(TYPES.Integrations)
            settings.id = id
            return service.updateOne(settings)
        },
        onSuccess: (settings) => {
            queryClient.setQueryData(
                ['integrations'],
                (current: IntegrationSetting[]) => current
                    .map(is => is.id === id
                        ? { ...is, ...settings }
                        : is)
            )
            queryClient.setQueryData(
                ['integrations', id],
                (current: IntegrationSetting) => ({
                     ...current,
                     ...settings
                })
            )
        }
    }))

    const mutations = {
        deletion,
        update
    }

    return [query, mutations] as [typeof query, typeof mutations]
}

export default useIntegrationSetting

