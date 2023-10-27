import { Component, Match, Show, Switch, VoidProps, createEffect, createSignal, onCleanup } from "solid-js";
import Counter from "./Counter";
import useStartSessionMutation from "../hooks/useStartSessionMutation";
import useStopSessionMutation from "../hooks/useStopSessionMutation";
import useCurrentSessionQuery from "../hooks/useCurrentSessionQuery";
import { runtime } from "webextension-polyfill";
import { EventTypes } from "../services/events/events";


const CurrentSession : Component<{sessionDuration: number}> = (props) => {

    const currentQuery = useCurrentSessionQuery()
    
    const [remainingTime, setRemainingTime] = createSignal(props.sessionDuration)

    const startSessionMutation = useStartSessionMutation()

    const stopSessionMutation = useStopSessionMutation()


    const [taskName, setTaskName] = createSignal('')


    const handleClick = () => {
        if (currentQuery.data) {
            stopSessionMutation.mutate()
        } else {
            runtime.sendMessage(EventTypes.SessionStart)
            startSessionMutation.mutate({
                name: taskName().length > 0 ? taskName() : '(no name)'
            })
        }
    }

    createEffect(() => {
        const session = currentQuery.data
        if (session) {
            let timer: number = 0
            let interval: number = 0
            const time = session.duration - (Date.now() - session.startTime)
            setRemainingTime(time)

            timer = setTimeout(() => {
                setRemainingTime(0)
                clearInterval(interval)
            }, time)
            interval = setInterval(() => {
                setRemainingTime(r => r - 500)
            }, 500)
            onCleanup(() => {
                setRemainingTime(session.duration)
                clearTimeout(timer)
                clearInterval(interval)
            })
        }
    })


    return <div class="flex justify-between h-16 mb-4 rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-500">
        <Switch>
            <Match when={currentQuery.isFetching}>
                <div class="max-w-md animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </Match>
            <Match when={currentQuery.isSuccess}>
                <Show when={currentQuery.data}>
                    <div class="flex-grow flex items-center pl-6 text-xl dark:text-gray-300">
                        <p class="bg-gray-50 dark:bg-gray-800">
                            {currentQuery.data?.task?.name || '(no name)'}
                        </p>
                    </div>
                </Show>
                <Show when={!currentQuery.data}>
                    <input
                        type="text"
                        placeholder="What are you working on ?"
                        class="flex-grow rounded pl-6 bg-gray-50 dark:bg-gray-800 border-0"
                        onChange={e => setTaskName(e.target.value)}
                    />
                </Show>
            </Match>
        </Switch>
        <Counter
            currentSession={currentQuery.data || undefined}
            remainingTime={remainingTime()}
            onStart={() => {
                handleClick()
            }}
        />
        <Show when={currentQuery.isError}>

            <pre>
                {currentQuery.error.toString()}
            </pre>
        </Show>
    </div>
}

export default CurrentSession
