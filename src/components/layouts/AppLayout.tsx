import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/hooks/useAuth';
import { ROUTES } from '../../lib/constants/routes';
import LoadingSpinner from '../auth/LoadingSpinner';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

interface AppLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export default function AppLayout({ children, requireAuth = true }: AppLayoutProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && requireAuth && !isAuthenticated) {
      // Add current path as redirect parameter
      const redirectUrl = `${ROUTES.LOGIN}?redirect=${encodeURIComponent(router.asPath)}`;
      router.push(redirectUrl);
    }
  }, [loading, requireAuth, isAuthenticated, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (requireAuth && !isAuthenticated) {
    return <LoadingSpinner />;
  }

  const showHeaderFooter = router.pathname !== ROUTES.LOGIN;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showHeaderFooter && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}