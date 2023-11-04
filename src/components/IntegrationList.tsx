import { For, Show } from "solid-js"
import useAvailableIntegrations from "../hooks/useAvailableIntegrations"
import IntegrationListItem from "./IntegrationItem"
import useIntegrationSettings from "../hooks/useIntegrationSettings"
import availableIntegrations from "../integrations"
import { useNavigate } from "@solidjs/router"


const IntegrationList = () => {
    const [settingsQuery, settingsMutation] = useIntegrationSettings()

    const navigate = useNavigate()
    
    const available = () => availableIntegrations
        .filter((i) => {
            return !i.standalone || !settingsQuery.data?.find(is => is.integrationId === i.id)
        })
        .sort((a, b) => {
            if (a.standalone) {
                if (b.standalone) {
                    return 0
                } else {
                    return 1
                }
            } else {
                if (!b.standalone) {
                    return -1
                } else {
                    return 0
                }
            }
        })

    return <ul class="w-full text-md text-gray-400">
        <Show when={settingsQuery.data}>{
            list => <For each={available()}>{
                item => <IntegrationListItem
                    onAction={() => {
                        if(item.standalone){
                            settingsMutation.mutate({
                                enabled: true,
                                integrationId: item.id
                            })
                        } else {
                            navigate(`/integrations/new/${item.id}`)
                        }
                    }}
                    integration={item}
                />
            }</For>
        }</Show>
    </ul>
}

export default IntegrationList
