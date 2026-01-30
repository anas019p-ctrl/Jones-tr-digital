/**
 * AI BLOG GENERATOR - PROFESSIONAL VERSION
 * Generates rich, detailed blog posts with varied topics and professional images
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Environment variables
const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim();
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
const geminiKey = (process.env.GEMINI_API_KEY || "").trim();

console.log("🔗 Supabase URL:", supabaseUrl ? "✓" : "✗");
console.log("🔑 Supabase Key:", supabaseKey ? "✓" : "✗");
console.log("🧠 Gemini Key:", geminiKey ? "✓" : "✗");

if (!supabaseUrl || !supabaseKey || !geminiKey) {
    console.error("❌ Variabili d'ambiente mancanti!");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(geminiKey);
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
});

// Topics rotation for variety
const TOPICS = [
    {
        theme: "Automazione Aziendale con AI",
        focus: "Come le aziende italiane stanno automatizzando processi ripetitivi con l'intelligenza artificiale per risparmiare tempo e denaro",
        keywords: ["automazione", "efficienza", "risparmio tempo", "ROI", "produttività"]
    },
    {
        theme: "Sicurezza e AI",
        focus: "Come l'intelligenza artificiale sta rivoluzionando la cybersecurity e la protezione dei dati aziendali",
        keywords: ["sicurezza", "cybersecurity", "protezione dati", "minacce", "privacy"]
    },
    {
        theme: "AI Trends 2024-2025",
        focus: "Le tendenze più importanti nel mondo dell'AI che ogni imprenditore italiano deve conoscere per rimanere competitivo",
        keywords: ["trend", "futuro", "innovazione", "competitività", "mercato"]
    },
    {
        theme: "Tool AI per il Business",
        focus: "I migliori strumenti di intelligenza artificiale per aumentare la produttività aziendale e ottimizzare i processi",
        keywords: ["strumenti", "produttività", "software", "soluzioni", "efficienza"]
    },
    {
        theme: "AI nel Marketing Digitale",
        focus: "Come utilizzare l'AI per campagne marketing più efficaci, personalizzate e con ROI misurabile",
        keywords: ["marketing", "personalizzazione", "conversioni", "ROI", "campagne"]
    },
    {
        theme: "Chatbot e Assistenti Virtuali",
        focus: "Come i chatbot AI stanno trasformando il customer service, le vendite e l'assistenza clienti 24/7",
        keywords: ["chatbot", "customer service", "assistenza", "vendite", "automazione"]
    }
];

// Professional images from Unsplash
const IMAGES = {
    "Automazione Aziendale con AI": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    "Sicurezza e AI": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    "AI Trends 2024-2025": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    "Tool AI per il Business": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    "AI nel Marketing Digitale": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "Chatbot e Assistenti Virtuali": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80"
};

async function generatePost() {
    try {
        console.log("🚀 Avvio generazione articolo professionale...");

        // Select random topic
        const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        const imageUrl = IMAGES[topic.theme] || IMAGES["AI Trends 2024-2025"];

        console.log(`📝 Argomento selezionato: ${topic.theme}`);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const prompt = `
Sei un esperto copywriter SEO e consulente AI per JONES TR DIGITAL, un'agenzia digitale italiana leader nel settore dell'intelligenza artificiale e automazione.

SCRIVI UN ARTICOLO DI BLOG PROFESSIONALE E DETTAGLIATO su: "${topic.theme}"
Focus specifico: ${topic.focus}

REQUISITI OBBLIGATORI (MOLTO IMPORTANTE):
1. L'articolo DEVE essere in ITALIANO perfetto e professionale
2. Lunghezza MINIMA ASSOLUTA: 1200 parole (circa 8000-10000 caratteri)
3. Tono: professionale ma accessibile, scrivi come se parlassi a un imprenditore italiano che vuole capire come l'AI può aiutare il suo business
4. Struttura con titoli ## H2 e ### H3 in formato Markdown
5. Includi ALMENO 5 esempi pratici concreti o casi d'uso reali
6. Aggiungi statistiche, dati o percentuali quando possibile (anche realistiche se non hai dati precisi)
7. Usa elenchi puntati e numerati per migliorare la leggibilità
8. Concludi con una call-to-action forte per JONES TR DIGITAL

STRUTTURA DETTAGLIATA DELL'ARTICOLO (SEGUILA RIGOROSAMENTE):

**Introduzione** (3-4 paragrafi, circa 200 parole)
- Cattura l'attenzione con un dato sorprendente o una domanda provocatoria
- Spiega perché questo argomento è cruciale OGGI per le aziende italiane
- Anticipa i benefici che il lettore otterrà leggendo l'articolo

**## Cos'è ${topic.theme} e Perché è Fondamentale** (300-400 parole)
- Definizione chiara e accessibile
- Contesto storico o evoluzione recente
- Perché le aziende italiane non possono più ignorare questo trend
- ### Statistiche e Dati di Mercato
  - Almeno 3 dati concreti sul mercato italiano/europeo

**## I Vantaggi Concreti per le Aziende Italiane** (400-500 parole)
- ### Vantaggio 1: [Titolo specifico]
  - Spiegazione dettagliata
  - Esempio pratico di un'azienda italiana (anche ipotetica ma realistica)
- ### Vantaggio 2: [Titolo specifico]
  - Spiegazione dettagliata
  - Caso d'uso concreto
- ### Vantaggio 3: [Titolo specifico]
  - Spiegazione dettagliata
  - ROI stimato o benefici misurabili

**## Come Implementarlo nella Tua Azienda: Guida Pratica** (300-400 parole)
- ### Step 1: [Titolo]
  - Azione concreta da fare
- ### Step 2: [Titolo]
  - Azione concreta da fare
- ### Step 3: [Titolo]
  - Azione concreta da fare
- Tempistiche realistiche
- Budget indicativo

**## Casi di Successo e Best Practices** (200-300 parole)
- Almeno 2 esempi di aziende (anche settori generici come "un'e-commerce di moda" o "uno studio professionale")
- Risultati ottenuti in termini numerici
- Lezioni apprese

**## Errori da Evitare Assolutamente** (200 parole)
- Lista di 4-5 errori comuni
- Conseguenze di ogni errore
- Come evitarli

**Conclusione e Call-to-Action** (150-200 parole)
- Riassunto dei punti chiave
- Invito all'azione: contattare JONES TR DIGITAL per una consulenza gratuita
- Messaggio motivazionale finale

RITORNA ESCLUSIVAMENTE un oggetto JSON valido con questa struttura:
{
    "title": "Titolo accattivante, SEO-friendly e clickbait (max 60 caratteri)",
    "slug": "url-friendly-slug-tutto-minuscolo-senza-caratteri-speciali",
    "excerpt": "Riassunto coinvolgente di 180-200 caratteri che invogli a cliccare e leggere l'articolo completo",
    "content": "CONTENUTO COMPLETO DELL'ARTICOLO IN MARKDOWN. MINIMO 1200 PAROLE. USA ## per H2 e ### per H3. SCRIVI TUTTO IL CONTENUTO, NON RIASSUMERE.",
    "category": "${topic.theme}"
}

ATTENZIONE: Il campo "content" deve contenere l'INTERO articolo formattato in Markdown, NON un riassunto o una bozza. Scrivi TUTTO il contenuto seguendo la struttura sopra.
`;

        console.log("⏳ Generazione in corso (può richiedere 30-60 secondi)...");

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean JSON from markdown code blocks
        text = text.replace(/```json\n?/gi, "").replace(/```\n?/gi, "").trim();

        // Find JSON object
        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}") + 1;
        if (jsonStart === -1 || jsonEnd === 0) {
            throw new Error("Risposta non contiene JSON valido");
        }

        const jsonString = text.substring(jsonStart, jsonEnd);
        const postData = JSON.parse(jsonString);

        console.log(`✅ Articolo generato: "${postData.title}"`);
        console.log(`📊 Lunghezza contenuto: ${postData.content.length} caratteri (${Math.round(postData.content.split(' ').length)} parole)`);

        // Ensure unique slug
        const slugBase = postData.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
        const uniqueSlug = `${slugBase}-${Date.now()}`;

        // Insert into Supabase
        const { data, error } = await supabase.from("blog_posts").insert([
            {
                title: postData.title,
                slug: uniqueSlug,
                content: postData.content,
                excerpt: postData.excerpt,
                category: postData.category,
                image_url: imageUrl,
                is_published: true,
                author: "JONES TR Digital",
            },
        ]).select();

        if (error) {
            console.error("❌ Errore Supabase:", error);
            throw error;
        }

        console.log("🎉 Articolo pubblicato con successo su Supabase!");
        console.log(`🔗 Slug: ${uniqueSlug}`);
        console.log(`📸 Immagine: ${imageUrl}`);

    } catch (err) {
        console.error("❌ Errore generazione:", err.message || err);
        process.exit(1);
    }
}

generatePost();
