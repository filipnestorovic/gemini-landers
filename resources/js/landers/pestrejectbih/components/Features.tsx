import React from 'react';
import { XCircle, CheckCircle, AlertOctagon } from 'lucide-react';
import { IMAGES } from '../constants';

const Features: React.FC = () => {
    return (
        <div className="py-12 bg-white">
            {/* Urgency Section with Pest Images */}
            <div className="bg-red-50 py-12 mb-12 border-y border-red-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-brand-alert flex items-center justify-center">
                            <AlertOctagon className="mr-2" />
                            DA LI JE I VAŠ DOM META?
                        </h2>
                        <p className="mt-2 text-gray-600">Glodari i insekti nisu samo neprijatni - oni prenose bolesti i uništavaju instalacije.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:gap-8">
                        <div className="relative group overflow-hidden rounded-xl shadow-md">
                            <img src={IMAGES.PEST_RAT} alt="Miševi i pacovi" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <span className="text-white font-bold text-xl uppercase tracking-wider border-2 border-white px-4 py-1">Miševi</span>
                            </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-xl shadow-md">
                            <img src={IMAGES.PEST_BUG} alt="Insekti i bubašvabe" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <span className="text-white font-bold text-xl uppercase tracking-wider border-2 border-white px-4 py-1">Insekti</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center mb-12">
                    <h2 className="text-base text-brand-green font-bold tracking-wide uppercase">RIJEŠITE PROBLEM ZAUVIJEK</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Zašto je Pest Reject jedino pravo rješenje?
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Zaboravite na skupe deratizacije i opasne otrove. Ultrazvučni talasi stvaraju neprobojni štit.
                    </p>
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Traditional Methods - BAD */}
                        <div className="bg-white p-6 rounded-xl border-2 border-red-100 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center">
                                <span className="bg-red-100 p-2 rounded-full mr-3"><XCircle className="text-brand-red w-6 h-6" /></span>
                                Obične metode
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start text-gray-600">
                                    <XCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Opasni otrovi koji mogu povrijediti ljubimce</span>
                                </li>
                                <li className="flex items-start text-gray-600">
                                    <XCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Zamke koje ostavljaju mrtve glodare za čišćenje</span>
                                </li>
                                <li className="flex items-start text-gray-600">
                                    <XCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Skupi servisi koji se moraju ponavljati</span>
                                </li>
                                <li className="flex items-start text-gray-600">
                                    <XCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Neprijatan miris hemikalija</span>
                                </li>
                            </ul>
                        </div>

                        {/* Pest Reject - GOOD */}
                        <div className="bg-brand-lightGreen rounded-xl border-2 border-brand-green shadow-xl relative transform md:-translate-y-4 flex flex-col">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-green text-white text-sm font-bold px-6 py-1 rounded-full shadow-lg uppercase tracking-wide z-10">
                                Eko Rješenje
                            </div>

                            {/* Image added here */}
                            <div className="h-48 w-full relative">
                                <img
                                    src={IMAGES.FAMILY_SAFE}
                                    alt="Bezbjedno za porodicu"
                                    className="w-full h-full object-cover rounded-t-xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-lightGreen to-transparent opacity-30 rounded-t-xl"></div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-brand-dark mb-6 pb-2 border-b border-green-200 flex items-center">
                                    <span className="bg-white p-2 rounded-full mr-3"><CheckCircle className="text-brand-green w-6 h-6" /></span>
                                    Pest Reject Original
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start text-gray-800 font-medium">
                                        <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Potpuno bezbjedno za djecu i ljubimce</span>
                                    </li>
                                    <li className="flex items-start text-gray-800 font-medium">
                                        <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Samo otjera štetočine - nema leševa</span>
                                    </li>
                                    <li className="flex items-start text-gray-800 font-medium">
                                        <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Jednokratna kupovina - radi godinama</span>
                                    </li>
                                    <li className="flex items-start text-gray-800 font-medium">
                                        <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Bez mirisa, bez buke, bez održavanja</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
