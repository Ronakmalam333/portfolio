import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import { ProjectStatusManager } from "@/components/sections/ProjectStatusManager";

export default async function ProjectStatusPage() {
  // Check authentication
  const isAuthenticated = await verifyAdminSession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className='min-h-screen py-12'>
      <ProjectStatusManager />
    </div>
  );
}
