import { Check, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    name: 'Start',
    price: '€590',
    icon: '🚀',
    description: 'Perfetto per: Freelancer, Negozi Fisici, Studi Professionali',
    features: ['Sito One-Page Responsive', 'Design Moderno', 'SEO Base', 'Modulo Contatti'],
    bestSeller: false
  },
  {
    id: 2,
    name: 'Standard',
    price: '€1.290',
    icon: '⭐',
    description: 'Ideale per: PMI, Agenzie, Consulenti',
    features: ['Sito Multi-Pagina', 'Design Personalizzato', 'SEO Avanzato', 'Blog + Analytics'],
    bestSeller: false
  },
  {
    id: 3,
    name: 'Pro',
    price: '€2.890',
    icon: '👑',
    description: 'La soluzione completa: Aziende in Crescita',
    features: ['CMS Completo', 'Automazioni Avanzate', 'AI Chatbot', 'Dashboard Analytics'],
    bestSeller: true
  },
  {
    id: 4,
    name: 'E-commerce',
    price: '€4.500',
    icon: '🛍️',
    description: 'Per: Venditori Online, Dropshipping',
    features: ['Negozio Online Completo', 'Gestione Prodotti', 'Pagamenti Sicuri', 'Spedizioni Automatiche'],
    bestSeller: false
  },
];

export default function ServicesSection() {
  return (
    <section id="servizi" className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#1a365d 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a365d]">
            I Nostri Servizi
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Scegli il piano più adatto alla tua attività e inizia a scalare oggi stesso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -8 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 h-full flex flex-col ${service.bestSeller
                ? 'border-yellow-400 bg-white shadow-2xl shadow-yellow-200/50 scale-[1.02]'
                : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-xl'
                }`}
            >
              {/* Badge Best Seller */}
              {service.bestSeller && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-blue-900 px-5 py-1.5 
                                 rounded-full text-xs font-black flex items-center gap-1.5 uppercase tracking-wider">
                    <Crown size={14} /> Best Seller
                  </span>
                </div>
              )}

              {/* Icona */}
              <div className="text-4xl mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                {service.icon}
              </div>

              {/* Nome e Prezzo */}
              <h3 className="text-2xl font-bold mb-2 text-[#1a365d]">{service.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-blue-600">{service.price}</span>
              </div>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed flex-grow">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${service.bestSeller
                ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-500 shadow-lg shadow-yellow-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'
                }`}>
                {service.bestSeller ? 'Inizia Ora - Best Seller' : 'Scopri di Più'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
