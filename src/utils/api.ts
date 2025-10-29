const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const makeAuthenticatedRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", // Always include cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};

export const api = {
  get: (endpoint: string) => makeAuthenticatedRequest(endpoint),
  
  post: (endpoint: string, data?: any) =>
    makeAuthenticatedRequest(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  put: (endpoint: string, data?: any) =>
    makeAuthenticatedRequest(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  delete: (endpoint: string) =>
    makeAuthenticatedRequest(endpoint, {
      method: "DELETE",
    }),
};