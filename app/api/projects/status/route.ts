import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site.config";

export const dynamic = "force-dynamic";

interface StatusCheckResult {
  projectId: string;
  status: "operational" | "maintenance" | "downtime" | "updating";
  message?: string;
  checkedAt: string;
}

// Helper function to check if a URL is accessible
async function checkUrl(url: string, timeout = 10000): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; StatusBot/1.0)",
      },
    });

    clearTimeout(timeoutId);

    // Consider 200-399 as success, 404 as downtime
    if (response.status >= 200 && response.status < 400) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error checking URL ${url}:`, error);
    return false;
  }
}

// GET: Check status of all projects or a specific project
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    let projectsToCheck = siteConfig.projects;

    // Filter to specific project if requested
    if (projectId) {
      projectsToCheck = siteConfig.projects.filter((p) => p.id === projectId);
      if (projectsToCheck.length === 0) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 },
        );
      }
    }

    const statusResults: StatusCheckResult[] = [];

    for (const project of projectsToCheck) {
      // Skip if manual override is set
      if (project.status?.manualOverride) {
        statusResults.push({
          projectId: project.id,
          status: project.status.type,
          message: project.status.message || "Manual override active",
          checkedAt: new Date().toISOString(),
        });
        continue;
      }

      // Check if project has live or demo links
      const urlToCheck = project.links.live || project.links.demo;

      if (!urlToCheck) {
        // No URL to check - assume operational if github exists, otherwise unknown
        statusResults.push({
          projectId: project.id,
          status: project.links.github ? "operational" : "maintenance",
          message: project.links.github
            ? "Repository only - no live demo"
            : "No links available",
          checkedAt: new Date().toISOString(),
        });
        continue;
      }

      // Check the URL
      const isAccessible = await checkUrl(urlToCheck);

      // Check GitHub if available
      let githubAccessible = true;
      if (project.links.github) {
        githubAccessible = await checkUrl(project.links.github);
      }

      // Determine status based on checks
      let status: "operational" | "downtime" = "operational";
      let message = "All systems operational";

      if (!isAccessible && !githubAccessible) {
        status = "downtime";
        message = "Both live site and repository are inaccessible";
      } else if (!isAccessible) {
        status = "downtime";
        message = "Live site is not responding";
      } else if (!githubAccessible) {
        status = "operational";
        message = "Live site operational, repository may be private";
      }

      statusResults.push({
        projectId: project.id,
        status,
        message,
        checkedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      results: statusResults,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error checking project status:", error);
    return NextResponse.json(
      {
        error: "Failed to check project status",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// POST: Manually update project status
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, status, message, apiKey } = body;

    // Simple API key check (you should use environment variables)
    const validApiKey = process.env.PROJECT_STATUS_API_KEY;
    if (validApiKey && apiKey !== validApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate inputs
    if (!projectId || !status) {
      return NextResponse.json(
        { error: "projectId and status are required" },
        { status: 400 },
      );
    }

    const validStatuses = [
      "operational",
      "maintenance",
      "downtime",
      "updating",
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${validStatuses.join(", ")}` },
        { status: 400 },
      );
    }

    // Find the project
    const project = siteConfig.projects.find((p) => p.id === projectId);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Note: This updates the in-memory config, not the file
    // For persistent updates, you'd need to write to a database
    project.status = {
      type: status,
      message: message || undefined,
      lastChecked: new Date().toISOString(),
      manualOverride: true,
    };

    return NextResponse.json({
      success: true,
      message: "Project status updated successfully",
      project: {
        id: project.id,
        title: project.title,
        status: project.status,
      },
    });
  } catch (error) {
    console.error("Error updating project status:", error);
    return NextResponse.json(
      {
        error: "Failed to update project status",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
