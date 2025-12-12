"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ShoppingListStatsProps {
  totalCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const ShoppingListStats = ({
  totalCount,
  completedCount,
  onClearCompleted,
}: ShoppingListStatsProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center text-sm text-[#ABB8C4]">
      <div className="flex items-center gap-4">
        <span>{totalCount} items</span>
        <span>{completedCount} completed</span>
        <span>{totalCount - completedCount} pending</span>
      </div>
      {completedCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearCompleted}
          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear Completed
        </Button>
      )}
    </div>
  );
};
