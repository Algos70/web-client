export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  ADMIN_PANEL: "/admin-panel",
  ADMIN_CATEGORIES: "/admin/categories",
} as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN];

export const PROTECTED_ROUTES = [ROUTES.HOME, ROUTES.PROFILE, ROUTES.ADMIN_PANEL, ROUTES.ADMIN_CATEGORIES];

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.includes(pathname as any);
};

export const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.includes(pathname as any);
};
