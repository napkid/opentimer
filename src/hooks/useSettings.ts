import { createQuery } from "@tanstack/solid-query"
import SettingsService from "../interfaces/SettingsService"
import TYPES from "../services/types"
import { useApi } from "./useApi"


const useSettings = () => {
    const api = useApi()

    const settingsService = api.get<SettingsService>(TYPES.Settings)
    const settingsQuery = createQuery(() => ({
        suspense: true,
        queryKey: ['settings'],
        queryFn: () => settingsService.getSettings()
    }))


    return settingsQuery
}

export default useSettings
