import { useLocation, useNavigate, useParams } from "@solidjs/router"
import useSettingsMutation from "../hooks/useSettingsMutation"
import useSettings from "../hooks/useSettings"
import { ErrorBoundary, Show } from "solid-js"
import { Settings } from "../entities"
import debounce from "../utils/debounce"


const SettingsPage = () => {

    const params = useParams()
    const location = useLocation()

    const navigate = useNavigate()
    const currentSection = () => params['section']

    const settingsQuery = useSettings()
    const settingsMutation = useSettingsMutation()

    const handleClick = (section) => {
        if (currentSection() !== section) {
            navigate('/settings/' + section)
        } else {
            navigate('/settings')
        }
    }

    const handleSettingsChange = debounce((settings: Partial<Settings>) => {
        settingsMutation.mutate(settings)
    }, 300)

    return <div>

            <h2 onClick={() => handleClick('general')}>
                <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                    <span>General</span>
                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>
            <div classList={{
                'hidden': currentSection() !== 'general'
            }}>
                <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <div class="grid gap-6 mb-6 md:grid-cols-1">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Session duration
                            </label>
                            <Show when={settingsQuery.data}>
                                {data => <input
                                    type="number"
                                    min={1}
                                    step={1}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data().sessionDuration / 60000}
                                    onChange={(e) => {
                                        handleSettingsChange({
                                            sessionDuration: parseInt(e.target.value) * 60 * 1000
                                        })
                                    }}
                                />}
                            </Show>

                        </div>
                    </div>
                    {/* <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p> */}
                </div>
            </div>

            <h2 onClick={() => handleClick('integrations')}>
                <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-1 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                    <span>Integrations</span>
                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>
            <div class="" classList={{
                'hidden': currentSection() !== 'integrations'
            }}>
                <div class="p-5 border border-b-1 border-gray-200 dark:border-gray-700">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                    <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                </div>
            </div>
            <Show when={settingsMutation.isError && settingsMutation.error}>
                {err => <pre>
                    {err().toString()}
                </pre>}
            </Show>
    </div >

}

export default SettingsPage