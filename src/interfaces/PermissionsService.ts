

export default interface PermissionsService {
    requestHosts(origins: string[]): Promise<boolean>
}