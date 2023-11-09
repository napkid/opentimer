import { permissions } from "webextension-polyfill";
import PermissionsService from "../interfaces/PermissionsService";
import { injectable } from "inversify";


@injectable()
class BackgroundPermissionsService implements PermissionsService {

    requestHosts(origins: string[]){
        return permissions.request({
            origins: origins
        })
    }
}

export default BackgroundPermissionsService
