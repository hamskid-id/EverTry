import { SuccessPage } from "@/components/dashboard/overview/SuccessPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FHFL | Dashboard Overview",
  description: "View system summary",
};

export default function DashboardSuccessPage() {
  return <SuccessPage />;
}
