import { Component, Show } from "solid-js"
import { Integration } from "../integrations/types"

import PointIcon from '~icons/tabler/point'
import PointFilledIcon from '~icons/tabler/point-filled'

type IntegrationItem = {
    showEnabled?: boolean,
    enabled?: boolean,
    title?: string,
    integration: Integration,
    onAction: () => void
}
const IntegrationListItem: Component<IntegrationItem> = (props) => {

    return <li class="border-b-2 border-gray-600 flex align-middle p-4">
        <div class="flex flex-grow items-center">
            <Show when={props.showEnabled}>
                <Show when={props.enabled}>
                    <PointFilledIcon
                        class="w-6 h-6 mr-2"
                    />
                </Show>
                <Show when={!props.enabled}>
                    <PointIcon
                        class="w-6 h-6 mr-2"
                    />
                </Show>
            </Show>

            <Show when={props.title} fallback={
                <h3>
                    {props.integration.label}
                </h3>
            }>
                {title => <div>
                    <h3>{title()}</h3>
                    <p>{props.integration.label}</p>
                </div>}
            </Show>
        </div>
        <Show when={!props.integration.standalone} fallback={
            <button type="button"
                onClick={props.onAction}
                classList={{
                    'dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 bg-green-700 hover:bg-green-800 focus:ring-green-300': !props.enabled,
                    'dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 bg-red-700 hover:bg-red-800 focus:ring-red-300': props.enabled
                }}
                class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                {props.enabled ? 'Disable' : 'Enable'}
            </button>
        }>
            <button type="button"
                onClick={props.onAction}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Configure
            </button>
        </Show>
    </li>
}

export default IntegrationListItem
