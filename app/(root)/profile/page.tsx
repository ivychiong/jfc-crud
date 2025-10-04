"use client";

import React from "react";

import Card from "@/components/Card";
import { Button } from "@/components/ui/button";

import { ProfileInformation, UpdatePassword } from "./_components";

const ProfilePage = () => {
  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    const res = await fetch("/api/auth/user", {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      window.location.href = "/login";
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <Card>
        <h3 className="title">Profile Information</h3>
        <p className="description mb-4">
          Update your account&apos;s profile information and email address.
        </p>
        <ProfileInformation />
      </Card>
      <Card>
        <h3 className="title">Update Password</h3>
        <p className="description mb-2">
          Ensure your account is using a long, random password to stay secure.
        </p>
        <UpdatePassword />
      </Card>
      <Card>
        <h3 className="title">Delete Account</h3>
        <p className="description mb-2 w-[40%]">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
        <div>
          <Button
            className="mt-2 btn-warning uppercase !rounded-md"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ProfilePage;
