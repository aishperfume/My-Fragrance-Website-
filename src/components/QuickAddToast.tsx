import React from 'react';
import { useCart } from '../context/CartContext';

export const QuickAddToast: React.FC = () => {
  const { toast } = useCart();

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 bg-primary text-on-primary px-6 py-4 border border-outline shadow-2xl flex items-center gap-4 transition-all duration-300 animate-bounce-subtle">
      <span className="material-symbols-outlined text-[18px] text-[#008fcb]">check_circle</span>
      <span className="font-mono-label text-mono-label uppercase tracking-widest text-xs">
        {toast.message}
      </span>
    </div>
  );
};
