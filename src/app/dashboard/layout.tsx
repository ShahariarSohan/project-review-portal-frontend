import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { getUserProfile } from "@/services/auth/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileRes = await getUserProfile();
  const user = profileRes.data;

  if (!user) {
    redirect("/");
  }

  if (user.status === "BANNED") {
    redirect("/banned");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar user={user} />
        <main className="flex-1 p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}