import React, { useState, FormEvent } from 'react';
import { Shield, Truck, Star, Lock, BadgeCheck, Package } from 'lucide-react';
import { BUNDLES, PRODUCT_SETTINGS } from '../constants';

interface OrderFormProps {
    onOrderSuccess: (totalPrice: number) => void;
}

// Declaration for global window object logic
declare global {
    interface Window {
        orderRoute?: string;
        csrf_token?: string;
    }
}

export const OrderForm: React.FC<OrderFormProps> = ({ onOrderSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [selectedBundleId, setSelectedBundleId] = useState<number>(2); // Default to option 2

    // Form State - Updated structure with ZIP
    const [formState, setFormState] = useState({
        name: '', // Ime i prezime
        phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_zip: '' // Novo polje
    });

    const selectedBundle = BUNDLES.find(b => b.id === selectedBundleId) || BUNDLES[0];

    // Calculate totals
    const shippingCost = selectedBundle.freeShipping ? 0 : PRODUCT_SETTINGS.shippingCost;
    const totalPrice = selectedBundle.price + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();

        // User Data
        formData.append('name', formState.name);
        formData.append('phone', formState.phone);
        formData.append('shipping_address', formState.shipping_address);
        formData.append('shipping_city', formState.shipping_city);
        formData.append('shipping_zip', formState.shipping_zip); // Slanje poštanskog broja

        // Order Data
        formData.append('sku', PRODUCT_SETTINGS.sku);
        formData.append('quantity', selectedBundle.qty.toString());
        formData.append('price', selectedBundle.price.toString());
        formData.append('totalPrice', totalPrice.toString());
        formData.append('freeShipping', selectedBundle.freeShipping.toString());

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || (window as any).csrf_token;
            const targetRoute = (window as any).orderRoute || '/order';

            const headers: HeadersInit = {
                'Accept': 'application/json', // Eksplicitno tražimo JSON nazad
            };

            if (csrfToken) {
                headers['X-CSRF-TOKEN'] = csrfToken;
            }

            if ((window as any).orderRoute) {
                const response = await fetch(targetRoute, {
                    method: 'POST',
                    headers: headers,
                    body: formData,
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message || 'Došlo je do greške prilikom kreiranja porudžbine.');
                }

                // Ako je sve u redu
                onOrderSuccess(totalPrice);

            } else {
                // Fallback for demo visualization
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log("---------------- ORDER SUBMITTED ----------------");
                for (const [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                console.log("-------------------------------------------------");
                onOrderSuccess(totalPrice);
            }

        } catch (error: any) {
            console.error("Submission error", error);
            alert(error.message || "Došlo je do greške. Molimo pokušajte ponovo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 text-slate-900 shadow-2xl border-4 border-slate-800/20 relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-8 relative z-10">
                <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-green-200 animate-pulse">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> DOSTUPNO NA ZALIHAMA
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-2">
                    Brza Narudžbina
                </h3>
                <p className="text-slate-500 text-sm">Popunite formu i plaćate tek pri preuzimanju.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                {/* Bundle Selector */}
                <div className="space-y-3 mb-8">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">
                        <Package size={18} className="text-brand-red" /> Odaberite Količinu:
                    </label>

                    {BUNDLES.map((bundle) => (
                        <div
                            key={bundle.id}
                            onClick={() => setSelectedBundleId(bundle.id)}
                            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex justify-between items-center group shadow-sm
                ${selectedBundleId === bundle.id
                                ? 'border-brand-red bg-red-50 shadow-md transform scale-[1.02] z-10'
                                : 'border-slate-100 hover:border-brand-red/30 hover:bg-slate-50'}`}
                        >
                            {bundle.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                                    <Star size={10} fill="currentColor" /> Preporuka Kupaca
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                  ${selectedBundleId === bundle.id ? 'border-brand-red bg-white' : 'border-slate-300 bg-transparent'}`}>
                                    {selectedBundleId === bundle.id && <div className="w-3 h-3 rounded-full bg-brand-red" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900 text-lg">{bundle.name}</span>
                                        {bundle.id === 2 && <span className="text-[10px] bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded font-bold">BESTSELLER</span>}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5">{bundle.description}</p>
                                </div>
                            </div>

                            <div className="text-right">
                                {bundle.oldPrice && <div className="text-xs text-slate-400 line-through decoration-red-400">{bundle.oldPrice}</div>}
                                <div className="font-bold text-brand-red text-xl">{bundle.price} {PRODUCT_SETTINGS.currency}</div>
                                {bundle.freeShipping && <span className="text-[10px] font-bold text-white bg-green-500 px-2 py-0.5 rounded-full block mt-1">BESPLATNA DOSTAVA</span>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Inputs */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">

                    {/* Ime i Prezime */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 uppercase ml-1">Ime i Prezime</label>
                        <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition shadow-sm"
                            placeholder="Vaše ime i prezime"
                        />
                    </div>

                    {/* Telefon */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 uppercase ml-1">Broj Telefona</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="06X 123 4567"
                            className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition shadow-sm"
                        />
                    </div>

                    {/* Adresa */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 uppercase ml-1">Ulica i Broj</label>
                        <input
                            type="text"
                            name="shipping_address"
                            value={formState.shipping_address}
                            onChange={handleInputChange}
                            required
                            placeholder="Adresa stanovanja"
                            className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition shadow-sm"
                        />
                    </div>

                    {/* Grad i Poštanski broj */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Grad / Mesto</label>
                            <input
                                type="text"
                                name="shipping_city"
                                value={formState.shipping_city}
                                onChange={handleInputChange}
                                required
                                placeholder="Vaš grad"
                                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition shadow-sm"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Poštanski Broj</label>
                            <input
                                type="text"
                                name="shipping_zip"
                                value={formState.shipping_zip}
                                onChange={handleInputChange}
                                required
                                placeholder="npr. 11000"
                                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Order Summary Line */}
                <div className="px-2 flex justify-between items-center text-sm font-medium text-slate-600">
                    <span>Dostava:</span>
                    <span>
             {selectedBundle.freeShipping ? (
                 <span className="text-green-600 font-bold">BESPLATNA</span>
             ) : (
                 <span>+ {PRODUCT_SETTINGS.shippingCost} {PRODUCT_SETTINGS.currency}</span>
             )}
           </span>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 bg-brand-red hover:bg-red-700 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-red-600/40 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${loading ? 'opacity-75 cursor-wait' : ''}`}
                >
                    {loading ? (
                        'Obrada...'
                    ) : (
                        <>
                            <Truck size={24} />
                            NARUČI - {totalPrice} {PRODUCT_SETTINGS.currency}
                        </>
                    )}
                </button>

                <div className="text-center text-xs text-slate-400 mt-2">
                    *Plaćanje se vrši isključivo prilikom preuzimanja (Pouzećem)
                </div>

                {/* Enhanced Security Seal */}
                <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex items-center gap-1 text-slate-600 font-display text-sm">
                            <Lock size={14} /> SSL Sigurna Kupovina
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg border border-green-100">
                            <BadgeCheck className="text-green-600 mb-1" size={24} />
                            <span className="text-[10px] font-bold text-green-800 text-center leading-tight">ORIGINAL<br/>PROIZVOD</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                            <Shield className="text-blue-600 mb-1" size={24} />
                            <span className="text-[10px] font-bold text-blue-800 text-center leading-tight">100%<br/>SIGURNO</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-yellow-50 rounded-lg border border-yellow-100">
                            <Star className="text-yellow-600 mb-1" size={24} fill="currentColor" />
                            <span className="text-[10px] font-bold text-yellow-800 text-center leading-tight">PREMIJUM<br/>KVALITET</span>
                        </div>
                    </div>
                </div>

            </form>

            {/* Decorative Badge */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-red/10 rounded-full flex items-center justify-center rotate-12 pointer-events-none">
                <div className="text-brand-red font-display font-bold text-xs mt-4 mr-4">100%<br/>SAFE</div>
            </div>
        </div>
    );
};
