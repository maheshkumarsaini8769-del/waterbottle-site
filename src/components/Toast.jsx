import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#00aeef] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-5 py-4 rounded-xl shadow-2xl border border-[#bdc8d1] max-w-md">
        {icons[toast.type] || icons.success}
        <p className="text-sm font-medium text-[#1a1c1c]">{toast.message}</p>
      </div>
    </div>
  );
}
