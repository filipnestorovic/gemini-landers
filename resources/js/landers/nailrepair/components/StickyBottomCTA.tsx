
import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface StickyBottomCTAProps {
    visible: boolean;
    onOrderClick: () => void;
}

export const StickyBottomCTA: React.FC<StickyBottomCTAProps> = ({ visible, onOrderClick }) => {
  return (
    <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-40 transition-transform duration-300 sm:hidden flex items-center gap-4 ${
            visible ? 'translate-y-0' : 'translate-y-full'
        }`}
    >
        <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Najbolja ponuda</p>
            <div className="flex items-baseline gap-2">
                <span className="text-brand-900 font-bold text-lg">2.190 RSD</span>
                <span className="text-xs text-gray-400 line-through">Redovna cena</span>
            </div>
        </div>
        <button 
            onClick={onOrderClick}
            className="flex-1 bg-brand-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
            <ShoppingBag className="w-4 h-4" />
            Naruči
        </button>
    </div>
  );
};
