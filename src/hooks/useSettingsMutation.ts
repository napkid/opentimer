import { CreateMutationResult, CreateQueryResult, QueryCache, createMutation, createQuery, useQueryClient } from "@tanstack/solid-query"
import { Settings } from "../entities"
import SettingsService from "../interfaces/SettingsService"
import TYPES from "../services/types"
import { useApi } from "./useApi"


const useSettingsMutation = () => {
    const api = useApi()

    const queryClient = useQueryClient()
    const settingsService = api.get<SettingsService>(TYPES.Settings)

    const settingsMutation = createMutation(() => ({
        mutationKey: ['updateSettings'],
        mutationFn: (settings: Partial<Settings>) => settingsService
            .setSettings(settings),
        onMutate: async (settings) => {
            await queryClient.cancelQueries({ queryKey: ['settings'] })
            const previousSettings = queryClient.getQueryData(['settings'])
            queryClient.setQueryData(['settings'], (prev: Settings) => ({
                ...prev,
                ...settings
            }))
            return {
                previousSettings
            }
        },
        onSuccess: (settings: Settings) => {
            queryClient.setQueryData(['settings'], settings)
        },
        onError: (err, settings, context) => {
            queryClient.setQueryData(['settings'], context.previousSettings)
            console.error(err)
        }
    }))

    return settingsMutation
}

export default useSettingsMutation
