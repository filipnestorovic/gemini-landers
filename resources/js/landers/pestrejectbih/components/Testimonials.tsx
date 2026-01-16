import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center md:max-w-xl lg:max-w-2xl md:mx-auto mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Preko 10.000 zadovoljnih kupaca
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Pogledajte šta naši korisnici kažu o Pest Reject uređaju.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((review, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-lg">
                        {review.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.city}</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;