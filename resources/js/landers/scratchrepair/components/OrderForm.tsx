import React, { useState, FormEvent } from 'react';
import { Shield, Truck, Lock, BadgeCheck, Package } from 'lucide-react';
import { BUNDLES, PRODUCT_SETTINGS } from '../constants';

interface OrderFormProps {
    onOrderSuccess: (totalPrice: number) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onOrderSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [selectedBundleId, setSelectedBundleId] = useState<number>(2);

    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_zip: ''
    });

    const selectedBundle = BUNDLES.find(b => b.id === selectedBundleId) || BUNDLES[0];
    const shippingCost = selectedBundle.freeShipping ? 0 : PRODUCT_SETTINGS.shippingCost;
    const totalPrice = selectedBundle.price + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || (window as any).csrf_token;
        const targetRoute = (window as any).orderRoute || '/order';

        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('phone', formState.phone);
        formData.append('shipping_address', formState.shipping_address);
        formData.append('shipping_city', formState.shipping_city);
        formData.append('shipping_zip', formState.shipping_zip);
        formData.append('sku', PRODUCT_SETTINGS.sku);
        formData.append('quantity', selectedBundle.qty.toString());
        formData.append('price', selectedBundle.price.toString());
        formData.append('totalPrice', totalPrice.toString());
        formData.append('freeShipping', selectedBundle.freeShipping.toString());

        try {
            const response = await fetch(targetRoute, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (!response.ok) throw new Error('Server error');
            onOrderSuccess(totalPrice);
        } catch (error) {
            console.error('Error:', error);
            alert('Došlo je do greške. Molimo vas proverite podatke.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 text-gray-900 shadow-2xl border border-gray-100 relative">
            <div className="text-center mb-8">
                <div className="inline-flex items-center bg-green-50 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full mb-3 border border-green-100">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> NA STANJU (Slanje danas)
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 tracking-tight">Potvrdi Narudžbinu</h3>
                <p className="text-gray-500 text-sm">Plaćanje isključivo pouzećem (kuriru na vratima).</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Paket Selection */}
                <div className="space-y-3">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Package size={14} className="text-red-600" /> 01. IZABERITE PAKET
                    </p>

                    <div className="grid gap-3">
                        {BUNDLES.map((bundle) => (
                            <label
                                key={bundle.id}
                                className={`relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all
                  ${selectedBundleId === bundle.id
                                    ? 'border-red-600 bg-red-50'
                                    : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}
                            >
                                <input
                                    type="radio" name="bundle" className="hidden"
                                    checked={selectedBundleId === bundle.id}
                                    onChange={() => setSelectedBundleId(bundle.id)}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                      ${selectedBundleId === bundle.id ? 'border-red-600 bg-red-600' : 'border-gray-300'}`}>
                      {selectedBundleId === bundle.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                                        <span className="font-bold text-gray-900 text-sm md:text-base">{bundle.name}</span>
                                        {bundle.popular && <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black uppercase">HIT</span>}
                                    </div>
                                    <p className="text-xs text-gray-500 pl-7">{bundle.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-black text-gray-900 text-lg">{bundle.price} RSD</div>
                                    {bundle.freeShipping && (
                                        <span className="text-[10px] text-green-600 font-bold uppercase">Besplatna dostava</span>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Step 2: Customer Info */}
                <div className="space-y-3">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <BadgeCheck size={14} className="text-red-600" /> 02. PODACI ZA DOSTAVU
                    </p>

                    <div className="space-y-3">
                        <input
                            type="text" name="name" placeholder="Ime i prezime" required
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-base transition-all focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 focus:border-red-600"
                            onChange={handleInputChange}
                            value={formState.name}
                        />

                        <input
                            type="tel" name="phone" placeholder="Broj telefona (npr. 064...)" required
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-base transition-all focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 focus:border-red-600"
                            onChange={handleInputChange}
                            value={formState.phone}
                        />

                        <input
                            type="text" name="shipping_address" placeholder="Ulica i kućni broj" required
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-base transition-all focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 focus:border-red-600"
                            onChange={handleInputChange}
                            value={formState.shipping_address}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text" name="shipping_city" placeholder="Grad" required
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-base transition-all focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 focus:border-red-600"
                                onChange={handleInputChange}
                                value={formState.shipping_city}
                            />
                            <input
                                type="text" name="shipping_zip" placeholder="Pošt. broj" required
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-base transition-all focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 focus:border-red-600"
                                onChange={handleInputChange}
                                value={formState.shipping_zip}
                            />
                        </div>
                    </div>
                </div>

                {/* Totals Summary */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Cena paketa:</span>
                        <span>{selectedBundle.price} RSD</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-2 pb-2 border-b border-gray-200">
                        <span>Dostava:</span>
                        <span className={shippingCost === 0 ? "text-green-600 font-bold" : ""}>
               {shippingCost === 0 ? 'BESPLATNA' : `${shippingCost} RSD`}
             </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 uppercase text-xs tracking-wider">Ukupno za plaćanje:</span>
                        <span className="text-3xl font-black text-red-600">{totalPrice} RSD</span>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 bg-red-600 text-white text-xl font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 transform
              ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700 active:scale-95'}`}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Truck size={24} />
                                NARUČITE POUZEĆEM
                            </>
                        )}
                    </button>

                    <div className="flex items-center justify-center gap-6 mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Lock size={12} /> SSL Sigurna kupovina</span>
                        <span className="flex items-center gap-1"><Shield size={12} /> Garancija kvaliteta</span>
                    </div>
                </div>
            </form>
        </div>
    );
};
