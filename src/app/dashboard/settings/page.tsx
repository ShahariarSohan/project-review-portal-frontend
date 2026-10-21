import { getUserProfile } from "@/services/auth/auth";
import ProfileIdentityCard from "@/components/modules/settings/ProfileIdentityCard";
import ChangePasswordCard from "@/components/modules/settings/ChangePasswordCard";

export default async function SettingsPage() {
  const profileRes = await getUserProfile();
  const user = profileRes.data;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">
          Account Profile & Security
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 font-body">
          Manage your profile identity, access credentials, and account password.
        </p>
      </div>

      <ProfileIdentityCard user={user} />
      <ChangePasswordCard />
    </div>
  );
}