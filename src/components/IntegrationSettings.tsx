import { For, Show } from "solid-js"
import IntegrationListItem from "./IntegrationItem"
import { A, useNavigate } from "@solidjs/router"

import PlusIcon from '~icons/ic/round-plus'
import useIntegrationSettings from "../hooks/useIntegrationSettings"


const IntegrationSettings = () => {

    const [integrationsQuery, mutation] = useIntegrationSettings()
    const navigate = useNavigate()

    return <ul class="w-full text-md text-gray-400">
        <Show when={integrationsQuery.data}>{
            list => <For each={list()}>{
                item => <IntegrationListItem
                    showEnabled
                    onAction={() => {
                        if(item.integration.standalone){
                            mutation.mutate({
                                ...item,
                                enabled: !item.enabled
                            })
                        } else {
                            // TODO navigate to the integration edit page
                            navigate(`/integrations/edit/${item.id}`)
                        }
                    }}
                    enabled={item.enabled}
                    integration={item.integration}
                    title={item.name}
                />
            }</For>
        }</Show>
        <li class="p-4 text-right">
            <A href="/integrations/list" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <PlusIcon class="w-6 h-6 mr-1" aria-hidden="true" />
                Add
            </A>
        </li>
    </ul>

}

export default IntegrationSettings
