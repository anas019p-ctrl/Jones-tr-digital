/**
 * AI BLOG GENERATOR - PROFESSIONAL VERSION
 * Generates rich, professional blog posts with images and varied topics
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
        focus: "Come le aziende italiane stanno automatizzando processi ripetitivi con l'intelligenza artificiale",
        keywords: ["automazione", "efficienza", "risparmio tempo", "ROI"]
    },
    {
        theme: "Sicurezza e AI",
        focus: "Come l'intelligenza artificiale sta rivoluzionando la cybersecurity e protezione dati",
        keywords: ["sicurezza", "cybersecurity", "protezione dati", "minacce"]
    },
    {
        theme: "AI Trends 2024-2025",
        focus: "Le tendenze più importanti nel mondo dell'AI che ogni imprenditore deve conoscere",
        keywords: ["trend", "futuro", "innovazione", "competitività"]
    },
    {
        theme: "Tool AI per il Business",
        focus: "I migliori strumenti di intelligenza artificiale per aumentare la produttività aziendale",
        keywords: ["strumenti", "produttività", "software", "soluzioni"]
    },
    {
        theme: "AI nel Marketing Digitale",
        focus: "Come utilizzare l'AI per campagne marketing più efficaci e personalizzate",
        keywords: ["marketing", "personalizzazione", "conversioni", "ROI"]
    },
    {
        theme: "Chatbot e Assistenti Virtuali",
        focus: "Come i chatbot AI stanno trasformando il customer service e le vendite",
        keywords: ["chatbot", "customer service", "assistenza", "vendite"]
    }
];

// Professional images from Unsplash for each category
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

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
Sei un esperto copywriter e consulente AI per JONES TR DIGITAL, un'agenzia digitale italiana leader nel settore.

SCRIVI UN ARTICOLO DI BLOG PROFESSIONALE su: "${topic.theme}"
Focus specifico: ${topic.focus}

REQUISITI OBBLIGATORI:
1. L'articolo DEVE essere in ITALIANO perfetto
2. Lunghezza MINIMA: 800 parole (questo è FONDAMENTALE)
3. Tono: professionale ma accessibile, come se parlassi a un imprenditore italiano
4. Struttura con titoli H2 e H3 in formato Markdown
5. Includi almeno 3 esempi pratici o casi d'uso reali
6. Aggiungi statistiche o dati quando possibile (anche inventati ma realistici)
7. Concludi con una call-to-action per JONES TR DIGITAL

STRUTTURA ARTICOLO:
- Introduzione coinvolgente (2-3 paragrafi)
- Sezione 1: Cos'è e perché è importante (con sottosezioni)
- Sezione 2: Vantaggi pratici per le aziende (con esempi)
- Sezione 3: Come implementarlo nella tua azienda
- Sezione 4: Errori da evitare
- Conclusione con call-to-action

RITORNA ESCLUSIVAMENTE un oggetto JSON valido con questa struttura:
{
    "title": "Titolo accattivante e SEO-friendly (max 60 caratteri)",
    "slug": "url-friendly-slug-senza-caratteri-speciali",
    "excerpt": "Riassunto coinvolgente di 150-200 caratteri che invogli a leggere",
    "content": "CONTENUTO COMPLETO IN MARKDOWN con ## per H2 e ### per H3. MINIMO 800 PAROLE.",
    "category": "${topic.theme}"
}

IMPORTANTE: Il campo "content" deve contenere l'intero articolo formattato in Markdown, NON solo un riassunto.
`;

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
        console.log(`📊 Lunghezza contenuto: ${postData.content.length} caratteri`);

        // Ensure unique slug
        const uniqueSlug = postData.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-") + "-" + Date.now();

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

        console.log("🎉 Articolo pubblicato con successo!");
        console.log(`🔗 Slug: ${uniqueSlug}`);

    } catch (err) {
        console.error("❌ Errore generazione:", err.message || err);
        process.exit(1);
    }
}

generatePost();
