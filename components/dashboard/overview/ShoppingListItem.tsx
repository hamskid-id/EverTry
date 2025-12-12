"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Check } from "lucide-react";
import { ShoppingItem } from "@/types/shopping";

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggleCompletion: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export const ShoppingListItem = ({
  item,
  onToggleCompletion,
  onDeleteItem,
}: ShoppingListItemProps) => {
  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        item.completed
          ? "bg-emerald-900/10 border-emerald-800"
          : "bg-[#1A1D21] border-[#363A3D] hover:border-emerald-800"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => onToggleCompletion(item.id)}
            className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              item.completed
                ? "bg-emerald-600 border-emerald-600"
                : "border-[#363A3D] hover:border-emerald-600"
            }`}
          >
            {item.completed && <Check className="h-3 w-3 text-white" />}
          </button>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium ${
                item.completed ? "text-emerald-300 line-through" : "text-white"
              }`}
            >
              {item.name}
            </h3>
            {item.quantity && (
              <p className="text-sm text-[#ABB8C4] mt-1">
                Quantity: {item.quantity}
              </p>
            )}
            {item.notes && (
              <p className="text-sm text-[#ABB8C4] mt-1">{item.notes}</p>
            )}
            <p className="text-xs text-[#6B7280] mt-2">
              Added: {item.addedDate}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteItem(item.id)}
          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 ml-2"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
