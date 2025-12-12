export interface Appointment {
  patient: string;
  avatar: string;
  date: string;
  status: "Scheduled" | "Pending" | "Cancelled";
  doctor: string;
  doctorAvatar?: string;
}

export interface StatCard {
  icon: React.ReactNode;
  count: number;
  label: string;
  color: string;
}

export type AppointmentStatus = "Scheduled" | "Pending" | "Cancelled";
