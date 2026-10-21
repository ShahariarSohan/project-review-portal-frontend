import { redirect } from "next/navigation";
import { getUserProfile } from "@/services/auth/auth";
import BannedTerminationView from "@/components/modules/auth/BannedTerminationView";

export default async function BannedPage() {
  const profileRes = await getUserProfile();
  const user = profileRes.data;

  // Unauthenticated visitors are redirected to the login page
  if (!user) {
    redirect("/");
  }

  // Active or Suspended users have portal access and should not see the termination screen
  if (user.status !== "BANNED") {
    redirect("/dashboard");
  }

  return <BannedTerminationView user={user} />;
}
