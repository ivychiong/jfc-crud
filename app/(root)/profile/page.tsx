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
        <p>Profile Information</p>
        <p>Update your account&apos;s profile information and email address.</p>
        <ProfileInformation />
      </Card>
      <Card>
        <p>Update Password</p>
        <p>
          Ensure your account is using a long, random password to stay secure.
        </p>
        <UpdatePassword />
      </Card>
      <Card>
        <p>Delete Account</p>
        <p>
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
        <div>
          <Button
            className="btn-warning uppercase"
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
