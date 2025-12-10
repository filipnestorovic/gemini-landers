import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatRole } from "../types";
import type { ChatMessage } from "../types";
import { SYSTEM_INSTRUCTION as DATA_SYSTEM_INSTRUCTION } from "../constants";

const LOCAL_INGREDIENT_DESCRIPTIONS: Record<string, string> = {
    "Ulje čajevca":
        "Prirodni antimikotik – deluje direktno na gljivice, smanjuje crvenilo i iritacije oko nokta.",
    "Ekstrakt timijana":
        "Deluje antiseptički i antifungalno, pomaže u čišćenju nokta i kože oko nokta.",
    "Ekstrakt origana":
        "Sadrži snažne prirodne antimikrobne supstance koje otežavaju opstanak gljivica.",
    "Ekstrakt kore hrasta":
        "Pomaže da se smanji vlažnost i iritacija, stvarajući nepovoljne uslove za razvoj gljivica.",
    "Urea":
        "Omekšava zadebljalu nokatnu ploču i omogućava aktivnim sastojcima da prodru dublje do žarišta infekcije.",
    "Vitamin E":
        "Hrani i štiti kožu i nokat, pomaže regeneraciju i umanjuje oštećenja od dugotrajne infekcije.",
    "Salicilna kiselina":
        "Blago ljušti površinski sloj nokta, uklanja zadebljanja i omogućava bolji prodor seruma.",
    "Eterično ulje lavande":
        "Umiruje kožu, ublažava neprijatan osećaj i ostavlja prijatan miris nakon primene.",
};


// Podrazumevana system instrukcija
const DEFAULT_SYSTEM_INSTRUCTION = DATA_SYSTEM_INSTRUCTION;

// Bezbedno dobijanje AI instance
const getAIInstance = () => {
    // U Vite okruženju koristimo import.meta.env.* promenljive
    const apiKey =
        (import.meta.env.VITE_GEMINI_API_KEY as string | undefined) ||
        (import.meta.env.VITE_API_KEY as string | undefined);

    if (!apiKey || apiKey === "undefined") {
        console.warn("Gemini API Key nije pronađen (VITE_GEMINI_API_KEY / VITE_API_KEY).");
        return null;
    }

    // Novi SDK – koristimo GoogleGenerativeAI, NE GoogleGenAI
    return new GoogleGenerativeAI(apiKey);
};

export const sendMessageToGemini = async (
    history: ChatMessage[],
    newMessage: string,
    systemInstruction: string = DEFAULT_SYSTEM_INSTRUCTION,
    imageBase64?: string
): Promise<string> => {
    try {
        const ai = getAIInstance();

        if (!ai) {
            return "AI asistent trenutno nije dostupan. Molimo pokušajte kasnije.";
        }

        // Izaberi model koji želiš da koristiš
        const model = ai.getGenerativeModel({
            model: "gemini-2.0-flash", // ili "gemini-2.5-flash" ako hoćeš baš taj
            systemInstruction: {
                role: "system",
                parts: [{ text: systemInstruction || DEFAULT_SYSTEM_INSTRUCTION }],
            },
        });

        // Kontekst razgovora iz istorije
        const conversationContext = history
            .map((m) => `${m.role === ChatRole.USER ? "Korisnik" : "Medeiva AI"}: ${m.text}`)
            .join("\n");

        const fullPrompt = `Prethodni razgovor:
${conversationContext}

Trenutni upit: ${newMessage}`;

        // Sastavljamo parts za poziv – podrška za sliku + tekst
        const parts: any[] = [];

        if (imageBase64) {
            parts.push({
                inlineData: {
                    mimeType: "image/jpeg", // ili "image/png" ako tako šalješ
                    data: imageBase64.split(",")[1] || imageBase64,
                },
            });
        }

        parts.push({ text: fullPrompt });

        // Novi SDK: generateContent vraća result.response.text()
        const result = await model.generateContent(parts);
        const text = result.response.text();

        return text || "Izvinite, trenutno ne mogu da obradim vaš zahtev. Molim vas pokušajte ponovo.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Došlo je do greške u komunikaciji sa serverom.";
    }
};

// Helper za fallback opis
function getLocalIngredientDescription(name: string): string {
    return (
        LOCAL_INGREDIENT_DESCRIPTIONS[name] ||
        "Prirodni sastojak sa antifungalnim i umirujućim delovanjem na nokat i okolnu kožu."
    );
}

export const explainIngredient = async (ingredientName: string): Promise<string> => {
    try {
        const ai = getAIInstance();
        if (!ai) {
            // Nema API ključa → odmah lokalni fallback
            return getLocalIngredientDescription(ingredientName);
        }

        const model = ai.getGenerativeModel({
            model: "gemini-2.0-flash",
        });

        const prompt = `Ti si dermatolog. Napiši vrlo kratak opis (maksimum 2 rečenice) na srpskom jeziku o benefitima sastojka "${ingredientName}" konkretno za borbu protiv gljivica na noktima.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return text || getLocalIngredientDescription(ingredientName);
    } catch (e: any) {
        console.error("Gemini ingredient explain error:", e);

        const message = String(e?.message || "");
        if (message.includes("429") || message.includes("quota") || message.includes("Quota exceeded")) {
            return getLocalIngredientDescription(ingredientName);
        }

        return "Prirodni antimikotik poznat po svojim lekovitim svojstvima.";
    }
};
