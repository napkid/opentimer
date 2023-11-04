import IntegrationList from "../components/IntegrationList"


const IntegrationListPage = () => {
    return <div class="rounded bg-gray-800 overflow-hidden">
        <header class="px-4 py-6 bg-gray-700 rounded-t text-gray-300">
            <h1 class="font-semibold text-xl">
                Add integration
            </h1>
        </header>
        <main class="p-4">
            <IntegrationList />
        </main>
    </div>
}

export default IntegrationListPage