import { useState, useEffect, useCallback } from 'react';
import { Edit2, Save, X, Loader2, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
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
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import type { IIIT } from '@/data/iiits';

interface SPOCEditSectionProps {
  iiit: IIIT;
  section: 'about' | 'achievements' | 'gallery' | 'poc' | 'club';
  existingData: any;
  defaultData?: any; // Default IIIT data from iiitDetails
  onUpdate: () => void;
}

const SPOCEditSection = ({ iiit, section, existingData, defaultData, onUpdate }: SPOCEditSectionProps) => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isSPOC = profile?.role === 'spoc';

  useEffect(() => {
    if (existingData) {
      loadFormData();
    } else {
      loadDefaultData();
    }
  }, [existingData, section]);

  const loadFormData = () => {
    switch (section) {
      case 'about':
        setFormData({
          aboutSection: existingData?.about_section || '',
          description: existingData?.description || '',
        });
        break;
      case 'achievements':
        setFormData({
          achievements: existingData?.achievements?.join('\n') || '',
        });
        break;
      case 'gallery':
        const existingPhotos = existingData?.campus_gallery || [];
        const defaultImages = defaultData?.images || [];
        // Use existing photos if available, otherwise use default images
        const photosToLoad = existingPhotos.length > 0 ? existingPhotos : defaultImages;
        setFormData({
          campusGallery: existingData?.campus_gallery?.join('\n') || '',
        });
        setUploadedPhotos(photosToLoad);
        break;
      case 'poc':
        setFormData({
          spocName: existingData?.spoc_name || iiit.spoc.name,
          spocPhone: existingData?.spoc_phone || iiit.spoc.phone,
          spocEmail: existingData?.spoc_email || iiit.spoc.email,
          spocDepartment: existingData?.spoc_department || iiit.spoc.department,
          contactEmail: existingData?.contact_email || iiit.spoc.email,
          contactPhone: existingData?.contact_phone || iiit.spoc.phone,
        });
        break;
      case 'club':
        setFormData({
          clubName: existingData?.club_name || iiit.club.name,
          clubInstagram: existingData?.club_instagram || iiit.club.instagram,
          clubLinkedin: existingData?.club_linkedin || iiit.club.linkedin,
        });
        break;
    }
  };

  const loadDefaultData = () => {
    switch (section) {
      case 'about':
        setFormData({ 
          aboutSection: defaultData?.description || '', 
          description: '' 
        });
        break;
      case 'achievements':
        setFormData({ achievements: '' });
        break;
      case 'gallery':
        setFormData({ campusGallery: '' });
        // Initialize with default images if available
        const defaultImages = defaultData?.images || [];
        setUploadedPhotos(defaultImages);
        break;
      case 'poc':
        setFormData({
          spocName: iiit.spoc.name,
          spocPhone: iiit.spoc.phone,
          spocEmail: iiit.spoc.email,
          spocDepartment: iiit.spoc.department,
          contactEmail: defaultData?.contact?.email || iiit.spoc.email,
          contactPhone: defaultData?.contact?.phone || iiit.spoc.phone,
        });
        break;
      case 'club':
        setFormData({
          clubName: iiit.club.name,
          clubInstagram: iiit.club.instagram,
          clubLinkedin: iiit.club.linkedin,
        });
        break;
    }
  };

  // Photo upload handlers
  const uploadPhoto = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${iiit.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `campus-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('iiit-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('iiit-photos')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file',
          description: `${file.name} is not an image file`,
          variant: 'destructive',
        });
        continue;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: `${file.name} exceeds 5MB`,
          variant: 'destructive',
        });
        continue;
      }

      const url = await uploadPhoto(file);
      if (url) {
        newUrls.push(url);
      }
    }

    if (newUrls.length > 0) {
      setUploadedPhotos(prev => [...prev, ...newUrls]);
      toast({
        title: 'Photos uploaded',
        description: `${newUrls.length} photo(s) uploaded successfully`,
      });
    }

    setUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const deletePhoto = async (photoUrl: string) => {
    setUploadedPhotos(prev => prev.filter(url => url !== photoUrl));
    
    // Try to delete from storage if it's a Supabase URL
    if (photoUrl.includes('supabase')) {
      try {
        const urlParts = photoUrl.split('/');
        const fileName = urlParts.slice(-2).join('/');
        await supabase.storage
          .from('iiit-photos')
          .remove([`campus-photos/${fileName}`]);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }

    toast({
      title: 'Photo removed',
      description: 'Photo removed from gallery',
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Get current data first
      const { data: current } = await supabase
        .from('iiit_edits')
        .select('*')
        .eq('iiit_id', iiit.id)
        .single();

      let updateData: any = {
        iiit_id: iiit.id,
        spoc_user_id: user?.id,
        updated_at: new Date().toISOString(),
      };

      // Merge with existing data
      if (current) {
        updateData = { ...current, ...updateData };
      }

      // Update only the relevant fields for this section
      switch (section) {
        case 'about':
          updateData.about_section = formData.aboutSection;
          updateData.description = formData.description;
          break;
        case 'achievements':
          updateData.achievements = formData.achievements
            .split('\n')
            .map((a: string) => a.trim())
            .filter((a: string) => a.length > 0);
          break;
        case 'gallery':
          updateData.campus_gallery = uploadedPhotos;
          break;
        case 'poc':
          updateData.spoc_name = formData.spocName;
          updateData.spoc_phone = formData.spocPhone;
          updateData.spoc_email = formData.spocEmail;
          updateData.spoc_department = formData.spocDepartment;
          updateData.contact_email = formData.contactEmail;
          updateData.contact_phone = formData.contactPhone;
          break;
        case 'club':
          updateData.club_name = formData.clubName;
          updateData.club_instagram = formData.clubInstagram;
          updateData.club_linkedin = formData.clubLinkedin;
          break;
      }

      const { error } = await supabase
        .from('iiit_edits')
        .upsert(updateData, {
          onConflict: 'iiit_id'
        });

      if (error) throw error;

      toast({
        title: 'Section updated!',
        description: 'Your changes have been saved successfully.',
      });

      setIsEditing(false);
      onUpdate();
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

  const getSectionTitle = () => {
    switch (section) {
      case 'about': return 'About Section';
      case 'achievements': return 'Achievements';
      case 'gallery': return 'Campus Gallery';
      case 'poc': return 'Point of Contact';
      case 'club': return 'Club Information';
    }
  };

  const renderFormFields = () => {
    switch (section) {
      case 'about':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="aboutSection">About Section</Label>
              <Textarea
                id="aboutSection"
                value={formData.aboutSection}
                onChange={(e) => setFormData({ ...formData, aboutSection: e.target.value })}
                placeholder="Enter a comprehensive description for your IIIT"
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                This will replace the default about section
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Additional Note</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add a brief additional note (optional)"
                rows={3}
              />
            </div>
          </>
        );

      case 'achievements':
        return (
          <div className="space-y-2">
            <Label htmlFor="achievements">Achievements</Label>
            <Textarea
              id="achievements"
              value={formData.achievements}
              onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
              placeholder="Enter achievements (one per line)"
              rows={8}
            />
            <p className="text-xs text-muted-foreground">
              Enter each achievement on a new line. These will be highlighted on the page.
            </p>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <Label>Campus Gallery Photos</Label>
            
            {/* Drag and Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
              <p className="text-sm font-medium mb-2">
                {isDragging ? 'Drop photos here' : 'Drag and drop photos here'}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                or click to browse (JPG, PNG, WebP • Max 5MB per file)
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="photo-upload"
                disabled={uploading}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('photo-upload')?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </>
                )}
              </Button>
            </div>

            {/* Photo Grid */}
            {uploadedPhotos.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {uploadedPhotos.map((url, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-border">
                    <img
                      src={url}
                      alt={`Campus ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => deletePhoto(url)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-lg border-border">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No photos uploaded yet</p>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              {uploadedPhotos.length} photo(s) in gallery
            </p>
          </div>
        );

      case 'poc':
        return (
          <>
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
            <div className="space-y-3">
              <h4 className="font-semibold">General Contact</h4>
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
          </>
        );

      case 'club':
        return (
          <div className="space-y-3">
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
                placeholder="@club_handle or just club_handle"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clubLinkedin">LinkedIn URL</Label>
              <Input
                id="clubLinkedin"
                value={formData.clubLinkedin}
                onChange={(e) => setFormData({ ...formData, clubLinkedin: e.target.value })}
                placeholder="https://linkedin.com/company/..."
              />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsEditing(true)} 
        variant="ghost" 
        size="sm"
        className="h-8"
      >
        <Edit2 className="w-3 h-3 mr-1" />
        Edit
      </Button>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {getSectionTitle()}</DialogTitle>
            <DialogDescription>
              Update the {getSectionTitle().toLowerCase()} for {iiit.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {renderFormFields()}
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

export default SPOCEditSection;
