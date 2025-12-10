
import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';

interface NavbarProps {
    onOrderClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600 sm:hidden mr-4" />
            <div className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-serif font-bold text-brand-800 tracking-tighter">
                MEDEIVA<span className="text-brand-500">.</span>
              </span>
            </div>
            
            <div className="hidden sm:ml-12 sm:flex sm:space-x-10">
              <a href="#product" className="text-gray-600 hover:text-brand-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                Serum
              </a>
              <a href="#ingredients" className="text-gray-600 hover:text-brand-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                Sastojci
              </a>
              <a href="#how-to-use" className="text-gray-600 hover:text-brand-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                Upotreba
              </a>
              <a href="#reviews" className="text-gray-600 hover:text-brand-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                Iskustva
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOrderClick}
              className="hidden sm:block bg-brand-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200 transform hover:-translate-y-0.5"
            >
                Naruči odmah
            </button>
            <button 
              className="relative p-2 rounded-full text-gray-500 hover:text-brand-600 transition-colors"
              onClick={onOrderClick}
            >
              <span className="sr-only">Korpa</span>
              <ShoppingBag className="h-7 w-7" />
              <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
