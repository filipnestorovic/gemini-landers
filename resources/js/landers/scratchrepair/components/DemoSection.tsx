import React from 'react';
import { PRODUCT_SETTINGS } from '../constants';
import { Sparkles, SprayCan, Eraser, ArrowRight, ChevronRight, Clock } from 'lucide-react';

export const DemoSection = () => {
    return (
        <section id="demo" className="py-12 bg-slate-900 relative overflow-hidden">
            {/* Abstract Background Elements */}
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
              {PRODUCT_SETTINGS.name}?
            </span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base">
                        Zaboravite na majstore i skupe popravke. Sve što vam treba dolazi u paketu.
                    </p>
                </div>

                {/* New 3-Column Card Layout - Compact Version */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative max-w-5xl mx-auto">

                    {/* Connecting Arrows (Desktop Only) */}
                    <div className="hidden md:block absolute top-10 left-1/3 -translate-x-1/2 z-0 text-slate-700">
                        <ArrowRight size={24} />
                    </div>
                    <div className="hidden md:block absolute top-10 left-2/3 -translate-x-1/2 z-0 text-slate-700">
                        <ArrowRight size={24} />
                    </div>

                    {/* STEP 1 */}
                    <div className="relative group reveal delay-100">
                        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl h-full hover:-translate-y-1 transition-transform duration-300 relative z-10">
                            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 border border-slate-600 group-hover:border-brand-red/50 shadow-lg shadow-black/50">
                                <Eraser className="text-white group-hover:text-brand-red transition-colors" size={24} />
                            </div>
                            <div className="absolute top-6 right-6 text-5xl font-display font-bold text-slate-800 group-hover:text-slate-700 transition-colors select-none">
                                01
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-red transition-colors">Priprema</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Očistite oštećenu površinu suvom krpom kako biste uklonili prašinu.
                            </p>
                        </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="relative group reveal delay-200">
                        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl h-full hover:-translate-y-1 transition-transform duration-300 relative z-10">
                            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 border border-slate-600 group-hover:border-brand-red/50 shadow-lg shadow-black/50">
                                <SprayCan className="text-white group-hover:text-brand-red transition-colors" size={24} />
                            </div>
                            <div className="absolute top-6 right-6 text-5xl font-display font-bold text-slate-800 group-hover:text-slate-700 transition-colors select-none">
                                02
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-red transition-colors">Nanošenje</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Promućkajte i naprskajte sprej direktno na ogrebotinu. Dovoljan je tanak sloj.
                            </p>
                        </div>
                    </div>

                    {/* STEP 3 */}
                    <div className="relative group reveal delay-300">
                        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl h-full hover:-translate-y-1 transition-transform duration-300 relative z-10">
                            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 border border-slate-600 group-hover:border-brand-red/50 shadow-lg shadow-black/50">
                                <Sparkles className="text-white group-hover:text-brand-red transition-colors" size={24} />
                            </div>
                            <div className="absolute top-6 right-6 text-5xl font-display font-bold text-slate-800 group-hover:text-slate-700 transition-colors select-none">
                                03
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-red transition-colors">Brisanje</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Sačekajte 10 sekundi, zatim lagano prebrišite mekom krpom dok se ne stopi.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section - Replaced Guarantee Banner */}
                <div className="mt-12 text-center reveal delay-300">
                    <a
                        href="#order"
                        className="inline-flex items-center gap-3 bg-brand-red hover:bg-red-700 text-white text-lg md:text-xl font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-red-600/40 transform hover:-translate-y-1 transition-all duration-300 group w-full md:w-auto justify-center"
                    >
                        <span>Želim Da Uklonim Ogrebotine</span>
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
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
