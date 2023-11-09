

import GithubIntegration from "../github"
import { Integration, IntegrationConfigurationFieldType, MatcherPreset, createIntegration } from "../types"
import GiteaConfiguration from "./GiteaConfiguration"

export type GiteaIntegrationConfiguration = {
    domain: string
}

const GiteaIntegration : Integration<GiteaIntegrationConfiguration> = {
    id: "gitea",
    label: "Gitea",
    matchers: [{
        idMatcher: MatcherPreset.Url,
        titleMatcher: MatcherPreset.WindowTitle,
        urlFilter: (settings) => ({
            hostEquals: settings.domain,
            pathContains: '/issues/',
        }),
        button: {
            selector: 'div.ui:nth-child(24) > div:nth-child(2)',
            element: 'span'
        }
    }],
    configurationComponent: GiteaConfiguration
}

export default GiteaIntegration
