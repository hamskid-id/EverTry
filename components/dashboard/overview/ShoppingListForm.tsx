"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { FormFieldType } from "@/types";
import { ShoppingItem } from "@/types/shopping";
import CustomInputField from "@/components/shared/CustomInputField";

interface ShoppingListFormProps {
  onAddItem: (item: ShoppingItem) => void;
}

export const ShoppingListForm = ({ onAddItem }: ShoppingListFormProps) => {
  const form = useForm({
    defaultValues: {
      name: "",
      quantity: "",
      notes: "",
    },
  });

  const handleSubmit = (values: any) => {
    if (!values.name.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: values.name,
      quantity: values.quantity || "1",
      notes: values.notes || "",
      completed: false,
      addedDate: new Date().toISOString().split("T")[0],
    };

    onAddItem(newItem);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 bg-[#1A1D21] p-4 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-[#ABB8C4] mb-2 block">
              Item Name
            </label>
            <Input
              {...form.register("name")}
              placeholder="e.g., Fresh Tomatoes"
              className="bg-[#0D0F10] border-[#363A3D] text-white"
            />
          </div>
          <div>
            <label className="text-sm text-[#ABB8C4] mb-2 block">
              Quantity
            </label>
            <Input
              {...form.register("quantity")}
              placeholder="e.g., 5kg, 10 bags"
              className="bg-[#0D0F10] border-[#363A3D] text-white"
            />
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        <CustomInputField
          name="notes"
          label="Notes (Optional)"
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          placeholder="Additional details, preferred quality, etc."
          className="bg-[#0D0F10] border-[#363A3D] text-white"
        />
      </form>
    </Form>
  );
};
