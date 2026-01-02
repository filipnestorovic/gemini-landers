import React from 'react';
import { Zap, Droplet, Shield, Palette } from 'lucide-react';

const featureList = [
    {
        icon: <Zap size={28} className="text-white" />,
        title: "Brza Primena",
        desc: "Nema potrebe za majstorima. Naprskajte, sačekajte 10 sekundi i prebrišite. Ogrebotina nestaje pred vašim očima."
    },
    {
        icon: <Palette size={28} className="text-white" />,
        title: "Univerzalna Formula",
        desc: "Savršeno za sve boje i vrste lakova (metalik, perla, mat). Nano-čestice se automatski prilagođavaju nijansi laka."
    },
    {
        icon: <Shield size={28} className="text-white" />,
        title: "Zaštitni Sloj",
        desc: "Stvara nevidljivi hidrofobni štit koji odbija vodu i prašinu, sprečavajući rđu i nova sitna oštećenja."
    },
    {
        icon: <Droplet size={28} className="text-white" />,
        title: "Ušteda Novca",
        desc: "Jedna bočica zamenjuje popravke vredne stotine evra. Popravite oštećenja sami za delić cene servisa."
    }
];

export const Features = () => {
    return (
        <section id="features" className="py-24 bg-[#0F172A] relative overflow-hidden">
            <div className="container relative z-10">
                <div className="text-center mb-20 reveal">
                    <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Zašto kupiti Scratch Repair?</h2>
                    <div className="w-24 h-1.5 bg-brand-red mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {featureList.map((feature, idx) => (
                        <div key={idx} className="bg-slate-800/40 p-8 rounded-[2rem] border border-slate-700/50 hover:border-brand-red/50 transition-all group reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                            <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform shadow-lg shadow-red-900/20">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-extrabold text-white mb-4 leading-tight">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
