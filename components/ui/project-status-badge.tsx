"use client";

import { AlertCircle, CheckCircle, Loader2, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type ProjectStatus =
  | "operational"
  | "maintenance"
  | "downtime"
  | "updating";

interface ProjectStatusBadgeProps {
  status?: {
    type: ProjectStatus;
    message?: string;
    lastChecked?: string;
    manualOverride?: boolean;
  };
  className?: string;
  showLabel?: boolean;
}

const statusConfig = {
  operational: {
    label: "Operational",
    icon: CheckCircle,
    color:
      "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20",
    dotColor: "bg-green-500",
  },
  maintenance: {
    label: "Maintenance",
    icon: Wrench,
    color:
      "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20",
    dotColor: "bg-yellow-500",
  },
  downtime: {
    label: "Downtime",
    icon: AlertCircle,
    color: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20",
    dotColor: "bg-red-500",
  },
  updating: {
    label: "Updating",
    icon: Loader2,
    color:
      "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20",
    dotColor: "bg-blue-500",
  },
};

export function ProjectStatusBadge({
  status,
  className,
  showLabel = true,
}: ProjectStatusBadgeProps) {
  if (!status) return null;

  const config = statusConfig[status.type];
  const Icon = config.icon;

  const lastCheckedDate = status.lastChecked
    ? new Date(status.lastChecked)
    : null;
  const formattedDate = lastCheckedDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(lastCheckedDate)
    : null;

  const tooltipContent = (
    <div className='space-y-1'>
      <p className='font-semibold'>{config.label}</p>
      {status.message && <p className='text-sm'>{status.message}</p>}
      {formattedDate && (
        <p className='text-xs opacity-70'>Last checked: {formattedDate}</p>
      )}
      {status.manualOverride && (
        <p className='text-xs opacity-70 italic'>Manual override active</p>
      )}
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant='outline'
            className={cn(
              "cursor-help transition-all duration-200",
              config.color,
              className,
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full mr-2 animate-pulse",
                config.dotColor,
              )}
            />
            <Icon
              className={cn(
                "w-3 h-3",
                status.type === "updating" && "animate-spin",
              )}
            />
            {showLabel && (
              <span className='ml-1.5 text-xs font-medium'>{config.label}</span>
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side='top' className='max-w-xs'>
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
