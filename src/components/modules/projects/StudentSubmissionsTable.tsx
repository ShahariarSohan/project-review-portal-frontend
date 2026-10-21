import {
  GithubIcon,
  GlobeIcon,
  Comment01Icon,
  Calendar03Icon,
} from "hugeicons-react";
import { IProjectSubmissionListResponse } from "@/services/project/getMySubmissions";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import TablePagination from "@/components/shared/TablePagination";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import SubmissionFormDialog from "./SubmissionFormDialog";
import ProjectDetailsDialog from "./ProjectDetailsDialog";

interface IStudentSubmissionsTableProps {
  data: IProjectSubmissionListResponse;
  isRestricted?: boolean;
}

export default function StudentSubmissionsTable({
  data,
  isRestricted,
}: IStudentSubmissionsTableProps) {
  const { data: submissions, meta } = data;

  return (
    <div className="space-y-4">
      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <SearchFilter />
        <SelectFilter />
      </div>

      {/* Main Table Container */}
      <div className="rounded-xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden">
        {submissions.length === 0 ? (
          <div className="py-12">
            <EmptyState
              title="No Project Submissions Found"
              description="No submissions match your query. Submit your GitHub repository details to begin the review process or adjust search filters."
              action={<SubmissionFormDialog isRestricted={isRestricted} />}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-heading font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Project Details</th>
                  <th className="py-3 px-4">Repository & Live</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Mentor Feedback</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-body">
          {submissions.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-slate-50/75 transition-colors group"
            >
              {/* Title & Description */}
              <td className="py-3 px-4 max-w-xs">
                <div className="font-heading font-bold text-slate-900 text-xs">
                  {item.title}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed font-body">
                  {item.description}
                </p>
                <span className="font-mono text-[10px] text-slate-400 mt-1 inline-block">
                  ID: {item.id.slice(0, 8)}
                </span>
              </td>

              {/* Links */}
              <td className="py-3 px-4 whitespace-nowrap">
                <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-teal-800 hover:text-teal-900 hover:underline max-w-[200px] truncate"
                  >
                    <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.repoUrl.replace("https://github.com/", "")}</span>
                  </a>
                  {item.liveUrl ? (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 hover:underline max-w-[200px] truncate"
                    >
                      <GlobeIcon className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{item.liveUrl.replace("https://", "")}</span>
                    </a>
                  ) : (
                    <span className="text-slate-400 text-[10px] italic">No live demo link</span>
                  )}
                </div>
              </td>

              {/* Date */}
              <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Calendar03Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </td>

              {/* Status */}
              <td className="py-3 px-4 whitespace-nowrap">
                <StatusBadge status={item.status} />
              </td>

              {/* Mentor Feedback Notes */}
              <td className="py-3 px-4 max-w-sm">
                {item.reviewNotes ? (
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                    <div className="flex items-center gap-1 text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider mb-1">
                      <Comment01Icon className="w-3 h-3 text-teal-700" />
                      <span>{item.reviewer?.name || "Mentor Review"}</span>
                    </div>
                    <p className="font-body text-slate-800">{item.reviewNotes}</p>
                  </div>
                ) : (
                  <span className="text-slate-400 text-[11px] italic">
                    Awaiting mentor evaluation
                  </span>
                )}
              </td>

              {/* Actions */}
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end">
                  <ProjectDetailsDialog project={item} />
                </div>
              </td>
            </tr>
          ))}
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