import React from 'react';
import { ChevronRight, Clock, Award, CheckCircle2 } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background with safe class */}
            <div
                className="absolute inset-0 z-0 parallax-safe opacity-40"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')`,
                    backgroundPosition: 'center 30%',
                }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900 z-[1]"></div>

            <div className="container mx-auto px-4 relative z-10 pt-24 pb-12 text-center md:text-left">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/20 border border-brand-red/40 rounded-full text-brand-red text-sm font-bold mb-6">
                        <Award size={16} />
                        <span>BROJ 1 SPREJ ZA OGREBOTINE U SRBIJI</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-display text-white leading-tight mb-6 tracking-tight">
                        Uklonite ogrebotine <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500 inline-block">
              U NEKOLIKO SEKUNDI
            </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                        Zaboravite na skupe lakirere i paste. Scratch Repair je <strong>revolucionarni nano-sprej</strong> koji briše ogrebotine jednim potezom.
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
                        <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 backdrop-blur-sm">
                            <div className="flex -space-x-2">
                                <div className="w-4 h-4 rounded-full bg-white border border-slate-600"></div>
                                <div className="w-4 h-4 rounded-full bg-black border border-slate-600"></div>
                                <div className="w-4 h-4 rounded-full bg-red-600 border border-slate-600"></div>
                                <div className="w-4 h-4 rounded-full bg-blue-600 border border-slate-600"></div>
                            </div>
                            <span className="text-white font-bold text-sm">UNIVERZALNO ZA SVE BOJE</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                            <CheckCircle2 size={18} />
                            <span>Bezbojan Sprej</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <a
                            href="#order"
                            className="w-full md:w-auto px-8 py-4 bg-brand-red text-white text-lg font-bold rounded-lg hover:bg-red-700 transition transform hover:scale-105 shadow-xl shadow-red-900/20 flex items-center justify-center gap-2"
                        >
                            Naruči Odmah <ChevronRight />
                        </a>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Clock size={18} />
                            <span>Ponuda ističe uskoro</span>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-center md:justify-start gap-8 opacity-50 grayscale contrast-125">
                        <div className="text-slate-400 font-display text-lg">TOYOTA</div>
                        <div className="text-slate-400 font-display text-lg">BMW</div>
                        <div className="text-slate-400 font-display text-lg">AUDI</div>
                        <div className="text-slate-400 font-display text-lg">VW</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
