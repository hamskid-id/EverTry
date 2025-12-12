import { CustomModal } from "@/components/shared/CustomModal";
import CustomButton from "@/components/shared/CustomButton";
import { FormFieldType } from "@/types";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomInputField from "@/components/shared/CustomInputField";


interface CancelAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onCancel: (values: any) => void;
}

export const CancelAppointmentModal = ({
  open,
  onClose,
  onCancel,
}: CancelAppointmentModalProps) => {
  const form = useForm({
    defaultValues: {
      reason: "",
    },
  });

  const handleSubmit = (values: any) => {
    onCancel(values);
    form.reset();
  };

  return (
    <CustomModal
      open={open}
      setOpen={onClose}
      title="Cancel Appointment"
      description="Are you sure you want to cancel your appointment"
      width="sm:max-w-[450px]"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <CustomInputField
            name="reason"
            label="Reason for cancellation"
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            placeholder="ex. Urgent meeting came up"
          />

          <CustomButton
            type="submit"
            title="Cancel appointment"
            className="w-full h-12 bg-red-500 hover:bg-red-600"
          />
        </form>
      </Form>
    </CustomModal>
  );
};
