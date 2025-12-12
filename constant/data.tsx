import AvatarImage from "@/public/assets/Avatar.png";
import { CheckedCalender, HourGlass, Warning } from "@/svg";
import { StatCard } from "@/types/data";

export const STATS_DATA: StatCard[] = [
  {
    icon: <CheckedCalender />,
    count: 94,
    label: "Total number of scheduled appointments",
    color: "#FEC84B",
  },
  {
    icon: <HourGlass />,
    count: 32,
    label: "Total number of pending appointments",
    color: "#3B82F6",
  },
  {
    icon: <Warning />,
    count: 56,
    label: "Total number of cancelled appointments",
    color: "#EF4444",
  },
];

export const APPOINTMENTS_DATA = [
  {
    patient: "Phoenix Baker",
    avatar: "PB",
    date: "Jan 4, 2022",
    status: "Scheduled" as const,
    doctor: "Dr. Alex Ramirez",
    doctorAvatar: AvatarImage.src,
  },
  {
    patient: "Candice Wu",
    avatar: "CW",
    date: "Jan 2, 2022",
    status: "Pending" as const,
    doctor: "Dr. Michael May",
  },
  {
    patient: "Lana Steiner",
    avatar: "LS",
    date: "Jan 4, 2022",
    status: "Cancelled" as const,
    doctor: "Dr. Jasmine Lee",
    doctorAvatar: AvatarImage.src,
  },
  {
    patient: "Drew Cano",
    avatar: "DC",
    date: "Jan 8, 2022",
    status: "Scheduled" as const,
    doctor: "Dr. Hareth Sharma",
  },
  {
    patient: "Natali Craig",
    avatar: "NC",
    date: "Jan 6, 2022",
    status: "Pending" as const,
    doctor: "Dr. Ayana Cruz",
  },
];

export const DOCTORS_LIST = [
  { id: "1", name: "Dr. Sarah Safari" },
  { id: "2", name: "Dr. Ava Williams" },
  { id: "3", name: "Dr. Adam Smith" },
];
