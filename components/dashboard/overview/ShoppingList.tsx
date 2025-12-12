"use client";

import  { useState } from "react";
import { CustomModal } from "@/components/shared/CustomModal";
import { ShoppingListForm } from "./ShoppingListForm";
import { ShoppingListSearch } from "./ShoppingListSearch";
import { ShoppingListStats } from "./ShoppingListStats";
import { ShoppingListItem } from "./ShoppingListItem";
import { ShoppingListEmpty } from "./ShoppingListEmpty";
import { ShoppingListActions } from "./ShoppingListActions";
import { ShoppingItem } from "@/types/shopping";

interface ShoppingListProps {
  open: boolean;
  onClose: () => void;
  items: ShoppingItem[];
  onAddItem: (item: ShoppingItem) => void;
  onToggleCompletion: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onClearCompleted: () => void;
  onFindSellers?: () => void;
}

export const ShoppingList = ({
  open,
  onClose,
  items,
  onAddItem,
  onToggleCompletion,
  onDeleteItem,
  onClearCompleted,
  onFindSellers,
}: ShoppingListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = items.filter((item) => item.completed).length;
  const totalCount = items.length;

  return (
    <CustomModal
      open={open}
      setOpen={onClose}
      title="My Shopping List"
      description="Add items you want to buy from farmers/sellers"
      width="sm:max-w-[500px]"
    >
      <div className="space-y-6">
        {/* Add Item Form */}
        <ShoppingListForm onAddItem={onAddItem} />

        {/* Search */}
        <ShoppingListSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Stats */}
        <ShoppingListStats
          totalCount={totalCount}
          completedCount={completedCount}
          onClearCompleted={onClearCompleted}
        />

        {/* Items List */}
        <div className="space-y-3 overflow-y-auto pr-2 custom-scroll max-h-[400px]">
          {filteredItems.length === 0 ? (
            <ShoppingListEmpty searchQuery={searchQuery} />
          ) : (
            filteredItems.map((item) => (
              <ShoppingListItem
                key={item.id}
                item={item}
                onToggleCompletion={onToggleCompletion}
                onDeleteItem={onDeleteItem}
              />
            ))
          )}
        </div>

        {/* Action Buttons */}
        <ShoppingListActions
          itemsCount={items.length}
          onClose={onClose}
          onFindSellers={onFindSellers}
        />
      </div>
    </CustomModal>
  );
};
