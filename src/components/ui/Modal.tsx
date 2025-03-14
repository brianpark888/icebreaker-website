import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{
        position: "fixed", // Position fixed to ensure it stays on top
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999, // High z-index value to ensure it's on top of everything
      }}
    >
      <div className="rounded-md bg-gradient-to-r from-blue-500 to-violet-500 p-6 px-6 py-2 text-lg">
        <h1 className="text-2xl font-semibold">Create Team</h1>
        <p className="text-1 text-gray-400">
          Start a new team and <br /> invite your colleagues
        </p>
        <p className="mt-1">Team Name</p>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
        />
        <div className="space-x-8">
          <button
            onClick={onClose}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="mr-4 mt-4 rounded bg-red-500 px-4 py-2 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
