"""
AI Blog Generator - Professional Version
Generates rich, detailed blog posts with varied topics
"""

import os
import json
import random
from datetime import datetime
import google.generativeai as genai
from supabase import create_client, Client

# Configuration
SUPABASE_URL = os.environ.get("SUPABASE_URL") or os.environ.get("VITE_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
GEMINI_KEY = os.environ.get("GEMINI_API_KEY")

print(f"🔗 Supabase URL: {'✓' if SUPABASE_URL else '✗'}")
print(f"🔑 Supabase Key: {'✓' if SUPABASE_KEY else '✗'}")
print(f"🧠 Gemini Key: {'✓' if GEMINI_KEY else '✗'}")

if not all([SUPABASE_URL, SUPABASE_KEY, GEMINI_KEY]):
    print("❌ Variabili d'ambiente mancanti!")
    exit(1)

# Initialize clients
genai.configure(api_key=GEMINI_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Topics with rotation
TOPICS = [
    {
        "theme": "Automazione Aziendale con AI",
        "focus": "Come le aziende italiane stanno automatizzando processi ripetitivi con l'intelligenza artificiale",
        "keywords": ["automazione", "efficienza", "risparmio tempo", "ROI"]
    },
    {
        "theme": "Sicurezza e AI",
        "focus": "Come l'intelligenza artificiale sta rivoluzionando la cybersecurity e protezione dati",
        "keywords": ["sicurezza", "cybersecurity", "protezione dati", "minacce"]
    },
    {
        "theme": "AI Trends 2024-2025",
        "focus": "Le tendenze più importanti nel mondo dell'AI che ogni imprenditore deve conoscere",
        "keywords": ["trend", "futuro", "innovazione", "competitività"]
    },
    {
        "theme": "Tool AI per il Business",
        "focus": "I migliori strumenti di intelligenza artificiale per aumentare la produttività aziendale",
        "keywords": ["strumenti", "produttività", "software", "soluzioni"]
    },
    {
        "theme": "AI nel Marketing Digitale",
        "focus": "Come utilizzare l'AI per campagne marketing più efficaci e personalizzate",
        "keywords": ["marketing", "personalizzazione", "conversioni", "ROI"]
    },
    {
        "theme": "Chatbot e Assistenti Virtuali",
        "focus": "Come i chatbot AI stanno trasformando il customer service e le vendite",
        "keywords": ["chatbot", "customer service", "assistenza", "vendite"]
    }
]

IMAGES = {
    "Automazione Aziendale con AI": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    "Sicurezza e AI": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    "AI Trends 2024-2025": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    "Tool AI per il Business": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    "AI nel Marketing Digitale": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "Chatbot e Assistenti Virtuali": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80"
}

def generate_post():
    try:
        print("🚀 Avvio generazione articolo professionale...")
        
        # Select random topic
        topic = random.choice(TOPICS)
        image_url = IMAGES.get(topic["theme"], IMAGES["AI Trends 2024-2025"])
        
        print(f"📝 Argomento selezionato: {topic['theme']}")
        
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
        prompt = f"""
Sei un esperto copywriter e consulente AI per JONES TR DIGITAL, un'agenzia digitale italiana leader nel settore.

SCRIVI UN ARTICOLO DI BLOG PROFESSIONALE su: "{topic['theme']}"
Focus specifico: {topic['focus']}

REQUISITI OBBLIGATORI:
1. L'articolo DEVE essere in ITALIANO perfetto
2. Lunghezza MINIMA: 1000 parole (questo è FONDAMENTALE)
3. Tono: professionale ma accessibile, come se parlassi a un imprenditore italiano
4. Struttura con titoli H2 e H3 in formato Markdown
5. Includi almeno 4 esempi pratici o casi d'uso reali
6. Aggiungi statistiche o dati quando possibile
7. Concludi con una call-to-action per JONES TR DIGITAL

STRUTTURA ARTICOLO:
- Introduzione coinvolgente (3 paragrafi)
- Sezione 1: Cos'è e perché è importante (con sottosezioni)
- Sezione 2: Vantaggi pratici per le aziende (con esempi)
- Sezione 3: Come implementarlo nella tua azienda
- Sezione 4: Casi di successo
- Sezione 5: Errori da evitare
- Conclusione con call-to-action

RITORNA ESCLUSIVAMENTE un oggetto JSON valido:
{{
    "title": "Titolo accattivante e SEO-friendly (max 60 caratteri)",
    "slug": "url-friendly-slug-senza-caratteri-speciali",
    "excerpt": "Riassunto coinvolgente di 150-200 caratteri",
    "content": "CONTENUTO COMPLETO IN MARKDOWN. MINIMO 1000 PAROLE.",
    "category": "{topic['theme']}"
}}

IMPORTANTE: Il campo "content" deve contenere l'intero articolo formattato in Markdown.
"""

        response = model.generate_content(prompt)
        text = response.text
        
        # Clean JSON
        text = text.replace("```json", "").replace("```", "").strip()
        json_start = text.find("{")
        json_end = text.rfind("}") + 1
        
        if json_start == -1 or json_end == 0:
            raise ValueError("Risposta non contiene JSON valido")
        
        json_str = text[json_start:json_end]
        post_data = json.loads(json_str)
        
        print(f"✅ Articolo generato: \"{post_data['title']}\"")
        print(f"📊 Lunghezza contenuto: {len(post_data['content'])} caratteri")
        
        # Create unique slug
        slug_base = post_data['slug'].lower()
        slug_base = ''.join(c if c.isalnum() or c == '-' else '-' for c in slug_base)
        unique_slug = f"{slug_base}-{int(datetime.now().timestamp())}"
        
        # Insert into Supabase
        result = supabase.table("blog_posts").insert({
            "title": post_data["title"],
            "slug": unique_slug,
            "content": post_data["content"],
            "excerpt": post_data["excerpt"],
            "category": post_data["category"],
            "image_url": image_url,
            "is_published": True,
            "author": "JONES TR Digital"
        }).execute()
        
        print("🎉 Articolo pubblicato con successo!")
        print(f"🔗 Slug: {unique_slug}")
        
    except Exception as e:
        print(f"❌ Errore: {str(e)}")
        exit(1)

if __name__ == "__main__":
    generate_post()
