"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  Shield01Icon,
  Mail01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
  UserCheck01Icon,
  UserEdit01Icon,
  GraduationScrollIcon,
} from "hugeicons-react";
import loginUser from "@/services/auth/loginUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputFieldError from "@/components/shared/InputFieldError";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const fillDemoCredentials = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div>
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-teal-800 text-teal-100 flex items-center justify-center mb-3 shadow-sm border border-teal-700">
          <Shield01Icon className="w-6 h-6 stroke-[2]" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 tracking-tight">
          Project Review Portal
        </h1>
        <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider font-body">
          Evaluation Console & Submission Portal
        </p>
      </div>

      {/* Quick Demo Credentials Bar for Evaluators */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 mb-4">
        <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500 mb-2">
          Quick One-Click Demo Credentials
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() =>
              fillDemoCredentials("admin@reviewportal.com", "Admin123")
            }
            className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-300 text-slate-700 hover:text-teal-900 text-[11px] font-medium transition-colors cursor-pointer"
          >
            <UserCheck01Icon className="w-3.5 h-3.5 text-teal-700" />
            <span>Admin</span>
          </button>
          <button
            type="button"
            onClick={() =>
              fillDemoCredentials("mentor@reviewportal.com", "Mentor123")
            }
            className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-300 text-slate-700 hover:text-teal-900 text-[11px] font-medium transition-colors cursor-pointer"
          >
            <UserEdit01Icon className="w-3.5 h-3.5 text-teal-700" />
            <span>Mentor</span>
          </button>
          <button
            type="button"
            onClick={() =>
              fillDemoCredentials("student@reviewportal.com", "Student123")
            }
            className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-300 text-slate-700 hover:text-teal-900 text-[11px] font-medium transition-colors cursor-pointer"
          >
            <GraduationScrollIcon className="w-3.5 h-3.5 text-teal-700" />
            <span>Student</span>
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-xl shadow-2xs border border-slate-200/90 p-7">
        <form action={formAction} className="space-y-4">
          {state?.message && !state?.success && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200 font-body">
              {state.message}
            </div>
          )}

          <div>
            <Label
              htmlFor="email"
              className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail01Icon className="w-4 h-4" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 h-10 text-xs"
                placeholder="name@reviewportal.com"
                required
              />
            </div>
            <InputFieldError field="email" state={state} />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <LockPasswordIcon className="w-4 h-4" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 pr-10 h-10 text-xs font-mono"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <ViewOffIcon className="w-4 h-4" />
                ) : (
                  <ViewIcon className="w-4 h-4" />
                )}
              </button>
            </div>
            <InputFieldError field="password" state={state} />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-teal-800 hover:bg-teal-900 text-white font-heading font-semibold text-xs h-10 rounded-lg transition-colors cursor-pointer"
          >
            {isPending ? "Signing in..." : "Sign In to Portal"}
          </Button>
        </form>

        {/* Registration Navigation */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-body">
            Need a student account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-teal-800 hover:text-teal-900 underline underline-offset-2"
            >
              Create Student Account
            </Link>
          </p>
        </div>
      </div>

      <p className="text-center text-[11px] text-slate-400 mt-6 font-mono">
        Project Review Portal
      </p>
    </div>
  );
}
