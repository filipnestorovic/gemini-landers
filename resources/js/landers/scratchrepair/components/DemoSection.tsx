import React from 'react';
import { PRODUCT_SETTINGS } from '../constants';
import { Sparkles, SprayCan, Eraser, ArrowRight, ChevronRight, Clock } from 'lucide-react';

export const DemoSection = () => {
    return (
        <section id="demo" className="py-12 bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl mix-blend-overlay"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10 reveal">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-slate-300 text-xs font-bold mb-4">
                        <Sparkles size={12} className="text-brand-red" />
                        <span>BRZO & JEDNOSTAVNO</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
                        Kako se koristi{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">
              {PRODUCT_SETTINGS.name}?
            </span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base">
                        Zaboravite na majstore i skupe popravke. Sve što vam treba dolazi u paketu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative max-w-5xl mx-auto">
                    <div className="hidden md:block absolute top-10 left-1/3 -translate-x-1/2 z-0 text-slate-700">
                        <ArrowRight size={24} />
                    </div>
                    <div className="hidden md:block absolute top-10 left-2/3 -translate-x-1/2 z-0 text-slate-700">
                        <ArrowRight size={24} />
                    </div>

                    {/* STEP 1 */}
                    <div className="relative group reveal">
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl h-full transition-transform duration-300 relative z-10">
                            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 border border-slate-600 group-hover:border-brand-red/50">
                                <Eraser className="text-white group-hover:text-brand-red" size={24} />
                            </div>
                            <div className="absolute top-6 right-6 text-5xl font-display font-bold text-slate-800 select-none">01</div>
                            <h3 className="text-lg font-bold text-white mb-2">Priprema</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Očistite oštećenu površinu suvom krpom kako biste uklonili prašinu.
                            </p>
                        </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="relative group reveal">
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl h-full transition-transform duration-300 relative z-10">
                            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 border border-slate-600 group-hover:border-brand-red/50">
                                <SprayCan className="text-white group-hover:text-brand-red" size={24} />
                            </div>
                            <div className="absolute top-6 right-6 text-5xl font-display font-bold text-slate-800 select-none">02</div>
                            <h3 className="text-lg font-bold text-white mb-2">Nanošenje</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Promućkajte i naprskajte sprej direktno na ogrebotinu. Dovoljan je tanak sloj.
                            </p>
                        </div>
                    </div>

                    {/* STEP 3 */}
                    <div className="relative group reveal">
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl h-full transition-transform duration-300 relative z-10">
                            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 border border-slate-600 group-hover:border-brand-red/50">
                                <Sparkles className="text-white group-hover:text-brand-red" size={24} />
                            </div>
                            <div className="absolute top-6 right-6 text-5xl font-display font-bold text-slate-800 select-none">03</div>
                            <h3 className="text-lg font-bold text-white mb-2">Brisanje</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Sačekajte 10 sekundi, zatim lagano prebrišite mekom krpom dok se ne stopi.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center reveal">
                    <a
                        href="#order"
                        className="inline-flex items-center gap-3 bg-brand-red hover:bg-red-700 text-white text-lg md:text-xl font-bold px-8 py-4 rounded-full shadow-lg transition-all w-full md:w-auto justify-center"
                    >
                        <span>Želim Da Uklonim Ogrebotine</span>
                        <ChevronRight />
                    </a>
                    <p className="mt-4 text-slate-500 text-sm flex items-center justify-center gap-2">
                        <Clock size={14} className="text-brand-red" />
                        <span>Akcijska cena važi još danas</span>
                    </p>
                </div>
            </div>
        </section>
    );
};
