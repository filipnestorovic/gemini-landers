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
    if (!pixelId || pixelId === "1016213196582153") return;

    // Meta Pixel standard script
    // Fix: Removed the '!' operator from the IIFE which caused a 'void' truthiness error in TypeScript.
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

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
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
 * Utility function to track custom Pixel events
 * @param event Name of the event (e.g., 'Purchase', 'AddToCart')
 * @param data Optional data object for the event
 */
export const trackPixelEvent = (event: string, data?: any) => {
  if (window.fbq) {
    window.fbq('track', event, data);
  } else {
    console.warn('Meta Pixel (fbq) not loaded yet. Event not tracked:', event);
  }
};
