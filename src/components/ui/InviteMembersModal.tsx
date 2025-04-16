"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

interface InviteMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

const InviteMembersModal: React.FC<InviteMembersModalProps> = ({
  isOpen,
  onClose,
  teamId,
}) => {
  const [copied, setCopied] = useState(false);

  const inviteLink = `${teamId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 shadow-xl">
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          Invite Team Members
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Share this code to let others join your team.
        </p>

        <div className="mb-4">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm focus:outline-none"
          />
        </div>

        {copied && (
          <p className="mb-2 text-sm text-green-600">Copied to clipboard!</p>
        )}

        <div className="flex justify-end gap-3">
          <Button
            onClick={handleCopy}
            className="bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Copy Link
          </Button>
          <button
            onClick={onClose}
            className="rounded-2xl bg-gray-200 px-4 py-2 text-sm text-gray-800 transition hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteMembersModal;
