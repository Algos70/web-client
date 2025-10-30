// Helper function to get unique background color based on category slug
export function getCategoryColor(categorySlug: string): string {
  // Generate a unique color based on category slug hash
  let hash = 0;
  for (let i = 0; i < categorySlug.length; i++) {
    hash = categorySlug.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    "from-blue-500 to-blue-700",
    "from-pink-500 to-rose-600",
    "from-green-500 to-emerald-600",
    "from-purple-500 to-indigo-600",
    "from-orange-500 to-red-600",
    "from-teal-500 to-cyan-600",
    "from-yellow-500 to-orange-600",
    "from-indigo-500 to-purple-600",
    "from-rose-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-sky-500 to-blue-600",
    "from-violet-500 to-purple-600",
    "from-lime-500 to-green-600",
    "from-fuchsia-500 to-pink-600",
    "from-cyan-500 to-teal-600",
  ];

  return colors[Math.abs(hash) % colors.length];
}