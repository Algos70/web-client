import { useAuth } from "../lib/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import RegisterForm from "../components/auth/RegisterForm";
import { ROUTES } from "../lib/constants/routes";

export default function Register() {
  const { register, isAuthenticated, loading } = useAuth();
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
        <title>Kayıt Ol - E-Ticaret Mağazası</title>
        <meta name="description" content="Yeni hesap oluşturun ve alışverişe başlayın." />
      </Head>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <RegisterForm onRegister={register} />
        </div>
      </main>
    </>
  );
}

// This page doesn't require authentication
Register.requireAuth = false;