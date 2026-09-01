import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  itemType: string;
  itemName: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  itemType,
  itemName,
  isDeleting = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="delete-confirm-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) onCancel();
      }}
    >
      <div
        id="delete-confirm-modal-box"
        className="w-full max-w-md bg-[#0D1017] border border-red-500/30 rounded-2xl p-6 shadow-2xl shadow-red-950/40 text-left relative"
      >
        <button
          id="delete-modal-close-btn"
          onClick={onCancel}
          disabled={isDeleting}
          className="absolute top-4 right-4 text-[#6B7280] hover:text-white p-1 rounded-lg hover:bg-[#1A1C23] transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0 text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {title || `Delete ${itemType}`}
            </h3>
            <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
              Are you sure you want to permanently delete this {itemType.toLowerCase()}?
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-[#0A0B0E] border border-[#1A1C23] rounded-xl mb-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B7280] block mb-1">
            Target {itemType}
          </span>
          <span className="text-sm font-semibold text-white break-words line-clamp-2">
            "{itemName}"
          </span>
          <span className="text-[11px] text-red-400/80 block mt-1.5 font-medium">
            This action cannot be undone and will be immediately synced to the database.
          </span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            id="delete-modal-cancel-btn"
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-semibold text-[#9CA3AF] hover:text-white bg-[#1A1C23] hover:bg-[#252833] rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            id="delete-modal-confirm-btn"
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 active:scale-95 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete Permanently</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
