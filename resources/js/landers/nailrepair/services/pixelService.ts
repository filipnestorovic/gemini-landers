
// Definicija tipova za window objekat
declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

// Prilagođeno za vašu Vite konfiguraciju gde se koristi process.env
// @ts-ignore
const PIXEL_ID = import.meta.env.VITE_PIXEL_ID;

export const initPixel = () => {
    if (!PIXEL_ID) {
        console.warn("Meta Pixel ID nije pronađen (VITE_PIXEL_ID).");
        return;
    }

    // Standardni Meta Pixel Base Code
    (function(f:any, b:any, e:any, v:any, n?:any, t?:any, s?:any){
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
    })(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
};

export const trackEvent = (event: string, data?: object) => {
    if (window.fbq) {
        window.fbq('track', event, data);
    }
};
