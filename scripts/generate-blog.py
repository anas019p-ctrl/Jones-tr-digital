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
        "theme": "Automazione per Piccole Imprese",
        "focus": "Come JONES TR DIGITAL aiuta negozi e artigiani ad automatizzare ordini e appuntamenti per recuperare tempo",
        "keywords": ["piccole imprese", "efficienza", "risparmio tempo"]
    },
    {
        "theme": "AI per Liberi Professionisti",
        "focus": "Semplificare la gestione clienti e la fatturazione con assistenti AI personalizzati",
        "keywords": ["professionisti", "gestione clienti", "assistente virtuale"]
    },
    {
        "theme": "Sicurezza AI per il Privato",
        "focus": "Proteggere i propri dati e la propria identità digitale nell'era dell'intelligenza artificiale",
        "keywords": ["sicurezza", "privacy", "protezione identità"]
    },
    {
        "theme": "Automazione Flussi di Lavoro Personali",
        "focus": "Dalle email alla pianificazione: come l'AI organizza la tua giornata lavorativa senza stress",
        "keywords": ["produttività", "stress", "organizzazione", "workflow"]
    },
    {
        "theme": "Marketing AI per Attività Locali",
        "focus": "Come una piccola attività può competere con i grandi brand usando tool AI",
        "keywords": ["marketing locale", "social media", "visibilità"]
    },
    {
        "theme": "Semplificazione Tecnologica",
        "focus": "Perché non serve essere esperti: come JONES TR DIGITAL rende l'AI accessibile a chiunque",
        "keywords": ["semplicità", "accessibilità", "tecnologia"]
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
Sei un esperto copywriter SEO per JONES TR DIGITAL. La tua missione è spiegare come l'AI e l'automazione migliorano la vita di PICCOLE ATTIVITÀ e PRIVATI.

SCRIVI UN ARTICOLO DI BLOG PROFESSIONALE E COINVOLGENTE su: "{topic['theme']}"
Focus specifico: {topic['focus']}

REQUISITI:
1. ITALIANO perfetto, empatico e persuasivo.
2. Lunghezza MINIMA: 1200 parole.
3. Tono: Amichevole ma professionale. Parla di risparmio tempo e meno stress.
4. Struttura Markdown con ## e ###.
5. Almeno 5 esempi pratici legati a piccole attività o vita quotidiana.
6. Concludi con CTA forte per JONES TR DIGITAL.

RITORNA ESCLUSIVAMENTE un oggetto JSON valido:
{{
    "title": "Titolo SEO accattivante",
    "slug": "url-friendly-slug",
    "excerpt": "Riassunto coinvolgente",
    "content": "CONTENUTO COMPLETO IN MARKDOWN. MINIMO 1200 PAROLE.",
    "category": "{topic['theme']}"
}}
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
