import { CreateMutationResult, CreateQueryResult, createMutation, createQuery, useQueryClient } from "@tanstack/solid-query"
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
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['settings']
            })
        }
    }))

    return settingsMutation
}

export default useSettingsMutation
