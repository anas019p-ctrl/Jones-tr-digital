import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, service_interest, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Nome, email e messaggio sono obbligatori" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Email non valida" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate lengths
    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Uno o più campi superano la lunghezza massima" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from("contact_requests")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        service_interest: service_interest || null,
        message: message.trim(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting contact request:", error);
      return new Response(
        JSON.stringify({ error: "Errore nel salvataggio della richiesta" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Contact request saved:", data.id);

    // --- RESEND INTEGRATION ---
    const RESEND_API_KEY = "re_53W2nTWp_M1kavLNHFh8BwUdKg58tDinJ";
    const ADMIN_EMAIL = "Jonestrdigital@gmail.com";

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "JONES TR <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          subject: `Nuova richiesta di contatto da ${name}`,
          html: `
            <h1>Nuova Richiesta di Contatto</h1>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefono:</strong> ${phone || 'N/A'}</p>
            <p><strong>Azienda:</strong> ${company || 'N/A'}</p>
            <p><strong>Interesse:</strong> ${service_interest || 'N/A'}</p>
            <p><strong>Messaggio:</strong></p>
            <p>${message}</p>
          `,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Resend error:", errorData);
      } else {
        console.log("Notification email sent successfully");
      }
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
    }
    // ---------------------------

    return new Response(
      JSON.stringify({ success: true, message: "Richiesta inviata con successo!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("submit-contact error:", error);
    return new Response(
      JSON.stringify({ error: "Errore interno del server" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
