import { FC } from "react";
// @ts-ignore
import { Octokit } from "@octokit/rest";
import { CloudFormationClient, ListStacksCommand, StackSummary } from "@aws-sdk/client-cloudformation";

export const dynamic = 'force-dynamic';
interface Props {
}

const getRepos = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const response = await octokit.repos.listForAuthenticatedUser({
    per_page: 10,
  });

  return response.data;
}

const getStacks = async () => {

  const client = new CloudFormationClient({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
  });
  const response = await client.send(new ListStacksCommand({}));
  const stacks = response.StackSummaries;
  if (!stacks) {
    return [];
  }
  const activestacks: StackSummary[] = stacks.filter(stack => stack.StackStatus !== 'DELETE_COMPLETE');
  return activestacks;
}

const Page = async ({ }: Props) => {
  const dataRepos = await getRepos()
  const dataStacks = await getStacks()

  return (
    <div className="flex flex-col">
      <div className="flex w-full">

        <div className="w-[50vw]">
          <p>My repos</p>
          {dataRepos.map((repo: any) => (
            <a href={process.env.URL + '/repos/' + repo.id}>
              <div className="flex flex-col border-2 p-2 m-2">
                <div className="flex flex-col">
                  <p className="">{repo.name}</p>
                  <p className="">{repo.language}</p>
                  <p>{repo.description}</p>
                </div>
              </div>
            </a>
          ))}

        </div>
        <div className="w-[50vw]">
          <p>AWS stacks</p>
          {dataStacks.map((stack: any) => (
            // <a href={process.env.URL + '/stacks/' + stack.StackId}>
            <div className="flex flex-col border-2 p-2 m-2">
              <div className="flex flex-col">
                <p className="">{stack.StackName}</p>
                <p className="">{stack.TemplateDescription}</p>
                <p className="">{stack.StackStatus}</p>
                <p>{stack.description}</p>
              </div>
            </div>
            // </a>
          ))}


        </div>
      </div>
    </div>
  )
}

export default Page;
