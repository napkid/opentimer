import { Events } from "webextension-polyfill"
import GithubIntegration from "./github"
import { IntegrationSetting } from "../entities"
import { Component } from "solid-js"


export enum MatcherPreset {
    WindowTitle,
    Url
}

export type SelectorMatcherPrimitive = MatcherPreset | string
type MatcherFunction<R, C> = (configurationValue: C) => R
export type Matcher<P,C> = P | MatcherFunction<P,C>

export type ButtonInsertMatcher = {
    selector: string,
    element?: string,
    className?: string
}


export type FixedMatcher = {
    hostPattern: string,
    urlFilter: Events.UrlFilter,
    idMatcher: SelectorMatcherPrimitive,
    titleMatcher: SelectorMatcherPrimitive,
    button: ButtonInsertMatcher
}

export type IntegrationMatcher<T> = {
    [Property in keyof FixedMatcher]: Matcher<FixedMatcher[Property], T>
}

export type Integration<T = never> = {
    standalone?: boolean,
    id: string,
    label: string,
    matchers: Array<IntegrationMatcher<T>>,
    configurationComponent?: Component<IntegrationConfigurationComponentProps<T>>
}

export type IntegrationConfigurationComponentProps<T> = {
    configuration?: T,
}

export enum IntegrationConfigurationFieldType {
    Text = 'text',
    Number = 'number',
    Boolean = 'boolean'
}

type BaseField<T, K extends keyof T> = {
    name: K,
    label: string,
    type: IntegrationConfigurationFieldType
    value?: T[K],
    defaultValue?: T[K]
}

type NumberField = {
    type: IntegrationConfigurationFieldType.Number,
    value?: number,
    defaultValue: number
}

type BooleanField = {
    type: IntegrationConfigurationFieldType.Boolean,
    value?: boolean,
    defaultValue: boolean
}

type TextField = {
    type: IntegrationConfigurationFieldType.Text,
    value?: string,
    defaultValue: string,
}

export type IntegrationConfigurationField<T, K extends keyof T> =
// (
    // NumberField |
    // BooleanField |
    // TextField
// ) & 
BaseField<T, K>

export type IntegrationConfiguration<T> = {
    fields: Array<IntegrationConfigurationField<T, keyof T>>
}


// const testI: IntegrationConfiguration = {
//     fields: [{
//         name: 'tata',
//         defaultValue: 'tata',
//         label: 'prout',
//         type: IntegrationConfigurationFieldType.Text
//     }]
// }


export const createIntegration = <C>(i: Integration<C>) => i