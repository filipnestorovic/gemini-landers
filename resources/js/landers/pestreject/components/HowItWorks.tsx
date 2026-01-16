import React from 'react';
import { Plug, Radio, ShieldCheck } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 bg-brand-lightGreen/30 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-brand-green font-bold tracking-wide uppercase">JEDNOSTAVNO KORIŠĆENJE</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Kako funkcioniše Pest Reject?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Bez komplikovanih instalacija i baterija. Spreman za rad odmah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Step 1 */}
          <div className="relative p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-16 h-16 bg-brand-lightGreen rounded-full flex items-center justify-center mx-auto mb-6 text-brand-green">
              <Plug className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">1. Uključite u struju</h3>
            <p className="text-gray-600">
              Jednostavno ubacite uređaj u bilo koju standardnu utičnicu u prostoriji koju želite da zaštitite.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-6 bg-white rounded-xl shadow-md border border-gray-100">
             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full">
                TEHNOLOGIJA
             </div>
            <div className="w-16 h-16 bg-brand-lightGreen rounded-full flex items-center justify-center mx-auto mb-6 text-brand-green">
              <Radio className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">2. Aktivacija talasa</h3>
            <p className="text-gray-600">
              Plavo svetlo označava da ultrazvučni talasi počinju da se šire kroz zidove i prostor.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-16 h-16 bg-brand-lightGreen rounded-full flex items-center justify-center mx-auto mb-6 text-brand-green">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">3. Potpuna zaštita</h3>
            <p className="text-gray-600">
              Štetočine osećaju nelagodnost i napuštaju vaš dom zauvek u roku od 2-3 nedelje.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;