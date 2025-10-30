import React from "react";

interface CategorySearchProps {
  search: string;
  onSearchChange: (search: string) => void;
}

export default function CategorySearch({
  search,
  onSearchChange,
}: CategorySearchProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full max-w-md px-4 py-2 border rounded-lg"
      />
    </div>
  );
}