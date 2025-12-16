import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { DemoSection } from './components/DemoSection';
import { Comparison } from './components/Comparison';
import { Testimonials } from './components/Testimonials';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';
import { RecentPurchases } from './components/RecentPurchases';
import { ShieldCheck, Truck, Star, CheckCircle2, ArrowDown } from 'lucide-react';

export default function App() {
    const [orderPlaced, setOrderPlaced] = useState(false);

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden bg-slate-900">
            <Navbar />
            <RecentPurchases />

            <main className="flex-grow">
                <Hero />

                <div className="bg-brand-red py-3 overflow-hidden shadow-lg relative z-20">
                    <div className="flex justify-center items-center gap-12 animate-marquee whitespace-nowrap text-white font-bold uppercase tracking-wider text-sm md:text-base">
                        <span className="flex items-center gap-2"><Truck size={18} /> Besplatna dostava za Mega Paket</span>
                        <span className="flex items-center gap-2"><ShieldCheck size={18} /> 100% Garancija zadovoljstva</span>
                        <span className="flex items-center gap-2">🇷🇸 Dostava u celoj Srbiji</span>
                        <span className="flex items-center gap-2">💰 Plaćanje pouzećem</span>
                        <span className="flex items-center gap-2"><Truck size={18} /> Besplatna dostava za Mega Paket</span>
                    </div>
                </div>

                <Features />
                <DemoSection />
                <Comparison />

                {/* Order Section Swapped Up */}
                <section id="order" className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black z-0"></div>
                    {/* Abstract BG Shapes */}
                    <div className="absolute top-1/4 left-0 w-full h-1/2 bg-brand-red/5 skew-y-3 pointer-events-none"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        {/*
                Reverted to Grid layout as per user request.
                Previously this was working fine for the form section.
            */}
                        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8 reveal">
                                <div>
                                    <div className="inline-block bg-brand-red text-white font-bold px-4 py-1 rounded-full text-sm mb-4 animate-pulse">
                                        🔥 OGRANIČENA PONUDA
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-display text-white leading-none mb-4">
                                        Naručite odmah i{' '}
                                        {/* Inline style for gradient text visibility kept */}
                                        <span
                                            style={{
                                                backgroundImage: 'linear-gradient(to right, #DC2626, #F97316)',
                                                WebkitBackgroundClip: 'text',
                                                backgroundClip: 'text',
                                                color: 'transparent',
                                                WebkitTextFillColor: 'transparent',
                                                display: 'inline-block'
                                            }}
                                        >
                      uštedite!
                    </span>
                                    </h2>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        Iskoristite priliku dok traju zalihe. Scratch Repair je dostupan po akcijskoj ceni samo još kratko vreme.
                                    </p>
                                </div>

                                <ul className="space-y-4 text-slate-200">
                                    <li className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-brand-red/40 transition transform hover:translate-x-2 duration-300">
                                        <div className="p-3 bg-green-500/20 rounded-full text-green-400 shrink-0"><ShieldCheck size={24} /></div>
                                        <div>
                                            <span className="font-bold block text-white text-lg">Sigurna kupovina</span>
                                            <span className="text-sm text-slate-400">Plaćanje prilikom preuzimanja, bez rizika.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-brand-red/40 transition transform hover:translate-x-2 duration-300">
                                        <div className="p-3 bg-blue-500/20 rounded-full text-blue-400 shrink-0"><Truck size={24} /></div>
                                        <div>
                                            <span className="font-bold block text-white text-lg">Ekspresna dostava</span>
                                            <span className="text-sm text-slate-400">Na vašim vratima za 1-2 dana.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-brand-red/40 transition transform hover:translate-x-2 duration-300">
                                        <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-400 shrink-0"><Star size={24} /></div>
                                        <div>
                                            <span className="font-bold block text-white text-lg">Premium kvalitet</span>
                                            <span className="text-sm text-slate-400">Provereno od strane 10.000+ vozača.</span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl text-center md:text-left backdrop-blur-sm">
                                    <p className="text-slate-300 text-sm mb-2">Preostalo na stanju:</p>
                                    <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden">
                                        <div className="bg-gradient-to-r from-red-500 to-brand-red w-[15%] h-full animate-pulse"></div>
                                    </div>
                                    <p className="text-brand-red font-bold text-sm mt-2 flex items-center justify-center md:justify-start gap-2">
                                        <CheckCircle2 size={14} />
                                        SAMO JOŠ 14 KOMADA PO OVOJ CENI
                                    </p>
                                </div>
                            </div>

                            <div className="relative reveal delay-200">
                                {/* Glow effect behind form */}
                                <div className="absolute inset-0 bg-brand-red/20 blur-3xl rounded-full transform scale-90"></div>
                                <OrderForm onOrderSuccess={() => setOrderPlaced(true)} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Moved AFTER Order Section */}
                <section id="reviews" className="py-24 bg-slate-950 border-t border-slate-900 relative">
                    <div className="container mx-auto px-4 text-center mb-12 reveal">
                        <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Nedavne recenzije kupaca</h2>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full text-yellow-400 text-sm font-bold mb-6 border border-slate-800">
                            <div className="flex gap-1">
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                            </div>
                            <span className="text-slate-300 ml-2">4.9/5 Prosečna ocena</span>
                        </div>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            Pogledajte šta ljudi koji su već naručili kažu o Scratch Repair setu. Slike su autentične od naših kupaca.
                        </p>
                    </div>
                    <Testimonials />

                    <div className="text-center mt-12">
                        <a href="#order" className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-white transition">
                            Naruči i ti svoj set <ArrowDown size={18} />
                        </a>
                    </div>
                </section>

            </main>

            <Footer />

            {orderPlaced && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <div className="bg-white text-slate-900 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl animate-bounce-in relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-brand-red"></div>
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <ShieldCheck size={56} />
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-2 text-slate-800">Hvala na poverenju!</h3>
                        <div className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100">
                            <p className="text-slate-600 font-medium">Vaša narudžbina je uspešno primljena.</p>
                            <p className="text-slate-400 text-sm mt-1">Naš agent će vas uskoro kontaktirati radi potvrde.</p>
                        </div>
                        <button
                            onClick={() => setOrderPlaced(false)}
                            className="w-full py-4 bg-brand-red text-white font-bold text-lg rounded-xl hover:bg-red-700 transition shadow-lg transform hover:-translate-y-1"
                        >
                            Povratak na stranicu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
