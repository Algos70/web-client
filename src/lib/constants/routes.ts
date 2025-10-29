export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
} as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN];

export const PROTECTED_ROUTES = [ROUTES.HOME, ROUTES.PROFILE];

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.includes(pathname as any);
};

export const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.includes(pathname as any);
};
