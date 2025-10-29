export const formatPermission = (permission: string): string => {
  return permission
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getPermissionColor = (permission: string): string => {
  if (permission.includes("admin")) return "bg-rose-100 text-rose-800 border border-rose-200";
  if (permission.includes("write")) return "bg-emerald-100 text-emerald-800 border border-emerald-200";
  if (permission.includes("read")) return "bg-sky-100 text-sky-800 border border-sky-200";
  return "bg-slate-100 text-slate-800 border border-slate-200";
};

export const hasPermission = (
  userPermissions: string[] | undefined,
  requiredPermission: string
): boolean => {
  return userPermissions?.includes(requiredPermission) || false;
};
