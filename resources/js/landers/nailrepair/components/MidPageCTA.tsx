
import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';

interface MidPageCTAProps {
    onOrderClick?: () => void;
}

export const MidPageCTA: React.FC<MidPageCTAProps> = ({ onOrderClick }) => {
  return (
    <div className="bg-brand-900 py-16 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
         <div className="absolute right-0 top-0 bg-white rounded-full w-64 h-64 mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute left-0 bottom-0 bg-brand-500 rounded-full w-80 h-80 mix-blend-overlay filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-brand-100 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <AlertTriangle className="w-4 h-4" />
            Ne čekajte da se stanje pogorša
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
          Gljivice neće nestati same od sebe. <br/>
          <span className="text-brand-300">Rešite ih se danas.</span>
        </h2>
        
        <p className="text-lg text-brand-100 mb-8 max-w-2xl mx-auto">
          Svaki dan odlaganja produžava vreme oporavka nokta. Uz Medeiva serum, prvi koraci ka zdravim noktima počinju odmah.
        </p>

        <button 
          onClick={onOrderClick}
          className="bg-white text-brand-900 text-lg font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-brand-50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto w-full sm:w-auto"
        >
          Naručite Tretman <ArrowRight className="w-5 h-5" />
        </button>
        
        <p className="mt-4 text-xs text-brand-400 opacity-80">
          * Zalihe po staroj ceni se brzo troše.
        </p>
      </div>
    </div>
  );
};
