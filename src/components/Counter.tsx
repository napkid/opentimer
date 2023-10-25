import { Match, Switch } from 'solid-js'
import PlayIcon from '~icons/ion/play'
import StopIcon from '~icons/ion/stop'
import { Session } from './api/models'

const Counter = (props: {
    currentSession?: Session,
    remainingTime: number,
    onStart: () => void
}) => {

    const remainingMinutes = () => Math.floor((props.remainingTime / 1000) / 60)
    const remainingSeconds = () => Math.floor((props.remainingTime / 1000) % 60)

    return <div class="flex items-center space-x-2 text-gray-500 text-2xl px-6">
    <p>
        {remainingMinutes()}:{remainingSeconds()}
    </p>
    <button onClick={() => props.onStart()}>
        <Switch>
            <Match when={!props.currentSession}>
                <PlayIcon class="w-8 h-8 text-gray-500" />
            </Match>
            <Match when={props.currentSession}>
                <StopIcon class="w-8 h-8 text-gray-500" />
            </Match>
        </Switch>
    </button>
</div>

}

export default Counter
