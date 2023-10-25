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
const renderButton = (selector) => {
    const id = runtime.id + '-button'

    const root = document.createElement('li')
    root.id = id
    
    render(() => <ApiProvider value={container}>
        <ClockButton />
    </ApiProvider>, root)

    const parent : HTMLUnknownElement = document.querySelector(selector)
    return parent.appendChild(root)
}

try {

    renderButton("#repository-container-header > div.d-flex.flex-wrap.flex-justify-end.mb-3.px-3.px-md-4.px-lg-5 > div.flex-auto.min-width-0.width-fit.mr-3 > div")
} catch (error) {
    console.error(error);

}

console.log('Rendered button');







