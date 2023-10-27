import { Events } from "webextension-polyfill"
import GithubIntegration from "./github"


export enum MatcherPreset {
    WindowTitle,
    Url
}

export type TaskMatcher = MatcherPreset | string | Function

export type ButtonInsertMatcher = {
    selector: string,
    element?: string,
    className?: string
}

export type IntegrationMatcher = {
    urlFilter: Events.UrlFilter,
    idMatcher: TaskMatcher,
    titleMatcher: TaskMatcher,
    button: ButtonInsertMatcher 
}

export type Integration = {
    id: string,
    label: string,
    matchers: Array<IntegrationMatcher>
}
