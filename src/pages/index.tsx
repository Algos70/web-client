import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user, loading, login, logout, isAuthenticated } = useAuth();

  const callBackend = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/protected`, {
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
      } else {
        console.error("Request failed:", response.status);
      }
    } catch (error) {
      console.error("Full error:", error);
    }
  };

  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      {!isAuthenticated ? (
        <button onClick={login}>Login with Keycloak</button>
      ) : (
        <>
          <p>Welcome, {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Roles: {user?.roles?.join(", ")}</p>
          <button onClick={callBackend}>Call Protected API</button>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </main>
  );
}
