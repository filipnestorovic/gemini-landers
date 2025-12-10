
import React from 'react';
import { Droplets, Clock, Sparkles } from 'lucide-react';

export const HowToUse: React.FC = () => {
  return (
    <div id="how-to-use" className="py-20 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm">Jednostavna Primena</h2>
          <p className="mt-2 text-3xl font-serif font-bold text-gray-900 sm:text-4xl">
            Samo 3 Koraka do Zdravih Noktiju
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-100 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 bg-brand-100 text-brand-800 font-bold px-4 py-2 rounded-bl-xl text-lg">1</div>
            <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
              <Droplets className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Priprema</h3>
            <p className="text-gray-600 leading-relaxed">
              Operite i temeljno osušite stopala ili šake. Po mogućstvu, blago isturpijajte površinu nokta kako bi serum bolje prodro.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-100 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 bg-brand-100 text-brand-800 font-bold px-4 py-2 rounded-bl-xl text-lg">2</div>
            <div className="h-20 w-20 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
              <Sparkles className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Nanošenje</h3>
            <p className="text-gray-600 leading-relaxed">
              Nanesite 2-3 kapi Medeiva seruma direktno na oboleli nokat i okolnu kožu. Koristite priloženi aplikator.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-100 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 bg-brand-100 text-brand-800 font-bold px-4 py-2 rounded-bl-xl text-lg">3</div>
            <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500 group-hover:scale-110 transition-transform">
              <Clock className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Delovanje</h3>
            <p className="text-gray-600 leading-relaxed">
              Ostavite da se osuši 5-10 minuta pre obuvanja čarapa. Ponavljajte postupak dva puta dnevno (ujutru i uveče).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
