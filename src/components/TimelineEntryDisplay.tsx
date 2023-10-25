import { For, Show } from "solid-js"
import { format, formatDistance, formatDuration, intervalToDuration } from "date-fns"
import PlayIcon from '~icons/ion/play'
import MoreIcon from '~icons/ri/more-2-fill'
import { Session, Task } from "../entities"
import useStartSessionMutation from "../hooks/useStartSessionMutation"

export function milliSecondsToDuration(milliSeconds: number): Duration {
    const epoch = new Date(0)
    const secondsAfterEpoch = new Date(milliSeconds)
    return intervalToDuration({
      start: epoch,
      end: secondsAfterEpoch
    })
  }

const TimelineEntryDisplay = (props: {
    task: Task,
    sessions: Session[]
}) => {

    const startSessionMutation = useStartSessionMutation()

    const startTime = () => props.sessions[0].startTime
    const endTime = () => props.sessions[props.sessions.length-1].endTime
    const totalTime = () => props.sessions.reduce((total, session) => {
        return total + ((session.endTime || Date.now()) - session.startTime)
    }, 0)

    const totalMinutes = () => Math.floor(totalTime()/1000/60)
    const totalSeconds = () => Math.floor((totalTime()/1000)%60)

    return <div class="flex items-center bg-gray-50 h-28 dark:bg-gray-800 space-x-2 px-4 dark:text-gray-500">
        <p class="flex-grow text-2xl text-gray-400 dark:text-gray-500">
            {props.task.name}
        </p>
        <p class="text-gray-400 px-2">
            {props.sessions?.length || 0}
        </p>
        <p>
            {format(startTime(), 'p')} <Show when={endTime()}>
                {end => format(end(), '- p')}
            </Show>
        </p>
        <p>
            {totalMinutes()}:{totalSeconds()}
        </p>
        <button onClick={() => startSessionMutation.mutate(props.task)}>
            <PlayIcon class="w-8 h-8 text-gray-500" />
        </button>
        <button>
            <MoreIcon class="w-8 h-8 text-gray-400" />
        </button>
    </div>
}

export default TimelineEntryDisplay
