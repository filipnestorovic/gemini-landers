import React, { useState } from 'react';
import { BUNDLES } from '../constants';
import { Bundle } from '../types';
import { Check } from 'lucide-react';

interface BundleSelectorProps {
  selectedBundleId: number;
  onSelectBundle: (id: number) => void;
}

const BundleSelector: React.FC<BundleSelectorProps> = ({ selectedBundleId, onSelectBundle }) => {
  return (
    <div id="offer" className="bg-gray-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Izaberite paket prema veličini prostora
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Jedan uređaj pokriva efikasno do <span className="font-bold text-gray-900">15m²</span>. Za najbolje rezultate, postavite po jedan uređaj u svaku sobu.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          {BUNDLES.map((bundle) => {
            const isSelected = selectedBundleId === bundle.id;
            
            return (
              <div 
                key={bundle.id} 
                onClick={() => onSelectBundle(bundle.id)}
                className={`relative border rounded-2xl shadow-sm divide-y divide-gray-200 flex flex-col cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                  isSelected 
                    ? 'border-brand-green ring-2 ring-brand-green bg-white shadow-xl scale-105 z-10' 
                    : 'border-gray-200 bg-white hover:border-brand-green'
                }`}
              >
                {bundle.isPopular && (
                  <div className="absolute top-0 transform -translate-y-1/2 left-0 right-0 flex justify-center">
                    <span className="inline-flex rounded-full bg-brand-red px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white shadow-sm">
                      Najprodavanije
                    </span>
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-medium text-gray-900 text-center">{bundle.label}</h3>
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-2">
                       Pokriva {bundle.coverage}m²
                    </span>
                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                      {bundle.price} <span className="text-xl font-normal text-gray-500">KM</span>
                    </span>
                    <span className="text-base text-gray-400 line-through">
                      {bundle.oldPrice} KM
                    </span>
                    <span className="mt-2 text-sm text-brand-red font-bold">
                      Ušteda {bundle.savings} KM
                    </span>
                  </div>
                  
                  <ul className="mt-6 space-y-4 flex-1">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        {bundle.quantity}x Pest Reject uređaj
                      </p>
                    </li>
                    {/* Free shipping logic: Show only for bundles with 3 or more items */}
                    {bundle.quantity >= 3 && (
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                        </div>
                        <p className="ml-3 text-sm text-green-700 font-bold">
                          Besplatna dostava
                        </p>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="py-4 px-6 bg-gray-50 rounded-b-2xl">
                    <div className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${isSelected ? 'bg-brand-green text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
                        {isSelected ? 'Izabrano' : 'Izaberi paket'}
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BundleSelector;