"use client";

import { ShoppingCart } from "lucide-react";

interface ShoppingListEmptyProps {
  searchQuery: string;
}

export const ShoppingListEmpty = ({ searchQuery }: ShoppingListEmptyProps) => {
  return (
    <div className="text-center py-8 text-[#ABB8C4]">
      <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p>
        {searchQuery ? "No items match your search" : "No items in your list"}
      </p>
      <p className="text-sm mt-1">
        {searchQuery
          ? "Try a different search term"
          : "Add items above to get started"}
      </p>
    </div>
  );
};
