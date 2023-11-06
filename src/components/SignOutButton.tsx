"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

type Props = {
  text: string;
};

const SignOutButton = ({ text }: Props) => {
  return (
    <Button
      variant="destructive"
      onClick={(e) => {
        e.preventDefault();
        signOut().catch(console.error);
      }}
    >
      <span className="mr-2">{text}</span>
      <LogOut size={20} />
    </Button>
  );
};

export default SignOutButton;
