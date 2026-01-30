/**
 * AI BLOG GENERATOR
 * This script is designed to be run via GitHub Actions to automatically generate blog posts.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const supabase = createClient(
    process.env.VITE_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

async function generatePost() {
    try {
        console.log("🚀 Starting AI Blog Generation...");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Sei un esperto di intelligenza artificiale e strategia digitale per JONES TR DIGITAL.
      Scrivi un articolo di blog tecnico ma accessibile su una novità recente nel mondo dell'AI.
      L'articolo deve essere in ITALIANO.
      
      Ritorna il risultato ESCLUSIVAMENTE in formato JSON con questi campi:
      {
        "title": "Titolo accattivante",
        "slug": "titolo-accattivante-slug",
        "content": "Contenuto dell'articolo lungo almeno 500 parole con paragrafi...",
        "excerpt": "Riassunto breve di 150 caratteri",
        "category": "AI Trends" | "Automazioni" | "Strategia Digitale",
        "keywords": ["ai", "digital", "business"]
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean JSON from potential markdown markers
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const postData = JSON.parse(jsonString);

        console.log(`📝 Generated: ${postData.title}`);

        // Insert into Supabase
        const { data, error } = await supabase.from("blog_posts").insert([
            {
                title: postData.title,
                slug: postData.slug + "-" + Math.floor(Math.random() * 1000), // Ensure unique slug
                content: postData.content,
                excerpt: postData.excerpt,
                category: postData.category,
                image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80", // Default AI image
            },
        ]);

        if (error) throw error;
        console.log("✅ Post successfully published to Supabase!");

    } catch (err) {
        console.error("❌ Error generating post:", err);
    }
}

generatePost();
