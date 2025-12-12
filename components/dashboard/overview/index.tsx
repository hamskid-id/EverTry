// app/dashboard/page.tsx - Complete version
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeSection } from "./WelcomeSection";
import { StatsCards } from "./StatsCards";
import { APPOINTMENTS_DATA, STATS_DATA } from "@/constant/data";
import AppointmentsTable from "./AppointmentsTable";
import { ScheduleAppointmentModal } from "./ScheduleAppointmentModal";
import { CancelAppointmentModal } from "./CancelAppointmentModal";
import { ShoppingList } from "./ShoppingList";
import { ShoppingListPreview } from "./ShoppingListPreview";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShoppingItem } from "@/types/shopping";

const AdminDashboard = () => {
  const router = useRouter();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [shoppingListOpen, setShoppingListOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(
    null
  );

  // Shopping list state - moved here
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([
    {
      id: "1",
      name: "Fresh Tomatoes",
      quantity: "5kg",
      notes: "Ripe and red",
      completed: false,
      addedDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Onions",
      quantity: "10kg",
      notes: "Red onions preferred",
      completed: true,
      addedDate: "2024-01-14",
    },
    {
      id: "3",
      name: "Potatoes",
      quantity: "20kg",
      notes: "For planting",
      completed: false,
      addedDate: "2024-01-13",
    },
  ]);

  // Calculate counts for preview
  const totalItems = shoppingItems.length;
  const completedItems = shoppingItems.filter((item) => item.completed).length;

  const handleScheduleSubmit = (values: any) => {
    console.log("Scheduling appointment:", values);
    setScheduleModalOpen(false);
    router.push("/dashboard/success");
  };

  const handleCancelSubmit = (values: any) => {
    console.log("Cancelling appointment:", values);
    setCancelModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleScheduleClick = (appointmentIndex: number) => {
    setSelectedAppointment(appointmentIndex);
    setScheduleModalOpen(true);
  };

  const handleCancelClick = (appointmentIndex: number) => {
    setSelectedAppointment(appointmentIndex);
    setCancelModalOpen(true);
  };

  // Shopping list handlers
  const handleAddItem = (newItem: ShoppingItem) => {
    setShoppingItems([newItem, ...shoppingItems]);
  };

  const handleToggleCompletion = (id: string) => {
    setShoppingItems(
      shoppingItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setShoppingItems(shoppingItems.filter((item) => item.id !== id));
  };

  const handleClearCompleted = () => {
    setShoppingItems(shoppingItems.filter((item) => !item.completed));
  };

  return (
    <div className="text-white space-y-6">
      <WelcomeSection userName="Admin" />

      {/* Top Actions Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-[#ABB8C4]">
          Manage your shopping list for agricultural products
        </div>
        <Button
          onClick={() => setShoppingListOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to List
        </Button>
      </div>

      {/* Shopping List Preview */}
      {totalItems > 0 && (
        <ShoppingListPreview
          itemCount={totalItems}
          completedCount={completedItems}
          onViewList={() => setShoppingListOpen(true)}
        />
      )}

      <StatsCards stats={STATS_DATA} />

      <div className="bg-[#1A1D21] rounded-lg overflow-hidden">
        <AppointmentsTable
          appointments={APPOINTMENTS_DATA}
          onScheduleClick={handleScheduleClick}
          onCancelClick={handleCancelClick}
        />
      </div>

      <ScheduleAppointmentModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSchedule={handleScheduleSubmit}
      />

      <CancelAppointmentModal
        open={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onCancel={handleCancelSubmit}
      />

      {/* Shopping List Modal */}
      <ShoppingList
        open={shoppingListOpen}
        onClose={() => setShoppingListOpen(false)}
        items={shoppingItems}
        onAddItem={handleAddItem}
        onToggleCompletion={handleToggleCompletion}
        onDeleteItem={handleDeleteItem}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
};

export default AdminDashboard;
