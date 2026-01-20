import { Loader2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TeamInfoForm {
  name: string;
  iiit: string;
  representative: string;
}

interface ProjectForm {
  name: string;
  description: string;
  domain: string;
  github: string;
  demo: string;
  techStack: string;
}

interface EditDialogsProps {
  editingTeamInfo: boolean;
  editingProject: boolean;
  teamInfoForm: TeamInfoForm;
  projectForm: ProjectForm;
  saving: boolean;
  onTeamInfoChange: (form: TeamInfoForm) => void;
  onProjectChange: (form: ProjectForm) => void;
  onSaveTeamInfo: () => void;
  onSaveProject: () => void;
  onCloseTeamInfo: () => void;
  onCloseProject: () => void;
}

const EditDialogs = ({
  editingTeamInfo,
  editingProject,
  teamInfoForm,
  projectForm,
  saving,
  onTeamInfoChange,
  onProjectChange,
  onSaveTeamInfo,
  onSaveProject,
  onCloseTeamInfo,
  onCloseProject,
}: EditDialogsProps) => {
  return (
    <>
      {/* Edit Team Info Dialog */}
      <Dialog open={editingTeamInfo} onOpenChange={onCloseTeamInfo}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Team Information</DialogTitle>
            <DialogDescription>
              Update your team details. Changes will be saved to your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                value={teamInfoForm.name}
                onChange={(e) => onTeamInfoChange({ ...teamInfoForm, name: e.target.value })}
                placeholder="Enter team name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iiit">IIIT</Label>
              <Input
                id="iiit"
                value={teamInfoForm.iiit}
                onChange={(e) => onTeamInfoChange({ ...teamInfoForm, iiit: e.target.value })}
                placeholder="e.g., IIIT Allahabad"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="representative">Team Representative</Label>
              <Input
                id="representative"
                value={teamInfoForm.representative}
                onChange={(e) => onTeamInfoChange({ ...teamInfoForm, representative: e.target.value })}
                placeholder="Representative name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={onCloseTeamInfo}
              disabled={saving}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={onSaveTeamInfo} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={editingProject} onOpenChange={onCloseProject}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project Details</DialogTitle>
            <DialogDescription>
              Update your project information including description, tech stack, and links.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectForm.name}
                onChange={(e) => onProjectChange({ ...projectForm, name: e.target.value })}
                placeholder="Enter project name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                value={projectForm.domain}
                onChange={(e) => onProjectChange({ ...projectForm, domain: e.target.value })}
                placeholder="e.g., AI/ML, Web Development"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={projectForm.description}
                onChange={(e) => onProjectChange({ ...projectForm, description: e.target.value })}
                placeholder="Describe your project"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tech-stack">Tech Stack</Label>
              <Input
                id="tech-stack"
                value={projectForm.techStack}
                onChange={(e) => onProjectChange({ ...projectForm, techStack: e.target.value })}
                placeholder="React, Node.js, MongoDB (comma-separated)"
              />
              <p className="text-xs text-muted-foreground">
                Separate technologies with commas
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                value={projectForm.github}
                onChange={(e) => onProjectChange({ ...projectForm, github: e.target.value })}
                placeholder="https://github.com/your-username/project"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo">Demo URL</Label>
              <Input
                id="demo"
                value={projectForm.demo}
                onChange={(e) => onProjectChange({ ...projectForm, demo: e.target.value })}
                placeholder="https://your-project-demo.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={onCloseProject}
              disabled={saving}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={onSaveProject} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditDialogs;
