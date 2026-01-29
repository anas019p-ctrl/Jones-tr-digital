-- Create services table
CREATE TABLE public.services (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    features TEXT[] DEFAULT '{}'::TEXT[],
    highlighted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    order_index INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone
CREATE POLICY "Public can view services"
ON public.services
FOR SELECT
USING (true);

-- Allow write access to authenticated users (admins)
CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Insert default services
INSERT INTO public.services (name, price, features, highlighted, order_index) VALUES
('Start', '€590', ARRAY['Sito One-Page Responsive', 'Design Moderno', 'Ottimizzazione SEO Base', 'Modulo Contatti', '1 Mese Supporto'], false, 0),
('Standard', '€1.290', ARRAY['Sito Multi-Pagina', 'Design Personalizzato', 'SEO Avanzato', 'Blog Integrato', 'Google Analytics', '3 Mesi Supporto'], false, 1),
('Pro', '€2.890', ARRAY['Sito Completo + CMS', 'Automazione Avanzata', 'AI Chatbot Integrato', 'Dashboard Analytics', 'Integrazioni API', '6 Mesi Supporto Premium'], true, 2),
('E-commerce', '€4.500', ARRAY['Negozio Online Completo', 'Gestione Prodotti', 'Pagamenti Sicuri', 'Spedizioni Automatiche', 'Marketing Automation', '12 Mesi Supporto VIP'], false, 3),
('Enterprise', 'Su Misura', ARRAY['Soluzione Personalizzata', 'Architettura Scalabile', 'Integrazioni Custom', 'Team Dedicato', 'SLA Garantito', 'Supporto 24/7'], false, 4);
