import React from 'react';
import { ChevronRight, Clock, Award, CheckCircle2 } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 pt-20">
            {/* Background with higher contrast overlay */}
            <div
                className="absolute inset-0 z-0 opacity-30 grayscale"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900 to-gray-900 z-1"></div>

            <div className="container relative z-10 py-12 md:py-24 text-center md:text-left">
                <div className="max-w-4xl mx-auto md:mx-0">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 bg-opacity-10 border border-red-600 border-opacity-30 rounded-full text-red-500 text-xs md:text-sm font-bold mb-6 uppercase tracking-widest reveal">
                        <Award size={16} />
                        <span>Broj 1 u Srbiji • Hiljade zadovoljnih korisnika</span>
                    </div>

                    <h1 className="text-4xl leading-tight md:text-7xl font-extrabold text-white mb-8 reveal delay-100 font-display">
                        UKLONITE <br className="hidden md:block" />
                        <span className="text-red-600">OGREBOTINE</span> <br className="hidden md:block" />
                        ZA 10 SEKUNDI
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed reveal delay-200">
                        Zaboravite na skupe servise i čekanje. Naša Nano-formula trajno uklanja ogrebotine jednim potezom krpe.
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-12 reveal delay-300">
                        <div className="flex items-center gap-2 bg-gray-800 bg-opacity-80 px-4 py-2 rounded-xl border border-gray-700 border-opacity-50">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span className="text-white font-bold text-xs uppercase tracking-tight">ZA SVE BOJE VOZILA</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-800 bg-opacity-80 px-4 py-2 rounded-xl border border-gray-700 border-opacity-50">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span className="text-white font-bold text-xs uppercase tracking-tight">TRAJNA ZAŠTITA</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 reveal delay-400">
                        <a
                            href="#order"
                            className="w-full sm:w-auto px-10 py-5 bg-red-600 text-white text-xl font-bold rounded-2xl transition btn-glow flex items-center justify-center gap-3 group"
                        >
                            NARUČI ODMAH <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                            <Clock size={20} className="text-red-600 animate-pulse" />
                            <span>Dostava 24-48h • Plaćanje pouzećem</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
