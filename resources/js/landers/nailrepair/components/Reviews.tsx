
import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import type { Review } from '../types';

interface ReviewsProps {
    reviews: Review[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div id="reviews" className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm">Iskustva</h2>
          <p className="mt-2 text-3xl font-serif font-bold text-gray-900 sm:text-4xl">
            Šta kažu naši korisnici
          </p>
          <div className="flex justify-center items-center mt-4 space-x-2">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
            </div>
            <span className="text-gray-600 font-medium">4.9/5 prosečna ocena</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-2xl relative">
              <div className="flex items-center mb-4">
                 {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                 ))}
              </div>
              <p className="text-gray-700 text-sm italic mb-6 leading-relaxed">"{review.content}"</p>
              
              <div className="flex items-center justify-between mt-auto">
                 <div>
                    <p className="font-bold text-gray-900 text-sm">{review.author}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                 </div>
                 {review.verified && (
                     <div className="flex items-center text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full border border-green-100">
                         <CheckCircle2 className="w-3 h-3 mr-1" /> Kupac
                     </div>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
