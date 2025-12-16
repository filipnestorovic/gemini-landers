import React from 'react';
import { Check, X } from 'lucide-react';
import { BUNDLES, PRODUCT_SETTINGS } from '../constants';

export const Comparison = () => {
    const basePrice = BUNDLES[0].price;

    return (
        <section className="py-20 bg-slate-800 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
                        Zašto{' '}
                        {/* FIX: Inline style for gradient text visibility */}
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
              {PRODUCT_SETTINGS.name}
            </span>
                        ?
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Poređenje sa tradicionalnim metodama popravke. Pametan izbor štedi vaš novac.
                    </p>
                </div>

                <div className="overflow-x-auto reveal delay-100">
                    <div className="min-w-[600px] max-w-4xl mx-auto bg-slate-900/50 rounded-2xl border border-slate-700 p-2 md:p-6 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr>
                                <th className="p-4 text-slate-400 font-normal border-b border-slate-700">Karakteristike</th>
                                <th className="p-4 text-white font-bold text-lg border-b border-slate-700 bg-slate-800/50 rounded-t-xl text-center w-1/3">
                                    <div className="text-brand-red mb-1">{PRODUCT_SETTINGS.name}</div>
                                    <span className="text-xs font-normal text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">PREPORUKA</span>
                                </th>
                                <th className="p-4 text-slate-300 font-semibold border-b border-slate-700 text-center w-1/4">Profesionalno Lakiranje</th>
                                <th className="p-4 text-slate-300 font-semibold border-b border-slate-700 text-center w-1/4">Jeftine Olovke</th>
                            </tr>
                            </thead>
                            <tbody className="text-sm md:text-base">
                            <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                                <td className="p-4 text-slate-300 font-medium">Cena</td>
                                <td className="p-4 text-center bg-slate-800/30 font-bold text-green-400">{basePrice} {PRODUCT_SETTINGS.currency}</td>
                                <td className="p-4 text-center text-red-400">15.000+ {PRODUCT_SETTINGS.currency}</td>
                                <td className="p-4 text-center text-green-400">500 - 800 {PRODUCT_SETTINGS.currency}</td>
                            </tr>
                            <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                                <td className="p-4 text-slate-300 font-medium">Vreme Popravke</td>
                                <td className="p-4 text-center bg-slate-800/30 font-bold text-white">2 minuta</td>
                                <td className="p-4 text-center text-slate-400">3-5 dana</td>
                                <td className="p-4 text-center text-slate-400">2 minuta</td>
                            </tr>
                            <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                                <td className="p-4 text-slate-300 font-medium">Kvalitet Rezultata</td>
                                <td className="p-4 text-center bg-slate-800/30">
                                    <div className="flex justify-center text-yellow-400"><Check size={24} /></div>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex justify-center text-yellow-400"><Check size={24} /></div>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex justify-center text-red-500"><X size={24} /></div>
                                </td>
                            </tr>
                            <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                                <td className="p-4 text-slate-300 font-medium">Trajnost</td>
                                <td className="p-4 text-center bg-slate-800/30 text-white">Dugotrajno (Nano sloj)</td>
                                <td className="p-4 text-center text-slate-400">Trajno</td>
                                <td className="p-4 text-center text-red-400">Ispira se kišom</td>
                            </tr>
                            <tr className="hover:bg-slate-800/30 transition">
                                <td className="p-4 text-slate-300 font-medium">Jednostavnost</td>
                                <td className="p-4 text-center bg-slate-800/30 text-white rounded-b-xl">Uradi sam (Lako)</td>
                                <td className="p-4 text-center text-red-400">Komplikovano</td>
                                <td className="p-4 text-center text-white">Uradi sam (Lako)</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};
