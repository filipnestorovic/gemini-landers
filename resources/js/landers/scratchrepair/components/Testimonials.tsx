import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

const reviews = [
    {
        name: "Marko Jovanović",
        city: "Beograd",
        text: "Nisam verovao dok nisam probao. Imao sam ružnu ogrebotinu na vratima od parkinga. Nestala je za 2 minuta! Svaka čast.",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=11"
    },
    {
        name: "Petar Petrović",
        city: "Novi Sad",
        text: "Dostava je bila stvarno brza, stiglo je za jedan dan. Proizvod radi tačno ono što piše. Preporuka svima koji čuvaju auto.",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=3"
    },
    {
        name: "Jelena Kovačević",
        city: "Niš",
        text: "Koristila sam na crnom autu, strah me bilo da se ne vidi razlika. Savršeno se stopilo. Odlična stvar za male pare!",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=5"
    },
    {
        name: "Miloš B.",
        city: "Kragujevac",
        text: "Kupio sam dva pakovanja, jedan meni jedan bratu. Obojica smo prezadovoljni. Hvala na brzoj isporuci.",
        rating: 4,
        image: "https://i.pravatar.cc/150?img=60"
    }
];

export const Testimonials = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reviews.map((review, idx) => (
                    <div
                        key={idx}
                        className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm hover:bg-slate-800 transition duration-300 reveal delay-100 flex flex-col h-full"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full border-2 border-brand-red object-cover"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border border-slate-800">
                                    <CheckCircle2 size={10} className="text-white" />
                                </div>
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm leading-tight">{review.name}</p>
                                <p className="text-slate-400 text-xs">{review.city}</p>
                            </div>
                        </div>

                        {/* Changed from brand-accent to yellow-500 for safety */}
                        <div className="flex gap-1 text-yellow-500 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-600" : ""} />
                            ))}
                        </div>

                        <p className="text-slate-300 text-sm italic leading-relaxed flex-grow">"{review.text}"</p>

                        <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2">
              <span className="text-green-400 text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
                <CheckCircle2 size={12} /> Proverena kupovina
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
