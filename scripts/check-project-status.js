/**
 * Automated Project Status Checker
 *
 * This script can be run as a cron job or scheduled task to automatically
 * check and update project statuses.
 *
 * Usage:
 *   node scripts/check-project-status.js
 *
 * Environment Variables:
 *   - SITE_URL: Your portfolio site URL (required)
 *   - PROJECT_STATUS_API_KEY: API key for status updates (optional)
 *   - SLACK_WEBHOOK_URL: Webhook for Slack notifications (optional)
 *   - DISCORD_WEBHOOK_URL: Webhook for Discord notifications (optional)
 */

const https = require("https");
const http = require("http");

// Configuration
const SITE_URL = process.env.SITE_URL || "http://localhost:3000";
const API_KEY = process.env.PROJECT_STATUS_API_KEY;
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === "https:" ? https : http;

    const req = client.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({
            status: res.statusCode,
            data: data ? JSON.parse(data) : null,
          });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on("error", reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// Send notification to Slack
async function notifySlack(message, status) {
  if (!SLACK_WEBHOOK) return;

  const colors = {
    operational: "#22c55e",
    maintenance: "#eab308",
    downtime: "#ef4444",
    updating: "#3b82f6",
  };

  const payload = {
    attachments: [
      {
        color: colors[status] || "#64748b",
        title: "Project Status Update",
        text: message,
        footer: "Portfolio Status Monitor",
        ts: Math.floor(Date.now() / 1000),
      },
    ],
  };

  try {
    await makeRequest(SLACK_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("✓ Slack notification sent");
  } catch (error) {
    console.error("✗ Failed to send Slack notification:", error.message);
  }
}

// Send notification to Discord
async function notifyDiscord(message, status) {
  if (!DISCORD_WEBHOOK) return;

  const colors = {
    operational: 0x22c55e,
    maintenance: 0xeab308,
    downtime: 0xef4444,
    updating: 0x3b82f6,
  };

  const payload = {
    embeds: [
      {
        title: "🔔 Project Status Update",
        description: message,
        color: colors[status] || 0x64748b,
        timestamp: new Date().toISOString(),
        footer: { text: "Portfolio Status Monitor" },
      },
    ],
  };

  try {
    await makeRequest(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("✓ Discord notification sent");
  } catch (error) {
    console.error("✗ Failed to send Discord notification:", error.message);
  }
}

// Main function
async function checkProjectStatus() {
  console.log("🔍 Checking project statuses...");
  console.log(`Site URL: ${SITE_URL}`);
  console.log("---");

  try {
    // Check all project statuses
    const statusUrl = `${SITE_URL}/api/projects/status`;
    const response = await makeRequest(statusUrl);

    if (response.status !== 200 || !response.data.success) {
      console.error("✗ Failed to check project statuses");
      console.error("Response:", response.data);
      process.exit(1);
    }

    const { results, checkedAt } = response.data;
    console.log(
      `✓ Checked ${results.length} projects at ${new Date(checkedAt).toLocaleString()}\n`,
    );

    // Track status changes
    const issues = [];
    const updates = [];

    for (const result of results) {
      const statusIcon =
        {
          operational: "🟢",
          maintenance: "🟡",
          downtime: "🔴",
          updating: "🔵",
        }[result.status] || "⚪";

      console.log(`${statusIcon} ${result.projectId}`);
      console.log(`   Status: ${result.status}`);
      if (result.message) {
        console.log(`   Message: ${result.message}`);
      }
      console.log();

      // Track issues
      if (result.status === "downtime") {
        issues.push(`🔴 ${result.projectId}: ${result.message || "Down"}`);
      } else if (result.status === "maintenance") {
        updates.push(
          `🟡 ${result.projectId}: ${result.message || "Under maintenance"}`,
        );
      }
    }

    // Send notifications if there are issues
    if (issues.length > 0) {
      const message = `⚠️ *Project Issues Detected*\n\n${issues.join("\n")}`;
      await notifySlack(message, "downtime");
      await notifyDiscord(message, "downtime");
    }

    if (updates.length > 0) {
      const message = `ℹ️ *Project Updates*\n\n${updates.join("\n")}`;
      await notifySlack(message, "maintenance");
      await notifyDiscord(message, "maintenance");
    }

    // Summary
    console.log("---");
    console.log("Summary:");
    console.log(`  Total projects: ${results.length}`);
    console.log(
      `  Operational: ${results.filter((r) => r.status === "operational").length}`,
    );
    console.log(
      `  Maintenance: ${results.filter((r) => r.status === "maintenance").length}`,
    );
    console.log(
      `  Downtime: ${results.filter((r) => r.status === "downtime").length}`,
    );
    console.log(
      `  Updating: ${results.filter((r) => r.status === "updating").length}`,
    );

    console.log("\n✓ Status check complete!");
  } catch (error) {
    console.error("✗ Error checking project status:", error.message);

    // Send error notification
    const errorMessage = `❌ *Status Check Failed*\n\nError: ${error.message}`;
    await notifySlack(errorMessage, "downtime");
    await notifyDiscord(errorMessage, "downtime");

    process.exit(1);
  }
}

// Run the check
checkProjectStatus().catch(console.error);
