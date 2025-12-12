"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeSection } from "./WelcomeSection";
import { StatsCards } from "./StatsCards";
import { APPOINTMENTS_DATA, STATS_DATA } from "@/constant/data";
import AppointmentsTable from "./AppointmentsTable";
import { ScheduleAppointmentModal } from "./ScheduleAppointmentModal";
import { CancelAppointmentModal } from "./CancelAppointmentModal";

const AdminDashboard = () => {
  const router = useRouter();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(
    null
  );

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

  return (
    <div className="text-white">
      <WelcomeSection userName="Admin" />

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
    </div>
  );
};

export default AdminDashboard;
