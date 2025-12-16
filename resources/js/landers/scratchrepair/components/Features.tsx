import React from 'react';
import { Zap, Droplet, Shield, Palette } from 'lucide-react';

const featureList = [
  {
    icon: <Zap size={32} className="text-brand-red" />,
    title: "Samo Naprskajte",
    desc: "Nema potrebe za trljanjem ili poliranjem. Samo naprskajte sprej na ogrebotinu i obrišite."
  },
  {
    icon: <Palette size={32} className="text-brand-red" />,
    title: "Za Sve Boje (Univerzalno)",
    desc: "Naša formula je bezbojna i prilagođava se svakoj boji i laku automobila. Sigurno za metalik i mat boje."
  },
  {
    icon: <Shield size={32} className="text-brand-red" />,
    title: "Dugotrajna Zaštita",
    desc: "Ne samo da uklanja ogrebotine, već stvara keramički sloj koji štiti od budućih oštećenja."
  },
  {
    icon: <Droplet size={32} className="text-brand-red" />,
    title: "Otporno na Vodu",
    desc: "Sjaj koji traje i nakon pranja automobila i kiše. Formula otporna na vremenske uslove."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Zašto odabrati Scratch Repair Sprej?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Koristimo najnoviju nano-tehnologiju u spreju kako bismo vam uštedeli novac i vreme.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((feature, idx) => (
            <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-brand-red/50 transition group">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 border border-slate-700">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};