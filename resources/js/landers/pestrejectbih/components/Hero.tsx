import React from 'react';
import { ShieldCheck, Heart, VolumeX, AlertTriangle } from 'lucide-react';
import { IMAGES } from '../constants';

interface HeroProps {
  onScrollToOrder: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToOrder }) => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-red text-white text-sm font-bold mb-4 animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-2" /> AKCIJA OGRANIČENOG TRAJANJA
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Očistite dom od štetočina</span>{' '}
                <span className="block text-brand-green xl:inline">bez otrova i hemikalija!</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Revolucionarna ultrazvučna tehnologija koja trajno tjera miševe, pacove i insekte. Bezbjedno za vašu porodicu, ljubimce i okolinu.
              </p>
              
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4 text-sm font-medium text-gray-700">
                 <div className="flex items-center lg:justify-start sm:justify-center p-2 bg-brand-lightGreen rounded-lg border border-brand-green/20">
                    <ShieldCheck className="w-5 h-5 text-brand-green mr-2" /> 100% Eko Safe
                 </div>
                 <div className="flex items-center lg:justify-start sm:justify-center p-2 bg-brand-lightGreen rounded-lg border border-brand-green/20">
                    <VolumeX className="w-5 h-5 text-brand-green mr-2" /> Bešuman rad
                 </div>
                 <div className="flex items-center lg:justify-start sm:justify-center p-2 bg-brand-lightGreen rounded-lg border border-brand-green/20">
                    <Heart className="w-5 h-5 text-brand-green mr-2" /> Bezbjedno za ljubimce
                 </div>
              </div>

              <div className="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow w-full sm:w-auto">
                  <button
                    onClick={onScrollToOrder}
                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-white bg-brand-red hover:bg-brand-alert md:py-4 md:text-xl md:px-10 transition-all transform hover:scale-105 shadow-xl animate-pulse-fast uppercase"
                  >
                    NARUČI ODMAH - 40% POPUSTA
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center lg:justify-start text-sm text-gray-500">
                <span className="flex items-center text-green-600 font-semibold mr-4">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span> Na stanju
                </span>
                <span className="flex items-center">
                   🚚 Plaćanje pouzećem
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 flex items-center justify-center">
        {/* Product Image Focus */}
        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-full">
            <img
            className="absolute inset-0 w-full h-full object-cover lg:object-cover bg-gray-100"
            src={IMAGES.PRODUCT}
            alt="Pest Reject Original Uređaj"
            />
             {/* Gradient overlay for text readability on mobile if needed, or style transition */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:via-white/20"></div>
            
            {/* Visual reinforcement tag */}
            <div className="absolute bottom-10 right-10 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200 hidden lg:block animate-bounce">
                <p className="font-bold text-gray-900">Radijus djelovanja</p>
                <p className="text-brand-green font-extrabold text-2xl">15 m²</p>
                <p className="text-xs text-gray-500">po uređaju</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;