
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { DemoSection } from './components/DemoSection';
import { Comparison } from './components/Comparison';
import { Testimonials } from './components/Testimonials';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';
import { RecentPurchases } from './components/RecentPurchases';
import { MetaPixel, trackPixelEvent } from './components/MetaPixel';
import { PRODUCT_SETTINGS } from './constants';
import { ShieldCheck, Truck, Star, CheckCircle2 } from 'lucide-react';

export default function App() {
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Intersection Observer unutar React-a radi pouzdanosti na produkciji
    useEffect(() => {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Dajemo mali timeout da bi se osiguralo da su svi elementi u DOM-u
        const timer = setTimeout(() => {
            const revealElements = document.querySelectorAll('.reveal');
            revealElements.forEach(el => observer.observe(el));
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    const handleOrderSuccess = (value: number) => {
        setOrderPlaced(true);
        // Skrolovanje na vrh stranice odmah nakon uspešne narudžbine
        window.scrollTo({ top: 0, behavior: 'smooth' });

        trackPixelEvent('Purchase', {
            currency: PRODUCT_SETTINGS.currency,
            value: value,
        });
    };

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-900 text-white" style={{ backgroundColor: '#0F172A' }}>
            <MetaPixel pixelId={PRODUCT_SETTINGS.pixelId} />
            <Navbar />
            <RecentPurchases />

            <main className="flex-grow">
                <Hero />

                <div className="bg-red-600 py-3 overflow-hidden shadow-lg relative z-20 border-y border-red-500">
                    <div className="animate-marquee flex whitespace-nowrap text-white font-bold uppercase tracking-wider text-sm md:text-base">
                        <div className="flex px-6">
                            <span className="flex items-center mx-6"><Truck size={18} className="mr-2" /> Besplatna dostava za Mega Paket</span>
                            <span className="flex items-center mx-6"><ShieldCheck size={18} className="mr-2" /> 100% Garancija zadovoljstva</span>
                            <span className="flex items-center mx-6">🇷🇸 Dostava u celoj Srbiji</span>
                            <span className="flex items-center mx-6">💰 Plaćanje pouzećem</span>
                        </div>
                        <div className="flex px-6">
                            <span className="flex items-center mx-6"><Truck size={18} className="mr-2" /> Besplatna dostava za Mega Paket</span>
                            <span className="flex items-center mx-6"><ShieldCheck size={18} className="mr-2" /> 100% Garancija zadovoljstva</span>
                            <span className="flex items-center mx-6">🇷🇸 Dostava u celoj Srbiji</span>
                            <span className="flex items-center mx-6">💰 Plaćanje pouzećem</span>
                        </div>
                    </div>
                </div>

                <Features />
                <DemoSection />
                <Comparison />

                <section id="order" className="py-20 relative overflow-hidden bg-gray-900">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8 reveal">
                                <div>
                                    <div className="inline-block bg-red-600 text-white font-bold px-4 py-1 rounded-full text-sm mb-4 animate-pulse uppercase tracking-wider">
                                        🔥 Ograničena ponuda
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 font-display">
                                        Naručite odmah i{' '}
                                        <span className="text-red-500">uštedite!</span>
                                    </h2>
                                    <p className="text-lg text-gray-300 leading-relaxed">
                                        Iskoristite priliku dok traju zalihe. Scratch Repair je dostupan po akcijskoj ceni samo još kratko vreme.
                                    </p>
                                </div>

                                <ul className="space-y-4 text-gray-200">
                                    <li className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
                                        <div className="p-3 bg-green-500 bg-opacity-20 rounded-full text-green-400 shrink-0"><ShieldCheck size={24} /></div>
                                        <div>
                                            <span className="font-bold block text-white text-lg">Sigurna kupovina</span>
                                            <span className="text-sm text-gray-400">Plaćanje prilikom preuzimanja, bez rizika.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
                                        <div className="p-3 bg-blue-500 bg-opacity-20 rounded-full text-blue-400 shrink-0"><Truck size={24} /></div>
                                        <div>
                                            <span className="font-bold block text-white text-lg">Ekspresna dostava</span>
                                            <span className="text-sm text-gray-400">Na vašim vratima za 1-2 dana.</span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                                    <p className="text-gray-300 text-sm mb-2">Preostalo na stanju:</p>
                                    <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                                        <div className="bg-red-600 w-1/12 h-full animate-pulse"></div>
                                    </div>
                                    <p className="text-red-500 font-bold text-sm mt-2 flex items-center gap-2">
                                        <CheckCircle2 size={14} />
                                        SAMO JOŠ 14 KOMADA PO OVOJ CENI
                                    </p>
                                </div>
                            </div>

                            <div className="relative reveal">
                                <OrderForm onOrderSuccess={handleOrderSuccess} />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="reviews" className="py-24 bg-gray-950 border-t border-gray-900 relative">
                    <div className="container mx-auto px-4 text-center mb-12 reveal">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">Iskustva kupaca</h2>
                        <div className="inline-flex items-center bg-gray-900 px-4 py-2 rounded-full text-yellow-500 text-sm font-bold border border-gray-800">
                            <Star size={14} fill="currentColor" className="mr-1" />
                            <Star size={14} fill="currentColor" className="mr-1" />
                            <Star size={14} fill="currentColor" className="mr-1" />
                            <Star size={14} fill="currentColor" className="mr-1" />
                            <Star size={14} fill="currentColor" className="mr-1" />
                            <span className="text-gray-300 ml-2">4.9/5 Prosečna ocena</span>
                        </div>
                    </div>
                    <Testimonials />
                </section>
            </main>

            <Footer />

            {/* SUCCESS MODAL */}
            {orderPlaced && (
                <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm" onClick={() => setOrderPlaced(false)}></div>
                    <div className="bg-white text-gray-900 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl relative animate-bounce-in">
                        <div className="absolute top-0 left-0 w-full h-2 bg-red-600 rounded-t-3xl"></div>

                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck size={48} />
                        </div>

                        <h3 className="text-2xl font-bold mb-2 text-gray-900 font-display">Hvala na poverenju!</h3>

                        <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                            <p className="text-gray-700 font-semibold">Vaša narudžbina je primljena.</p>
                            <p className="text-gray-500 text-sm mt-1">Kontaktiraćemo vas uskoro telefonom radi potvrde adrese.</p>
                        </div>

                        <button
                            onClick={() => setOrderPlaced(false)}
                            className="w-full py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition shadow-lg active:scale-95"
                        >
                            U REDU
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
