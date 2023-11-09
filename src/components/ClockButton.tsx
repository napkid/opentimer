import { Match, Switch } from 'solid-js'
import StopWatchFilledIcon from '~icons/solar/stopwatch-bold'
import StopWatchDuotoneIcon from '~icons/solar/stopwatch-bold-duotone'
import useCurrentSessionQuery from '../hooks/useCurrentSessionQuery'
import useStartSessionMutation from '../hooks/useStartSessionMutation'
import { MatcherPreset, SelectorMatcherPrimitive } from '../integrations/types'

export type ClockButtonProps = {
    classList?: { [k: string]: boolean }
    titleMatcher: SelectorMatcherPrimitive
    idMatcher: SelectorMatcherPrimitive
}

const getSelectorMatcherValue = (matcher: SelectorMatcherPrimitive) => {
    console.log(matcher);
    
    switch(matcher){
        case MatcherPreset.Url:
            return window.location.href
        case MatcherPreset.WindowTitle:
            return document.title
        default:
            return document.querySelector(matcher)
                ?.textContent
    }
}

const ClockButton = (props: ClockButtonProps) => {
    const currentSessionQuery = useCurrentSessionQuery()
    const startSessionMutation = useStartSessionMutation()

    return <button classList={props.classList} onClick={() => {
        startSessionMutation.mutate({
            name: getSelectorMatcherValue(props.titleMatcher),
            key: getSelectorMatcherValue(props.idMatcher)
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
