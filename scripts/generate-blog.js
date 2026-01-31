/**
 * AI BLOG GENERATOR - PROFESSIONAL VERSION
 * Generates rich, detailed blog posts with varied topics and professional images
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
// No dotenv needed for Bun

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
        theme: "Automazione per Piccole Imprese",
        focus: "Come JONES TR DIGITAL aiuta negozi e artigiani ad automatizzare ordini e appuntamenti per recuperare 2 ore al giorno",
        keywords: ["piccole imprese", "efficienza", "risparmio tempo", "automazione locale"]
    },
    {
        theme: "AI per Liberi Professionisti",
        focus: "Semplificare la gestione clienti e la fatturazione con assistenti AI personalizzati: benefici per il privato e il professionista",
        keywords: ["professionisti", "gestione clienti", "assistente virtuale", "flusso di lavoro"]
    },
    {
        theme: "Sicurezza AI per il Privato",
        focus: "Proteggere i propri dati e la propria identità digitale nell'era dell'intelligenza artificiale: consigli pratici",
        keywords: ["sicurezza", "privacy", "protezione identità", "consigli AI"]
    },
    {
        theme: "Automazione Flussi di Lavoro Personali",
        focus: "Dalle email alla pianificazione: come l'AI di JONES TR DIGITAL organizza la tua giornata lavorativa senza stress",
        keywords: ["produttività", "stress", "organizzazione", "workflow"]
    },
    {
        theme: "Marketing AI per Attività Locali",
        focus: "Come una piccola attività può competere con i grandi brand usando tool AI per i social media e la pubblicità",
        keywords: ["marketing locale", "social media", "visibilità", "piccolo business"]
    },
    {
        theme: "Semplificazione Tecnologica",
        focus: "Perché non serve essere esperti: come JONES TR DIGITAL rende l'AI accessibile a chiunque per migliorare la vita quotidiana",
        keywords: ["semplicità", "accessibilità", "tecnologia amica", "formazione"]
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

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

        const prompt = `
Agisci come il Senior Content Manager di JONES TR DIGITAL. Il tuo obiettivo è scrivere un articolo di blog completo, tecnico e ottimizzato SEO.

ARGOMENTO: '${topic.theme}'
TARGET: Professionisti e piccole imprese che vogliono automatizzare il business.

ISTRUZIONI DI GENERAZIONE:
1. LUNGHEZZA: Scrivi almeno 1200-1500 parole di contenuto reale e utile.
2. STRUTTURA: Usa un titolo H1 magnetico, un'introduzione che catturi l'attenzione, e almeno 5 paragrafi con titoli H2 e H3.
3. IMMAGINI REALISTICHE: Inserisci nel testo il seguente codice per generare immagini automatiche e professionali:
![Descrizione realistica](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200)

4. VIDEO: Inserisci un paragrafo 'Approfondimento Consigliato' descrivendo un video YouTube che spieghi come implementare queste soluzioni.
5. FORMATO: Restituisci il testo solo in Markdown puro, senza commenti extra, pronto per il database Supabase.

FOCUS TECNICO: ${topic.focus}
`;

        console.log("⏳ Generazione in corso (può richiedere 30-60 secondi)...");

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        console.log(`✅ Articolo generato (lunghezza: ${text.length} caratteri)`);

        // Extract title from first H1 or use a default
        let title = "Nuovo Articolo AI";
        const h1Match = text.match(/^#\s+(.+)$/m);
        if (h1Match) {
            title = h1Match[1].trim();
        }

        // Generate slug
        const slugBase = title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
        const uniqueSlug = `${slugBase}-${Date.now()}`;

        // Create excerpt (first ~200 chars)
        const excerpt = text.replace(/[#*`]/g, "").substring(0, 180).trim() + "...";

        // Insert into Supabase
        const { data, error } = await supabase.from("blog_posts").insert([
            {
                title: title,
                slug: uniqueSlug,
                content: text,
                excerpt: excerpt,
                category: topic.theme,
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
