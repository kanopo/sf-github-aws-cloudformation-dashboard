import { useSession, signIn, signOut } from "next-auth/react";
const LoginButton = () => {

  const { data: session, status } = useSession()

  if (status === "loading") {
    return
    <div className="w-[50vw] flex justify-end items-center">
      <p>Loading...</p>;
    </div>

  } else if (status === "unauthenticated") {
    return (
      <div className="w-[50vw] flex justify-end items-center">
        {/* <p>Not signed in</p> */}
        <button className="mr-10 border-2 p-2 rounded-md bg-slate-500" onClick={() => signIn()}>Sign in</button>
      </div>
    )
  } else if (status === "authenticated") {
    return (
      <div className="w-[50vw] flex justify-end items-center">
        <p className="mr-10">{session.user?.name}</p>
        {
          session.user?.image && <img src={session?.user?.image} alt="" className="w-[3vw] rounded-full mr-10" />
        }
        <button className="mr-10 border-2 p-2 rounded-md bg-slate-500" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
}

export default LoginButton;
