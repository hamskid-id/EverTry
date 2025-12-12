"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface ShoppingListSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ShoppingListSearch = ({
  searchQuery,
  onSearchChange,
}: ShoppingListSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-[#1A1D21] border-[#363A3D] text-white"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
