
import React, { useState, useEffect, useRef } from 'react';
import { Check, Star, ShieldCheck, Truck, Clock, X, ChevronRight, Banknote, Loader2, AlertTriangle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ProductGallery } from './components/ProductGallery';
import { IngredientSpotlight } from './components/IngredientSpotlight';
import { AIConsultant } from './components/AIConsultant';
import { HowToUse } from './components/HowToUse';
import { FAQ } from './components/FAQ';
import { Reviews } from './components/Reviews';
import { MidPageCTA } from './components/MidPageCTA';
import { StickyBottomCTA } from './components/StickyBottomCTA';
import { MEDEIVA_SERUM, REVIEWS, FAQS, SYSTEM_INSTRUCTION, INITIAL_CHAT_MESSAGE } from './constants';
import type { Bundle } from './types';
import { initPixel, trackEvent } from './services/pixelService';

// Opciono: ako React Router nije potreban za ovu strukturu foldera,
// App.tsx glumi direktnu stranicu (Lander).

const App: React.FC = () => {
  // Logic for bundle selection
  const [selectedBundle, setSelectedBundle] = useState<Bundle>(MEDEIVA_SERUM.bundles[1]); // Default to 2 packs
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Sticky button logic
  const [showSticky, setShowSticky] = useState(false);
  const mainCtaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1. Inicijalizuj Pixel (PageView)
        initPixel();

        trackEvent('ViewContent', {
            content_name: MEDEIVA_SERUM.name,
            content_type: 'product',
            value: MEDEIVA_SERUM.basePrice,
            currency: MEDEIVA_SERUM.currency
        });
    }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
        }
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );

    if (mainCtaRef.current) {
      observer.observe(mainCtaRef.current);
    }

    return () => {
      if (mainCtaRef.current) {
        observer.unobserve(mainCtaRef.current);
      }
    };
  }, []);

  // Calculate shipping cost logic
  const shippingCost = selectedBundle.freeShipping ? 0 : 500;
  const totalCost = selectedBundle.price + shippingCost;

    const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setServerError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Laravel backend očekuje ove dodatne podatke
        formData.append('sku', MEDEIVA_SERUM.id);
        formData.append('quantity', selectedBundle.quantity.toString());
        formData.append('price', selectedBundle.price.toString());
        formData.append('totalPrice', totalCost.toString());
        formData.append('freeShipping', selectedBundle.freeShipping.toString());

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || (window as any).csrf_token;
            const targetRoute = (window as any).orderRoute || '/poruci';

            const response = await fetch(targetRoute, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    // Tražimo JSON odgovor kako bi Laravel vratio 422 JSON greške umesto redirect-a nazad
                    'Accept': 'application/json',
                },
                body: formData
            });

            // === PIXEL PURCHASE HELPER ===
            const firePurchaseEvent = () => {
                trackEvent('Purchase', {
                    value: totalCost,
                    currency: MEDEIVA_SERUM.currency,
                    content_type: 'product',
                    num_items: selectedBundle.quantity
                });
            };
            // =============================

            // 1. Provera redirekcije (Success Case)
            // Ako Laravel vrati 302 Redirect na '/thankyou', fetch API to prati i response.url se menja.
            if (response.url && response.url.includes('thankyou')) {
                firePurchaseEvent();
                window.location.href = response.url; // Osvežavamo stranu na novoj URL adresi
                return;
            }

            // 2. Parsiranje odgovora (Error Case ili JSON Success)
            const data = await response.json().catch(() => null);

            if (response.ok) {
                firePurchaseEvent();
                // Ako backend vrati JSON success (retko ako koristis redirect(), ali moguće)
                if (data && data.redirect_url) {
                    window.location.href = data.redirect_url;
                } else {
                    setCheckoutStep('success');
                }
            } else {
                // 3. Rukovanje greškama (Validation Errors - 422)
                if (response.status === 422 && data && data.errors) {
                    // Uzimamo prvu grešku iz niza (Laravel vraća { errors: { field: ['error'] } })
                    const firstErrorKey = Object.keys(data.errors)[0];
                    const firstErrorMessage = data.errors[firstErrorKey][0];
                    setServerError(firstErrorMessage || "Proverite unete podatke.");
                } else {
                    setServerError(data?.message || "Došlo je do greške na serveru. Molimo pokušajte ponovo.");
                }
            }

        } catch (error) {
            console.error('Submission error:', error);
            setServerError("Greška u komunikaciji sa serverom. Proverite internet konekciju.");
        } finally {
            setIsSubmitting(false);
        }
    };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    if (checkoutStep === 'success') {
        setTimeout(() => {
            setCheckoutStep('form');
            setServerError(null);
        }, 300);
    }
  };

  const openCheckout = () => {
      // === PIXEL INITIATE CHECKOUT ===
      trackEvent('InitiateCheckout', {
          content_type: 'product',
          value: totalCost,
          currency: MEDEIVA_SERUM.currency,
          num_items: selectedBundle.quantity
      });
      // ===============================
      setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20 sm:pb-0">
      <Navbar onOrderClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })} />

      <main id="product" className="pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 xl:gap-x-20">

            {/* Left Column: Gallery */}
            <div className="mb-12 lg:mb-0">
              <ProductGallery images={MEDEIVA_SERUM.images} productName={MEDEIVA_SERUM.name} />

              {/* Trust Badges Desktop */}
              <div className="hidden lg:grid grid-cols-3 gap-6 mt-10">
                <div className="flex flex-col items-center text-center p-5 bg-green-50/50 rounded-2xl border border-green-100 transition-transform hover:-translate-y-1 duration-300">
                  <div className="bg-white p-2 rounded-full shadow-sm mb-3">
                    <ShieldCheck className="h-6 w-6 text-brand-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">Garancija</span>
                  <span className="text-xs text-gray-500 mt-1">Kvaliteta</span>
                </div>
                <div className="flex flex-col items-center text-center p-5 bg-green-50/50 rounded-2xl border border-green-100 transition-transform hover:-translate-y-1 duration-300">
                  <div className="bg-white p-2 rounded-full shadow-sm mb-3">
                    <Star className="h-6 w-6 text-brand-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">4.9/5 Zvezdica</span>
                  <span className="text-xs text-gray-500 mt-1">Verifikovano</span>
                </div>
                <div className="flex flex-col items-center text-center p-5 bg-green-50/50 rounded-2xl border border-green-100 transition-transform hover:-translate-y-1 duration-300">
                  <div className="bg-white p-2 rounded-full shadow-sm mb-3">
                    <Clock className="h-6 w-6 text-brand-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">Proizvedeno</span>
                  <span className="text-xs text-gray-500 mt-1">U Srbiji</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center space-x-2 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
                 <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
                    Protiv Gljivica
                 </span>
                 <span className="text-red-600 text-sm font-medium flex items-center bg-red-50 px-2 py-1 rounded-md">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                    Velika potražnja
                 </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 tracking-tight mb-2 leading-tight">
                {MEDEIVA_SERUM.name}
              </h1>
              <p className="text-2xl text-gray-400 font-serif mb-6">{MEDEIVA_SERUM.subtitle}</p>

              <div className="flex items-center mb-6 space-x-4">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star key={rating} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <a href="#reviews" className="text-sm text-brand-700 font-medium hover:underline">
                  Pogledaj 450+ iskustava
                </a>
              </div>

              <div className="prose prose-brand text-gray-600 mb-8">
                <p className="text-lg leading-relaxed">{MEDEIVA_SERUM.description}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Check className="h-5 w-5 text-brand-600 mr-2" />
                    Zašto korisnici biraju Medeivu?
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                  {MEDEIVA_SERUM.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-700 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-2 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BUNDLE SELECTION */}
              <div id="checkout-section" className="space-y-4 mb-8 bg-white p-1 rounded-2xl">
                <div className="flex justify-between items-end mb-2">
                   <h3 className="text-base font-bold text-gray-900">Izaberite paket:</h3>
                   <span className="text-xs text-green-600 font-medium">🚚 Besplatna dostava za paket od 3 kom</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {MEDEIVA_SERUM.bundles.map((bundle) => {
                    const isSelected = selectedBundle.quantity === bundle.quantity;
                    return (
                    <div
                      key={bundle.quantity}
                      onClick={() => setSelectedBundle(bundle)}
                      className={`group relative flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/50 shadow-md transform scale-[1.01]'
                          : 'border-gray-200 hover:border-brand-200 hover:bg-gray-50'
                      }`}
                    >
                      {bundle.badge && (
                        <div className="absolute -top-3 right-6 bg-brand-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm z-10 animate-bounce" style={{ animationDuration: '2s' }}>
                          {bundle.badge}
                        </div>
                      )}

                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                          isSelected ? 'border-brand-600 bg-white' : 'border-gray-300 bg-transparent'
                        }`}>
                          {isSelected && <div className="w-3 h-3 rounded-full bg-brand-600" />}
                        </div>
                        <div>
                          <p className={`font-bold text-lg ${isSelected ? 'text-brand-900' : 'text-gray-700'}`}>{bundle.label}</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                             {bundle.savings && (
                                <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-md">
                                    {bundle.savings}
                                </span>
                             )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-xl text-gray-900">{bundle.price.toLocaleString()} <span className="text-sm font-normal">{MEDEIVA_SERUM.currency}</span></p>
                      </div>
                    </div>
                  )})}
                </div>
              </div>

              {/* Action Area */}
              <div ref={mainCtaRef} className="flex flex-col sm:flex-row gap-4 items-center border-t border-gray-100 pt-6">
                 <div className="flex-1 w-full text-center sm:text-left">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500 mb-1">
                            Ukupno sa dostavom:
                        </span>
                        <div className="flex items-baseline justify-center sm:justify-start gap-2">
                             <span className="text-4xl font-bold text-brand-900 tracking-tight">
                                {totalCost.toLocaleString()}
                            </span>
                            <span className="text-lg text-gray-500 font-medium">{MEDEIVA_SERUM.currency}</span>
                        </div>
                        {selectedBundle.freeShipping &&
                            <span className="text-green-600 font-bold text-xs mt-1 animate-pulse">
                                + BESPLATNA POŠTARINA
                            </span>
                        }
                    </div>
                 </div>
                <button
                  id="main-cta"
                  onClick={openCheckout}
                  className="w-full sm:w-auto flex-1 bg-brand-600 text-white rounded-full py-4 px-12 font-bold text-lg hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200 transition-all shadow-xl shadow-brand-200 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Naručite Odmah <ChevronRight className="w-5 h-5" />
                </button>
              </div>

               <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start text-xs text-gray-500 gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="flex items-center font-medium text-gray-700"><Banknote className="h-4 w-4 mr-1.5 text-brand-600" /> Plaćanje pouzećem</span>
                  <span className="flex items-center font-medium text-gray-700"><Truck className="h-4 w-4 mr-1.5 text-brand-600" /> Dostava 24-48h</span>
              </div>

            </div>
          </div>
        </div>
      </main>

      <IngredientSpotlight ingredients={MEDEIVA_SERUM.ingredients} />
      <HowToUse />
      <MidPageCTA onOrderClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })} />
      <Reviews reviews={REVIEWS} />
      <FAQ items={FAQS} />

      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800 pb-32 sm:pb-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <span className="text-2xl font-serif font-bold text-white tracking-tight mb-6 block">MEDEIVA.</span>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Spoj prirode i nauke za zdrave i lepe nokte.
                    </p>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; 2025 Medeiva. Sva prava zadržana.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <span></span>
                </div>
            </div>
        </div>
      </footer>

        <AIConsultant
            systemInstruction={SYSTEM_INSTRUCTION}
            initialMessage={INITIAL_CHAT_MESSAGE}
            isFooterVisible={showSticky}
        />

      <StickyBottomCTA visible={showSticky} onOrderClick={openCheckout} />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">

            {/* Overlay */}
            <div
                className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
                onClick={closeCheckout}
                aria-hidden="true"
            ></div>

            {/* Modal Panel */}
            <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-in zoom-in-95 duration-200">

              <div className="absolute top-4 right-4 z-10">
                <button
                    type="button"
                    onClick={closeCheckout}
                    className="bg-white/80 rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
                >
                  <span className="sr-only">Zatvori</span>
                  <X className="h-6 w-6" />
                </button>
              </div>

              {checkoutStep === 'form' ? (
                <div className="px-6 py-8 sm:p-8">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-serif font-bold text-gray-900">
                            Završite Porudžbinu
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">Plaćanje pouzećem - Sigurna kupovina.</p>
                    </div>

                    <div className="bg-brand-50 rounded-xl p-4 mb-6 border border-brand-100 space-y-2">
                         <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Proizvod:</span>
                            <span className="font-bold text-gray-900">{selectedBundle.label}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Cena paketa:</span>
                            <span className="font-bold text-gray-900">{selectedBundle.price.toLocaleString()} RSD</span>
                         </div>
                         <div className="flex justify-between items-center pt-2 border-t border-brand-100">
                            <span className="text-sm text-gray-600">Dostava:</span>
                            <span className={`font-bold ${selectedBundle.freeShipping ? 'text-green-600' : 'text-gray-900'}`}>
                                {selectedBundle.freeShipping ? 'BESPLATNA' : `${shippingCost} RSD`}
                            </span>
                         </div>
                         <div className="flex justify-between items-center pt-2 border-t border-brand-200">
                            <span className="font-bold text-brand-900">ZA PLAĆANJE KURIRU:</span>
                            <span className="font-bold text-xl text-brand-700">{totalCost.toLocaleString()} RSD</span>
                         </div>
                    </div>

                    {serverError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center animate-in fade-in slide-in-from-top-2">
                            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{serverError}</span>
                        </div>
                    )}

                    <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ime i Prezime</label>
                            <input type="text" name="name" required placeholder="Unesite Vaše ime" className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:bg-white focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-3 px-4 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Broj telefona (za kurira)</label>
                            <input type="tel" name="phone" required placeholder="Obavezno za dostavu" className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:bg-white focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-3 px-4 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ulica i Broj</label>
                            <input type="text" name="shipping_address" required placeholder="Npr. Bulevar Oslobođenja 10" className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:bg-white focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-3 px-4 transition-colors" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Grad/Mesto</label>
                                <input type="text" name="shipping_city" required placeholder="Vaš grad" className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:bg-white focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-3 px-4 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Poštanski br.</label>
                                <input type="text" name="shipping_zip" className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:bg-white focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-3 px-4 transition-colors" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Obrađujem...
                                    </span>
                                ) : (
                                    "Potvrdi Porudžbinu"
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
                                <ShieldCheck className="w-3 h-3 mr-1" /> Vaši podaci su 100% sigurni
                            </p>
                        </div>
                    </form>
                </div>
              ) : (
                 <div className="px-6 py-12 sm:p-10 text-center bg-white">
                   <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 animate-in zoom-in duration-300">
                      <Check className="h-10 w-10 text-green-600" />
                   </div>
                   <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Hvala na porudžbini!</h3>
                   <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                       Kontaktiraćemo Vas u najkraćem roku da potvrdimo porudžbinu.
                   </p>
                   {/* Dugme za povratak ovde može biti opciono ako redirect radi svoje */}
                   <button onClick={closeCheckout} className="w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                     Povratak na sajt
                   </button>
                 </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
