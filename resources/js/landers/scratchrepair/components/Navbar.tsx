import React, { useState, useEffect } from 'react';
import { Menu, X, CarFront } from 'lucide-react';
import { PRODUCT_SETTINGS } from '../constants';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-2xl font-display text-white">
          <CarFront className="text-brand-red" size={32} />
          <span>{PRODUCT_SETTINGS.storeName}</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition">Prednosti</a>
          <a href="#demo" className="hover:text-white transition">Upotreba</a>
          <a href="#reviews" className="hover:text-white transition">Iskustva</a>
          <a href="#order" className="px-6 py-2 bg-brand-red text-white rounded-full hover:bg-red-700 transition font-bold shadow-lg shadow-red-600/30">
            Naruči Odmah
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-800 border-t border-slate-700 p-4 flex flex-col gap-4 shadow-xl">
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 py-2 border-b border-slate-700">Prednosti</a>
          <a href="#demo" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 py-2 border-b border-slate-700">Upotreba</a>
          <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 py-2 border-b border-slate-700">Iskustva</a>
          <a href="#order" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 bg-brand-red text-white rounded-lg font-bold">
            Naruči Odmah
          </a>
        </div>
      )}
    </nav>
  );
};