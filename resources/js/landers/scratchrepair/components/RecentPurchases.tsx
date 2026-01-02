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

            // Prikazuj notifikaciju 5 sekundi
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        // Prvi prikaz nakon 6 sekundi (duplo više nego 3s)
        const initialTimer = setTimeout(showRandomSale, 6000);

        // Svaki sledeći prikaz na 24 sekunde (duplo više nego 12s)
        const interval = setInterval(showRandomSale, 24000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 animate-slide-up"
            style={{ width: 'calc(100% - 2rem)', maxWidth: '320px' }}
        >
            <div className="bg-white bg-opacity-95 p-4 rounded-xl shadow-2xl border-l-4 border-red-600 flex items-start gap-4 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 opacity-75"></div>

                <button
                    onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
                    className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition p-1"
                >
                    <X size={14} />
                </button>

                <div className="bg-green-50 p-3 rounded-full shrink-0 border border-green-100">
                    <ShoppingBag size={20} className="text-green-600" />
                </div>

                <div className="pr-4 overflow-hidden">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 truncate">Upravo Naručeno</p>
                    <p className="text-sm font-bold text-gray-800 leading-snug truncate">
                        {sale.name} iz {sale.city}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 truncate">
                        Kupio/la je <span className="text-red-600 font-bold">{sale.product}</span>
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                            <CheckCircle2 size={10} className="text-green-500" /> Verifikovano
                        </p>
                        <span className="text-[10px] text-gray-300">•</span>
                        <p className="text-[10px] text-gray-400">{sale.time}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
