"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Add01Icon,
  GithubIcon,
  GlobeIcon,
  NoteIcon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
} from "hugeicons-react";
import submitProject, {
  IProjectSubmissionState,
} from "@/services/project/submitProject";
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

interface ISubmissionFormDialogProps {
  isRestricted?: boolean;
}

export default function SubmissionFormDialog({
  isRestricted,
}: ISubmissionFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<
    IProjectSubmissionState | null,
    FormData
  >(submitProject, null);

  const [countdown, setCountdown] = useState<number | null>(null);

  // Auto-close on success
  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [state?.success]);

  // Rate limit dynamic countdown
  useEffect(() => {
    if (state?.isRateLimited && state?.retryAfterSeconds) {
      setCountdown(state.retryAfterSeconds);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (!prev || prev <= 1) {
            clearInterval(interval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state?.isRateLimited, state?.retryAfterSeconds]);

  if (isRestricted) {
    return (
      <Button
        disabled
        className="opacity-60 cursor-not-allowed bg-slate-200 text-slate-500 font-heading font-semibold text-xs h-9 px-4 rounded-lg flex items-center gap-1.5 shadow-none"
        title="Student account is suspended or banned"
      >
        <Cancel01Icon className="w-4 h-4 stroke-[2]" />
        <span>Submissions Restricted</span>
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-800 hover:bg-teal-900 text-white font-heading font-semibold text-xs h-9 px-4 rounded-lg cursor-pointer flex items-center gap-1.5 shadow-sm">
          <Add01Icon className="w-4 h-4 stroke-[2]" />
          <span>Submit Project</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Project for Evaluation</DialogTitle>
          <DialogDescription>
            Provide your GitHub repository and live demo URL for mentor review.
          </DialogDescription>
        </DialogHeader>

        {/* Success Banner */}
        {state?.success && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 font-body">
            <CheckmarkCircle02Icon className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        {/* Duplicate Submission Conflict Banner */}
        {state?.isDuplicate && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2 font-body">
            <AlertCircleIcon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{state.message}</span>
          </div>
        )}

        {/* Rate Limit Countdown Banner */}
        {state?.isRateLimited && (
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-start gap-2 font-body">
            <AlertCircleIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p>{state.message}</p>
              {countdown !== null && (
                <p className="font-mono text-[11px] text-amber-700 mt-1">
                  Cooldown resets in: {countdown}s
                </p>
              )}
            </div>
          </div>
        )}

        {/* General Error */}
        {state?.message && !state?.success && !state?.isDuplicate && !state?.isRateLimited && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold font-body">
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-3.5">
          <div>
            <Label htmlFor="title" className="mb-1 block text-[11px]">
              Project Name / Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Distributed Task Orchestrator"
              required
              minLength={3}
              maxLength={100}
            />
            <InputFieldError field="title" state={state} />
          </div>

          <div>
            <Label htmlFor="repoUrl" className="mb-1 block text-[11px]">
              GitHub Repository URL
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <GithubIcon className="w-4 h-4" />
              </div>
              <Input
                id="repoUrl"
                name="repoUrl"
                type="url"
                className="pl-9 font-mono"
                placeholder="https://github.com/username/project-repo"
                required
              />
            </div>
            <InputFieldError field="repoUrl" state={state} />
          </div>

          <div>
            <Label htmlFor="liveUrl" className="mb-1 block text-[11px]">
              Live URL
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <GlobeIcon className="w-4 h-4" />
              </div>
              <Input
                id="liveUrl"
                name="liveUrl"
                type="url"
                className="pl-9 font-mono"
                placeholder="https://project-demo.vercel.app"
                required
              />
            </div>
            <InputFieldError field="liveUrl" state={state} />
          </div>

          <div>
            <Label htmlFor="description" className="mb-1 block text-[11px]">
              Project Description & Architecture (Min 20 chars)
            </Label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              minLength={20}
              maxLength={3000}
              placeholder="Describe features, stack, and architectural decisions..."
              className="flex w-full rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-900 shadow-2xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700 font-body"
            />
            <InputFieldError field="description" state={state} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-9 px-4 text-xs font-heading font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || countdown !== null}
              className="bg-teal-800 hover:bg-teal-900 text-white font-heading font-semibold text-xs h-9 px-5 rounded-lg cursor-pointer"
            >
              {isPending
                ? "Submitting..."
                : countdown !== null
                ? `Wait ${countdown}s`
                : "Submit Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}