// @ts-ignore
import { Octokit } from "@octokit/rest";

interface Props {
    params: {
        repoId: string
    }
}
interface getRePosProps {
    repoId: string
}


const getRepos = async ({ repoId }: getRePosProps) => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });
    // get all users repos
    const response = await octokit.repos.listForAuthenticatedUser({
        per_page: 100,
    });
    // extract only the repo that has the same if as the one in the url
    const repo = response.data.filter((repo: any) => repo.id === parseInt(repoId));

    return repo[0];
}

const page = async ({ params: { repoId } }: Props) => {
    const repo = await getRepos({ repoId })

    return (
        <div>
            <div className="flex flex-col">
                <div className="flex w-full">
                    <div className="w-[50vw]">
                        <p>Repo</p>
                        <div className="flex flex-col border-2 p-2 m-2">
                            <div className="flex flex-col">
                                <p>{repo.name}</p>
                                <p>{repo.language}</p>
                                <p>{repo.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page


// {"id":573534163,"node_id":"R_kgDOIi9v0w","name":"advent-of-code-2022","full_name":"kanopo/advent-of-code-2022","private":false,"owner":{"login":"kanopo","id":64138187,"node_id":"MDQ6VXNlcjY0MTM4MTg3","avatar_url":"https://avatars.githubusercontent.com/u/64138187?v=4","gravatar_id":"","url":"https://api.github.com/users/kanopo","html_url":"https://github.com/kanopo","followers_url":"https://api.github.com/users/kanopo/followers","following_url":"https://api.github.com/users/kanopo/following{/other_user}","gists_url":"https://api.github.com/users/kanopo/gists{/gist_id}","starred_url":"https://api.github.com/users/kanopo/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/kanopo/subscriptions","organizations_url":"https://api.github.com/users/kanopo/orgs","repos_url":"https://api.github.com/users/kanopo/repos","events_url":"https://api.github.com/users/kanopo/events{/privacy}","received_events_url":"https://api.github.com/users/kanopo/received_events","type":"User","site_admin":false},"html_url":"https://github.com/kanopo/advent-of-code-2022","description":"Provo ad imparare Rust","fork":false,"url":"https://api.github.com/repos/kanopo/advent-of-code-2022","forks_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/forks","keys_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/keys{/key_id}","collaborators_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/collaborators{/collaborator}","teams_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/teams","hooks_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/hooks","issue_events_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/issues/events{/number}","events_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/events","assignees_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/assignees{/user}","branches_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/branches{/branch}","tags_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/tags","blobs_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/git/blobs{/sha}","git_tags_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/git/tags{/sha}","git_refs_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/git/refs{/sha}","trees_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/git/trees{/sha}","statuses_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/statuses/{sha}","languages_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/languages","stargazers_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/stargazers","contributors_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/contributors","subscribers_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/subscribers","subscription_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/subscription","commits_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/commits{/sha}","git_commits_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/git/commits{/sha}","comments_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/comments{/number}","issue_comment_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/issues/comments{/number}","contents_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/contents/{+path}","compare_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/compare/{base}...{head}","merges_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/merges","archive_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/{archive_format}{/ref}","downloads_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/downloads","issues_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/issues{/number}","pulls_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/pulls{/number}","milestones_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/milestones{/number}","notifications_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/notifications{?since,all,participating}","labels_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/labels{/name}","releases_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/releases{/id}","deployments_url":"https://api.github.com/repos/kanopo/advent-of-code-2022/deployments","created_at":"2022-12-02T17:38:02Z","updated_at":"2022-12-02T17:42:46Z","pushed_at":"2022-12-03T18:28:01Z","git_url":"git://github.com/kanopo/advent-of-code-2022.git","ssh_url":"git@github.com:kanopo/advent-of-code-2022.git","clone_url":"https://github.com/kanopo/advent-of-code-2022.git","svn_url":"https://github.com/kanopo/advent-of-code-2022","homepage":null,"size":3059,"stargazers_count":0,"watchers_count":0,"language":"Rust","has_issues":true,"has_projects":true,"has_downloads":true,"has_wiki":true,"has_pages":false,"has_discussions":false,"forks_count":0,"mirror_url":null,"archived":false,"disabled":false,"open_issues_count":0,"license":{"key":"gpl-3.0","name":"GNU General Public License v3.0","spdx_id":"GPL-3.0","url":"https://api.github.com/licenses/gpl-3.0","node_id":"MDc6TGljZW5zZTk="},"allow_forking":true,"is_template":false,"web_commit_signoff_required":false,"topics":[],"visibility":"public","forks":0,"open_issues":0,"watchers":0,"default_branch":"main","permissions":{"admin":true,"maintain":true,"push":true,"triage":true,"pull":true}}