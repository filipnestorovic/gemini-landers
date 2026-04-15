import { motion, AnimatePresence } from "motion/react";
import { Leaf, Droplets, Sparkles, Instagram, Facebook, Twitter, ArrowRight, Menu, X, ShoppingBag, CheckCircle2, AlertCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { products } from "./data/products";
import type { Product } from "./data/products";
import * as CONSTANTS from "./constants";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-brand-cream/80 backdrop-blur-md border-b border-zinc-200/50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Leaf className="w-6 h-6 text-brand-olive" />
                    <span className="font-serif text-2xl tracking-widest uppercase">{CONSTANTS.APP_NAME}</span>
                </div>

                <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
                    <a href="#shop" className="hover:text-brand-olive transition-colors">Prodavnica</a>
                    <a href="#philosophy" className="hover:text-brand-olive transition-colors">Filozofija</a>
                    <a href="#faq" className="hover:text-brand-olive transition-colors">FAQ</a>
                    <a href="#contact" className="hover:text-brand-olive transition-colors">Kontakt</a>
                </div>

                <div className="flex items-center gap-4">
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-brand-cream border-b border-zinc-200 p-6 flex flex-col gap-4 text-center uppercase tracking-widest text-sm"
                    >
                        <a href="#shop" onClick={() => setIsOpen(false)}>Prodavnica</a>
                        <a href="#philosophy" onClick={() => setIsOpen(false)}>Filozofija</a>
                        <a href="#faq" onClick={() => setIsOpen(false)}>FAQ</a>
                        <a href="#contact" onClick={() => setIsOpen(false)}>Kontakt</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const ProductModal = ({ product, onClose, region, hasScanDiscount }: { product: Product | null, onClose: () => void, region: 'RS' | 'BA', hasScanDiscount: boolean }) => {
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_zip: '',
        quantity: 1
    });

    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        setActiveImage(0);
        setIsOrdering(false);
    }, [product?.id]);

    if (!product) return null;

    const regionSettings = CONSTANTS.REGION_SETTINGS[region];
    const baseShippingCost = regionSettings.shippingCost;
    const currency = regionSettings.currency;

    const getBundlePrice = (qty: number, r: 'RS' | 'BA') => {
        const settings = CONSTANTS.REGION_SETTINGS[r];
        if (qty === 1) return settings.bundles[1];
        if (qty === 2) return settings.bundles[2];
        return settings.bundles[3];
    };

    const displayPrice = getBundlePrice(1, region);
    const scanDiscount = hasScanDiscount ? 0.1 : 0;
    const initialDiscountedPrice = Math.round(displayPrice * (1 - scanDiscount));

    const isFreeShipping = formData.quantity >= 3;

    // Get total price for the bundle
    const bundlePriceTotal = getBundlePrice(formData.quantity, region);
    const finalBundlePriceTotal = Math.round(bundlePriceTotal * (1 - scanDiscount));

    // Effective price per unit for display
    const discountedPrice = Math.round(finalBundlePriceTotal / formData.quantity);

    const currentShippingCost = isFreeShipping ? 0 : baseShippingCost;
    const totalPrice = finalBundlePriceTotal + currentShippingCost;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setOrderStatus('loading');

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || (window as any).csrf_token;
        const targetRoute = (window as any).orderRoute || '/order';

        const selectedBundle = {
            qty: formData.quantity,
            price: discountedPrice,
            freeShipping: isFreeShipping
        };

        const PRODUCT_SETTINGS = {
            sku: product.id,
            country: regionSettings.code
        };

        const payload = new FormData();
        payload.append('name', formData.name);
        payload.append('phone', formData.phone);
        payload.append('shipping_address', formData.shipping_address);
        payload.append('shipping_city', formData.shipping_city);
        payload.append('shipping_zip', formData.shipping_zip);
        payload.append('sku', PRODUCT_SETTINGS.sku);
        payload.append('quantity', selectedBundle.qty.toString());
        payload.append('price', selectedBundle.price.toString());
        payload.append('totalPrice', totalPrice.toString());
        payload.append('freeShipping', selectedBundle.freeShipping.toString());
        payload.append('country', PRODUCT_SETTINGS.country);
        payload.append('domain', window.location.hostname);

        try {
            const response = await fetch(targetRoute, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'Accept': 'application/json',
                },
                body: payload,
            });

            if (response.ok) {
                setOrderStatus('success');
                setTimeout(() => {
                    onClose();
                    setOrderStatus('idle');
                }, 5000);
            } else {
                setOrderStatus('error');
            }
        } catch (error) {
            console.error('Order error:', error);
            setOrderStatus('error');
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-brand-cream w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col md:flex-row"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="hidden md:flex w-full md:w-1/2 aspect-square md:h-auto relative bg-zinc-100 flex-col">
                        <div className="flex-grow relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    src={product.images[activeImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            </AnimatePresence>

                            <button
                                onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                            >
                                <ArrowRight className="w-4 h-4 rotate-180" />
                            </button>
                            <button
                                onClick={() => setActiveImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-4 bg-white/50 backdrop-blur-sm flex gap-2 justify-center overflow-x-auto">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${activeImage === i ? 'border-brand-olive scale-105' : 'border-transparent opacity-60'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 left-4 md:hidden bg-white/80 p-2 rounded-full shadow-md"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto relative">
                        <div className="flex md:hidden justify-between items-center mb-6">
                            <button
                                onClick={onClose}
                                className="bg-zinc-100 p-2 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            {!isOrdering && (
                                <button
                                    onClick={() => setIsOrdering(true)}
                                    className="bg-brand-olive text-white px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-lg shadow-brand-olive/20"
                                >
                                    {CONSTANTS.MODAL_CONTENT.orderNow}
                                </button>
                            )}
                        </div>

                        <div className="hidden md:flex justify-end mb-4">
                            <button onClick={onClose} className="hover:rotate-90 transition-transform">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {!isOrdering ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs uppercase tracking-widest text-brand-olive font-bold">{product.category}</span>
                                    {product.tag && <span className="text-[10px] bg-brand-olive/10 text-brand-olive px-2 py-0.5 rounded-full uppercase font-bold">{product.tag}</span>}
                                </div>
                                <h2 className="text-4xl font-serif mb-4">{product.name}</h2>
                                {product.size && <p className="text-sm text-zinc-400 mb-2">Pakovanje: {product.size}</p>}
                                <div className="flex items-baseline gap-3 mb-6">
                                    {hasScanDiscount ? (
                                        <>
                                            <p className="text-2xl text-brand-olive">{initialDiscountedPrice} {currency}</p>
                                            <p className="text-sm text-zinc-400 line-through">{displayPrice} {currency}</p>
                                            <span className="text-[10px] bg-brand-olive text-white px-2 py-0.5 rounded-full uppercase font-bold">{CONSTANTS.SCAN_PAGE_CONTENT.discountTag}</span>
                                        </>
                                    ) : (
                                        <p className="text-2xl text-brand-olive">{displayPrice} {currency}</p>
                                    )}
                                </div>

                                <div className="space-y-6 mb-8">
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Opis</h4>
                                        <p className="text-zinc-600 font-light leading-relaxed">{product.description}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Ključni sastojci</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {product.ingredients.map((ing, i) => (
                                                <span key={i} className="text-xs bg-zinc-100 px-3 py-1 rounded-full">{ing}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Način upotrebe</h4>
                                        <p className="text-xs text-zinc-500 italic leading-relaxed">{product.usage}</p>
                                    </div>
                                    {product.warning && (
                                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                                            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1 text-amber-800 flex items-center gap-2">
                                                <AlertCircle className="w-3 h-3" /> Upozorenje
                                            </h4>
                                            <p className="text-[10px] text-amber-700 leading-relaxed">{product.warning}</p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => setIsOrdering(true)}
                                    className="w-full bg-brand-olive text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-brand-olive/20"
                                >
                                    {CONSTANTS.MODAL_CONTENT.orderNow}
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <button
                                    onClick={() => setIsOrdering(false)}
                                    className="text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2 hover:text-brand-olive"
                                >
                                    <ArrowRight className="w-4 h-4 rotate-180" /> {CONSTANTS.MODAL_CONTENT.backToDetails}
                                </button>

                                <h3 className="text-3xl font-serif mb-8">{CONSTANTS.MODAL_CONTENT.completeOrder}</h3>

                                {orderStatus === 'success' ? (
                                    <div className="text-center py-16 px-4">
                                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                        </div>
                                        <h4 className="text-3xl font-serif mb-4">{CONSTANTS.MODAL_CONTENT.thanksTitle}</h4>
                                        <p className="text-zinc-600 mb-8 leading-relaxed">
                                            Vaša porudžbina za <strong>{product.name}</strong> je uspešno primljena.<br/>
                                            Uskoro ćemo Vas kontaktirati radi potvrde isporuke.
                                        </p>
                                        <div className="bg-zinc-50 p-6 rounded-2xl text-left mb-8 border border-zinc-100">
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-4">{CONSTANTS.MODAL_CONTENT.deliveryDetails}</p>
                                            <p className="text-sm font-medium mb-1">{formData.name}</p>
                                            <p className="text-sm text-zinc-500 mb-1">{formData.phone}</p>
                                            <p className="text-sm text-zinc-500">{formData.shipping_address}, {formData.shipping_city}</p>
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="w-full bg-brand-olive text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-zinc-800 transition-all"
                                        >
                                            {CONSTANTS.MODAL_CONTENT.close}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="mb-8">
                                            <label className="text-[10px] uppercase tracking-widest font-bold block mb-4">{CONSTANTS.MODAL_CONTENT.selectBundle}</label>
                                            <div className="grid grid-cols-1 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({...formData, quantity: 1})}
                                                    className={`p-4 rounded-2xl border text-left transition-all flex justify-between items-center ${formData.quantity === 1 ? 'border-brand-olive bg-brand-olive/5 ring-1 ring-brand-olive' : 'border-zinc-200 bg-white'}`}
                                                >
                                                    <div>
                                                        <p className="text-sm font-bold">1 Komad</p>
                                                        <p className="text-[10px] text-zinc-500">Standardna cena</p>
                                                    </div>
                                                    <p className="font-serif">{displayPrice} {currency}</p>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({...formData, quantity: 2})}
                                                    className={`p-4 rounded-2xl border text-left transition-all flex justify-between items-center ${formData.quantity === 2 ? 'border-brand-olive bg-brand-olive/5 ring-1 ring-brand-olive' : 'border-zinc-200 bg-white'}`}
                                                >
                                                    <div>
                                                        <p className="text-sm font-bold">2 Komada <span className="text-brand-olive text-[10px] ml-2">-10% POPUSTA</span></p>
                                                        <p className="text-[10px] text-zinc-500">Najbolja vrednost</p>
                                                    </div>
                                                    <p className="font-serif">{Math.round(displayPrice * 0.9 * 2)} {currency}</p>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({...formData, quantity: 3})}
                                                    className={`p-4 rounded-2xl border text-left transition-all flex justify-between items-center relative overflow-hidden ${formData.quantity >= 3 ? 'border-brand-olive bg-brand-olive/5 ring-1 ring-brand-olive' : 'border-zinc-200 bg-white'}`}
                                                >
                                                    <div className="absolute top-0 right-0 bg-brand-olive text-white text-[8px] px-3 py-1 uppercase tracking-widest font-bold rounded-bl-xl">
                                                        Besplatna dostava
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold">3 Komada <span className="text-brand-olive text-[10px] ml-2">-20% POPUSTA</span></p>
                                                        <p className="text-[10px] text-zinc-500">Maksimalna ušteda</p>
                                                    </div>
                                                    <p className="font-serif">{Math.round(displayPrice * 0.8 * 3)} {currency}</p>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] uppercase tracking-widest font-bold block mb-1">Ime i prezime</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-olive"
                                                    placeholder="Jovana Jovanović"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] uppercase tracking-widest font-bold block mb-1">Telefon</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-olive"
                                                    placeholder="06x xxx xxxx"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-bold block mb-1">Email adresa (opciono)</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={e => setFormData({...formData, email: e.target.value})}
                                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-olive"
                                                placeholder="jovana@primer.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-bold block mb-1">Adresa i broj</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.shipping_address}
                                                onChange={e => setFormData({...formData, shipping_address: e.target.value})}
                                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-olive"
                                                placeholder="Knez Mihailova 1"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] uppercase tracking-widest font-bold block mb-1">Grad</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.shipping_city}
                                                    onChange={e => setFormData({...formData, shipping_city: e.target.value})}
                                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-olive"
                                                    placeholder="Beograd"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] uppercase tracking-widest font-bold block mb-1">Poštanski broj</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.shipping_zip}
                                                    onChange={e => setFormData({...formData, shipping_zip: e.target.value})}
                                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-olive"
                                                    placeholder="11000"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 pt-4 border-t border-zinc-200">
                                            <div className="bg-zinc-100 p-4 rounded-2xl mb-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <CheckCircle2 className="w-4 h-4 text-brand-olive" />
                                                    <span className="text-[10px] uppercase tracking-widest font-bold">Informacije o dostavi</span>
                                                </div>
                                                <p className="text-[10px] text-zinc-500 leading-relaxed">
                                                    {region === 'RS'
                                                        ? `Srbija: Dostava ${CONSTANTS.REGION_SETTINGS.RS.shippingDays} kurirskom službom. ${isFreeShipping ? 'BESPLATNA DOSTAVA!' : `Cena ${CONSTANTS.REGION_SETTINGS.RS.shippingCost} ${CONSTANTS.REGION_SETTINGS.RS.currency}.`}`
                                                        : `Bosna: Dostava ${CONSTANTS.REGION_SETTINGS.BA.shippingDays} brzom poštom. ${isFreeShipping ? 'BESPLATNA DOSTAVA!' : `Cena ${CONSTANTS.REGION_SETTINGS.BA.shippingCost} ${CONSTANTS.REGION_SETTINGS.BA.currency}.`}`}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <p className="text-xs text-zinc-400 uppercase tracking-widest">Proizvod ({formData.quantity} kom)</p>
                                                <div className="text-right">
                                                    {hasScanDiscount && (
                                                        <p className="text-[10px] text-brand-olive font-bold uppercase tracking-tighter">POPUST ZA STARE KUPCE AKTIVAN</p>
                                                    )}
                                                    <p className="text-sm font-medium">{Math.round(discountedPrice * formData.quantity)} {currency}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs text-zinc-400 uppercase tracking-widest">Dostava</p>
                                                <p className={`text-sm font-medium ${isFreeShipping ? 'text-emerald-600' : ''}`}>{isFreeShipping ? 'BESPLATNO' : `${currentShippingCost} ${currency}`}</p>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
                                                <p className="text-xs uppercase tracking-widest font-bold">Ukupno</p>
                                                <p className="text-xl font-serif text-brand-olive">{totalPrice} {currency}</p>
                                            </div>
                                        </div>

                                        {orderStatus === 'error' && (
                                            <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 p-3 rounded-xl">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{CONSTANTS.MODAL_CONTENT.error}</span>
                                            </div>
                                        )}

                                        <button
                                            disabled={orderStatus === 'loading'}
                                            type="submit"
                                            className="w-full bg-brand-olive text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                                        >
                                            {orderStatus === 'loading' ? CONSTANTS.MODAL_CONTENT.processing : CONSTANTS.MODAL_CONTENT.confirmOrder}
                                        </button>

                                        <div className="grid grid-cols-3 gap-2 border-t border-zinc-100 pt-6">
                                            <div className="text-center">
                                                <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                    <CheckCircle2 className="w-4 h-4 text-brand-olive" />
                                                </div>
                                                <p className="text-[8px] uppercase tracking-widest font-bold leading-tight">Sigurna<br/>kupovina</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                    <Droplets className="w-4 h-4 text-brand-olive" />
                                                </div>
                                                <p className="text-[8px] uppercase tracking-widest font-bold leading-tight">100%<br/>Prirodno</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                    <Sparkles className="w-4 h-4 text-brand-olive" />
                                                </div>
                                                <p className="text-[8px] uppercase tracking-widest font-bold leading-tight">Brza<br/>Dostava</p>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


const TrustBar = () => {
    return (
        <div className="bg-white border-y border-zinc-100 py-6 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 md:gap-4">
                {CONSTANTS.TRUST_BAR_ITEMS.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-brand-olive" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 z-0">
                <img
                    src={CONSTANTS.HERO_CONTENT.image}
                    alt="Natural botanical background"
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/60 via-transparent to-brand-cream"></div>
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-light mb-6 leading-tight">
                        {CONSTANTS.HERO_CONTENT.title}<br />
                        <span className="italic">{CONSTANTS.HERO_CONTENT.subtitle}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {CONSTANTS.HERO_CONTENT.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#shop" className="bg-brand-olive text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg shadow-brand-olive/20 text-center">
                            {CONSTANTS.HERO_CONTENT.ctaPrimary}
                        </a>
                        <a href="#philosophy" className="border border-brand-olive text-brand-olive px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-brand-olive hover:text-white transition-all text-center">
                            {CONSTANTS.HERO_CONTENT.ctaSecondary}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ProductsSection = ({ onProductClick, region, hasScanDiscount }: { onProductClick: (p: Product) => void, region: 'RS' | 'BA', hasScanDiscount: boolean }) => {
    return (
        <section id="shop" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl md:text-5xl mb-4">{CONSTANTS.PRODUCTS_SECTION_CONTENT.title}</h2>
                    <p className="text-zinc-500 uppercase tracking-widest text-xs">{CONSTANTS.PRODUCTS_SECTION_CONTENT.subtitle}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {products.map((product, idx) => {
                    const regionSettings = CONSTANTS.REGION_SETTINGS[region];
                    const displayPrice = regionSettings.bundles[1];
                    const currency = regionSettings.currency;
                    const discountedPrice = Math.round(displayPrice * 0.9);

                    return (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer"
                            onClick={() => onProductClick(product)}
                        >
                            <div className="relative aspect-square overflow-hidden rounded-2xl mb-6">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                />
                                {product.tag && (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
                                        {product.tag}
                                    </div>
                                )}
                                {hasScanDiscount && (
                                    <div className="absolute top-4 right-4 bg-brand-olive text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-lg">
                                        {CONSTANTS.SCAN_PAGE_CONTENT.discountTag}
                                    </div>
                                )}
                            </div>
                            <h3 className="text-2xl mb-1">{product.name}</h3>
                            <div className="flex items-baseline gap-3">
                                {hasScanDiscount ? (
                                    <>
                                        <p className="text-brand-olive font-medium">{discountedPrice} {currency}</p>
                                        <p className="text-zinc-400 text-sm line-through">{displayPrice} {currency}</p>
                                    </>
                                ) : (
                                    <p className="text-zinc-500 font-light">{displayPrice} {currency}</p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

const Philosophy = () => {
    return (
        <section id="philosophy" className="bg-brand-olive text-white py-24 px-6 overflow-hidden scroll-mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="rounded-3xl overflow-hidden aspect-square"
                    >
                        <img
                            src={CONSTANTS.PHILOSOPHY_CONTENT.image}
                            alt="Close up of green leaves"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-earth/30 rounded-full blur-3xl -z-10"></div>
                </div>

                <div>
                    <h2 className="text-4xl md:text-6xl mb-8 leading-tight">{CONSTANTS.PHILOSOPHY_CONTENT.title.split(',').map((t, i) => <React.Fragment key={i}>{t}{i === 0 && <br />}</React.Fragment>)}</h2>
                    <p className="text-lg text-white/80 font-light leading-relaxed mb-12">
                        {CONSTANTS.PHILOSOPHY_CONTENT.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {CONSTANTS.PHILOSOPHY_CONTENT.features.map((f, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <f.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-xl mb-2">{f.title}</h4>
                                    <p className="text-sm text-white/60 font-light">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ComparisonSection = () => {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-4">{CONSTANTS.COMPARISON_CONTENT.title}</h2>
                <p className="text-zinc-500 uppercase tracking-widest text-xs">{CONSTANTS.COMPARISON_CONTENT.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
                    <h3 className="text-2xl font-serif mb-8 text-brand-olive flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6" /> {CONSTANTS.COMPARISON_CONTENT.medeiva.title}
                    </h3>
                    <ul className="space-y-6">
                        {CONSTANTS.COMPARISON_CONTENT.medeiva.items.map((item, i) => (
                            <li key={i} className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{item.title}</p>
                                    <p className="text-xs text-zinc-500">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200 opacity-70">
                    <h3 className="text-2xl font-serif mb-8 text-zinc-400 flex items-center gap-3">
                        <X className="w-6 h-6" /> {CONSTANTS.COMPARISON_CONTENT.standard.title}
                    </h3>
                    <ul className="space-y-6">
                        {CONSTANTS.COMPARISON_CONTENT.standard.items.map((item, i) => (
                            <li key={i} className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center shrink-0 mt-1">
                                    <X className="w-4 h-4 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-zinc-500">{item.title}</p>
                                    <p className="text-xs text-zinc-400">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const WhyMedeiva = () => {
    return (
        <section className="py-12 px-6 bg-brand-cream">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 flex flex-col justify-center">
                        <h2 className="text-4xl md:text-5xl mb-6 leading-tight">{CONSTANTS.WHY_MEDEIVA_CONTENT.title}</h2>
                        <p className="text-zinc-600 font-light leading-relaxed mb-8">
                            {CONSTANTS.WHY_MEDEIVA_CONTENT.description}
                        </p>
                    </div>
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {CONSTANTS.WHY_MEDEIVA_CONTENT.features.map((f, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-2xl bg-brand-olive/5 flex items-center justify-center text-brand-olive mb-6">
                                    <f.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-serif mb-3">{f.title}</h3>
                                <p className="text-sm text-zinc-500 font-light leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Results = () => {
    const [currentReview, setCurrentReview] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % CONSTANTS.REVIEWS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="results" className="py-24 px-6 max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-16">{CONSTANTS.RESULTS_CONTENT.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8 flex flex-col justify-center">
                    <div className="aspect-video rounded-3xl overflow-hidden bg-zinc-100 shadow-xl">
                        <img
                            src={CONSTANTS.RESULTS_CONTENT.image}
                            alt="Herbal plants"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <div className="min-h-[200px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentReview}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <blockquote className="text-2xl font-serif italic text-zinc-700">
                                    "{CONSTANTS.REVIEWS[currentReview].text}"
                                </blockquote>
                                <p className="uppercase tracking-widest text-xs font-bold text-brand-olive">— {CONSTANTS.REVIEWS[currentReview].author}</p>
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex justify-center gap-2 mt-8">
                            {CONSTANTS.REVIEWS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentReview(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${currentReview === i ? 'bg-brand-olive w-6' : 'bg-zinc-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center p-12 bg-zinc-50 rounded-3xl border border-zinc-200 shadow-inner">
                    {CONSTANTS.RESULTS_STATS.map((stat, i) => (
                        <React.Fragment key={i}>
                            <div className="text-6xl font-serif text-brand-olive mb-4">{stat.value}</div>
                            <p className="text-lg text-zinc-600 font-light mb-8">{stat.desc}</p>
                            {i < CONSTANTS.RESULTS_STATS.length - 1 && <div className="w-full h-px bg-zinc-200 mb-8"></div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-12 px-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl mb-12 text-center">{CONSTANTS.FAQ_CONTENT.title}</h2>
            <div className="space-y-4">
                {CONSTANTS.FAQS.map((faq, i) => (
                    <div key={i} className="border-b border-zinc-200 pb-4">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex justify-between items-center py-4 text-left hover:text-brand-olive transition-colors"
                        >
                            <span className="font-medium text-lg">{faq.q}</span>
                            <span className={`transform transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-zinc-600 pb-4 leading-relaxed">{faq.a}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Footer = ({ onLegalClick }: { onLegalClick: (type: string) => void }) => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 5000);
        }
    };

    return (
        <footer id="contact" className="bg-zinc-900 text-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-8">
                        <Leaf className="w-8 h-8 text-brand-olive" />
                        <span className="font-serif text-3xl tracking-widest uppercase">{CONSTANTS.APP_NAME}</span>
                    </div>
                    <p className="text-white/50 font-light max-w-md mb-8 leading-relaxed">
                        {CONSTANTS.FOOTER_CONTENT.description}
                    </p>
                    {subscribed ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-brand-olive/20 border border-brand-olive/30 p-4 rounded-2xl text-brand-olive text-sm font-medium"
                        >
                            {CONSTANTS.FOOTER_CONTENT.newsletterSuccess}
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="flex gap-4">
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={CONSTANTS.FOOTER_CONTENT.newsletterPlaceholder}
                                className="bg-white/5 border border-white/10 rounded-full px-6 py-3 flex-grow text-sm focus:outline-none focus:border-brand-olive transition-colors"
                            />
                            <button type="submit" className="bg-white text-zinc-900 px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-olive hover:text-white transition-all">
                                {CONSTANTS.FOOTER_CONTENT.newsletterButton}
                            </button>
                        </form>
                    )}
                </div>

                <div>
                    <h4 className="font-serif text-xl mb-6">{CONSTANTS.FOOTER_CONTENT.exploreTitle}</h4>
                    <ul className="space-y-4 text-white/50 text-sm font-light">
                        {CONSTANTS.NAV_LINKS.filter(link => link.href !== '#contact').map((link, i) => (
                            <li key={i}><a href={link.href} className="hover:text-white transition-colors">{link.label}</a></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-xl mb-6">{CONSTANTS.FOOTER_CONTENT.contactTitle}</h4>
                    <div className="flex gap-6 mb-8">
                        <a href={CONSTANTS.CONTACT_INFO.socials.instagram} target="_blank" rel="noreferrer">
                            <Instagram className="w-5 h-5 text-white/50 hover:text-white cursor-pointer transition-colors" />
                        </a>
                        <a href={CONSTANTS.CONTACT_INFO.socials.facebook} target="_blank" rel="noreferrer">
                            <Facebook className="w-5 h-5 text-white/50 hover:text-white cursor-pointer transition-colors" />
                        </a>
                    </div>
                    <p className="text-white/50 text-sm font-light">
                        {CONSTANTS.CONTACT_INFO.email}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/30">
                <p>© 2026 {CONSTANTS.APP_NAME} Natural Cosmetics. {CONSTANTS.FOOTER_CONTENT.copyright}</p>
                <div className="flex gap-8">
                    {CONSTANTS.FOOTER_CONTENT.legalLinks.map((link, i) => (
                        <button key={i} onClick={() => onLegalClick(link.type)} className="hover:text-white">{link.label}</button>
                    ))}
                </div>
            </div>
        </footer>
    );
};

const LegalModal = ({ isOpen, type, onClose }: { isOpen: boolean, type: string | null, onClose: () => void }) => {
    if (!isOpen || !type) return null;

    const content = CONSTANTS.LEGAL_CONTENT[type as keyof typeof CONSTANTS.LEGAL_CONTENT];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-8 md:p-12">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-serif">{content.title}</h2>
                            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="prose prose-zinc max-h-[60vh] overflow-y-auto pr-4">
                            {content.body.split('\n').map((line, i) => (
                                <p key={i} className="text-zinc-600 leading-relaxed mb-4">{line}</p>
                            ))}
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full mt-8 bg-brand-olive text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-zinc-800 transition-all"
                        >
                            Zatvori
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const ScanPage = ({ onActivate }: { onActivate: () => void }) => {
    return (
        <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-2xl text-center border border-zinc-100"
            >
                <div className="w-20 h-20 bg-brand-olive/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Sparkles className="w-10 h-10 text-brand-olive" />
                </div>
                <h1 className="text-4xl font-serif mb-6">{CONSTANTS.SCAN_PAGE_CONTENT.title}</h1>
                <p className="text-zinc-600 mb-8 leading-relaxed">
                    {CONSTANTS.SCAN_PAGE_CONTENT.description.split(CONSTANTS.SCAN_PAGE_CONTENT.discountHighlight).map((t, i) => (
                        <React.Fragment key={i}>
                            {t}
                            {i === 0 && <span className="text-brand-olive font-bold">{CONSTANTS.SCAN_PAGE_CONTENT.discountHighlight}</span>}
                        </React.Fragment>
                    ))}
                </p>
                <div className="bg-zinc-50 p-6 rounded-3xl mb-8 border border-dashed border-zinc-200">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">{CONSTANTS.SCAN_PAGE_CONTENT.activatedText}</p>
                    <p className="text-2xl font-mono text-brand-olive font-bold">{CONSTANTS.SCAN_PAGE_CONTENT.discountCode}</p>
                </div>
                <button
                    onClick={onActivate}
                    className="w-full bg-brand-olive text-white py-5 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-brand-olive/20 flex items-center justify-center gap-3"
                >
                    {CONSTANTS.SCAN_PAGE_CONTENT.cta} <ArrowRight className="w-4 h-4" />
                </button>
                <p className="mt-8 text-[10px] text-zinc-400 uppercase tracking-widest">
                    {CONSTANTS.SCAN_PAGE_CONTENT.footer}
                </p>
            </motion.div>
        </div>
    );
};

export default function App() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [region, setRegion] = useState<'RS' | 'BA'>('RS');
    const [legalType, setLegalType] = useState<string | null>(null);
    const [hasScanDiscount, setHasScanDiscount] = useState(false);
    const [isScanRoute, setIsScanRoute] = useState(false);

    useEffect(() => {
        // Check if we are on /scan route
        if (window.location.pathname.endsWith('/scan')) {
            setIsScanRoute(true);
        }

        // Check localStorage for existing discount
        const savedDiscount = localStorage.getItem('medeiva_scan_discount');
        if (savedDiscount === 'true') {
            setHasScanDiscount(true);
        }
    }, []);

    const activateDiscount = () => {
        setHasScanDiscount(true);
        localStorage.setItem('medeiva_scan_discount', 'true');
        setIsScanRoute(false);
        window.history.pushState({}, '', '/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const detectRegion = async () => {
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                if (data.country_code === 'BA') {
                    setRegion('BA');
                } else {
                    setRegion('RS');
                }
            } catch (error) {
                console.error('Region detection failed:', error);
            }
        };
        detectRegion();
    }, []);

    if (isScanRoute) {
        return <ScanPage onActivate={activateDiscount} />;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <TrustBar />
            <ProductsSection onProductClick={setSelectedProduct} region={region} hasScanDiscount={hasScanDiscount} />
            <ComparisonSection />
            <WhyMedeiva />
            <Philosophy />
            <Results />
            <FAQ />
            <Footer onLegalClick={setLegalType} />

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                region={region}
                hasScanDiscount={hasScanDiscount}
            />

            <LegalModal
                isOpen={!!legalType}
                type={legalType}
                onClose={() => setLegalType(null)}
            />

            {/* Side Region Switcher */}
            <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] flex flex-col gap-1 bg-white/80 backdrop-blur-md p-1 rounded-l-2xl shadow-2xl border-l border-y border-zinc-200">
                <button
                    onClick={() => setRegion('RS')}
                    title="Srbija (RSD)"
                    className={`w-10 h-10 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center ${region === 'RS' ? 'bg-brand-olive text-white' : 'text-zinc-400 hover:bg-zinc-100'}`}
                >
                    RS
                </button>
                <button
                    onClick={() => setRegion('BA')}
                    title="Bosna (KM)"
                    className={`w-10 h-10 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center ${region === 'BA' ? 'bg-brand-olive text-white' : 'text-zinc-400 hover:bg-zinc-100'}`}
                >
                    BA
                </button>
            </div>
        </div>
    );
}
