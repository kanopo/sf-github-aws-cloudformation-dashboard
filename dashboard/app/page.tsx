
const Page = async () => {
  const res = await fetch(process.env.URL + '/api/repos')
  const data = await res.json()
  return (
    <div className="flex flex-col">
      {/* <h1>Home page</h1> */}
      <div className="flex w-full">

        <div className="border-2 border-red-600 w-[50vw]">
          <p>My repos</p>
          <ul>
            {data.map((repo: any) => (<li key={repo.id}>{repo.name}</li>))}
          </ul>

        </div>
        <div className="border-2 border-red-600 w-[50vw]">
          <p>AWS stacks</p>

        </div>
      </div>
    </div>
  )
}

export default Page;
