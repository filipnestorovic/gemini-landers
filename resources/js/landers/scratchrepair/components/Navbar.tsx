import React, { useState, useEffect } from 'react';
import { Menu, X, CarFront } from 'lucide-react';
import { PRODUCT_SETTINGS } from '../constants';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl py-3' : 'bg-slate-900/50 py-5'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-white tracking-tight">
                    <CarFront className="text-red-600" size={28} />
                    <span className="font-display uppercase">{PRODUCT_SETTINGS.storeName}</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-semibold text-slate-300">
                    <a href="#features" className="hover:text-white transition-colors">Prednosti</a>
                    <a href="#demo" className="hover:text-white transition-colors">Upotreba</a>
                    <a href="#reviews" className="hover:text-white transition-colors">Iskustva</a>
                    <a href="#order" className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-600/20 active:scale-95">
                        Naruči Odmah
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-[60px] bg-slate-900 z-[90] flex flex-col p-6 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white border-b border-slate-800 pb-4">Prednosti</a>
                    <a href="#demo" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white border-b border-slate-800 pb-4">Upotreba</a>
                    <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white border-b border-slate-800 pb-4">Iskustva</a>
                    <a href="#order" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-4 bg-red-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-red-900/40">
                        Naruči Odmah
                    </a>
                </div>
            )}
        </nav>
    );
};
