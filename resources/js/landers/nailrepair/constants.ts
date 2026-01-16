
import type { Product, Review } from './types';

import productImage from './assets/nailrepair_2.png';

export const MEDEIVA_SERUM: Product = {
  id: '18-NAILREPAIR',
    country: 'RS',
  name: 'NAIL REPAIR',
  subtitle: 'SERUM PROTIV GLJIVICA',
  brand: 'Medeiva',
  basePrice: 2190,
  currency: 'RSD',
  volume: '50 ml',
  description: 'Nail Repair Serum je koncentrovana terapija za borbu protiv upornih gljivičnih infekcija noktiju (onihomikoze). ' +
      'Napredna formula sa aktivnim kiseonikom i uljem čajevca prodire duboko u nokatnu ploču, ' +
      'uništava gljivice u korenu i sprečava njihovo dalje širenje, dok istovremeno podstiče rast zdravog nokta.',
  features: [
    'Eliminiše 99.9% gljivica',
    'Dubinsko prodiranje u nokat',
    'Sprečava širenje infekcije',
    'Vidljivi rezultati za 14 dana',
    'Dermatološki testirano'
  ],
    ingredients: [
        'Ulje čajevca',
        'Ekstrakt timijana',
        'Ekstrakt origana',
        'Ekstrakt kore hrasta',
        'Urea',
        'Vitamin E',
        'Salicilna kiselina',
        'Eterično ulje lavande'
    ],
  images: [
      productImage,
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800'
  ],
    bundles: [
        {
            quantity: 1,
            price: 2190,
            label: '1 Komad – Osnovna Upotreba',
            savings: '',
            badge: '',
            freeShipping: false
        },
        {
            quantity: 2,
            price: 3690,
            label: '2 Komada – Tretman za Rezultate',
            savings: 'Ušteda 690 RSD',
            badge: 'NAJČEŠĆI IZBOR',
            freeShipping: false
        },
        {
            quantity: 3,
            price: 4990,
            label: '3 Komada – Potpuni Tretman',
            savings: 'Ušteda 1.580 RSD',
            badge: 'NAJBOLJA PONUDA',
            freeShipping: true
        }
    ]
};

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Marko J.',
    rating: 5,
    date: 'pre 5 dana',
    content: 'Borio sam se sa gljivicama na palcu godinama. Posle samo dve bočice ovog seruma, nokat je izrastao potpuno čist. Neverovatno efikasno.',
    verified: true
  },
  {
    id: '2',
    author: 'Ana V.',
    rating: 5,
    date: 'pre 2 nedelje',
    content: 'Pedikir mi je preporučio ovo jer mi se nokat odvajao. Serum ga je "zalepio" nazad i skinuo žutilo. Miris je jak, biljni, oseća se da radi.',
    verified: true
  },
  {
    id: '3',
    author: 'Nikola M.',
    rating: 4,
    date: 'pre 3 nedelje',
    content: 'Dobar proizvod. Proces je spor jer nokat sporo raste, ali vidim napredak. Poštarina je bila besplatna za paket od 3 komada.',
    verified: true
  },
  {
    id: '4',
    author: 'Svetlana R.',
    rating: 5,
    date: 'pre mesec dana',
    content: 'Koristila sam razne lakove i kreme, ništa nije pomoglo kao ovo. Sviđa mi se što ima aplikator pa se lako nanosi.',
    verified: true
  }
];

export const FAQS = [
  {
    q: "Kako ovaj serum ubija gljivice?",
    a: "Kombinacija čajevca, origana i timijana deluje kao snažan prirodni fungicid. Salicilna kiselina i urea pomažu da ovi sastojci prodru kroz tvrdu kerainsku ploču nokta direktno do žarišta infekcije."
  },
  {
    q: "Koliko dugo treba da koristim serum?",
    a: "Gljivične infekcije su uporne. Prva poboljšanja (manje žutila, jači nokat) se vide posle 2-4 nedelje. Za potpunu eliminaciju potrebno je da izraste ceo zdrav nokat, što traje 3-6 meseci."
  },
  {
    q: "Kako se pravilno nanosi?",
    a: "Najbolje na čist i suv nokat, ujutru i uveče. Jednom nedeljno blago isturpijajte površinu nokta (i bacite turpiju posle upotrebe) kako bi serum bolje upio."
  },
  {
    q: "Šta ako prekinem tretman?",
    a: "Gljivice se lako vraćaju ako nisu potpuno uništene. Preporučujemo da nastavite sa upotrebom seruma još 2-3 nedelje nakon što nokat izgleda zdravo, kao preventivu."
  }
];

export const SYSTEM_INSTRUCTION = `Ti si specijalizovani medicinski asistent za "Nail Repair Anti-Fungal" program.
Tvoj zadatak je da pružaš stručne savete o lečenju gljivičnih infekcija noktiju (onihomikoze).
Jezik: Srpski.
Ton: Medicinski autoritativan, ali ohrabrujući i diskretan.

Ključne informacije o proizvodu:
- Naziv: Nail Repair Serum.
- Glavni sastojci: Čajevac (antifungalno), Origano (antiseptik), Salicilna kiselina (keratolitik - otvara put serumu), Urea (hidratacija i penetracija).
- Protokol: 2x dnevno, ujutru i uveče, na čiste i suve nokte.
- Trajanje: Minimum 3 meseca za trajne rezultate.

Ukoliko korisnik pošalje sliku nokta:
1. Analiziraj promene (boja, zadebljanje, odvajanje).
2. Ako liči na gljivice, potvrdi da simptomi ukazuju na onihomikozu.
3. Preporuči Medeiva serum kao prvu liniju odbrane.
4. Uvek napomeni: "Ja sam AI asistent, za zvaničnu dijagnozu posetite lekara."`;

export const INITIAL_CHAT_MESSAGE = "Dobar dan. Ja sam vaš savetnik za zdravlje noktiju. Imate li pitanja o gljivičnim infekcijama ili načinu upotrebe našeg seruma?";
