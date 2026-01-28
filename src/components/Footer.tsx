import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import logo3D from "@/assets/logo-3d.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    servizi: [
      { label: "Siti Web", href: "#servizi" },
      { label: "Automazione", href: "#servizi" },
      { label: "AI & Chatbot", href: "#servizi" },
      { label: "Pubblicità Social", href: "#servizi" },
    ],
    info: [
      { label: "Chi Siamo", href: "#chi-siamo" },
      { label: "Prezzi", href: "#prezzi" },
      { label: "FAQ", href: "#faq" },
      { label: "Contatti", href: "#contatti" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative border-t border-border/30 bg-card/30">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-6">
              <img src={logo3D} alt="JONES TR DIGITAL" className="w-12 h-12 rounded-lg" />
              <span className="font-display font-bold text-xl text-foreground">
                JONES TR DIGITAL
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Aiutiamo piccole e medie imprese a crescere online. 
              Tecnologia semplice, risultati concreti, assistenza in italiano.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Servizi</h4>
            <ul className="space-y-3">
              {footerLinks.servizi.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contattaci</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">info@jonestrdigital.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">+39 02 1234567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">Milano, Italia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} JONES TR DIGITAL. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
              Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
