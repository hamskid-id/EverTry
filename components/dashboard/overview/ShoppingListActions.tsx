"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ShoppingListActionsProps {
  itemsCount: number;
  onClose: () => void;
  onFindSellers?: () => void;
}

export const ShoppingListActions = ({
  itemsCount,
  onClose,
  onFindSellers,
}: ShoppingListActionsProps) => {
  return (
    <div className="flex gap-3 pt-4 border-t border-[#363A3D]">
      <Button
        variant="outline"
        className="flex-1 border-[#363A3D] text-[#ABB8C4] hover:text-white"
        onClick={onClose}
      >
        Close
      </Button>
      {itemsCount > 0 && onFindSellers && (
        <Button
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          onClick={onFindSellers}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Find Sellers
        </Button>
      )}
    </div>
  );
};
