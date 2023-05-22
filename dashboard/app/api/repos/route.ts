export const dynamic = 'force-dynamic'
// @ts-ignore
import { Octokit } from '@octokit/rest';

// TODO: API endpoint to get all repos
export async function GET(request: Request) {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });
    const response = await octokit.repos.listForAuthenticatedUser({
        per_page: 100,
    });


    return new Response(JSON.stringify(response.data))
}