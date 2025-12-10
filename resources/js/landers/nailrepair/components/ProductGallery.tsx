
import React, { useState } from 'react';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`relative flex-shrink-0 h-20 w-20 rounded-lg border-2 ${
              activeImage === idx ? 'border-brand-500' : 'border-transparent'
            } overflow-hidden`}
          >
            <img src={img} alt={`${productName} - prikaz ${idx + 1}`} className="h-full w-full object-cover object-center" />
          </button>
        ))}
      </div>

      <div className="w-full aspect-square relative rounded-2xl overflow-hidden bg-brand-50 shadow-sm border border-brand-100">
         <img
            src={images[activeImage]}
            alt={productName}
            className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
         />
         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-brand-700 uppercase tracking-wide">
            Originalna Formula
         </div>
      </div>
    </div>
  );
};
