import { Leaf, Droplets, Sparkles, CheckCircle2 } from "lucide-react";

export const APP_NAME = "Medeiva";

export const HERO_CONTENT = {
    title: "Prirodna formula.",
    subtitle: "Vidljivi rezultati.",
    description: "Medeiva spaja čistotu botaničkih ekstrakata sa naprednom naukom kako bi pružila ciljana rešenja za vaše zdravlje i negu.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1920",
    ctaPrimary: "Istražite kolekciju",
    ctaSecondary: "Naša priča"
};

export const PHILOSOPHY_CONTENT = {
    title: "Priroda kao lek, nauka kao dokaz.",
    description: "Verujemo da se najmoćniji sastojci nalaze u prirodi. Naša laboratorija se fokusira na tehnike ekstrakcije koje čuvaju molekularni integritet svake biljke, osiguravajući da ono što stigne do vas bude maksimalno efikasno.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800",
    features: [
        { title: "100% Organsko", desc: "Sastojci sa održivih i čistih farmi.", icon: Leaf },
        { title: "Hladno ceđeno", desc: "Čuvanje hranljivih materija kroz nežnu ekstrakciju.", icon: Droplets },
        { title: "Bezbedno", desc: "Dermatološki testirano i bez štetnih hemikalija.", icon: Sparkles },
        { title: "Tradicija", desc: "Recepture proverene generacijama.", icon: CheckCircle2 }
    ]
};

export const WHY_MEDEIVA_CONTENT = {
    title: "Zašto izabrati Medeiva proizvode?",
    description: "Naša misija je da pružimo najkvalitetniju prirodnu negu koja zaista pravi razliku. Bez kompromisa, bez veštačkih dodataka.",
    features: [
        { title: "Čista Priroda", desc: "Koristimo isključivo biljke uzgajane bez pesticida, poštujući njihove prirodne cikluse rasta.", icon: Leaf },
        { title: "Naučna Preciznost", desc: "Svaka formula je rezultat dugogodišnjeg istraživanja i laboratorijskih testiranja efikasnosti.", icon: Sparkles },
        { title: "Tradicionalna Rešenja", desc: "Oživljavamo stare recepture i prilagođavamo ih potrebama savremenog čoveka.", icon: Droplets },
        { title: "Brzi Rezultati", desc: "Visoka koncentracija aktivnih supstanci osigurava vidljive promene u kratkom roku.", icon: CheckCircle2 }
    ]
};

export const REVIEWS = [
    { text: "Nakon samo dve nedelje korišćenja Anti Tinnitus spreja, zujanje u ušima se značajno smanjilo. Konačno mogu da spavam u miru.", author: "Marko P., Zadovoljan korisnik" },
    { text: "Nail Repair serum je jedina stvar koja mi je pomogla sa upornim gljivicama na noktima. Rezultati su vidljivi već posle prve bočice.", author: "Ana M., Beograd" },
    { text: "Oduševljena sam prirodnim sastavom. Miris lavande u spreju je predivan i veoma umirujući.", author: "Jelena K., Novi Sad" }
];

export const RESULTS_STATS = [
    { value: "92%", desc: "korisnika je prijavilo smanjenje simptoma tinitusa u roku od 30 dana." },
    { value: "89%", desc: "primećuje brži oporavak i jačanje noktiju uz Nail Repair serum." }
];

export const FAQS = [
    { q: "Kako mogu da naručim proizvode?", a: "Proizvode možete naručiti direktno putem našeg sajta klikom na dugme 'Naruči odmah' kod željenog proizvoda. Potrebno je samo da unesete svoje podatke i potvrdite porudžbinu." },
    { q: "Koji su načini plaćanja?", a: "Trenutno podržavamo plaćanje pouzećem, što znači da porudžbinu plaćate kuriru prilikom preuzimanja paketa." },
    { q: "Koliko se čeka na dostavu?", a: "Dostava za Srbiju obično traje 1-2 radna dana, dok je za Bosnu i Hercegovinu rok 3-4 radna dana od trenutka potvrde porudžbine." },
    { q: "Da li vršite dostavu u druge zemlje?", a: "Trenutno vršimo dostavu samo na teritoriji Srbije i Bosne i Hercegovine. Planiramo proširenje na ostale zemlje regiona u skorijoj budućnosti." },
    { q: "Šta ako nisam zadovoljan proizvodom?", a: "Vaše zadovoljstvo je naš prioritet. Ukoliko niste zadovoljni rezultatima, imate pravo na povraćaj novca u roku od 14 dana od dana prijema, bez obzira na to da li je proizvod otvoren ili korišćen. Dovoljno je da nas kontaktirate i mi ćemo Vam refundirati sredstva." }
];

export const CONTACT_INFO = {
    email: "info@medeiva.com",
    socials: {
        instagram: "https://instagram.com/medeiva",
        facebook: "https://facebook.com/medeiva",
    }
};

export const LEGAL_CONTENT = {
    privacy: {
        title: "Politika privatnosti",
        body: `Vaša privatnost nam je izuzetno važna. Medeiva Natural Cosmetics se obavezuje da će štititi sve Vaše lične podatke koje prikupimo tokom procesa poručivanja.

1. Prikupljanje podataka: Prikupljamo samo neophodne podatke za isporuku (ime, telefon, adresa).
2. Upotreba podataka: Podaci se koriste isključivo za realizaciju Vaše porudžbine i komunikaciju u vezi sa isporukom.
3. Deljenje podataka: Vaši podaci se dele isključivo sa kurirskom službom radi dostave.
4. Sigurnost: Primenjujemo savremene mere zaštite kako bismo osigurali bezbednost Vaših informacija.`
    },
    terms: {
        title: "Uslovi korišćenja",
        body: `Dobrodošli na Medeiva.com. Korišćenjem našeg sajta prihvatate sledeće uslove:

1. Poručivanje: Porudžbina se smatra potvrđenom nakon što Vas naš operater kontaktira putem telefona.
2. Cene: Sve cene su iskazane u lokalnoj valuti (RSD ili KM) i uključuju PDV.
3. Intelektualna svojina: Sav sadržaj na sajtu je vlasništvo brenda Medeiva.
4. Odgovornost: Trudimo se da opisi proizvoda budu što precizniji, ali ne možemo garantovati da su bez grešaka.`
    },
    shipping: {
        title: "Isporuka i povraćaj",
        body: `Ponosni smo na našu efikasnu logistiku i fer politiku povraćaja.

ISPORUKA:
- Srbija: 1-2 radna dana, cena dostave 500 RSD (besplatno za 3+ proizvoda).
- Bosna i Hercegovina: 3-4 radna dana, cena dostave 13 KM (besplatno za 3+ proizvoda).
- Plaćanje se vrši isključivo pouzećem (gotovinom kuriru).

POVRAĆAJ:
- Imate pravo na povraćaj novca u roku od 14 dana od prijema.
- VAŽNO: Povraćaj prihvatamo čak i ako je proizvod otvoren i korišćen, jer verujemo u kvalitet naših formula.
- Troškove poštarine za povraćaj snosi kupac, osim u slučaju oštećenog proizvoda.`
    }
};

export const REGION_SETTINGS = {
    RS: {
        name: "Srbija",
        currency: "RSD",
        shippingCost: 500,
        shippingDays: "1-2 radna dana",
        bundles: {
            1: 1990,
            2: 3690,
            3: 4990
        }
    },
    BA: {
        name: "Bosna i Hercegovina",
        currency: "KM",
        shippingCost: 13,
        shippingDays: "3-4 radna dana",
        bundles: {
            1: 35,
            2: 59,
            3: 79
        }
    }
};

export const SCAN_PAGE_CONTENT = {
    title: "Dobrodošli nazad!",
    description: "Kao naš verni kupac, ostvarili ste pravo na 10% dodatnog popusta na Vašu narednu porudžbinu.",
    discountCode: "STARI-KUPCI-10",
    cta: "Iskoristi popust",
    footer: "Popust će biti automatski obračunat prilikom naručivanja.",
    discountTag: "-10% za stare kupce",
    discountHighlight: "10% dodatnog popusta",
    activatedText: "Vaš popust je aktiviran"
};

export const NAV_LINKS = [
    { href: "#shop", label: "Prodavnica" },
    { href: "#philosophy", label: "Filozofija" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Kontakt" }
];

export const PRODUCTS_SECTION_CONTENT = {
    title: "Naši proizvodi",
    subtitle: "Specijalizovana rešenja za Vašu negu"
};

export const RESULTS_CONTENT = {
    title: "Vidljive transformacije",
    image: "/images/medeiva/medeiva_natural.png"
};

export const FAQ_CONTENT = {
    title: "Česta pitanja"
};

export const FOOTER_CONTENT = {
    description: "Pridružite se našoj zajednici i primajte savete o zdravlju, rani pristup novim proizvodima i 15% popusta na prvu porudžbinu.",
    newsletterSuccess: "Hvala Vam! Uspešno ste se prijavili na naš newsletter.",
    newsletterPlaceholder: "Vaša email adresa",
    newsletterButton: "Pridruži se",
    exploreTitle: "Istražite",
    contactTitle: "Kontakt",
    copyright: "Sva prava zadržana.",
    legalLinks: [
        { type: "privacy", label: "Politika privatnosti" },
        { type: "terms", label: "Uslovi korišćenja" },
        { type: "shipping", label: "Isporuka i povraćaj" }
    ]
};

export const COMPARISON_CONTENT = {
    title: "Zašto Medeiva?",
    subtitle: "Razlika koju vaša koža i telo osećaju",
    medeiva: {
        title: "Medeiva rešenja",
        items: [
            { title: "100% Prirodna baza", desc: "Bez mineralnih ulja, parabena i veštačkih mirisa." },
            { title: "Hladna ekstrakcija", desc: "Čuvamo sve lekovite molekule biljaka." },
            { title: "Dugotrajni rezultati", desc: "Fokusiramo se na regeneraciju, ne samo na maskiranje simptoma." }
        ]
    },
    standard: {
        title: "Standardni proizvodi",
        items: [
            { title: "Sintetički sastojci", desc: "Često sadrže agresivne konzervanse i baze." },
            { title: "Masovna proizvodnja", desc: "Brza obrada na visokim temperaturama gubi lekovitost." },
            { title: "Trenutno olakšanje", desc: "Simptomi se često vraćaju čim prestanete sa upotrebom." }
        ]
    }
};

export const TRUST_BAR_ITEMS = [
    { title: "Plaćanje pouzećem", icon: CheckCircle2 },
    { title: "100% Prirodni sastojci", icon: Sparkles },
    { title: "Brza dostava (1-3 dana)", icon: Droplets },
    { title: "Eko-prijateljska pakovanja", icon: Leaf }
];

export const MODAL_CONTENT = {
    orderNow: "Naruči odmah",
    backToDetails: "Nazad na detalje",
    completeOrder: "Kompletirajte porudžbinu",
    thanksTitle: "Hvala Vam na poverenju!",
    deliveryDetails: "Detalji isporuke",
    close: "Zatvori",
    selectBundle: "Izaberite paket (Uštedite više)",
    confirmOrder: "Potvrdi porudžbinu",
    processing: "Obrađuje se...",
    error: "Došlo je do greške prilikom slanja porudžbine. Molimo pokušajte ponovo."
};
