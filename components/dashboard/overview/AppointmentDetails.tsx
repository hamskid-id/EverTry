import { Calendar } from "lucide-react";
import CustomAvatar from "@/components/shared/CustomAvatar";

interface AppointmentDetailsProps {
  details: {
    doctor: string;
    date: string;
  };
}

const AppointmentDetails = ({ details }: AppointmentDetailsProps) => {
  return (
    <div className="flex gap-5 flex-wrap justify-center items-center bg-[#0D0F10] border-y-2 border-[#363A3D99] px-4 md:py-8 py-4 mb-6">
      <p className="text-base text-[#ABB8C4] mb-2">
        Requested appointment details:
      </p>
      <div className="flex items-center justify-center gap-4 text-sm">
        <div
          style={{
            background:
              "linear-gradient(117.58deg, rgba(215, 237, 237, 0.16) -47.79%, rgba(204, 235, 235, 0) 100%)",
          }}
          className="text-[#ABB8C4] rounded-[5px] border border-[#363A3D99] py-[8px] px-[12px] flex items-center gap-2"
        >
          <CustomAvatar name={details.doctor} />
          <span className="text-white">{details.doctor}</span>
        </div>
        <div className="text-[#ABB8C4] flex items-center gap-2">
          <Calendar size={16} />
          <span>{details.date}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
