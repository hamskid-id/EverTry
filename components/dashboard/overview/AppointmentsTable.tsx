import CustomTable, {
  TableColumn,
  TableRowData,
} from "@/components/shared/CustomTable";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { StatusBadge } from "./StatusBadge";
import { APPOINTMENTS_DATA } from "@/constant/data";
import { Pagination } from "@/components/shared/Pagination";
import { useState } from "react";

interface AppointmentsTableProps {
  appointments: typeof APPOINTMENTS_DATA;
  onScheduleClick: (index: number) => void;
  onCancelClick: (index: number) => void;
}

const AppointmentsTable = ({
  appointments,
  onScheduleClick,
  onCancelClick,
}: AppointmentsTableProps) => {
  const totalPageNumber = 2;
  const [activePage, setActivePage] = useState(1);

  const columns: TableColumn[] = [
    { key: "patient", label: "Patient", width: "w-[200px]" },
    { key: "date", label: "Date", width: "w-[150px]" },
    { key: "status", label: "Status", width: "w-[150px]" },
    { key: "doctor", label: "Doctor", width: "w-[200px]" },
    { key: "actions", label: "Actions", width: "w-[200px]", align: "right" },
  ];

  const rows: TableRowData[] = appointments.map((apt, index) => ({
    patient: (
      <div className="flex items-center gap-3">
        <CustomAvatar name={apt.patient} imageSrc={apt.avatar} />
        <span>{apt.patient}</span>
      </div>
    ),
    date: apt.date,
    status: <StatusBadge status={apt.status} />,
    doctor: (
      <div className="flex items-center gap-2">
        <CustomAvatar name={apt.doctor} imageSrc={apt.doctorAvatar} />
        <span>{apt.doctor}</span>
      </div>
    ),
    actions: (
      <div className="flex gap-4 justify-end">
        <button
          onClick={() => onScheduleClick(index)}
          className="text-[#24AE7C] text-sm hover:underline cursor-pointer"
        >
          Schedule
        </button>
        <button
          onClick={() => onCancelClick(index)}
          className="text-[#FBECEC] text-sm hover:underline cursor-pointer"
        >
          Cancel
        </button>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col">
      <CustomTable columns={columns} rows={rows} className="text-white" />

      <div className="bg-black">
        <Pagination
          totalPageNumber={totalPageNumber}
          activePage={activePage}
          setPageNumber={setActivePage}
        />
      </div>
    </div>
  );
};

export default AppointmentsTable;
