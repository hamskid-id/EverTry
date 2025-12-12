import AdminDashboard from "@/components/dashboard/overview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FHFL | Dashboard Overview",
  description: "View system summary",
};

export default function DashboardPage() {
  return <AdminDashboard />;
}
