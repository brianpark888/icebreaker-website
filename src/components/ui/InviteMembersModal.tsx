"use client"

import React, { useState } from "react"
import Button from "@/components/ui/Button"

interface InviteMembersModalProps {
  isOpen: boolean
  onClose: () => void
  teamId: string
}

const InviteMembersModal: React.FC<InviteMembersModalProps> = ({ isOpen, onClose, teamId }) => {
  const [copied, setCopied] = useState(false)

  const inviteLink = `${teamId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 p-6 border border-muted/20 shadow-xl">
        <h2 className="text-2xl font-bold text-foreground mb-2">Invite Team Members</h2>
        <p className="text-muted-foreground text-sm mb-4">
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

        {copied && <p className="text-green-600 text-sm mb-2">Copied to clipboard!</p>}

        <div className="flex justify-end gap-3">
          <Button onClick={handleCopy} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">
            Copy Link
          </Button>
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition px-4 py-2 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default InviteMembersModal
