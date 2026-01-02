import React from 'react';
import { ChevronRight, ShieldCheck, Zap, Sparkles, Droplets, Star } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 pt-24 md:pt-28 pb-12 md:pb-24">
            {/* Stabilna pozadinska slika vrhunskog kvaliteta */}
            <div
                className="absolute inset-0 z-0 opacity-40 scale-105"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')`,
                    backgroundPosition: 'center 60%',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            ></div>

            {/* Gradijent za maksimalni kontrast teksta */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 z-1 opacity-95"></div>

            {/* Suptilna tekstura u pozadini */}
            <div className="absolute inset-0 z-1 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

            <div className="container relative z-10 px-6">
                <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left">

                    {/* Badge - Premium Garancija */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 bg-opacity-20 border border-red-600 border-opacity-30 rounded-full text-red-500 text-[10px] md:text-sm font-bold mb-5 md:mb-8 uppercase tracking-widest reveal">
                        <Sparkles size={14} className="animate-pulse" />
                        <span>Napredna Nano-formula 2025</span>
                    </div>

                    {/* Naslov - Povećan na 5xl za mobilni */}
                    <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-5 md:mb-8 reveal delay-100 font-display uppercase tracking-tighter leading-[1.05]">
                        UKLONITE <span className="text-red-600">OGREBOTINE</span> <br className="hidden md:block" />
                        ZA 10 SEKUNDI
                    </h1>

                    {/* Opis - Lekturisan i jasan */}
                    <div className="mb-8 md:mb-12 reveal delay-200">
                        <p className="text-xl md:text-3xl text-white font-bold mb-3 md:mb-5 leading-snug">
                            Neka Vaš automobil ponovo sija kao nov
                        </p>
                        <p className="text-base md:text-xl text-gray-400 max-w-2xl leading-relaxed mx-auto md:mx-0">
                            Specijalno dizajniran sprej momentalno popunjava oštećenja na laku i stvara trajni zaštitni sloj. Rešenje koje štedi novac na skupim popravkama kod autolimara.
                        </p>
                    </div>

                    {/* Glavni Poziv na Akciju (CTA) */}
                    <div className="flex flex-col items-center md:items-start gap-8 reveal delay-400">
                        <div className="w-full sm:w-auto space-y-5">
                            <a
                                href="#order"
                                className="w-full sm:w-auto px-10 py-5 bg-red-600 text-white text-xl font-black rounded-2xl transition btn-glow flex items-center justify-center gap-4 group transform hover:scale-105 active:scale-95 shadow-2xl"
                            >
                                POGLEDAJ PONUDU <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </a>

                            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-400">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <img key={i} src={`https://i.pravatar.cc/100?img=${i+30}`} className="w-8 h-8 rounded-full border-2 border-gray-900 shadow-md" alt="Zadovoljan kupac" />
                                    ))}
                                </div>
                                <div className="text-left leading-none">
                                    <span className="text-[10px] md:text-xs font-bold text-gray-300 uppercase block mb-1">12,400+ zadovoljnih vozača</span>
                                    <div className="flex text-yellow-500 gap-0.5"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                                </div>
                            </div>
                        </div>

                        {/* Brzi bedževi poverenja - Dodata treća ikonica */}
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-3 text-gray-500 font-bold text-[9px] md:text-xs uppercase tracking-widest opacity-80">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-green-500" />
                                <span>Plaćanje pouzećem</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Droplets size={16} className="text-blue-500" />
                                <span>Sve boje laka</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap size={16} className="text-yellow-500" />
                                <span>Momentalni efekat</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
