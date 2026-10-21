"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  GraduationScrollIcon,
  UserIcon,
  Mail01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
} from "hugeicons-react";
import signupStudent from "@/services/auth/signupStudent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputFieldError from "@/components/shared/InputFieldError";

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signupStudent, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-teal-800 text-teal-100 flex items-center justify-center mb-3 shadow-sm border border-teal-700">
          <GraduationScrollIcon className="w-6 h-6 stroke-[2]" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 tracking-tight">
          Student Registration
        </h1>
        <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider font-body">
          Create an Account to Submit Projects
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-2xs border border-slate-200/90 p-7">
        <form action={formAction} className="space-y-4">
          {state?.message && !state?.success && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200 font-body">
              {state.message}
            </div>
          )}

          <div>
            <Label
              htmlFor="name"
              className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Full Name
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <UserIcon className="w-4 h-4" />
              </div>
              <Input
                id="name"
                name="name"
                type="text"
                className="pl-9 h-10 text-xs"
                placeholder="e.g. Alex Hunter"
                required
              />
            </div>
            <InputFieldError field="name" state={state} />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Student Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail01Icon className="w-4 h-4" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                className="pl-9 h-10 text-xs"
                placeholder="student@university.edu"
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
                className="pl-9 pr-10 h-10 text-xs font-mono"
                placeholder="At least 6 characters"
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

          <div>
            <Label
              htmlFor="confirmPassword"
              className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <LockPasswordIcon className="w-4 h-4" />
              </div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="pl-9 pr-10 h-10 text-xs font-mono"
                placeholder="Re-enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showConfirmPassword ? (
                  <ViewOffIcon className="w-4 h-4" />
                ) : (
                  <ViewIcon className="w-4 h-4" />
                )}
              </button>
            </div>
            <InputFieldError field="confirmPassword" state={state} />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-teal-800 hover:bg-teal-900 text-white font-heading font-semibold text-xs h-10 rounded-lg shadow-sm cursor-pointer mt-2"
          >
            {isPending ? "Creating Account..." : "Create Student Account"}
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-body">
            Already have an account?{" "}
            <Link
              href="/"
              className="font-semibold text-teal-800 hover:text-teal-950 font-heading"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
