"use client";

import { useState } from "react";
import CustomDropdown, {
  DropdownItem,
} from "@/components/shared/CustomDropdown";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { Check, ChevronDown } from "lucide-react";
import { DOCTORS_LIST } from "@/constant/data";

interface DoctorDropdownProps {
  onSelect: (doctorName: string) => void;
  selectedDoctor?: string;
  disabled?: boolean;
}

const DoctorDropdown = ({
  onSelect,
  selectedDoctor,
  disabled = false,
}: DoctorDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownItems: DropdownItem[] = DOCTORS_LIST.map((doctor) => ({
    label: doctor.name,
    onClick: () => {
      onSelect(doctor.name);
      setIsOpen(false); // Close dropdown after selection
    },
    avatar: doctor.name
      .split(" ")
      .map((n) => n[0])
      .join(""),
    selected: doctor.name === selectedDoctor,
    className: "px-4 py-3",
  }));

  return (
    <CustomDropdown
      trigger={
        <button
          type="button"
          disabled={disabled}
          className="w-full h-12 bg-[#1A1D21] border border-[#363A3D] rounded-lg px-4 flex items-center justify-between text-white hover:border-[#24AE7C] transition-colors focus:outline-none focus:ring-1 focus:ring-[#24AE7C]"
        >
          <div
            style={{
              background:
                "linear-gradient(117.58deg, rgba(215, 237, 237, 0.16) -47.79%, rgba(204, 235, 235, 0) 100%)",
            }}
            className="text-xs text-[#ABB8C4] rounded-[5px] border border-[#363A3D99] py-[4px] px-[12px] flex items-center gap-2"
          >
            <CustomAvatar
              name={selectedDoctor || "Select Doctor"}
              className="w-[22px] h-[22px]"
            />
            <span className="truncate max-w-[180px]">
              {selectedDoctor || "Select Doctor"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {selectedDoctor && <Check size={16} className="text-[#24AE7C]" />}
            <ChevronDown
              className={`w-4 h-4 text-white transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>
      }
      items={dropdownItems}
      className="w-full"
      contentClassName="w-full min-w-[250px]"
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
};
export default DoctorDropdown;
