"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Save, AlertCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProjectStatusBadge } from "@/components/ui/project-status-badge";
import { siteConfig } from "@/config/site.config";
import { toast } from "@/hooks/use-toast";

export function ProjectStatusManager() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [statusType, setStatusType] = useState<
    "operational" | "maintenance" | "downtime" | "updating"
  >("operational");
  const [statusMessage, setStatusMessage] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [checkResults, setCheckResults] = useState<any>(null);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCheckStatus = async (projectId?: string) => {
    setIsChecking(true);
    try {
      const url = projectId
        ? `/api/projects/status?projectId=${projectId}`
        : `/api/projects/status`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setCheckResults(data);
        toast({
          title: "Status Check Complete",
          description: `Checked ${data.results.length} project(s)`,
        });
      } else {
        toast({
          title: "Status Check Failed",
          description: data.error || "Failed to check project status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error checking status:", error);
      toast({
        title: "Error",
        description: "Failed to check project status",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedProject) {
      toast({
        title: "Error",
        description: "Please select a project",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch("/api/projects/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: selectedProject,
          status: statusType,
          message: statusMessage || undefined,
          apiKey: apiKey || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Status Updated",
          description: `${data.project.title} status updated to ${statusType}`,
        });
        // Refresh check results
        await handleCheckStatus();
      } else {
        toast({
          title: "Update Failed",
          description: data.error || "Failed to update project status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update project status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className='space-y-6 max-w-4xl mx-auto p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-3xl font-bold'>Project Status Manager</h2>
          <p className='text-muted-foreground mt-2'>
            Monitor and manage the status of your projects
          </p>
        </div>
        <div className='flex gap-3'>
          <Button
            onClick={() => handleCheckStatus()}
            disabled={isChecking}
            size='lg'
            variant='default'
          >
            {isChecking ? (
              <>
                <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className='mr-2 h-4 w-4' />
                Check All Projects
              </>
            )}
          </Button>
          <Button onClick={handleLogout} size='lg' variant='outline'>
            <LogOut className='mr-2 h-4 w-4' />
            Logout
          </Button>
        </div>
      </div>

      <Alert>
        <AlertCircle className='h-4 w-4' />
        <AlertDescription>
          The automatic status checker will verify if your project URLs are
          accessible. Manual overrides will skip automatic checks.
        </AlertDescription>
      </Alert>

      {/* Status Check Results */}
      {checkResults && (
        <Card>
          <CardHeader>
            <CardTitle>Status Check Results</CardTitle>
            <CardDescription>
              Last checked: {new Date(checkResults.checkedAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {checkResults.results.map((result: any) => {
                const project = siteConfig.projects.find(
                  (p) => p.id === result.projectId,
                );
                return (
                  <div
                    key={result.projectId}
                    className='flex items-center justify-between p-4 border rounded-lg'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <h4 className='font-semibold'>{project?.title}</h4>
                        <ProjectStatusBadge
                          status={{
                            type: result.status,
                            message: result.message,
                            lastChecked: result.checkedAt,
                          }}
                        />
                      </div>
                      {result.message && (
                        <p className='text-sm text-muted-foreground mt-1'>
                          {result.message}
                        </p>
                      )}
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleCheckStatus(result.projectId)}
                      disabled={isChecking}
                    >
                      Re-check
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manual Status Update */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Status Update</CardTitle>
          <CardDescription>
            Override automatic status checks and set custom project status
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='project'>Select Project</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger id='project'>
                <SelectValue placeholder='Choose a project' />
              </SelectTrigger>
              <SelectContent>
                {siteConfig.projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='status'>Status Type</Label>
            <Select
              value={statusType}
              onValueChange={(value: any) => setStatusType(value)}
            >
              <SelectTrigger id='status'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='operational'>Operational</SelectItem>
                <SelectItem value='maintenance'>Maintenance</SelectItem>
                <SelectItem value='downtime'>Downtime</SelectItem>
                <SelectItem value='updating'>Updating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='message'>Status Message (Optional)</Label>
            <Input
              id='message'
              placeholder='e.g., Scheduled maintenance until 5 PM'
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='apiKey'>API Key (Optional)</Label>
            <Input
              id='apiKey'
              type='password'
              placeholder='Enter API key if configured'
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <Button
            onClick={handleUpdateStatus}
            disabled={isUpdating || !selectedProject}
            className='w-full'
          >
            {isUpdating ? (
              <>
                <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
                Updating...
              </>
            ) : (
              <>
                <Save className='mr-2 h-4 w-4' />
                Update Status
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3 text-sm'>
          <div>
            <h4 className='font-semibold mb-1'>Automatic Status Checking</h4>
            <p className='text-muted-foreground'>
              Click "Check All Projects" to automatically verify if your project
              URLs are accessible. The system will check both live/demo links
              and GitHub repositories.
            </p>
          </div>
          <div>
            <h4 className='font-semibold mb-1'>Manual Override</h4>
            <p className='text-muted-foreground'>
              Use the manual update form to set a custom status that won't be
              overridden by automatic checks. This is useful for scheduled
              maintenance or when you know a project's status.
            </p>
          </div>
          <div>
            <h4 className='font-semibold mb-1'>API Integration</h4>
            <p className='text-muted-foreground'>
              You can also use the API endpoints directly:
            </p>
            <ul className='list-disc list-inside mt-2 space-y-1 text-muted-foreground'>
              <li>GET /api/projects/status - Check all projects</li>
              <li>
                GET /api/projects/status?projectId=ID - Check specific project
              </li>
              <li>POST /api/projects/status - Update project status</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
