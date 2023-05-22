import { FC } from "react";

interface Props {
}

const Page = async ({ }) => {
  const responceRepos = await fetch(process.env.URL + '/api/repos')
  const responceStacks = await fetch(process.env.URL + '/api/aws-stacks')
  const dataRepos = await responceRepos.json()
  const dataStacks = await responceStacks.json()
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
