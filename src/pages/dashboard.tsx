import { useAuth } from "../hooks/useAuth";
import { api } from "../utils/api";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/";
    }
  }, [loading, isAuthenticated]);

  const testProtectedEndpoint = async () => {
    try {
      const response = await api.get("/api/protected");
      if (response.ok) {
        const data = await response.json();
        console.log("Protected data:", data);
        alert(`Success: ${JSON.stringify(data)}`);
      } else {
        console.error("Failed to fetch protected data");
        alert("Failed to fetch protected data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred");
    }
  };

  if (loading) {
    return <main>Loading...</main>;
  }

  if (!isAuthenticated) {
    return <main>Redirecting...</main>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>User Info</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Roles:</strong> {user?.roles?.join(", ") || "No roles"}</p>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <button onClick={testProtectedEndpoint} style={{ marginRight: "10px" }}>
          Test Protected API
        </button>
        <button onClick={logout}>
          Logout
        </button>
      </div>
    </main>
  );
}