#!/usr/bin/env node
/**
 * CLI Tool for Quick Project Status Updates
 *
 * Usage:
 *   node scripts/update-status.js <project-id> <status> [message]
 *
 * Examples:
 *   node scripts/update-status.js my-project operational
 *   node scripts/update-status.js my-project maintenance "Scheduled maintenance until 5 PM"
 *   node scripts/update-status.js my-project downtime "Server issues"
 *   node scripts/update-status.js my-project updating "Adding new features"
 *
 * Environment Variables:
 *   SITE_URL - Your portfolio site URL (required)
 *   PROJECT_STATUS_API_KEY - API key for authentication (optional)
 */

const https = require("https");
const http = require("http");

// Parse command line arguments
const [, , projectId, status, ...messageParts] = process.argv;
const message = messageParts.join(" ");

// Configuration
const SITE_URL = process.env.SITE_URL || "http://localhost:3000";
const API_KEY = process.env.PROJECT_STATUS_API_KEY;

// Validate arguments
if (!projectId || !status) {
  console.error("❌ Error: Missing required arguments\n");
  console.log(
    "Usage: node scripts/update-status.js <project-id> <status> [message]\n",
  );
  console.log("Available statuses:");
  console.log("  • operational  - Project is working normally");
  console.log("  • maintenance  - Project is under maintenance");
  console.log("  • downtime     - Project is currently unavailable");
  console.log("  • updating     - Project is being updated\n");
  console.log("Examples:");
  console.log("  node scripts/update-status.js my-project operational");
  console.log(
    '  node scripts/update-status.js my-project maintenance "Maintenance until 5 PM"',
  );
  process.exit(1);
}

// Validate status
const validStatuses = ["operational", "maintenance", "downtime", "updating"];
if (!validStatuses.includes(status)) {
  console.error(`❌ Error: Invalid status "${status}"`);
  console.log(`Valid statuses: ${validStatuses.join(", ")}`);
  process.exit(1);
}

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

// Status icons for display
const statusIcons = {
  operational: "🟢",
  maintenance: "🟡",
  downtime: "🔴",
  updating: "🔵",
};

// Main function
async function updateStatus() {
  console.log(`${statusIcons[status]} Updating project status...`);
  console.log(`Project: ${projectId}`);
  console.log(`Status: ${status}`);
  if (message) {
    console.log(`Message: ${message}`);
  }
  console.log(`Site: ${SITE_URL}`);
  console.log("---\n");

  try {
    // Prepare request payload
    const payload = {
      projectId,
      status,
    };

    if (message) {
      payload.message = message;
    }

    if (API_KEY) {
      payload.apiKey = API_KEY;
    }

    // Make the API request
    const url = `${SITE_URL}/api/projects/status`;
    const response = await makeRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Handle response
    if (response.status === 200 && response.data.success) {
      console.log("✅ Status updated successfully!\n");
      console.log("Project Details:");
      console.log(`  Title: ${response.data.project.title}`);
      console.log(`  Status: ${response.data.project.status.type}`);
      if (response.data.project.status.message) {
        console.log(`  Message: ${response.data.project.status.message}`);
      }
      console.log(
        `  Last Checked: ${new Date(response.data.project.status.lastChecked).toLocaleString()}`,
      );
      console.log(`  Manual Override: Yes`);

      console.log(
        "\n💡 Tip: Visit your portfolio to see the updated status badge!",
      );
      process.exit(0);
    } else {
      console.error("❌ Failed to update status\n");
      console.error("Response:", response.data);

      if (response.status === 401) {
        console.log(
          "\n💡 Tip: Set PROJECT_STATUS_API_KEY environment variable if API key is required",
        );
      } else if (response.status === 404) {
        console.log("\n💡 Tip: Check that the project ID is correct");
      }

      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error updating status:", error.message);

    if (error.code === "ECONNREFUSED") {
      console.log(
        "\n💡 Tip: Make sure your development server is running (npm run dev)",
      );
      console.log(
        "   Or check that SITE_URL environment variable is set correctly",
      );
    }

    process.exit(1);
  }
}

// Run the update
updateStatus().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
