import { Component, createUniqueId } from "solid-js"


const TextField: Component<{
    label: string,
    value?: string,
    name: string
}> = (props) => {
    const id = createUniqueId()
    return <div>
        <label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {props.label}
        </label>
        <input
            type="text"
            name={props.name}
            value={props.value || ''}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id={id}
        />

    </div>
}

export default TextField
