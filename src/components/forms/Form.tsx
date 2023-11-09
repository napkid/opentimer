import { ParentComponent } from "solid-js"
import { set } from 'lodash'


const Form: ParentComponent<{
    onSubmit: (data) => void
}> = (props) => {
    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const data = {}
        for(const [key, value] of new FormData(form)){
            set(data, key, value)
        }
        props.onSubmit(data)
    }
    return <form onSubmit={handleSubmit}>
        <div class="grid gap-6 mb-6 md:grid-cols-1">
            {props.children}
        </div>
    </form>
}

export default Form
