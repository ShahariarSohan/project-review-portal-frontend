import SignupForm from "@/components/modules/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-100/70 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}