import { useNavigate, useParams } from "@solidjs/router"
import EditIntegrationForm from "../components/EditIntegrationForm"
import availableIntegrations from "../integrations"
import useIntegrationSettings from "../hooks/useIntegrationSettings"
import { IntegrationSetting } from "../entities"


const NewIntegrationPage = <T extends object,>() => {

    const params = useParams()
    const navigate = useNavigate()
    const integration = () => availableIntegrations
        .find(i => i.id === params.id)

    const [, mutation] = useIntegrationSettings()

    const handleSubmit = (data: IntegrationSetting<T>) => {
        mutation.mutate(data)
        navigate('/settings/integrations')
    }

    return <section class="rounded bg-gray-50 dark:bg-gray-800 p-6">
        <header class="mb-8">
            <h1 class="text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white">
                Add a new integration
            </h1>
        </header>
        <main class="">
            <EditIntegrationForm<T>
                integration={integration()}
                onSubmit={handleSubmit}
            />
        </main>
    </section>
}

export default NewIntegrationPage
