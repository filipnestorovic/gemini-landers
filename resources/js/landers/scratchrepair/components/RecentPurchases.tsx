import React, { useState, useEffect } from 'react';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';

const recentSales = [
    { name: 'Marko J.', city: 'Beograd', product: 'Pro Paket', time: 'pre 2 min' },
    { name: 'Petar P.', city: 'Novi Sad', product: 'Start Paket', time: 'pre 5 min' },
    { name: 'Jelena K.', city: 'Niš', product: 'Mega Paket', time: 'pre 12 min' },
    { name: 'Ivan S.', city: 'Kragujevac', product: 'Pro Paket', time: 'pre 1 min' },
    { name: 'Milica B.', city: 'Subotica', product: 'Pro Paket', time: 'pre 8 min' },
    { name: 'Nikola D.', city: 'Čačak', product: 'Start Paket', time: 'pre 15 min' },
    { name: 'Ana M.', city: 'Pančevo', product: 'Mega Paket', time: 'pre 4 min' },
];

export const RecentPurchases = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [sale, setSale] = useState(recentSales[0]);

    useEffect(() => {
        const showRandomSale = () => {
            const randomSale = recentSales[Math.floor(Math.random() * recentSales.length)];
            setSale(randomSale);
            setIsVisible(true);

            // Hide after 5 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        // First show after 3 seconds
        const initialTimer = setTimeout(showRandomSale, 3000);

        // Then every 12 seconds
        const interval = setInterval(showRandomSale, 12000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 max-w-[320px] w-full animate-slide-up">
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border-l-4 border-brand-red flex items-start gap-4 relative overflow-hidden group">
                {/* Switched from custom brand-red to red-600 for gradient safety */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500 opacity-75"></div>

                <button
                    onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
                    className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 transition p-1"
                >
                    <X size={14} />
                </button>

                <div className="bg-green-50 p-3 rounded-full shrink-0 border border-green-100">
                    <ShoppingBag size={20} className="text-green-600" />
                </div>

                <div className="pr-4">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Upravo Naručeno</p>
                    <p className="text-sm font-bold text-slate-800 leading-snug">
                        {sale.name} iz {sale.city}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                        Kupio/la je <span className="text-brand-red font-bold">{sale.product}</span>
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                            <CheckCircle2 size={10} className="text-green-500" /> Verifikovano
                        </p>
                        <span className="text-[10px] text-slate-300">•</span>
                        <p className="text-[10px] text-slate-400">{sale.time}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
