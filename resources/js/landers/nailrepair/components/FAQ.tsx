
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FAQItem } from '../types';

interface FAQProps {
    items: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm">Imate pitanja?</h2>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mt-2">
            Često postavljena pitanja
            </h2>
            <p className="text-gray-500 mt-2">Odgovori na najčešće nedoumice naših kupaca.</p>
        </div>
        
        <div className="space-y-4">
          {items.map((faq, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                {openIndex === idx ? <ChevronUp className="w-5 h-5 text-brand-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
              </button>
              
              {openIndex === idx && (
                <div className="px-6 py-4 bg-brand-50/30 text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
