import { injectable } from "inversify";
import availableIntegrations from "../integrations";


@injectable()
class BackgroundIntegrationService {

    getAll(){
        return Promise.resolve(
            availableIntegrations
        )
    }

    getMatchers(){
        return Promise.resolve(
            availableIntegrations.flatMap(i => i.matchers)
        )
    }
}

export default BackgroundIntegrationService
