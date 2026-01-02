import React from 'react';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { PRODUCT_SETTINGS } from '../constants';

export const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-white text-2xl font-display mb-4">{PRODUCT_SETTINGS.storeName}</h4>
                        <p className="max-w-sm mb-4">
                            Vodeći distributer opreme za negu automobila u Srbiji.
                            Naša misija je da vaš automobil uvek izgleda kao nov, uz minimalan trošak.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition"><Facebook size={24} /></a>
                            <a href="#" className="hover:text-white transition"><Instagram size={24} /></a>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-4">Brzi Linkovi</h5>
                        <ul className="space-y-2">
                            <li><a href="#features" className="hover:text-red-600 transition">O Proizvodu</a></li>
                            <li><a href="#order" className="hover:text-red-600 transition">Naruči</a></li>
                            <li><a href="#" className="hover:text-red-600 transition">Uslovi kupovine</a></li>
                            <li><a href="#" className="hover:text-red-600 transition">Politika privatnosti</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-4">Kontakt</h5>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Mail size={18} className="text-red-600" />
                                <span>info@homecarshop.rs</span>
                            </li>
                            <li className="text-sm">
                                Dostupni radnim danima<br/> 09:00 - 17:00h
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {PRODUCT_SETTINGS.storeName} Srbija. Sva prava zadržana.</p>
                </div>
            </div>
        </footer>
    );
};
