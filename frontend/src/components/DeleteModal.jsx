import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, student }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !student) return null;

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm(student.id);
      onClose();
    } catch {
      // Error handled by parent toast
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Delete Student Record</h3>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete this student record? This action cannot be undone.
              </p>
              
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">Name:</span> {student.firstname} {student.lastname}
                </p>
                <p className="mt-0.5">
                  <span className="font-semibold text-slate-900">Course & Section:</span> {student.course} - {student.section}
                </p>
                <p className="mt-0.5 text-slate-500">
                  <span className="font-semibold text-slate-700">Student ID:</span> #{student.id}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg shadow-xs transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
