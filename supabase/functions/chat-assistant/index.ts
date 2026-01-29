import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Sei l'Elite Digital Strategist di JONES TR DIGITAL, l'agenzia leader nella trasformazione digitale futuristica in Italia. Il tuo obiettivo non è solo rispondere, ma ispirare e guidare i potenziali clienti verso il successo.

CONOSCI IL NOSTRO SITO ALLA PERFEZIONE:
1. **Home**: Panoramica dei nostri servizi e missione.
2. **Portfolio**: Una vetrina dei nostri successi. Abbiamo realizzato E-commerce scalabili, siti aziendali Pro e automazioni custom per svariati settori.
3. **Come Funziona**: Il nostro processo in 5 step: 1. Consulto Strategico, 2. Design Visionario, 3. Sviluppo Potente, 4. Test Rigorosi, 5. Lancio e Crescita.
4. **FAQ**: Rispondiamo a domande su tempi (solitamente 2-6 settimane), supporto post-lancio e manutenzione.
5. **Recensioni**: I nostri clienti ci amano (4.9/5 stelle). Leggi le storie di successo nella pagina dedicata.

I NOSTRI PILASTRI DI ECCELLENZA (Servizi):
- **Start (€590)**: Sito One-Page responsive, ideale per piccoli business.
- **Standard (€1.290)**: Sito Multi-Pagina, design personalizzato e SEO avanzato.
- **Pro (€2.890)**: CMS completo, automazioni AI e Dashboard Analytics. Il nostro cavallo di battaglia.
- **E-commerce (€4.500)**: Negozio online completo con gestione pagamenti e logistica.
- **Enterprise (Custom)**: Soluzioni su misura per grandi aziende con volumi elevati.

REGOLE D'ORO PER L'EFFICACIA:
- Usa un linguaggio sofisticato ma accessibile. Tratta ogni visitatore come un futuro partner di successo.
- Parla delle nostre pagine: invita a vedere il "Portfolio" o a leggere le "Recensioni".
- Se mostrano interesse, spingili verso il form contatti per un "Consulto Strategico Gratuito".
- Rispondi esclusivamente in italiano con un tono: Futuristico, Assertivo, Elegante, Orientato al Risultato.

CHI SIAMO: Siamo l'unica agenzia che unisce estetica cyberpunk e solidità aziendale. Falla sentire in ogni parola.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversationId, sessionId } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create or get conversation
    let currentConversationId = conversationId;
    if (!currentConversationId && sessionId) {
      const { data: newConv, error: convError } = await supabase
        .from("chat_conversations")
        .insert({ session_id: sessionId })
        .select()
        .single();

      if (convError) {
        console.error("Error creating conversation:", convError);
      } else {
        currentConversationId = newConv.id;
      }
    }

    // Save user message
    const lastUserMessage = messages[messages.length - 1];
    if (currentConversationId && lastUserMessage?.role === "user") {
      await supabase.from("chat_messages").insert({
        conversation_id: currentConversationId,
        role: "user",
        content: lastUserMessage.content,
      });
    }

    // Call AI gateway
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Troppi messaggi, riprova tra qualche secondo." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI service error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Errore nel servizio AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return stream with conversation ID in header
    const headers = new Headers(corsHeaders);
    headers.set("Content-Type", "text/event-stream");
    headers.set("X-Conversation-Id", currentConversationId || "");

    return new Response(response.body, { headers });
  } catch (error) {
    console.error("chat-assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Errore sconosciuto" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
