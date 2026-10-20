"use client";

import { useState } from "react";
import {
  ViewIcon,
  GithubIcon,
  GlobeIcon,
  LinkSquare02Icon,
  NoteIcon,
  Calendar03Icon,
  UserCheck01Icon,
  InformationCircleIcon,
} from "hugeicons-react";
import { IProjectItem } from "@/services/project/getProjects";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IProjectDetailsDialogProps {
  project: IProjectItem;
}

export default function ProjectDetailsDialog({ project }: IProjectDetailsDialogProps) {
  const [open, setOpen] = useState(false);

  const submittedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const updatedDate = new Date(project.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs font-heading font-medium cursor-pointer border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-colors"
        >
          <ViewIcon className="w-3.5 h-3.5 mr-1 text-slate-500" />
          <span>View</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3 pr-6">
            <DialogTitle className="text-base font-heading font-bold text-slate-900 leading-snug">
              {project.title}
            </DialogTitle>
            <StatusBadge status={project.status} />
          </div>
          <DialogDescription className="text-xs text-slate-500 font-body">
            Complete project submission details, repository links, and evaluation status.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2 text-xs font-body">
          {/* Candidate Profile Details */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Submitted By
              </span>
              <p className="font-heading font-bold text-slate-900 text-xs">
                {project.student.name}
              </p>
              <p className="font-mono text-[11px] text-slate-500">
                {project.student.email}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Submission Date
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-600">
                <Calendar03Icon className="w-3 h-3 text-slate-400" />
                {submittedDate}
              </span>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-heading font-semibold text-slate-700 block">
              Repository & Deployment
            </span>
            <div className="flex flex-wrap gap-2">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-800 hover:text-teal-900 hover:border-teal-700 transition-colors shadow-2xs"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-600" />
                <span>GitHub Repository</span>
                <LinkSquare02Icon className="w-3 h-3 text-slate-400" />
              </a>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-800 hover:text-teal-900 hover:border-teal-700 transition-colors shadow-2xs"
                >
                  <GlobeIcon className="w-3.5 h-3.5 text-slate-600" />
                  <span>Live Production URL</span>
                  <LinkSquare02Icon className="w-3 h-3 text-slate-400" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-400">
                  <GlobeIcon className="w-3.5 h-3.5 text-slate-300" />
                  <span>No Live Demo Provided</span>
                </span>
              )}
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-heading font-semibold text-slate-700 block">
              Project Description & Architecture
            </span>
            <div className="p-3.5 rounded-lg bg-slate-50/80 border border-slate-200/90 max-h-48 overflow-y-auto">
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap break-words font-body">
                {project.description}
              </p>
            </div>
          </div>

          {/* Formal Review Evaluation Section */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-heading font-semibold text-slate-700 block">
              Evaluation Record & Feedback
            </span>

            {project.status === "PENDING" ? (
              <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-900 flex items-start gap-2.5">
                <InformationCircleIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-xs text-amber-900">
                    Awaiting Formal Review
                  </p>
                  <p className="text-[11px] text-amber-700 mt-0.5 leading-normal">
                    This submission is currently queued in the evaluation backlog. Mentors and Admins can record an evaluation using the Review button.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <UserCheck01Icon className="w-3.5 h-3.5 text-teal-700" />
                    <span className="text-slate-500">Evaluated by:</span>
                    <strong className="text-slate-900 font-heading">
                      {project.reviewer?.name || "Assigned Mentor"}
                    </strong>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {updatedDate}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <NoteIcon className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[11px] font-heading font-semibold text-slate-700">
                      Feedback Notes:
                    </span>
                  </div>
                  {project.reviewNotes ? (
                    <blockquote className="pl-3 border-l-2 border-teal-700 text-xs italic text-slate-700 leading-relaxed font-body">
                      "{project.reviewNotes}"
                    </blockquote>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">
                      No additional notes provided.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            className="text-xs font-heading font-medium cursor-pointer"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
