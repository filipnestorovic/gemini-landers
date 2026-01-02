import React, { useEffect } from 'react';

interface MetaPixelProps {
    pixelId: string;
}

declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

export const MetaPixel: React.FC<MetaPixelProps> = ({ pixelId }) => {
    useEffect(() => {
        const cleanedId = pixelId ? pixelId.trim() : "";

        // Provera da li je ID uopšte prosleđen
        if (!cleanedId || cleanedId === "") {
            console.warn("⚠️ Meta Pixel: Pixel ID nije definisan. Praćenje je onemogućeno.");
            return;
        }

        const isPlaceholder = cleanedId.includes("YOUR_PIXEL_ID");
        if (isPlaceholder) {
            console.info("ℹ️ Meta Pixel: Stranica koristi 'placeholder' ID. Script će se učitati, ali podaci neće stizati u vaš Meta Dashboard dok ne unesete pravi ID u constants.ts.");
        }

        // Standardna Meta Pixel skripta
        (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

        // Inicijalizacija i PageView
        window.fbq('init', cleanedId);
        window.fbq('track', 'PageView');

        console.log(`✅ Meta Pixel (${cleanedId}) je uspešno inicijalizovan u zaglavlju.`);
    }, [pixelId]);

    return (
        <noscript>
            <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            />
        </noscript>
    );
};

/**
 * Pomoćna funkcija za ručno okidanje događaja (npr. Purchase)
 */
export const trackPixelEvent = (event: string, data?: any) => {
    if (window.fbq) {
        window.fbq('track', event, data);
        console.log(`📡 Pixel Event Poslat: [${event}]`, data);
    } else {
        console.warn(`❌ Pixel Event [${event}] nije poslat jer 'fbq' funkcija nije dostupna.`);
    }
};
