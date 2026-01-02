import React from 'react';
import { Check, X } from 'lucide-react';
import { PRODUCT_SETTINGS } from '../constants';

export const Comparison = () => {
    return (
        <section className="py-20 bg-gray-800 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 bg-opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 bg-opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
                        Zašto{' '}
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
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Poređenje sa tradicionalnim metodama popravke. Pametan izbor štedi vaš novac.
                    </p>
                </div>

                <div className="overflow-x-auto reveal delay-100">
                    <div className="min-w-[600px] max-w-4xl mx-auto bg-gray-900 bg-opacity-50 rounded-2xl border border-gray-700 p-2 md:p-6 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr>
                                <th className="p-4 text-gray-400 font-normal border-b border-gray-700">Karakteristike</th>
                                <th className="p-4 text-white font-bold text-lg border-b border-gray-700 bg-gray-800 bg-opacity-50 rounded-t-xl text-center w-1/3">
                                    <div className="text-red-600 mb-1">{PRODUCT_SETTINGS.name}</div>
                                    <span className="text-xs font-normal text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full">VAŠ IZBOR</span>
                                </th>
                                <th className="p-4 text-gray-300 font-semibold border-b border-gray-700 text-center w-1/4">Lakiranje u Servisu</th>
                                <th className="p-4 text-gray-300 font-semibold border-b border-gray-700 text-center w-1/4">Jeftine Paste</th>
                            </tr>
                            </thead>
                            <tbody className="text-sm md:text-base">
                            <tr className="border-b border-gray-800 hover:bg-gray-800 hover:bg-opacity-30 transition">
                                <td className="p-4 text-gray-300 font-medium">Trošak</td>
                                <td className="p-4 text-center bg-gray-800 bg-opacity-30 font-bold text-green-400">Minimalan</td>
                                <td className="p-4 text-center text-red-400">Preko 150€</td>
                                <td className="p-4 text-center text-gray-400">Srednji</td>
                            </tr>
                            <tr className="border-b border-gray-800 hover:bg-gray-800 hover:bg-opacity-30 transition">
                                <td className="p-4 text-gray-300 font-medium">Vreme Popravke</td>
                                <td className="p-4 text-center bg-gray-800 bg-opacity-30 font-bold text-white">10 Sekundi</td>
                                <td className="p-4 text-center text-gray-400">3-5 Dana</td>
                                <td className="p-4 text-center text-gray-400">1 Sat</td>
                            </tr>
                            <tr className="border-b border-gray-800 hover:bg-gray-800 hover:bg-opacity-30 transition">
                                <td className="p-4 text-gray-300 font-medium">Kvalitet Rezultata</td>
                                <td className="p-4 text-center bg-gray-800 bg-opacity-30">
                                    <div className="flex justify-center text-yellow-400"><Check size={24} /></div>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex justify-center text-yellow-400"><Check size={24} /></div>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex justify-center text-red-500"><X size={24} /></div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-800 hover:bg-gray-800 hover:bg-opacity-30 transition">
                                <td className="p-4 text-gray-300 font-medium">Trajnost</td>
                                <td className="p-4 text-center bg-gray-800 bg-opacity-30 text-white">Trajno (Nano-sloj)</td>
                                <td className="p-4 text-center text-gray-400">Trajno</td>
                                <td className="p-4 text-center text-red-400">Kratkotrajno</td>
                            </tr>
                            <tr className="hover:bg-gray-800 hover:bg-opacity-30 transition">
                                <td className="p-4 text-gray-300 font-medium">Jednostavnost</td>
                                <td className="p-4 text-center bg-gray-800 bg-opacity-30 text-white rounded-b-xl">Ekstremno Lako</td>
                                <td className="p-4 text-center text-red-400">Potrebna oprema</td>
                                <td className="p-4 text-center text-white">Potreban alat</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};
