
import React, { useState } from 'react';
import { Leaf, Info, Loader2 } from 'lucide-react';
import { explainIngredient } from '../services/geminiService';

interface IngredientSpotlightProps {
    ingredients: string[];
}

export const IngredientSpotlight: React.FC<IngredientSpotlightProps> = ({ ingredients }) => {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleIngredientClick = async (ing: string) => {
    if (selectedIngredient === ing) return;
    
    setSelectedIngredient(ing);
    setLoading(true);
    const text = await explainIngredient(ing);
    setExplanation(text);
    setLoading(false);
  };

  return (
    <div id="ingredients" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase">Čista Formulacija</h2>
          <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">
            Moćni Prirodni Sastojci
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Klikni na bilo koji sastojak da pitaš našeg AI stručnjaka kako on pomaže.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-brand-50 rounded-2xl p-8 shadow-inner">
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <button
                  key={ing}
                  onClick={() => handleIngredientClick(ing)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedIngredient === ing
                      ? 'bg-brand-600 text-white shadow-md transform scale-105'
                      : 'bg-white text-brand-800 border border-brand-200 hover:border-brand-400'
                  }`}
                >
                  {ing}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg min-h-[200px] flex flex-col justify-center relative overflow-hidden">
             <Leaf className="absolute -bottom-10 -right-10 w-48 h-48 text-brand-50 opacity-50" />
             
            {!selectedIngredient ? (
              <div className="text-center text-gray-400 z-10">
                <Info className="w-12 h-12 mx-auto mb-4 text-brand-200" />
                <p>Izaberi sastojak da saznaš više o njegovim lekovitim svojstvima.</p>
              </div>
            ) : (
              <div className="z-10 animate-in fade-in duration-500">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedIngredient}</h3>
                {loading ? (
                  <div className="flex items-center text-brand-600">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    <span className="text-sm">Konsultujem bazu znanja...</span>
                  </div>
                ) : (
                  <p className="text-lg text-gray-700 leading-relaxed font-serif italic">
                    "{explanation}"
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
