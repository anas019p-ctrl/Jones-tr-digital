import { motion } from 'framer-motion';

const Privacy = () => {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 md:p-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">Privacy Policy</h1>
                    <p className="text-muted-foreground text-sm mb-4">Ultimo aggiornamento: Gennaio 2024</p>

                    <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">1. Titolare del Trattamento</h2>
                            <p>
                                Il Titolare del trattamento dei dati è <strong>JONES TR DIGITAL</strong>, contattabile all'indirizzo email{' '}
                                <a href="mailto:jonestrdigital@gmail.com" className="text-cyber-cyan hover:underline">jonestrdigital@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">2. Dati Raccolti</h2>
                            <p>Raccogliamo i seguenti tipi di dati personali:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Dati di navigazione (indirizzi IP, browser, orari di accesso)</li>
                                <li>Dati forniti volontariamente (nome, email, telefono tramite moduli di contatto)</li>
                                <li>Cookie tecnici e analitici</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">3. Finalità del Trattamento</h2>
                            <p>I dati vengono trattati per:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Rispondere alle richieste di contatto</li>
                                <li>Fornire preventivi e consulenze</li>
                                <li>Migliorare i nostri servizi tramite analisi anonime</li>
                                <li>Inviare comunicazioni commerciali (solo con consenso)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">4. Base Giuridica</h2>
                            <p>
                                Il trattamento si basa sul consenso dell'interessato e/o sull'esecuzione di un contratto
                                o misure precontrattuali, ai sensi dell'art. 6 del GDPR (Regolamento UE 2016/679).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">5. Diritti dell'Interessato</h2>
                            <p>Ai sensi degli artt. 15-22 del GDPR, hai diritto di:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Accedere ai tuoi dati personali</li>
                                <li>Richiederne la rettifica o cancellazione</li>
                                <li>Limitare o opporti al trattamento</li>
                                <li>Richiedere la portabilità dei dati</li>
                                <li>Revocare il consenso in qualsiasi momento</li>
                            </ul>
                            <p className="mt-2">
                                Per esercitare i tuoi diritti, contattaci a:{' '}
                                <a href="mailto:jonestrdigital@gmail.com" className="text-cyber-cyan hover:underline">jonestrdigital@gmail.com</a>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">6. Conservazione dei Dati</h2>
                            <p>
                                I dati personali vengono conservati per il tempo necessario alle finalità per cui sono stati raccolti,
                                e comunque non oltre 24 mesi dall'ultimo contatto, salvo obblighi di legge.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">7. Modifiche alla Policy</h2>
                            <p>
                                Ci riserviamo il diritto di modificare questa informativa. Le modifiche saranno pubblicate su questa pagina
                                con indicazione della data di ultimo aggiornamento.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
