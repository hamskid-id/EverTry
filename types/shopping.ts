// types/shopping.ts
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  notes: string;
  completed: boolean;
  addedDate: string;
  priority?: "low" | "medium" | "high";
  category?: string;
}

export interface ShoppingListStats {
  total: number;
  completed: number;
  pending: number;
  byCategory: Record<string, number>;
}
