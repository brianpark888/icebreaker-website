import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, Upload, X } from "lucide-react";
import Image from "next/image";
export default function ProfileSetup() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          bio,
          imgUrl: profileImage || null, // If no image, pass null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success (e.g., redirect to team setup)
        router.push("/team-setup");
      } else {
        // Handle error (e.g., show error message)
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="relative flex flex-1 flex-col justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-grid absolute inset-0 opacity-[0.02]"></div>

        <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500">
              <UserCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-gradient mt-6 text-center text-3xl font-bold tracking-tight">
            Set Up Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Tell us a bit about yourself before joining your team
          </p>
        </div>

        <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 px-4 py-8 shadow backdrop-blur-sm sm:rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="profile-image"
                  className="block text-sm font-medium text-foreground"
                >
                  Profile Image (optional)
                </label>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    {profileImage ? (
                      <>
                        <div className="glow-sm relative h-32 w-32 overflow-hidden rounded-full border-2 border-primary/50">
                          <Image
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -right-2 -top-2 rounded-full border border-muted bg-background p-1 shadow-md"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove image</span>
                        </button>
                      </>
                    ) : (
                      <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted">
                        <UserCircle className="h-16 w-16 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>

                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="profile-image"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                    >
                      <Upload className="h-4 w-4" />
                      {profileImage ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                      id="profile-image"
                      name="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-foreground"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-md bg-background/50 p-2 text-sm text-foreground"
                  placeholder="Tell us a bit about yourself..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  Continue to Team Setup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
