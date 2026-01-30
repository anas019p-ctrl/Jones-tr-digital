import { motion } from 'framer-motion';

const Cookie = () => {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 md:p-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">Cookie Policy</h1>
                    <p className="text-muted-foreground text-sm mb-4">Ultimo aggiornamento: Gennaio 2024</p>

                    <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">Cosa sono i Cookie?</h2>
                            <p>
                                I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo
                                durante la navigazione. Servono a migliorare l'esperienza utente e a raccogliere
                                informazioni statistiche anonime.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">Tipi di Cookie Utilizzati</h2>

                            <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Cookie Tecnici (Necessari)</h3>
                            <p>
                                Essenziali per il funzionamento del sito. Non richiedono consenso e non possono essere disattivati.
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Sessione utente</li>
                                <li>Preferenze tema (chiaro/scuro)</li>
                                <li>Sicurezza e autenticazione</li>
                            </ul>

                            <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Cookie Analitici</h3>
                            <p>
                                Utilizzati per raccogliere informazioni anonime sull'utilizzo del sito tramite Vercel Speed Insights.
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Pagine visitate</li>
                                <li>Tempo di permanenza</li>
                                <li>Origine del traffico</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">Gestione dei Cookie</h2>
                            <p>
                                Puoi gestire le preferenze sui cookie in qualsiasi momento attraverso le impostazioni del tuo browser:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                                <li><strong>Chrome</strong>: Impostazioni → Privacy e sicurezza → Cookie</li>
                                <li><strong>Firefox</strong>: Impostazioni → Privacy → Cookie</li>
                                <li><strong>Safari</strong>: Preferenze → Privacy</li>
                                <li><strong>Edge</strong>: Impostazioni → Cookie e autorizzazioni sito</li>
                            </ul>
                            <p className="mt-3 text-sm text-muted-foreground">
                                Nota: Disabilitare i cookie potrebbe influire sul funzionamento di alcune parti del sito.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">Cookie di Terze Parti</h2>
                            <p>
                                Il sito potrebbe contenere collegamenti a servizi esterni che utilizzano i propri cookie:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Vercel (hosting e analytics)</li>
                                <li>Supabase (backend)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">Contatti</h2>
                            <p>
                                Per qualsiasi domanda sui cookie, contattaci a:{' '}
                                <a href="mailto:jonestrdigital@gmail.com" className="text-cyber-cyan hover:underline">jonestrdigital@gmail.com</a>
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Cookie;
