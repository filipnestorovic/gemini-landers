import React, { useState, FormEvent } from 'react';
import { Bundle } from '../types';
import { BUNDLES, PRODUCT_SETTINGS } from '../constants';
import { Lock, Truck, Shield, Check, Package, BadgeCheck, Clock, Award } from 'lucide-react';

interface OrderFormProps {
  selectedBundle: Bundle;
  onBundleChange: (id: number) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ selectedBundle, onBundleChange }) => {
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Using specific backend field names
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_zip: ''
  });

  // Logic: Free shipping if quantity is 3 or more
  const isFreeShipping = selectedBundle.quantity >= 3;
  const shippingCost = isFreeShipping ? 0 : PRODUCT_SETTINGS.shippingCost;
  const totalPrice = selectedBundle.price + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleBundleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onBundleChange(Number(e.target.value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Fetch CSRF token if it exists in meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || (window as any).csrf_token || '';
    const targetRoute = (window as any).orderRoute || '/order'; // Default or injected route

    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('phone', formState.phone);
    formData.append('shipping_address', formState.shipping_address);
    formData.append('shipping_city', formState.shipping_city);
    formData.append('shipping_zip', formState.shipping_zip);
    formData.append('sku', PRODUCT_SETTINGS.sku);
    formData.append('quantity', selectedBundle.quantity.toString());
    formData.append('price', selectedBundle.price.toString());
    formData.append('totalPrice', totalPrice.toString());
    formData.append('shippingCost', shippingCost.toString());
      formData.append('freeShipping', selectedBundle.freeShipping.toString());
      formData.append('country', PRODUCT_SETTINGS.country);

    try {
      // In a real environment, this fetches.
      // mocking success for demo if targetRoute is default
      let response;
      if (targetRoute === '/order') {
          // Simulation delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          response = { ok: true };
          console.log("Mock Order Submitted:", Object.fromEntries(formData));
      } else {
          response = await fetch(targetRoute, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
            body: formData
          });
      }

      if (!response.ok) throw new Error('Server error');

      // Track Purchase Event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Purchase', {
           value: totalPrice,
           currency: 'KM',
           content_name: selectedBundle.label,
           content_ids: [PRODUCT_SETTINGS.sku]
        });
      }

      setOrderSuccess(true);
      setFormState({
        name: '',
        phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_zip: ''
      });

    } catch (error) {
      console.error('Error:', error);
      setErrorMsg('Došlo je do greške. Molimo vas provjerite podatke ili pokušajte kasnije.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div id="order-form" className="bg-green-50 py-16 px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl text-center border border-green-100">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 animate-bounce">
                <Truck className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-extrabold text-green-800 mb-2">Hvala na narudžbi!</h3>
            <p className="text-gray-600 text-lg mb-4">Vaša narudžba je uspješno primljena.</p>
            <div className="bg-gray-50 p-4 rounded-xl inline-block border border-gray-100">
                <p className="font-bold text-gray-800">Ukupno za plaćanje: {totalPrice} KM</p>
                <p className="text-sm text-gray-500">Plaćanje pouzećem</p>
            </div>
            <button
                onClick={() => setOrderSuccess(false)}
                className="mt-6 block w-full md:w-auto mx-auto px-6 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-dark transition-colors"
            >
                Povratak na sajt
            </button>
          </div>
      </div>
    );
  }

  return (
    <div id="order-form" className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Brza i sigurna narudžba</h2>
            <p className="text-gray-500 mt-2">Popunite formu ispod. Plaćate tek kada preuzmete paket.</p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 relative">
            {/* Top Security Badge */}
            <div className="bg-gray-900 px-6 py-3 flex justify-between items-center">
                <span className="text-white text-sm font-medium flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-brand-green" /> 100% Garancija kvaliteta
                </span>
                <span className="text-gray-400 text-xs flex items-center">
                    <Lock className="w-3 h-3 mr-1" /> SSL Secure
                </span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">

                {/* Section 1: Bundle Selection (Synced with App State) */}
                <div className="space-y-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Package size={14} className="text-brand-red" /> 01. IZABRANI PAKET
                    </p>
                    <div className="bg-brand-lightGreen p-5 rounded-2xl border border-brand-green/30">
                        <label className="block text-sm font-bold text-gray-800 mb-2">Promijenite paket ako želite:</label>
                        <div className="relative">
                            <select
                                value={selectedBundle.id}
                                onChange={handleBundleChange}
                                className="block w-full text-lg border-gray-300 rounded-xl shadow-sm focus:ring-brand-green focus:border-brand-green py-3 px-4 bg-white cursor-pointer appearance-none"
                            >
                                {BUNDLES.map(b => (
                                    <option key={b.id} value={b.id}>
                                        {b.label} - {b.price} KM {b.isPopular ? '(Najprodavanije)' : ''}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <Check className="h-5 w-5 text-brand-green" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between p-3 bg-white/60 rounded-lg">
                            <div>
                                <span className="block text-xs text-gray-500">Uključeno:</span>
                                <span className="font-medium text-gray-900">{selectedBundle.quantity}x Pest Reject Uređaj</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs text-gray-500">Cijena paketa:</span>
                                <span className="text-xl font-black text-brand-red">{selectedBundle.price} KM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Customer Info */}
                <div className="space-y-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <BadgeCheck size={14} className="text-brand-red" /> 02. PODACI ZA DOSTAVU
                    </p>

                    {errorMsg && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center animate-pulse">
                            <span className="mr-2">⚠️</span> {errorMsg}
                        </div>
                    )}

                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-base transition-all focus:ring-2 focus:ring-brand-green focus:ring-opacity-20 focus:border-brand-green"
                            placeholder="Ime i prezime"
                        />

                        <input
                            type="tel"
                            name="phone"
                            required
                            pattern="^((\+387)|(00387)|(0))[0-9]{8,9}$"
                            title="Unesite validan broj telefona (npr. 061123456 ili +38761...)"
                            value={formState.phone}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-base transition-all focus:ring-2 focus:ring-brand-green focus:ring-opacity-20 focus:border-brand-green"
                            placeholder="Broj telefona (npr. 061123456)"
                        />

                        <input
                            type="text"
                            name="shipping_address"
                            required
                            value={formState.shipping_address}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-base transition-all focus:ring-2 focus:ring-brand-green focus:ring-opacity-20 focus:border-brand-green"
                            placeholder="Ulica i kućni broj"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="shipping_city"
                                required
                                value={formState.shipping_city}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-base transition-all focus:ring-2 focus:ring-brand-green focus:ring-opacity-20 focus:border-brand-green"
                                placeholder="Grad/Mjesto"
                            />
                            <input
                                type="text"
                                name="shipping_zip"
                                required
                                value={formState.shipping_zip}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-base transition-all focus:ring-2 focus:ring-brand-green focus:ring-opacity-20 focus:border-brand-green"
                                placeholder="Poštanski broj"
                            />
                        </div>
                    </div>
                </div>

                {/* Totals & Submit */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mt-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Cijena paketa:</span>
                        <span>{selectedBundle.price} KM</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                        <span>Dostava:</span>
                        <span className={shippingCost === 0 ? "text-green-600 font-bold" : ""}>
                            {shippingCost === 0 ? 'BESPLATNA' : `${shippingCost} KM`}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-bold text-gray-900 uppercase text-xs tracking-wider">Ukupno za plaćanje:</span>
                        <span className="text-3xl font-black text-brand-red">{totalPrice} KM</span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 bg-brand-red text-white text-xl font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 transform
                            ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-alert hover:-translate-y-1 active:scale-95'}`}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Truck size={24} />
                                POTVRDI NARUDŽBU
                            </>
                        )}
                    </button>

                    {/* Conversion Boosters below button */}
                    <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-center gap-2 text-gray-600">
                            <Clock className="w-5 h-5 text-brand-green" />
                            <span className="text-xs font-bold uppercase tracking-tight">Dostava 1-2 radna dana</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-gray-600">
                            <Award className="w-5 h-5 text-brand-green" />
                            <span className="text-xs font-bold uppercase tracking-tight">Garancija 2 godine</span>
                        </div>
                        <div className="col-span-2 flex items-center justify-center gap-2 text-gray-400 mt-2">
                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest"><Lock size={10} /> Sigurna kupovina</span>
                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest border-l border-gray-300 pl-2"><Shield size={10} /> Garancija kvaliteta</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
