import { Check, Clock, X } from "lucide-react";

type AppointmentStatus = "Scheduled" | "Pending" | "Cancelled";

const statusConfig: Record<
  AppointmentStatus,
  {
    bg: string;
    text: string;
    icon: React.ReactNode;
  }
> = {
  Scheduled: {
    bg: "bg-[#0D2A1F]",
    text: "text-[#24AE7C]",
    icon: <Check className="w-3.5 h-3.5" />,
  },
  Pending: {
    bg: "bg-[#152432]",
    text: "text-[#79B5EC]",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  Cancelled: {
    bg: "bg-[#3E1716]",
    text: "text-[#F37877]",
    icon: <X className="w-3.5 h-3.5" />,
  },
};

interface StatusBadgeProps {
  status: AppointmentStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.icon}
      {status}
    </span>
  );
};
