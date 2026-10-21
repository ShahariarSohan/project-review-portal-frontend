"use client";

import { useActionState, useEffect, useState } from "react";
import {
  UserAdd01Icon,
  Mail01Icon,
  UserIcon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffSlashIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
} from "hugeicons-react";
import createMentor from "@/services/user/createMentor";
import { IInputErrorState } from "@/lib/getInputFieldError";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputFieldError from "@/components/shared/InputFieldError";

export default function AddMentorDialog() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, isPending] = useActionState<
    IInputErrorState | null,
    FormData
  >(createMentor, null);

  useEffect(() => {
    if (state?.success) {
      setName("");
      setEmail("");
      setPassword("");
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [state?.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-800 hover:bg-teal-900 text-white font-heading font-semibold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer">
          <UserAdd01Icon className="w-3.5 h-3.5" />
          <span>Add Mentor</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register New Mentor</DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Create an evaluator account with mentor privileges to review project submissions.
          </DialogDescription>
        </DialogHeader>

        {state?.success && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 font-body">
            <CheckmarkCircle02Icon className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        {state?.success === false && !state?.errors?.length && state?.message && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2 font-body">
            <AlertCircleIcon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{state.message}</span>
          </div>
        )}

        <form action={formAction} className="space-y-4 pt-1 font-body">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="mentor-name" className="text-xs font-heading font-semibold text-slate-700">
              Full Name <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <UserIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="mentor-name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Jane Smith"
                className="pl-9 h-9 text-xs"
                required
              />
            </div>
            <InputFieldError field="name" state={state} />
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <Label htmlFor="mentor-email" className="text-xs font-heading font-semibold text-slate-700">
              Email Address <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <Mail01Icon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="mentor-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mentor@reviewportal.com"
                className="pl-9 h-9 text-xs"
                required
              />
            </div>
            <InputFieldError field="email" state={state} />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="mentor-password" className="text-xs font-heading font-semibold text-slate-700">
              Initial Password <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <LockPasswordIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="mentor-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8 to 15 characters"
                className="pl-9 pr-9 h-9 text-xs"
                minLength={8}
                maxLength={15}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? (
                  <ViewOffSlashIcon className="w-3.5 h-3.5" />
                ) : (
                  <ViewIcon className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <InputFieldError field="password" state={state} />
          </div>

          {/* Dialog Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="text-xs font-heading font-medium cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="bg-teal-800 hover:bg-teal-900 text-white text-xs font-heading font-semibold cursor-pointer"
            >
              {isPending ? "Creating..." : "Create Mentor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
