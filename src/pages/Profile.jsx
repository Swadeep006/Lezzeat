import { useState, useRef } from "react";
import { ArrowLeft, Camera, User, Mail, Calendar, Shield, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = ({ onBack }) => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@college.edu",
    rollNumber: "CS2024001",
    profilePhoto: null,
    accountStatus: "Active",
    joinedDate: "Jul 31, 2025"
  });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      setUploadingPhoto(true);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          profilePhoto: e.target.result
        }));
        setUploadingPhoto(false);
        toast({
          title: "Photo uploaded",
          description: "Your profile photo has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setProfile(prev => ({
      ...prev,
      profilePhoto: null
    }));
    toast({
      title: "Photo removed",
      description: "Your profile photo has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6 max-w-2xl mx-auto">
        {/* Profile Photo Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Profile Photo
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={profile.profilePhoto} alt={profile.name} />
              <AvatarFallback className="text-2xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
              >
                {uploadingPhoto ? "Uploading..." : "Upload Photo"}
              </Button>
              {profile.profilePhoto && (
                <Button variant="destructive" onClick={removePhoto}>
                  Remove Photo
                </Button>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            
            <p className="text-sm text-muted-foreground text-center">
              Upload a profile photo (max 5MB). Supports JPG, PNG, and GIF formats.
            </p>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <div className="p-3 bg-muted rounded-lg">
                {profile.name}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <div className="p-3 bg-muted rounded-lg text-muted-foreground">
                @{profile.username}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Roll Number</label>
              <div className="p-3 bg-muted rounded-lg text-muted-foreground">
                {profile.rollNumber}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="p-3 bg-muted rounded-lg">
                {profile.email}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined</span>
              </div>
              <span className="font-medium">{profile.joinedDate}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Account Status</span>
              </div>
              <span 
                className={`font-medium px-2 py-1 rounded-full text-xs ${
                  profile.accountStatus === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}
              >
                {profile.accountStatus}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;