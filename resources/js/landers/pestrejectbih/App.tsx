import React, { useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import BundleSelector from './components/BundleSelector';
import OrderForm from './components/OrderForm';
import Testimonials from './components/Testimonials';
import MetaPixel from './components/MetaPixel';
import { BUNDLES, BRAND_NAME } from './constants';
import { ShoppingCart } from 'lucide-react';

const App: React.FC = () => {
  // Default to the middle option (2 devices) as it's usually the best seller
  const [selectedBundleId, setSelectedBundleId] = useState<number>(2);

  const selectedBundle = BUNDLES.find(b => b.id === selectedBundleId) || BUNDLES[0];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBundleSelection = (id: number) => {
    setSelectedBundleId(id);
    scrollToSection('order-form');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <MetaPixel />

      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-black text-2xl text-brand-dark tracking-tighter">
                {BRAND_NAME}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scrollToSection('offer')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md text-white bg-brand-green hover:bg-brand-dark transition-colors shadow-sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Naruči
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Hero onScrollToOrder={() => scrollToSection('offer')} />

      <Features />

      <HowItWorks />

      <div className="bg-brand-dark py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
             <h2 className="text-3xl font-bold text-white mb-4">Ne čekajte da se štetočine namnože!</h2>
             <p className="text-brand-lightGreen max-w-2xl mx-auto text-lg">Svaki dan čekanja povećava rizik od bolesti i oštećenja imovine. Riješite problem odmah uz <span className="font-bold text-white">40% popusta.</span></p>
        </div>
      </div>

      <BundleSelector
        selectedBundleId={selectedBundleId}
        onSelectBundle={handleBundleSelection}
      />

      <Testimonials />

      <OrderForm
        selectedBundle={selectedBundle}
        onBundleChange={setSelectedBundleId}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h4 className="font-bold text-lg mb-4 text-brand-green">{BRAND_NAME}</h4>
                    <p className="text-gray-400 text-sm">Vaš partner za bezbjedan i čist dom bez štetočina. Hiljade zadovoljnih korisnika širom BiH.</p>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-4">Brzi linkovi</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><button onClick={() => scrollToSection('offer')} className="hover:text-white">Ponuda</button></li>
                        <li><button onClick={() => scrollToSection('order-form')} className="hover:text-white">Naručivanje</button></li>
                    </ul>
                </div>
                <div id="contact">
                     <h4 className="font-bold text-lg mb-4">Kontakt</h4>
                     <p className="text-gray-400 text-sm">Imate pitanja? Pišite nam na info@homecarshop.com</p>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. Sva prava zadržana.</p>
            </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 lg:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)]">
        <button
          onClick={() => scrollToSection('order-form')}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-brand-red hover:bg-red-700 animate-pulse-fast"
        >
          NARUČI - {selectedBundle.price} KM
        </button>
      </div>
      {/* Padding for mobile sticky footer */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default App;
