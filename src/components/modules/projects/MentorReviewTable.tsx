import { GithubIcon, GlobeIcon, LinkSquare02Icon } from "hugeicons-react";
import { IProjectListResponse } from "@/services/project/getProjects";
import StatusBadge from "@/components/shared/StatusBadge";
import TablePagination from "@/components/shared/TablePagination";
import EmptyState from "@/components/shared/EmptyState";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import ReviewActionDialog from "./ReviewActionDialog";
import ProjectDetailsDialog from "./ProjectDetailsDialog";

interface IMentorReviewTableProps {
  data: IProjectListResponse;
  isRestricted?: boolean;
}

export default function MentorReviewTable({
  data,
  isRestricted,
}: IMentorReviewTableProps) {
  const { data: projects, meta } = data;

  return (
    <div className="space-y-4">
      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <SearchFilter />
        <SelectFilter />
      </div>

      {/* Main Table Container */}
      <div className="rounded-xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden">
        {projects.length === 0 ? (
          <div className="py-12">
            <EmptyState
              title="No submissions match your query"
              description="Adjust your search keywords or clear the status filter to view all project submissions."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-body">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-heading font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Project & Repo</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4">Reviewer Notes</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => {
                  const dateStr = new Date(project.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr
                      key={project.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Project & Repos */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <p className="font-heading font-semibold text-slate-900 text-xs line-clamp-1">
                            {project.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-teal-800 hover:text-teal-950 underline underline-offset-2"
                            >
                              <GithubIcon className="w-3 h-3 text-slate-500" />
                              <span>Code</span>
                              <LinkSquare02Icon className="w-2.5 h-2.5 text-slate-400" />
                            </a>
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-slate-900"
                              >
                                <GlobeIcon className="w-3 h-3 text-slate-400" />
                                <span>Demo</span>
                                <LinkSquare02Icon className="w-2.5 h-2.5 text-slate-400" />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Student */}
                      <td className="py-3 px-4">
                        <p className="font-heading font-semibold text-slate-900 text-xs">
                          {project.student.name}
                        </p>
                        <p className="font-mono text-[11px] text-slate-500">
                          {project.student.email}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <StatusBadge status={project.status} />
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {dateStr}
                      </td>

                      {/* Reviewer / Feedback */}
                      <td className="py-3 px-4 max-w-[220px]">
                        {project.reviewNotes ? (
                          <div className="space-y-0.5">
                            <p className="text-slate-700 text-xs line-clamp-2 italic font-body">
                              "{project.reviewNotes}"
                            </p>
                            {project.reviewer && (
                              <p className="text-[10px] text-slate-400 font-mono">
                                by {project.reviewer.name}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">
                            No feedback recorded
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <ProjectDetailsDialog project={project} />
                          {project.status === "PENDING" && (
                            <ReviewActionDialog
                              project={project}
                              isRestricted={isRestricted}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Pagination Controls */}
        <TablePagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          totalItems={meta.total}
        />
      </div>
    </div>
  );
}