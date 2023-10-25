import { Match, Switch } from 'solid-js'
import StopWatchFilledIcon from '~icons/solar/stopwatch-bold'
import StopWatchDuotoneIcon from '~icons/solar/stopwatch-bold-duotone'
import useCurrentSessionQuery from '../hooks/useCurrentSessionQuery'
import useStartSessionMutation from '../hooks/useStartSessionMutation'

export type ClockButtonProps = {
    classList?: { [k: string]: boolean }
}

const ClockButton = (props: ClockButtonProps) => {
    const currentSessionQuery = useCurrentSessionQuery()
    const startSessionMutation = useStartSessionMutation()

    return <button classList={props.classList} onClick={() => {
        startSessionMutation.mutate({
            name: document.title
        })
    }}>
        <Switch>
            <Match when={!currentSessionQuery.data}>
                <StopWatchDuotoneIcon />
            </Match>
            <Match when={currentSessionQuery.data}>
                <StopWatchFilledIcon />
            </Match>
        </Switch>
        {/* <pre>
        {JSON.stringify(currentSessionQuery.data, null, 2)}
        </pre> */}
    </button>
}

export default ClockButton
