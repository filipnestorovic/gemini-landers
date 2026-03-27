export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    ingredients: string[];
    usage: string;
    images: string[];
    tag?: string;
    category: string;
    size?: string;
    warning?: string;
}

export const products: Product[] = [
    {
        id: "anti-tinnitus-spray",
        name: "Anti Tinnitus Sprej",
        price: 1990,
        description: "Otkrijte prirodno rešenje za miran san i tišinu koju zaslužujete. Naš Anti Tinnitus sprej je pažljivo formulisan spoj najmoćnijih biljnih ekstrakata koji ciljano deluju na neprijatno zujanje, pritisak i iritacije u ušima. Bez agresivnih hemikalija, ovaj preparat nežno čisti ušni kanal, smanjuje upalne procese i vraća vam osećaj lakoće. Idealno za sve koji traže dugotrajno olakšanje od tinitusa na potpuno prirodan način.",
        ingredients: [
            "Olea Europaea Fruit Oil (Maslinovo ulje)",
            "Calendula Officinalis Flower Extract (Neven)",
            "Lavandula Officinalis Flower Extract (Lavanda)",
            "Salvia Officinalis Flower/Leaf/Stem Extract (Žalfija)",
            "Allium Sativum Bulb Extract (Beli luk)",
            "Lavandula Officinalis Flower Oil (Eterično ulje lavande)"
        ],
        usage: "Nanesite 2-3 prskanja direktno u ušni kanal (za decu stariju od 3 godine dovoljno je jedno). Blago zatvorite uho vatom na 5 minuta kako bi aktivni sastojci delovali, a zatim isperite toplom vodom i nežno obrišite. Koristite 1-2 puta dnevno za maksimalne rezultate i dugotrajno olakšanje.",
        images: [
            "/images/medeiva/antitinnitus/tinnitusherbs.png",
            "/images/medeiva/antitinnitus/tinnitussolver.png",
            "/images/medeiva/antitinnitus/howitworks.png",
            "/images/medeiva/antitinnitus/keybenefits.png"
        ],
        tag: "Najprodavanije",
        category: "Nega ušiju",
        size: "30ml",
        warning: "Samo za spoljašnju upotrebu. Ne koristiti na oštećenoj ili inficiranoj koži. Osobe preosetljive na bilo koji sastojak moraju izbegavati upotrebu ovog preparata."
    },
    {
        id: "nail-repair-serum",
        name: "Nail Repair Serum",
        price: 1990,
        description: "Povratite zdravlje i prirodni sjaj vašim noktima uz naš intenzivni Nail Repair serum. Specijalno dizajniran za borbu protiv upornih gljivičnih infekcija i oštećenja, ovaj serum prodire duboko u strukturu nokta, pružajući mu neophodnu zaštitu i regeneraciju. Kombinacija čajevca, hrastove kore i timijana stvara neprobojan štit koji sprečava dalje širenje infekcije, dok istovremeno neguje zanoktice i jača nokatnu ploču.",
        ingredients: [
            "Quercus Robur Bark Extract (Ekstrakt hrastove kore)",
            "Thymus Vulgaris Extract (Majčina dušica)",
            "Juglans Regia Leaf Extract (List oraha)",
            "Salvia Officinalis Leaf Extract (Žalfija)",
            "Melaleuca Alternifolia Leaf Oil (Čajevac)",
            "Lavandula Hybrida Oil",
            "Thymus Vulgaris Oil"
        ],
        usage: "Za najbolje rezultate, nanesite serum dva puta dnevno (ujutru i uveče) na čiste i suve nokte. Blago utrljajte u nokatnu ploču i predeo zanoktica dok se potpuno ne upije. Redovna upotreba je ključ za zdrave, jake i lepe nokte.",
        images: [
            "/images/medeiva/nailrepair/nailrepair1.png",
            "/images/medeiva/nailrepair/nailrepair2.png",
            "/images/medeiva/nailrepair/nailrepair3.png",
        ],
        tag: "Novo",
        category: "Nega noktiju",
        size: "50ml"
    }
];
