export const formatPermission = (permission: string): string => {
  return permission
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getPermissionColor = (permission: string): string => {
  if (permission.includes('admin')) return 'bg-red-100 text-red-800';
  if (permission.includes('write')) return 'bg-green-100 text-green-800';
  if (permission.includes('read')) return 'bg-blue-100 text-blue-800';
  return 'bg-gray-100 text-gray-800';
};

export const groupPermissions = (permissions: string[]): Record<string, string[]> => {
  const groups: Record<string, string[]> = {};
  
  permissions.forEach(permission => {
    const [resource] = permission.split('_');
    if (!groups[resource]) {
      groups[resource] = [];
    }
    groups[resource].push(permission);
  });
  
  return groups;
};