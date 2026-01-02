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

    // Onemogući skrolovanje kada je meni otvoren
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 w-full flex items-center ${
                    isScrolled ? 'glass-nav h-16 shadow-xl' : 'bg-transparent h-20'
                }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center w-full">
                    {/* Logo Section */}
                    <a href="#" className="flex items-center gap-2 group shrink-0">
                        <div className="bg-red-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-lg">
                            <CarFront className="text-white" size={20} />
                        </div>
                        <span className="font-display text-lg md:text-2xl text-white uppercase tracking-tighter">
              {PRODUCT_SETTINGS.storeName}
            </span>
                    </a>

                    {/* Desktop Navigation - Koristi .nav-desktop-menu klasu definisanu u CSS-u */}
                    <div className="nav-desktop-menu items-center gap-8">
                        <a href="#features" className="text-xs font-bold text-gray-300 hover:text-red-500 transition-colors uppercase tracking-widest">Prednosti</a>
                        <a href="#demo" className="text-xs font-bold text-gray-300 hover:text-red-500 transition-colors uppercase tracking-widest">Upotreba</a>
                        <a href="#reviews" className="text-xs font-bold text-gray-300 hover:text-red-500 transition-colors uppercase tracking-widest">Iskustva</a>
                        <a
                            href="#order"
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 btn-glow"
                        >
                            Naruči Odmah
                        </a>
                    </div>

                    {/* Mobile Menu Toggle - Koristi .nav-mobile-toggle klasu definisanu u CSS-u */}
                    <button
                        className="nav-mobile-toggle text-white p-2 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 hover:border-red-600 transition-all focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-0 z-60 bg-gray-950 bg-opacity-98 backdrop-blur-xl transition-all duration-500 ${
                    isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                style={{ top: 0 }}
            >
                <div className="flex flex-col h-full pt-24 px-6 pb-10">
                    <div className="space-y-2 flex flex-col">
                        <a
                            href="#features"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-black text-white py-4 border-b border-gray-900 flex justify-between items-center group"
                        >
                            PREDNOSTI
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-gray-600">→</div>
                        </a>
                        <a
                            href="#demo"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-black text-white py-4 border-b border-gray-900 flex justify-between items-center group"
                        >
                            UPOTREBA
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-gray-600">→</div>
                        </a>
                        <a
                            href="#reviews"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-black text-white py-4 border-b border-gray-900 flex justify-between items-center group"
                        >
                            ISKUSTVA
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-gray-600">→</div>
                        </a>
                    </div>

                    <div className="mt-auto">
                        <a
                            href="#order"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block w-full text-center py-5 bg-red-600 text-white rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform"
                        >
                            NARUČITE ODMAH
                        </a>
                        <p className="text-center text-gray-500 mt-6 text-sm font-medium">
                            Besplatna dostava za Mega Paket
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
