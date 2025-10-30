import { useAuth } from "../lib/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import LoginForm from "../components/auth/LoginForm";
import { ROUTES } from "../lib/constants/routes";

export default function Login() {
  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      const redirect = router.query.redirect as string || ROUTES.HOME;
      router.push(redirect);
    }
  }, [isAuthenticated, loading, router]);

  if (isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Giriş Yap - E-Ticaret Mağazası</title>
        <meta name="description" content="Hesabınıza giriş yapın ve alışverişe başlayın." />
      </Head>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <LoginForm onLogin={login} />
        </div>
      </main>
    </>
  );
}

// This page doesn't require authentication
Login.requireAuth = false;
