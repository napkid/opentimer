// import "reflect-metadata"
import "@abraham/reflection"
import { Container } from "inversify"
import TYPES from "../services/types"
import { runtime } from "webextension-polyfill"
import ClockButton from "../components/ClockButton"
import { render } from "solid-js/web"
import { ApiProvider } from "../hooks/useApi"
import SessionService from "../interfaces/SessionService"
import SessionEventService from "../services/sessions/SessionEventService"
import ClientEventService from "../services/events/EventService"
import DebugLoggerService from "../services/DebugLoggerService"
import { LoggerService } from "../interfaces/Logger"
import { Entrypoints } from "../services/entrypoints"
import { FixedMatcher, IntegrationMatcher } from "../integrations/types"


const createContainer = () => {
    const container = new Container({
        skipBaseClassChecks: true
    })
    container.bind(TYPES.Entrypoint).toConstantValue(Entrypoints.Content)
    container.bind<ClientEventService>(TYPES.ClientEvent).to(ClientEventService)
    container.bind<SessionService>(TYPES.Session).to(SessionEventService)
    container.bind<LoggerService>(TYPES.Logger).to(DebugLoggerService)
    
    return container
}

const container = createContainer()
const renderButton = () => {
    const matcher: FixedMatcher = window[runtime.id]?.getMatcher()
    if(!matcher){
        throw new Error('Failed to get page matcher')
    }
    const id = runtime.id + '-button'

    const root = document.createElement(matcher.button.element)
    root.id = id
    root.className = matcher.button.className

    render(() => <ApiProvider value={container}>
        <ClockButton
            titleMatcher={matcher.titleMatcher}
            idMatcher={matcher.idMatcher}
        />
    </ApiProvider>, root)

    const parent : HTMLUnknownElement = document.querySelector(matcher.button.selector)
    return parent.appendChild(root)
}

try {
    renderButton()
} catch (error) {
    console.error(error);

}







