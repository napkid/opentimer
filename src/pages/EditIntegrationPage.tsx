import { useNavigate, useParams } from "@solidjs/router"
import EditIntegrationForm from "../components/EditIntegrationForm"
import availableIntegrations from "../integrations"
import useIntegrationSettings from "../hooks/useIntegrationSettings"
import { IntegrationSetting } from "../entities"
import useIntegrationSetting from "../hooks/useIntegrationSetting"
import { Show } from "solid-js"


const EditIntegrationPage = <T extends object,>() => {

    const navigate = useNavigate()
    const params = useParams()

    const [query, {deletion, update}] = useIntegrationSetting<T>(parseInt(params.id))

    const handleSubmit = (data: IntegrationSetting<T>) => {
        update.mutate(data)
        navigate('/settings/integrations')
    }

    const handleDelete = () => {
        deletion.mutate()
        navigate('/settings/integrations')
    }

    return <section class="rounded bg-gray-50 dark:bg-gray-800 p-6">
        <header class="flex items-center justify-between mb-8">
            <h1 class="text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white">
                Edit integration : {query.data?.name} ({query.data?.integration.label})
            </h1>
            <button type="button"
                onClick={handleDelete}
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
                Delete
            </button>
        </header>
        <main class="">
            <Show when={query.isSuccess}>
                <EditIntegrationForm<T>
                    // disabled={mutation.isPending}
                    integration={query.data.integration}
                    settings={query.data}
                    onSubmit={handleSubmit}
                />
            </Show>
        </main>
    </section>
}

export default EditIntegrationPage
