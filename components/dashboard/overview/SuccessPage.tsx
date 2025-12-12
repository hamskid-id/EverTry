"use client";

import { Check, ArrowLeft, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AppointmentDetails from "./AppointmentDetails";

export const SuccessPage = () => {
  const router = useRouter();
  const appointmentDetails = {
    doctor: "Dr. Adam Smith",
    date: "23 June 2024 - 5:00 PM",
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="text-center py-8">
      {/* Back Button */}
      <div className="flex justify-start mb-6">
        <button
          onClick={handleBack}
          className="flex cursor-pointer items-center gap-2 text-[#ABB8C4] hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className="sm:w-20 w-15 h-15 sm:h-20 mx-auto mb-6 rounded-full border-4 border-[#4AC97E] flex items-center justify-center">
        <Check className="sm:text-[40px] text-[30px] text-[#4AC97E]" />
      </div>
      <div className="md:w-[350px] w-full m-auto">
        <h2 className="sm:text-2xl text-xl text-white font-semibold mb-2">
          Your <span className="text-[#4AC97E]">appointment request</span> has
          been successfully submitted!
        </h2>
      </div>
      <p className="text-[#ABB8C4] mt-4 mb-7 text-sm">
        We'll be in touch shortly to confirm.
      </p>

      <AppointmentDetails details={appointmentDetails} />
    </div>
  );
};

export default SuccessPage;
