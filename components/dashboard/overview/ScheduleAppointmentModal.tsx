"use client";

import { useState } from "react";
import { CustomModal } from "@/components/shared/CustomModal";
import CustomButton from "@/components/shared/CustomButton";
import { FormFieldType } from "@/types";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Calendar } from "lucide-react";
import DoctorDropdown from "./DoctorDropdown";
import CustomInputField from "@/components/shared/CustomInputField";

interface ScheduleAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (values: any) => void;
}

export const ScheduleAppointmentModal = ({
  open,
  onClose,
  onSchedule,
}: ScheduleAppointmentModalProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      doctor: "",
      reason: "",
      date: "",
    },
  });

  const handleDoctorSelect = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    form.setValue("doctor", doctorName);
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    // Simulate API delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Submitting:", values);
    setIsLoading(false);

    // Pass values to parent
    onSchedule(values);

    // Reset and close
    form.reset();
    setSelectedDoctor("");
    onClose();
  };

  const handleClose = () => {
    if (!isLoading) {
      // Prevent closing while loading
      form.reset();
      setSelectedDoctor("");
      onClose();
    }
  };

  return (
    <CustomModal
      open={open}
      setOpen={handleClose}
      title="Schedule Appointment"
      description="Please fill in the following details to schedule"
      width="sm:max-w-[500px]"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <label className="text-sm text-[#ABB8C4] mb-2 block">Doctor</label>
            <DoctorDropdown
              onSelect={handleDoctorSelect}
              selectedDoctor={selectedDoctor}
              disabled={isLoading}
            />
            {form.formState.errors.doctor && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.doctor.message}
              </p>
            )}
          </div>

          <CustomInputField
            name="reason"
            label="Reason for appointment"
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            placeholder="ex. Annual monthly check-up"
            disabled={isLoading}
          />

          <CustomInputField
            name="date"
            label="Expected appointment date"
            control={form.control}
            fieldType={FormFieldType.DATE}
            placeholder="Select your appointment date"
            icon={<Calendar size={20} />}
            disabled={isLoading}
          />

          <CustomButton
            type="submit"
            title={isLoading ? "Scheduling..." : "Schedule appointment"}
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full h-12 bg-[#24AE7C] hover:bg-[#1d9368] disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </form>
      </Form>
    </CustomModal>
  );
};
