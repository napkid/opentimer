/* @refresh reload */
import { render } from 'solid-js/web'

// import "reflect-metadata"
import "@abraham/reflection"

import '../styles/index.css'
import App from '../components/App'
import { Container } from 'inversify'
import TYPES from '../services/types'
import Database from '../services/database'
import SessionService from '../interfaces/SessionService'
import SessionDatabaseService from '../services/sessions/SessionDatabaseService'
import ClientEventService from '../services/events/EventService'
import TimerClientService from '../services/timer/TimerClientService'
import { LoggerService } from '../interfaces/Logger'
import DebugLoggerService from '../services/DebugLoggerService'
import { Entrypoints } from '../services/entrypoints'
import DatabaseSettingsService from '../services/DatabaseSettingsService'
import SettingsService from '../interfaces/SettingsService'
import DatabaseIntegrationService from '../services/integrations/BackgroundIntegrationService'


const createContainer = () => {
    const container = new Container({ skipBaseClassChecks: true })
    container.bind(TYPES.Entrypoint).toConstantValue(Entrypoints.App)
    container.bind<Database>(TYPES.Database).to(Database)
    container.bind<SessionService>(TYPES.Session).to(SessionDatabaseService)
    container.bind<ClientEventService>(TYPES.ClientEvent).to(ClientEventService)
    
    container.bind<TimerService>(TYPES.Timer)
        .to(TimerClientService)

    container.bind<LoggerService>(TYPES.Logger).to(DebugLoggerService)

    container.bind<SettingsService>(TYPES.Settings)
        .to(DatabaseSettingsService)

    container.bind<DatabaseIntegrationService>(TYPES.Integrations)
        .to(DatabaseIntegrationService)
    return container
}
const apiSource = createContainer()

const root = document.getElementById('root')

if (root) {
    render(() => <App api={apiSource} />, root)
}

