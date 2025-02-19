"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AccountSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "Abdullah",
    lastName: "Ahmed",
    email: "abdullah@example.com",
    username: "abdullah123",
    displayName: "Abdullah",
  });

  const handleSave = () => {
    // Here you would typically send the updated info to your backend
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Account Information</h2>
          <p className="text-sm text-neutral-600">
            You can update your information and save them.
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <Separator />
      <div className="space-y-6 text-sm">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          {isEditing ? (
            <Input
              id="firstName"
              value={userInfo.firstName}
              onChange={e =>
                setUserInfo({ ...userInfo, firstName: e.target.value })
              }
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              {userInfo.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          {isEditing ? (
            <Input
              id="lastName"
              value={userInfo.lastName}
              onChange={e =>
                setUserInfo({ ...userInfo, lastName: e.target.value })
              }
            />
          ) : (
            <p className="text-sm text-muted-foreground">{userInfo.lastName}</p>
          )}
        </div>

        {/* Username (non-editable) */}
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <p className="text-sm text-muted-foreground">{userInfo.username}</p>
        </div>

        {/* Email (non-editable) */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <p className="text-sm text-muted-foreground">{userInfo.email}</p>
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name</Label>
          {isEditing ? (
            <Input
              id="displayName"
              value={userInfo.displayName}
              onChange={e =>
                setUserInfo({ ...userInfo, displayName: e.target.value })
              }
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              {userInfo.displayName}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            This is how your name will appear in activities and assignments
          </p>
        </div>

        {/* Save Button */}
        {isEditing && (
          <Button
            className="bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold w-full"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}
