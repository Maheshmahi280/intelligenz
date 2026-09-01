import React, { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';

interface SignOutConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SignOutConfirmModal: React.FC<SignOutConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      id="signout-confirm-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        id="signout-confirm-modal-box"
        className="w-full max-w-md bg-[#0D1017] border border-red-500/30 rounded-2xl p-6 shadow-2xl shadow-red-950/40 text-left relative animate-in zoom-in-95 duration-200"
      >
        <button
          id="signout-modal-close-btn"
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#6B7280] hover:text-white p-1 rounded-lg hover:bg-[#1A1C23] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0 text-red-400">
            <LogOut className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Sign out of Admin Portal?
            </h3>
            <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
              Are you sure you want to sign out of the Intelligenz Admin Portal?
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1A1C23] mt-2">
          <button
            id="signout-modal-cancel-btn"
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-[#9CA3AF] hover:text-white bg-[#1A1C23] hover:bg-[#252833] rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            id="signout-modal-confirm-btn"
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 active:scale-95 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-red-600/20 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
