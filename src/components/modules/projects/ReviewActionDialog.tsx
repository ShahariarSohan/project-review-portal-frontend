"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "@/lib/toast";
import {
  CheckmarkCircle02Icon,
  Cancel01Icon,
  GithubIcon,
  GlobeIcon,
  LinkSquare02Icon,
  NoteIcon,
} from "hugeicons-react";
import reviewProject, { IReviewProjectState } from "@/services/project/reviewProject";
import { IProjectItem } from "@/services/project/getProjects";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import InputFieldError from "@/components/shared/InputFieldError";

interface IReviewActionDialogProps {
  project: IProjectItem;
  isRestricted?: boolean;
}

export default function ReviewActionDialog({
  project,
  isRestricted,
}: IReviewActionDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<IReviewProjectState | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<"APPROVED" | "REJECTED">(
    project.status === "REJECTED" ? "REJECTED" : "APPROVED"
  );
  const [reviewNotes, setReviewNotes] = useState(project.reviewNotes || "");

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      setSelectedStatus(project.status === "REJECTED" ? "REJECTED" : "APPROVED");
      setReviewNotes(project.reviewNotes || "");
      setState(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await reviewProject(project.id, null, formData);
      setState(res);

      if (res?.success) {
        toast.success(res.message || "Review submitted successfully!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to submit evaluation review.");
      }
    } catch (err: any) {
      console.error("Review submission error:", err);
      toast.error(err?.message || "An unexpected error occurred while submitting review.");
    } finally {
      setIsPending(false);
    }
  };

  if (isRestricted) {
    return (
      <Button
        size="sm"
        disabled
        className="h-8 px-2.5 text-xs font-heading font-medium opacity-50 cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200 shadow-none"
        title="Evaluator account is suspended or banned"
      >
        <NoteIcon className="w-3.5 h-3.5 mr-1" />
        <span>Restricted</span>
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-8 px-2.5 text-xs font-heading font-semibold cursor-pointer bg-teal-800 text-white hover:bg-teal-900 transition-colors shadow-2xs"
        >
          <NoteIcon className="w-3.5 h-3.5 mr-1" />
          <span>Review</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Project Evaluation Review</DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Examine candidate repository, test live demo, and record your assessment. Decisions are final once confirmed.
          </DialogDescription>
        </DialogHeader>

        {/* Project Context Summary Card */}
        <div className="rounded-lg bg-slate-50 border border-slate-200/90 p-3 space-y-2 text-xs font-body">
          <div>
            <h4 className="font-heading font-bold text-slate-900 text-sm">{project.title}</h4>
            <p className="text-[11px] text-slate-500">
              Submitted by: <strong className="text-slate-800">{project.student.name}</strong> ({project.student.email})
            </p>
          </div>
          <div className="max-h-32 overflow-y-auto pr-1">
            <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap break-words">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-700 hover:text-teal-800 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
              <LinkSquare02Icon className="w-3 h-3 text-slate-400" />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-700 hover:text-teal-800 transition-colors"
              >
                <GlobeIcon className="w-3.5 h-3.5" />
                <span>Live Demo</span>
                <LinkSquare02Icon className="w-3 h-3 text-slate-400" />
              </a>
            )}
          </div>
        </div>

        {/* Feedback Banners */}
        {state?.success && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckmarkCircle02Icon className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}
        {state?.message && !state?.success && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {state.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="status" value={selectedStatus} />
          <div>
            <Label className="mb-2 block text-[11px]">Evaluation Decision</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedStatus("APPROVED")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-heading font-semibold transition-all cursor-pointer ${
                  selectedStatus === "APPROVED"
                    ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300"
                }`}
              >
                <CheckmarkCircle02Icon className="w-4 h-4" />
                <span>Approve Project</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus("REJECTED")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-heading font-semibold transition-all cursor-pointer ${
                  selectedStatus === "REJECTED"
                    ? "bg-rose-600 text-white border-rose-700 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:border-rose-300"
                }`}
              >
                <Cancel01Icon className="w-4 h-4" />
                <span>Reject Project</span>
              </button>
            </div>
            <InputFieldError field="status" state={state} />
          </div>

          <div>
            <Label htmlFor="reviewNotes" className="mb-1 block text-[11px]">
              Mentor Feedback & Review Notes
            </Label>
            <textarea
              id="reviewNotes"
              name="reviewNotes"
              rows={4}
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Detail reasons for approval/rejection, observations, and recommendations..."
              className="flex w-full rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-900 shadow-2xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700 font-body"
              maxLength={2000}
            />
            <InputFieldError field="reviewNotes" state={state} />
          </div>

          <div className="flex justify-end gap-2 pt-1">
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
              disabled={isPending}
              className={`text-white font-heading font-semibold text-xs h-9 px-5 rounded-lg cursor-pointer ${
                selectedStatus === "APPROVED"
                  ? "bg-emerald-700 hover:bg-emerald-800"
                  : "bg-rose-700 hover:bg-rose-800"
              }`}
            >
              {isPending ? "Submitting..." : "Submit Review Decision"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}