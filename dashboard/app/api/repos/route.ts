import { Octokit } from '@octokit/core'

export async function GET(request: Request) {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    const response = await octokit.request('GET /users/{username}/repos', {
        username: process.env.GITHUB_USERNAME || 'kanopo',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    return new Response(JSON.stringify(response.data))
}