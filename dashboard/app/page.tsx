import { FC } from "react";
import { CloudFormationClient, ListStacksCommand, StackSummary } from "@aws-sdk/client-cloudformation";
const github = require('octonode');

export const dynamic = true;
interface Props {
}

const getRepos = async () => {

  const client = github.client(process.env.GITHUB_TOKEN);
  const ghme = client.me();
  const response = await ghme.reposAsync();
  return response[0];
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

const Page = async ({ }) => {
  const dataRepos = await getRepos()
  const dataStacks = await getStacks()

  return (
    <div className="flex flex-col">
      <div className="flex w-full">

        <div className="w-[50vw]">
          <p>My repos</p>
          {dataRepos.map((repo: any) => (
            <div className="flex flex-col border-2 p-2 m-2">
              <div className="flex flex-col">
                <p className="">{repo.name}</p>
                <p className="">{repo.language}</p>
                <p>{repo.description}</p>
              </div>
            </div>
          ))}

        </div>
        <div className="w-[50vw]">
          <p>AWS stacks</p>
          {dataStacks.map((stack: any) => (
            <div className="flex flex-col border-2 p-2 m-2">
              <div className="flex flex-col">
                <p className="">{stack.StackName}</p>
                <p className="">{stack.TemplateDescription}</p>
                <p className="">{stack.StackStatus}</p>
                <p>{stack.description}</p>
              </div>
            </div>
          ))}


        </div>
      </div>
    </div>
  )
}

export default Page;
