"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import TextInput from "@/components/forms/TextInput";
import { Button } from "@/components/ui/button";
import { User, useUser } from "@/provider/UserProvider";

const ProfileInformation = () => {
  const { user, setUser } = useUser();
  const [localUser, setLocalUser] = useState<User | null>(user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/user");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setLocalUser(data.user);
      } else {
        setUser(null);
        setLocalUser(null);
      }
    };

    if (!user) fetchUser();
  }, [user, setUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalUser((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localUser) return;

    const res = await fetch("/api/auth/user/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: localUser.name,
        email: localUser.email,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Profile updated successfully!");
      setUser(localUser);
    } else {
      toast.error(data.error || "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Name"
        name="name"
        value={localUser?.name || ""}
        onChange={handleChange}
      />
      <TextInput
        label="Email"
        name="email"
        value={localUser?.email || ""}
        type="email"
        onChange={handleChange}
      />
      <Button type="submit" className="bg-gray-800 text-white ml-2 uppercase">
        Save
      </Button>
    </form>
  );
};

export default ProfileInformation;
