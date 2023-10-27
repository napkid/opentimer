import { Integration, MatcherPreset } from "./types"


const GithubIntegration: Integration = {
    id: "github",
    label: "Github",
    matchers: [{
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
