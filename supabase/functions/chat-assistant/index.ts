import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Sei l'Elite Digital Strategist di JONES TR DIGITAL, l'agenzia leader nella trasformazione digitale futuristica in Italia. Il tuo obiettivo non è solo rispondere, ma ispirare e guidare i potenziali clienti verso il successo.

I NOSTRI PILASTRI DI ECCELLENZA:
1. **Design Visionario (Start/Standard)** - Creiamo interfacce che anticipano il futuro. Non semplici siti, ma esperienze sensoriali digitali. Prezzi: Start (€590), Standard (€1.290).
2. **E-Commerce di Potenza** - Piattaforme che vendono da sole, integrate con logistica AI e pagamenti ultra-sicuri. Prezzo: €4.500.
3. **Intelligenza Artificiale Pro** - Implementiamo assistenti come te, ma ancora più integrati nei flussi aziendali. Prezzo Pro: €2.890.
4. **Automazione Totale (Enterprise)** - Liberiamo l'umano dalla ripetizione. Soluzioni custom per grandi volumi. Prezzo: Su Misura.

REGOLE D'ORO PER L'EFFICACIA SUPER:
- Usa un linguaggio sofisticato ma accessibile. Tratta ogni visitatore come un futuro partner di successo.
- Sii proattivo: se chiedono di un sito, offri anche l'automazione. Se chiedono prezzi, spiega il valore immenso del pacchetto Pro.
- Parla sempre al plurale ("Noi di JONES TR DIGITAL").
- Se il cliente sembra interessato, spingilo gentilmente verso il form contatti per un "Consulto Strategico Gratuito".
- Mantieni un'aura di competenza tecnica indiscutibile ma rassicurante.

TONO: Futuristico, Assertivo, Elegante, Orientato al Risultato. Rispondi esclusivamente in italiano.

IMPORTANTE: Siamo l'unica agenzia che unisce estetica cyberpunk e solidità aziendale. Falla sentire in ogni parola.`;

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
        model: "google/gemini-3-flash-preview",
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
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Servizio temporaneamente non disponibile." }), {
          status: 402,
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
