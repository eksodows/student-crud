import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-in max-w-md">
      <div
        className={`flex items-start p-4 rounded-xl shadow-lg border backdrop-blur-sm ${
          isSuccess
            ? 'bg-emerald-50/95 text-emerald-900 border-emerald-200'
            : 'bg-rose-50/95 text-rose-900 border-rose-200'
        }`}
      >
        <div className="shrink-0 mr-3 mt-0.5">
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600" />
          )}
        </div>
        <div className="flex-1 mr-2">
          <p className="text-sm font-semibold">{isSuccess ? 'Success' : 'Notice'}</p>
          <p className="text-xs opacity-90 mt-0.5">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
        >
          <X className="w-4 h-4 opacity-70" />
        </button>
      </div>
    </div>
  );
}
