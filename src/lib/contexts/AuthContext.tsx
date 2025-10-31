import { createContext, useContext, ReactNode } from 'react';
import { useMe, useLogin, useRegister, useLogout } from '../graphql/hooks';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<{ success: boolean; error?: string; message?: string }>;
  logout: () => Promise<void>;
  refetchMe: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: meData, loading: meLoading, refetch: refetchMe } = useMe();
  const [loginMutation] = useLogin();
  const [registerMutation] = useRegister();
  const [logoutMutation] = useLogout();

  const user = meData?.me || null;
  const loading = meLoading;
  const isAuthenticated = !!user;

  const login = async (username: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: {
          input: { username, password }
        }
      });

      if (data?.login?.success) {
        // Refetch user data to update context
        await refetchMe();
        return { success: true, message: data.login.message };
      } else {
        return { success: false, error: "Login failed" };
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      const errorMessage = error.graphQLErrors?.[0]?.message || error.message || "Network error occurred";
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => {
    try {
      const { data } = await registerMutation({
        variables: {
          input: userData
        }
      });

      if (data?.register?.success) {
        return { success: true, message: data.register.message };
      } else {
        return { success: false, error: "Registration failed" };
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      const errorMessage = error.graphQLErrors?.[0]?.message || error.message || "Network error occurred";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await logoutMutation();
      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout fails, redirect to login
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        refetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};