import { For, Match, Suspense, Switch } from "solid-js"
import TimelineEntry from "./TimelineEntryDisplay"
import { isToday, isYesterday } from "date-fns"
import TimelineEntryDisplay from "./TimelineEntryDisplay"
import { Session, Task } from "../entities"
import useSessionTimeline from "../hooks/useSessionTimeline"

type TimelineEntry = {
    task: Task,
    sessions: Session[]
}

const TaskListForPeriod = (props: {
    timeStart: number,
    timeEnd: number
}) => {
    const query = useSessionTimeline(
        props.timeStart,
        props.timeEnd
    )

    const groupedByContinuousTask = () => query.data?.reduce((a, n) => {
        const last = a[a.length - 1]
        if (last?.task.id === n.taskId) {
            last.sessions.push(n)
        } else {
            a.push({
                task: n.task as Task,
                sessions: [n]
            })
        }
        return a
    }, [] as TimelineEntry[])

    const totalTime = () => query.data?.reduce((total, session) => {
        return total + ((session.endTime || Date.now()) - session.startTime)
    }, 0) || 0

    const totalMinutes = () => Math.floor(totalTime() / 1000 / 60)
    const totalSeconds = () => Math.floor((totalTime() / 1000) % 60)

    return <article class="block bg-white rounded shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <header class="flex justify-between dark:bg-gray-700 rounded-t px-6 py-2 text-gray-400 text-md font-semibold">
            <p>
                <Switch>
                    <Match when={isToday(props.timeStart)}>
                        Today
                    </Match>
                    <Match when={isYesterday(props.timeStart)}>
                        Yesterday
                    </Match>
                </Switch>
            </p>
            <p>
                Total {totalMinutes()} : {totalSeconds()}
            </p>
        </header>
        <main>
            <ul>
                <For each={groupedByContinuousTask()}>{
                    entry => <TimelineEntryDisplay
                        task={entry.task}
                        sessions={entry.sessions}
                    />
                }</For>
            </ul>
        </main>
    </article>


}

export default TaskListForPeriod
