import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SITE_URL = "https://jonestrdigital.vercel.app";

async function generateSitemap() {
    console.log("🕸️ Generazione sitemap dinamica...");

    if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.error("❌ Errore: Variabili d'ambiente Supabase mancanti.");
        return;
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // 1. Fetch static pages
    const staticPages = [
        { url: "/", priority: "1.0" },
        { url: "/blog", priority: "0.8" },
        { url: "/come-funziona", priority: "0.7" },
        { url: "/privacy", priority: "0.3" }
    ];

    // 2. Fetch blog posts from Supabase
    const { data: posts, error } = await supabase
        .from("blog_posts")
        .select("slug, created_at")
        .eq("is_published", true);

    if (error) {
        console.error("❌ Errore nel recupero dei post:", error);
        return;
    }

    const blogPages = posts.map(post => ({
        url: `/blog/${post.slug}`,
        lastmod: new Date(post.created_at).toISOString().split('T')[0],
        priority: "0.6"
    }));

    const allPages = [...staticPages, ...blogPages];

    // 3. Construct XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    try {
        const publicDir = path.join(process.cwd(), "public");
        if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

        fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
        console.log(`✅ Sitemap generata con successo! Inclusi ${blogPages.length} articoli.`);
    } catch (err) {
        console.error("❌ Errore durante la scrittura del file:", err);
    }
}

generateSitemap();
