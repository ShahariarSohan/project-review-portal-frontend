import { Folder01Icon } from "hugeicons-react";

interface IEmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
}: IEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50">
      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mb-3 border border-slate-200">
        <Folder01Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="font-heading text-sm font-bold text-slate-900 tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-slate-500 font-body max-w-sm mt-1 mb-4 leading-relaxed">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}