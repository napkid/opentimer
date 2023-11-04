import { Component, For, Match, Switch, createSignal } from "solid-js"
import { Integration } from "../integrations/types"
import { IntegrationSetting } from "../entities"
import Form from "./forms/Form"
import TextField from "./forms/TextField"


const EditIntegrationForm = <T extends object>(props: {
    integration: Integration<T>,
    settings?: IntegrationSetting<T>,
    onSubmit: (s: IntegrationSetting<T>) => void
}) => {


    const handleSubmit = (data: IntegrationSetting<T>) => {
        data.integrationId = props.integration.id
        data.enabled = !!data.enabled
        props.onSubmit(data)
    }

    return <Form onSubmit={handleSubmit}>
        <div>
            <label class="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    name="enabled"
                    value={props.settings?.enabled ? 1 : 0}
                    class="sr-only peer"
                    checked={props.settings?.enabled}
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enabled</span>
            </label>
        </div>

        <TextField
            label="Name"
            value={props.settings?.name}
            name="name"
        />

        <hr />

        <props.integration.configurationComponent
            configuration={props.settings?.configuration}
        />

        <hr />

        <div class="text-right">
            <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Save
            </button>
        </div>

    </Form>
}

export default EditIntegrationForm
