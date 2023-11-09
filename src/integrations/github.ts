import { Integration, MatcherPreset } from "./types"


const GithubIntegration: Integration = {
    id: "github",
    standalone: true,
    label: "Github",
    matchers: [{
        hostPattern: 'https://*.github.com/*',
        idMatcher: MatcherPreset.Url,
        titleMatcher: MatcherPreset.WindowTitle,
        urlFilter: {
            hostEquals: 'github.com',
            pathContains: '/issues/',
        },
        button: {
            selector: '#partial-discussion-header > div.gh-header-show > div > h1',
            element: 'span'
        }
    }]
}

export default GithubIntegration
