import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();

  const callBackend = async () => {
    try {
      const token = session?.accessToken;
      console.log("Token:", token);
      const res = await axios.get("http://localhost:4000/api/testRole", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log("Success:", res.data);
    } catch (error) {
      console.error("Full error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response:", error.response?.data);
        console.error("Status:", error.response?.status);
        console.error("Headers:", error.response?.headers);
      }
    }
  };

  return (
    <main>
      {!session ? (
        <button onClick={() => signIn("keycloak")}>Login with Keycloak</button>
      ) : (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={callBackend}>Call Backend API</button>
          <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
        </>
      )}
    </main>
  );
}
