// import "reflect-metadata"
import "@abraham/reflection"
import { Container } from 'inversify';
import browser, { action, runtime, scripting } from 'webextension-polyfill'
import DatabaseService from '../interfaces/DatabaseService';
import TYPES from '../services/types';
import BackgroundEventService from '../services/BackgroundEventService';
import SessionService from '../interfaces/SessionService';
import Database from '../services/database';
import SessionDatabaseService from '../services/sessions/SessionDatabaseService';
import TimerService from "../services/timer/TimerServerService";
import NotificationService from "../services/NotificationService";
import TimerServerService from "../services/timer/TimerServerService";
import { LoggerService } from "../interfaces/Logger";
import DebugLoggerService from "../services/DebugLoggerService";
import SettingsService from "../interfaces/SettingsService";
import DatabaseSettingsService from "../services/DatabaseSettingsService";
import BackgroundIntegrationService from "../services/BackgroundIntegrationService";
import { IntegrationMatcher } from "../integrations/types";



const _createContainer = () => {



  const container = new Container({
    skipBaseClassChecks: true
  })
  container.bind<string>(TYPES.Entrypoint).toConstantValue('background')
  container.bind<DatabaseService>(TYPES.Database).to(Database)
  container.bind<SessionService>(TYPES.Session).to(SessionDatabaseService)
  container.bind<TimerService>(TYPES.Timer).to(TimerServerService)
  container.bind<NotificationService>(TYPES.Notification).to(NotificationService)
  container.bind<BackgroundEventService>(TYPES.BackgroundEvent).to(BackgroundEventService)
  container.bind<LoggerService>(TYPES.Logger).to(DebugLoggerService)
  container.bind<SettingsService>(TYPES.Settings).to(DatabaseSettingsService)
  container.bind<BackgroundIntegrationService>(TYPES.Integrations).to(BackgroundIntegrationService)
  return container

}

let globalContainer: Container = _createContainer()
const createContainer = () => {
  if (globalContainer) {
    return globalContainer
  }
  return _createContainer()
}


runtime.onMessage.addListener((message, sender, sendResponse: (any) => void) => {
  const container = createContainer()
  const service = container.get<BackgroundEventService>(TYPES.BackgroundEvent)
  return service.handleMessage(message, sender, sendResponse)
})

browser.runtime.onInstalled.addListener(() => {
  console.log('Installed');

});

action.onClicked.addListener(() => {
  const createData = {
    active: true,
    url: "/index.html",
  }
  browser.tabs.create(createData)

})


const integrationService = globalContainer.get<BackgroundIntegrationService>(TYPES.Integrations)
integrationService.getMatchers()
  .then((matchers => {
    for(const matcher of matchers){
      browser.webNavigation.onCompleted.addListener(async (details) => {
  
        try {
          await scripting.executeScript({
            target: {
              tabId: details.tabId
            },
            func: (id: string, matcher: IntegrationMatcher) => {
              window[id] = {
                getMatcher: () => {
                  return matcher
                }
              }
            },
            args: [runtime.id, matcher]
          })
          await scripting.executeScript({
            target: {
              tabId: details.tabId
            },
            files: ['src/entrypoints/content.js']
          })
        } catch (error) {
          console.error(error);
  
        }
  
      }, {
        url: [matcher.urlFilter]
      })
    }
  }))
