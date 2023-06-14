import RepoList from "@/components/RepoList";
import { FC } from "react";


interface Props {
}

const Page: FC<Props> = ({ }) => {
  return (
    <div>
      <h1>DEV</h1>
      <RepoList />
    </div>
  )
}

export default Page;
