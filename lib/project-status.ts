export type ProjectStatus =
  | "operational"
  | "maintenance"
  | "downtime"
  | "updating";

export interface ProjectStatusData {
  type: ProjectStatus;
  message?: string;
  lastChecked?: string;
  manualOverride?: boolean;
}

/**
 * Check if a project status indicates an issue
 */
export function hasStatusIssue(status?: ProjectStatusData): boolean {
  if (!status) return false;
  return status.type === "downtime" || status.type === "maintenance";
}

/**
 * Get a human-readable status message
 */
export function getStatusMessage(status?: ProjectStatusData): string {
  if (!status) return "Status unknown";

  if (status.message) return status.message;

  const messages: Record<ProjectStatus, string> = {
    operational: "All systems operational",
    maintenance: "Under maintenance",
    downtime: "Currently unavailable",
    updating: "Currently updating",
  };

  return messages[status.type];
}

/**
 * Format the last checked timestamp
 */
export function formatLastChecked(lastChecked?: string): string {
  if (!lastChecked) return "Never checked";

  const date = new Date(lastChecked);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return date.toLocaleDateString();
}

/**
 * Client-side function to check project status via API
 */
export async function checkProjectStatus(projectId?: string): Promise<any> {
  const url = projectId
    ? `/api/projects/status?projectId=${projectId}`
    : `/api/projects/status`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to check status: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Client-side function to update project status via API
 */
export async function updateProjectStatus(
  projectId: string,
  status: ProjectStatus,
  message?: string,
  apiKey?: string,
): Promise<any> {
  const response = await fetch("/api/projects/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId,
      status,
      message,
      apiKey,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update status");
  }

  return response.json();
}

/**
 * Determine if a status check is stale (older than 1 hour)
 */
export function isStatusStale(lastChecked?: string): boolean {
  if (!lastChecked) return true;

  const date = new Date(lastChecked);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / 3600000;

  return diffHours > 1;
}
