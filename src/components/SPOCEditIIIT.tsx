import { useState, useEffect } from 'react';
import { Edit2, Save, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/GlassCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import type { IIIT } from '@/data/iiits';

interface SPOCEditIIITProps {
  iiit: IIIT;
  onUpdate?: () => void;
}

const SPOCEditIIIT = ({ iiit, onUpdate }: SPOCEditIIITProps) => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    aboutSection: '',
    description: '',
    achievements: '',
    campusGallery: '',
    spocName: iiit.spoc.name,
    spocPhone: iiit.spoc.phone,
    spocEmail: iiit.spoc.email,
    spocDepartment: iiit.spoc.department,
    clubName: iiit.club.name,
    clubInstagram: iiit.club.instagram,
    clubLinkedin: iiit.club.linkedin,
    contactEmail: iiit.spoc.email,
    contactPhone: iiit.spoc.phone,
  });
  const [existingData, setExistingData] = useState<any>(null);

  const isSPOC = profile?.role === 'spoc';

  useEffect(() => {
    if (isSPOC) {
      loadExistingData();
    }
  }, [isSPOC, iiit.id]);

  const loadExistingData = async () => {
    const { data } = await supabase
      .from('iiit_edits')
      .select('*')
      .eq('iiit_id', iiit.id)
      .single();

    if (data) {
      setExistingData(data);
      setFormData({
        aboutSection: data.about_section || '',
        description: data.description || '',
        achievements: data.achievements?.join('\n') || '',
        campusGallery: data.campus_gallery?.join('\n') || '',
        spocName: data.spoc_name || iiit.spoc.name,
        spocPhone: data.spoc_phone || iiit.spoc.phone,
        spocEmail: data.spoc_email || iiit.spoc.email,
        spocDepartment: data.spoc_department || iiit.spoc.department,
        clubName: data.club_name || iiit.club.name,
        clubInstagram: data.club_instagram || iiit.club.instagram,
        clubLinkedin: data.club_linkedin || iiit.club.linkedin,
        contactEmail: data.contact_email || iiit.spoc.email,
        contactPhone: data.contact_phone || iiit.spoc.phone,
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const achievementsArray = formData.achievements
        .split('\n')
        .map(a => a.trim())
        .filter(a => a.length > 0);

      const galleryArray = formData.campusGallery
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const { error } = await supabase
        .from('iiit_edits')
        .upsert({
          iiit_id: iiit.id,
          spoc_user_id: user?.id,
          about_section: formData.aboutSection,
          description: formData.description,
          achievements: achievementsArray,
          campus_gallery: galleryArray,
          spoc_name: formData.spocName,
          spoc_phone: formData.spocPhone,
          spoc_email: formData.spocEmail,
          spoc_department: formData.spocDepartment,
          club_name: formData.clubName,
          club_instagram: formData.clubInstagram,
          club_linkedin: formData.clubLinkedin,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'iiit_id'
        });

      if (error) throw error;

      toast({
        title: 'IIIT information updated!',
        description: 'Your changes have been saved successfully.',
      });

      setIsEditing(false);
      await loadExistingData();
      onUpdate?.();
    } catch (error: any) {
      toast({
        title: 'Failed to save',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isSPOC) {
    return null;
  }

  return (
    <>
      <GlassCard glow="primary" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">SPOC Editable Section</h3>
          <Button onClick={handleEdit} variant="neon" size="sm">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Information
          </Button>
        </div>

        {existingData ? (
          <div className="space-y-4">
            {existingData.about_section && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Custom About Section</p>
                <p className="text-foreground whitespace-pre-wrap">{existingData.about_section}</p>
              </div>
            )}
            {existingData.description && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Custom Description</p>
                <p className="text-foreground">{existingData.description}</p>
              </div>
            )}
            {existingData.achievements && existingData.achievements.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Custom Achievements</p>
                <ul className="list-disc list-inside space-y-1">
                  {existingData.achievements.map((achievement: string, idx: number) => (
                    <li key={idx} className="text-foreground">{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            {existingData.campus_gallery && existingData.campus_gallery.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Campus Gallery URLs</p>
                <ul className="list-disc list-inside space-y-1">
                  {existingData.campus_gallery.map((url: string, idx: number) => (
                    <li key={idx} className="text-foreground text-sm truncate">{url}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm font-semibold mb-3">SPOC Information</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-sm">{existingData.spoc_name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="text-sm">{existingData.spoc_department || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">{existingData.spoc_email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm">{existingData.spoc_phone}</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm font-semibold mb-3">Club Information</p>
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Club Name</p>
                  <p className="text-sm">{existingData.club_name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Instagram</p>
                  <p className="text-sm">{existingData.club_instagram || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">LinkedIn</p>
                  <p className="text-sm truncate">{existingData.club_linkedin || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-sm text-muted-foreground mb-1">General Contact Email</p>
                <p className="text-foreground">{existingData.contact_email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">General Contact Phone</p>
                <p className="text-foreground">{existingData.contact_phone}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Click "Edit Information" to customize all aspects of your IIIT profile page.
          </p>
        )}
      </GlassCard>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {iiit.name} Information</DialogTitle>
            <DialogDescription>
              Customize all aspects of your IIIT profile page. All fields are optional.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* About Section */}
            <div className="space-y-2">
              <Label htmlFor="aboutSection">About Section</Label>
              <Textarea
                id="aboutSection"
                value={formData.aboutSection}
                onChange={(e) => setFormData({ ...formData, aboutSection: e.target.value })}
                placeholder="Enter a comprehensive description for your IIIT's about section"
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                This will replace or supplement the default about section
              </p>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter a brief description (optional)"
                rows={3}
              />
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <Label htmlFor="achievements">Achievements</Label>
              <Textarea
                id="achievements"
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                placeholder="Enter achievements (one per line)"
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Enter each achievement on a new line
              </p>
            </div>

            {/* Campus Gallery */}
            <div className="space-y-2">
              <Label htmlFor="campusGallery">Campus Gallery URLs</Label>
              <Textarea
                id="campusGallery"
                value={formData.campusGallery}
                onChange={(e) => setFormData({ ...formData, campusGallery: e.target.value })}
                placeholder="Enter image URLs (one per line)"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Enter each image URL on a new line (e.g., /photos/image1.jpg)
              </p>
            </div>

            {/* SPOC Information */}
            <div className="space-y-3">
              <h4 className="font-semibold">SPOC Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spocName">SPOC Name</Label>
                  <Input
                    id="spocName"
                    value={formData.spocName}
                    onChange={(e) => setFormData({ ...formData, spocName: e.target.value })}
                    placeholder="SPOC Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spocDepartment">Department</Label>
                  <Input
                    id="spocDepartment"
                    value={formData.spocDepartment}
                    onChange={(e) => setFormData({ ...formData, spocDepartment: e.target.value })}
                    placeholder="Department (optional)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spocEmail">SPOC Email</Label>
                  <Input
                    id="spocEmail"
                    type="email"
                    value={formData.spocEmail}
                    onChange={(e) => setFormData({ ...formData, spocEmail: e.target.value })}
                    placeholder="spoc@iiit.ac.in"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spocPhone">SPOC Phone</Label>
                  <Input
                    id="spocPhone"
                    type="tel"
                    value={formData.spocPhone}
                    onChange={(e) => setFormData({ ...formData, spocPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Club Information */}
            <div className="space-y-3">
              <h4 className="font-semibold">Club Information</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clubName">Club Name</Label>
                  <Input
                    id="clubName"
                    value={formData.clubName}
                    onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                    placeholder="Club Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clubInstagram">Instagram Handle</Label>
                  <Input
                    id="clubInstagram"
                    value={formData.clubInstagram}
                    onChange={(e) => setFormData({ ...formData, clubInstagram: e.target.value })}
                    placeholder="@club_handle"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clubLinkedin">LinkedIn URL</Label>
                  <Input
                    id="clubLinkedin"
                    value={formData.clubLinkedin}
                    onChange={(e) => setFormData({ ...formData, clubLinkedin: e.target.value })}
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </div>
            </div>

            {/* General Contact Information */}
            <div className="space-y-3">
              <h4 className="font-semibold">General Contact Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="contact@iiit.ac.in"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={saving}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
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

export default SPOCEditIIIT;
