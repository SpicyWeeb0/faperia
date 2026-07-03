/* =========================================================
   Faperia — script.js
   i18n + language toggle, mobile nav, sticky header,
   GSAP reveals, contact form mailto fallback.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------- Translations ---------------- */
  const T = {
    /* nav + shared */
    'nav.cosa':         { it: 'Cosa facciamo',      en: 'What We Do' },
    'nav.offerte':      { it: 'Offerte',            en: 'Offers' },
    'nav.come':         { it: 'Come funziona',      en: 'How It Works' },
    'nav.chi':          { it: 'Chi siamo',          en: 'Who We Are' },
    'nav.contatti':     { it: 'Contatti',           en: 'Contact' },
    'cta.book':         { it: 'Prenota l\u2019audit',     en: 'Book your audit' },
    'cta.talk':         { it: 'Parla con noi',      en: 'Talk to us' },
    'cta.discover':     { it: 'Scopri di pi\u00f9',         en: 'Learn more' },
    'cta.see-offers':   { it: 'Vedi le offerte',    en: 'See the offers' },
    'cta.start-audit':  { it: 'Inizia con un audit',en: 'Start with an audit' },

    /* footer */
    'footer.tagline':   { it: 'Digitale, automazione, AI per le PMI italiane.', en: 'Digital, automation, AI for Italian SMBs.' },
    'footer.col1':      { it: 'Sito',     en: 'Site' },
    'footer.col2':      { it: 'Contatti', en: 'Contact' },
    'footer.col3':      { it: 'Studio',   en: 'Studio' },
    'footer.studio':    { it: 'Umbria, Italia', en: 'Umbria, Italy' },
    'footer.email':     { it: 'Scrivici', en: 'Email us' },
    'footer.linkedin':  { it: 'LinkedIn', en: 'LinkedIn' },
    'footer.privacy':   { it: 'Privacy',  en: 'Privacy' },
    'footer.terms':     { it: 'Termini',  en: 'Terms' },
    'footer.copy':      { it: '\u00a9 2026 Faperia. Tutti i diritti riservati.', en: '\u00a9 2026 Faperia. All rights reserved.' },

    /* ===================== HOME ===================== */
    'home.title':       { it: 'Faperia \u2014 Automazione e AI per le PMI italiane', en: 'Faperia \u2014 Automation and AI for Italian SMBs' },
    'home.meta':        { it: 'Trasformiamo il lavoro quotidiano delle piccole e medie imprese italiane con automazione pratica e AI concreta.', en: 'We transform the daily work of Italian small and medium businesses with practical automation and real AI.' },

    'home.hero.eyebrow':{ it: 'AUTOMAZIONE PRATICA \u2022 AI CONCRETA', en: 'PRACTICAL AUTOMATION \u2022 REAL AI' },
    'home.hero.h1':     { it: 'Fa <em>per te</em>.', en: 'It does it <em>for you</em>.' },
    'home.hero.sub':    { it: 'Digitale, automazione, AI per le PMI italiane. Trasformiamo le routine manuali in flussi automatici e restituiamo ore al tuo team \u2014 settimana dopo settimana.', en: 'Digital, automation, AI for Italian SMBs. We turn manual routines into automatic flows and give hours back to your team \u2014 week after week.' },
    'home.hero.meta1':  { it: 'Risultati misurabili',         en: 'Measurable results' },
    'home.hero.meta2':  { it: 'Integrato nei tuoi strumenti', en: 'Embedded in your tools' },
    'home.hero.meta3':  { it: 'Audit fisso a <strong>\u20ac250</strong>', en: 'Fixed audit at <strong>\u20ac250</strong>' },

    'home.numbers.eyebrow': { it: 'IL DIVARIO COSTA', en: 'THE GAP HAS A COST' },
    'home.numbers.heading': { it: 'Numeri concreti, non promesse.', en: 'Real numbers, not promises.' },
    'home.numbers.1.big':   { it: '10\u201320',  en: '10\u201320' },
    'home.numbers.1.label': { it: 'ore/settimana restituite per PMI tipica', en: 'hours/week given back per typical SMB' },
    'home.numbers.2.big':   { it: '60\u201380%', en: '60\u201380%' },
    'home.numbers.2.label': { it: 'di riduzione dei tempi di risposta', en: 'reduction in response times' },
    'home.numbers.3.big':   { it: 'Giorni\u2192min', en: 'Days\u2192min' },
    'home.numbers.3.label': { it: 'gestione dei documenti', en: 'document turnaround' },
    'home.numbers.4.big':   { it: '5 giorni', en: '5 days' },
    'home.numbers.4.label': { it: 'dall\u2019audit alle prime decisioni', en: 'from audit to first decisions' },

    'home.solutions.eyebrow':{ it: 'COSA FACCIAMO', en: 'WHAT WE DO' },
    'home.solutions.heading':{ it: 'Tre famiglie di soluzioni, costruite intorno al modo in cui gi\u00e0 lavori.', en: 'Three families of solutions, built around the way you already work.' },
    'home.solutions.lead':   { it: 'Niente sistemi paralleli da ricordare. Le soluzioni vivono dentro i flussi reali della tua azienda \u2014 gestionale, CRM, email, e\u2011commerce, cloud.', en: 'No parallel systems to remember. Solutions live inside your real workflows \u2014 gestionale, CRM, email, e\u2011commerce, cloud storage.' },

    'home.sol1.title':  { it: 'Automazione dei flussi di lavoro', en: 'Workflow Automation' },
    'home.sol1.body':   { it: 'Colleghiamo gli strumenti che gi\u00e0 usi e rimuoviamo i passaggi manuali. Preventivo\u2011ordine, fattura\u2011incasso, lead\u2011CRM: ogni copia\u2011incolla diventa un flusso che gira da solo.', en: 'We connect the tools you already use and remove the manual handoffs. Quote\u2011to\u2011order, invoice\u2011to\u2011payment, lead\u2011to\u2011CRM: every copy\u2011paste becomes a flow that runs on its own.' },
    'home.sol2.title':  { it: 'Assistenti AI e chatbot', en: 'AI Assistants & Chatbots' },
    'home.sol2.body':   { it: 'Assistenti che rispondono in italiano, qualificano i lead, prendono prenotazioni e passano la mano alla persona giusta. Sempre allenati sul tuo contesto, mai generici.', en: 'Assistants that answer in Italian, qualify leads, take bookings, and hand off cleanly to a human. Always trained on your context, never generic.' },
    'home.sol3.title':  { it: 'Documenti e dati', en: 'Document & Data Processing' },
    'home.sol3.body':   { it: 'Fatture elettroniche, contratti, DDT, email da fornitori: trasformiamo documenti non strutturati in dati puliti, pronti per i tuoi sistemi. OCR, estrazione, validazione, smistamento.', en: 'Electronic invoices, contracts, DDT, supplier emails: we turn unstructured documents into clean data, ready for your systems. OCR, extraction, validation, routing.' },

    'home.offers.eyebrow':{ it: 'OFFERTE', en: 'OFFERS' },
    'home.offers.heading':{ it: 'Tre punti di partenza chiari.', en: 'Three clear starting points.' },
    'home.offers.lead':   { it: 'Si comincia sempre con un audit fisso a basso prezzo. Da l\u00ec, due tracce di implementazione a prezzo bloccato.', en: 'Every engagement starts with a fixed low\u2011price audit. From there, two implementation tracks at locked prices.' },

    'home.offer1.tag':    { it: 'AUDIT', en: 'AUDIT' },
    'home.offer1.title':  { it: 'Audit Express', en: 'Audit Express' },
    'home.offer1.meta':   { it: '5 giorni lavorativi', en: '5 working days' },
    'home.offer1.price':  { it: '\u20ac250', en: '\u20ac250' },
    'home.offer1.psub':   { it: 'pagamento anticipato', en: 'paid upfront' },
    'home.offer1.f1':     { it: 'Call di scoperta da <strong>90 minuti</strong>', en: '<strong>90\u2011minute</strong> discovery call' },
    'home.offer1.f2':     { it: 'Mappatura dei <strong>3 colli di bottiglia</strong> principali', en: 'Map your <strong>top 3 bottlenecks</strong>' },
    'home.offer1.f3':     { it: 'Report scritto con ROI per intervento', en: 'Written report with per\u2011intervention ROI' },

    'home.offer2.tag':    { it: 'IMPLEMENTAZIONE', en: 'IMPLEMENTATION' },
    'home.offer2.title':  { it: 'Quick Win', en: 'Quick Win' },
    'home.offer2.meta':   { it: '2 settimane', en: '2 weeks' },
    'home.offer2.price':  { it: '\u20ac890', en: '\u20ac890' },
    'home.offer2.psub':   { it: 'tariffa fondatori \u2022 primi 10 clienti', en: 'founding rate \u2022 first 10 clients' },
    'home.offer2.f1':     { it: 'Una routine dolorosa <strong>automatizzata end\u2011to\u2011end</strong>', en: 'One painful routine <strong>automated end\u2011to\u2011end</strong>' },
    'home.offer2.f2':     { it: 'Integrazione con i tuoi strumenti attuali', en: 'Integration with the tools you already use' },
    'home.offer2.f3':     { it: '<strong>30 giorni</strong> di supporto post\u2011lancio', en: '<strong>30 days</strong> of post\u2011launch support' },

    'home.offer3.tag':    { it: 'IMPLEMENTAZIONE', en: 'IMPLEMENTATION' },
    'home.offer3.title':  { it: 'Operations Upgrade', en: 'Operations Upgrade' },
    'home.offer3.meta':   { it: '4 settimane', en: '4 weeks' },
    'home.offer3.price':  { it: '\u20ac2.490', en: '\u20ac2,490' },
    'home.offer3.psub':   { it: 'tariffa fondatori \u2022 primi 10 clienti', en: 'founding rate \u2022 first 10 clients' },
    'home.offer3.f1':     { it: 'Un\u2019intera area di processo riprogettata', en: 'An entire process area redesigned' },
    'home.offer3.f2':     { it: 'Automazioni connesse e/o assistente AI dedicato', en: 'Connected automations and/or a dedicated AI assistant' },
    'home.offer3.f3':     { it: '<strong>60 giorni</strong> di supporto e ottimizzazione', en: '<strong>60 days</strong> of support and tuning' },

    'home.founding.h':    { it: 'Tariffa fondatori, fino ai primi 10 clienti.', en: 'Founding rate, until the first 10 clients.' },
    'home.founding.p':    { it: 'Quando il decimo si chiude, i prezzi salgono ai listini pubblici. Il tetto \u00e8 reale, e contato.', en: 'Once the tenth client closes, prices move to the public list. The cap is real, and counted.' },

    'home.diff.eyebrow':  { it: 'PERCH\u00c9 FAPERIA', en: 'WHY FAPERIA' },
    'home.diff.heading':  { it: 'Pratici, italiani, concentrati sul risultato.', en: 'Pragmatic, Italian, focused on outcomes.' },
    'home.diff.1.h':      { it: 'Embedded, non bolted on', en: 'Embedded, not bolted on' },
    'home.diff.1.b':      { it: 'Le soluzioni vivono dentro i flussi reali, non in sistemi paralleli che il tuo team deve ricordarsi di usare.', en: 'Solutions live inside real workflows, not parallel systems your team has to remember to use.' },
    'home.diff.2.h':      { it: 'Outcome\u2011first', en: 'Outcome\u2011first' },
    'home.diff.2.b':      { it: 'Ogni intervento \u00e8 misurato: ore restituite, errori ridotti, tempo di risposta tagliato, ricavi recuperati.', en: 'Every engagement is measured: hours given back, errors reduced, response time cut, revenue captured.' },
    'home.diff.3.h':      { it: 'Contesto italiano', en: 'Italian context' },
    'home.diff.3.b':      { it: 'Conosciamo lo stack che usate davvero \u2014 fatturazione elettronica, SDI, gestionali, sistemi bancari regionali \u2014 e progettiamo intorno.', en: 'We know the stack you actually use \u2014 fatturazione elettronica, SDI, gestionali, regional banking \u2014 and design around it.' },
    'home.diff.4.h':      { it: 'AI pragmatica', en: 'Pragmatic AI' },
    'home.diff.4.b':      { it: 'Usiamo AI quando si guadagna il posto. Quando basta un\u2019automazione semplice, spediamo un\u2019automazione semplice.', en: 'We use AI when it earns its place. When a simple automation does the job, we ship a simple automation.' },

    'home.cta.h':         { it: 'Inizia da un audit fisso a <strong>\u20ac250</strong>.', en: 'Start with a fixed audit at <strong>\u20ac250</strong>.' },
    'home.cta.p':         { it: 'In cinque giorni mappiamo i tre colli di bottiglia che ti costano di pi\u00f9 e ti diciamo cosa vale la pena di sistemare \u2014 con i numeri.', en: 'In five days we map the three bottlenecks costing you the most and tell you what\u2019s worth fixing \u2014 with the numbers.' },

    /* ===================== COSA FACCIAMO ===================== */
    'cosa.title':       { it: 'Cosa facciamo \u2014 Faperia', en: 'What We Do \u2014 Faperia' },
    'cosa.meta':        { it: 'Tre famiglie di soluzioni: automazione dei flussi, assistenti AI, elaborazione documenti e dati.', en: 'Three families of solutions: workflow automation, AI assistants, and document and data processing.' },

    'cosa.hero.h1':     { it: 'Tre cose che facciamo bene.', en: 'Three things we do well.' },
    'cosa.hero.lead':   { it: 'Strettamente connesse, ognuna progettata per inserirsi nei flussi e negli strumenti che la tua azienda gi\u00e0 usa. Niente sostituzioni di sistemi. Niente progetti monstre.', en: 'Tightly connected, each designed to plug into the workflows and tools your business already uses. No system replacements. No monster projects.' },

    /* Workflow Automation block */
    'cosa.wa.eyebrow':  { it: '01 \u2014 AUTOMAZIONE DEI FLUSSI', en: '01 \u2014 WORKFLOW AUTOMATION' },
    'cosa.wa.h':        { it: 'Le code di copia\u2011incolla, eliminate.', en: 'The copy\u2011paste queues, eliminated.' },
    'cosa.wa.p1':       { it: 'Colleghiamo i sistemi su cui le PMI italiane si affidano gi\u00e0 \u2014 gestionali, CRM, email, fogli di calcolo, e\u2011commerce, cloud storage \u2014 e rimuoviamo i passaggi manuali tra l\u2019uno e l\u2019altro.', en: 'We connect the systems Italian SMBs already rely on \u2014 gestionali, CRM, email, spreadsheets, e\u2011commerce, cloud storage \u2014 and remove the manual handoffs between them.' },
    'cosa.wa.p2':       { it: 'Preventivo\u2011ordine, fattura\u2011incasso, lead\u2011CRM, ordine\u2011consegna: ogni passaggio che oggi richiede di spostare manualmente i dati diventa un flusso che parte da solo.', en: 'Quote\u2011to\u2011order, invoice\u2011to\u2011payment, lead\u2011to\u2011CRM, order\u2011to\u2011fulfillment: every step that today requires moving data by hand becomes a flow that starts on its own.' },
    'cosa.wa.list.h':   { it: 'Esempi reali', en: 'Real examples' },
    'cosa.wa.l1':       { it: 'Sincronizzazione automatica tra il gestionale e il CRM \u2014 stessi clienti, stesse anagrafiche, niente doppioni', en: 'Automatic sync between gestionale and CRM \u2014 same customers, same records, no duplicates' },
    'cosa.wa.l2':       { it: 'Lead da modulo web a CRM con assegnazione e notifica al commerciale giusto', en: 'Web form leads to CRM with auto\u2011assignment and notification to the right sales rep' },
    'cosa.wa.l3':       { it: 'Ordini e\u2011commerce che generano automaticamente DDT e fattura nel gestionale', en: 'E\u2011commerce orders that automatically generate DDT and invoices in the gestionale' },
    'cosa.wa.l4':       { it: 'Promemoria di pagamento inviati automaticamente a partire dallo scadenziario', en: 'Payment reminders sent automatically from your invoice schedule' },

    /* AI Assistants block */
    'cosa.ai.eyebrow':  { it: '02 \u2014 ASSISTENTI AI', en: '02 \u2014 AI ASSISTANTS' },
    'cosa.ai.h':        { it: 'Assistenti che parlano la lingua del tuo business.', en: 'Assistants that speak your business\u2019s language.' },
    'cosa.ai.p1':       { it: 'Assistenti rivolti al cliente che rispondono in italiano, qualificano i lead, prendono prenotazioni e passano la mano a una persona quando serve davvero.', en: 'Customer\u2011facing assistants that answer in Italian, qualify leads, take bookings, and hand off cleanly to a human when it matters.' },
    'cosa.ai.p2':       { it: 'Assistenti interni che permettono allo staff di interrogare la conoscenza aziendale, redigere documenti e trovare l\u2019informazione giusta senza scavare in cartelle infinite. Sempre allenati sul contesto del cliente, mai generici.', en: 'Internal assistants that let staff query company knowledge, draft documents, and surface the right information without digging through endless folders. Always trained on the customer\u2019s own context, never generic.' },
    'cosa.ai.list.h':   { it: 'Esempi reali', en: 'Real examples' },
    'cosa.ai.l1':       { it: 'Chatbot che risponde alle domande pi\u00f9 frequenti dei clienti e qualifica i lead 24/7', en: 'Chatbot that answers the most common customer questions and qualifies leads 24/7' },
    'cosa.ai.l2':       { it: 'Assistente interno collegato a Drive/Notion che trova procedure, prezzi e specifiche tecniche', en: 'Internal assistant connected to Drive/Notion that finds procedures, pricing, and technical specs' },
    'cosa.ai.l3':       { it: 'Bozze automatiche di risposta alle email pi\u00f9 ricorrenti, pronte da revisionare e inviare', en: 'Auto\u2011drafted replies for the most recurring emails, ready to review and send' },
    'cosa.ai.l4':       { it: 'Assistente di prenotazione integrato con il calendario aziendale', en: 'Booking assistant integrated with the company calendar' },

    /* Documents block */
    'cosa.doc.eyebrow': { it: '03 \u2014 DOCUMENTI E DATI', en: '03 \u2014 DOCUMENTS & DATA' },
    'cosa.doc.h':       { it: 'Da carta e PDF a dati puliti.', en: 'From paper and PDF to clean data.' },
    'cosa.doc.p1':      { it: 'Fatture, contratti, DDT, fatture elettroniche, moduli scansionati, email da fornitori: trasformiamo documenti non strutturati in dati puliti e validati, pronti per i tuoi sistemi.', en: 'Invoices, contracts, DDT, electronic invoices, scanned forms, supplier emails: we turn unstructured documents into clean, validated data, ready for your systems.' },
    'cosa.doc.p2':      { it: 'OCR, estrazione intelligente, validazione, smistamento: la carta continua a muoversi mentre il team si concentra sul lavoro che conta.', en: 'OCR, intelligent extraction, validation, routing: the paperwork keeps moving while the team focuses on higher\u2011value work.' },
    'cosa.doc.list.h':  { it: 'Esempi reali', en: 'Real examples' },
    'cosa.doc.l1':      { it: 'Estrazione automatica dei dati dai DDT in arrivo e inserimento nel gestionale', en: 'Automatic extraction of data from incoming DDT and entry into the gestionale' },
    'cosa.doc.l2':      { it: 'Validazione delle fatture passive contro l\u2019ordine d\u2019acquisto, con flag delle anomalie', en: 'Validation of supplier invoices against the purchase order, with anomaly flagging' },
    'cosa.doc.l3':      { it: 'Smistamento automatico delle email con allegati nei sistemi giusti', en: 'Auto\u2011routing of emails with attachments into the right systems' },
    'cosa.doc.l4':      { it: 'Lettura e archiviazione strutturata dei contratti firmati', en: 'Structured reading and archiving of signed contracts' },

    'cosa.cta.h':       { it: 'Quale di queste tre ti pesa di pi\u00f9?', en: 'Which of these three weighs on you most?' },
    'cosa.cta.p':       { it: 'L\u2019audit Express parte proprio da qui: capire dove il tempo e i soldi se ne vanno davvero.', en: 'The Express audit starts right here: understanding where time and money actually go.' },

    /* ===================== OFFERTE ===================== */
    'offerte.title':    { it: 'Offerte \u2014 Faperia', en: 'Offers \u2014 Faperia' },
    'offerte.meta':     { it: 'Tre offerte produttizzate: Audit Express, Quick Win, Operations Upgrade. Prezzi bloccati, tempi chiari.', en: 'Three productized offers: Audit Express, Quick Win, Operations Upgrade. Locked prices, clear timelines.' },

    'offerte.hero.h1':  { it: 'Tre offerte. Prezzi bloccati. Tempi chiari.', en: 'Three offers. Locked prices. Clear timelines.' },
    'offerte.hero.lead':{ it: 'Si parte da un audit a basso prezzo. Da l\u00ec, due tracce di implementazione progettate per coprire la maggior parte dei bisogni reali di una PMI italiana.', en: 'It starts with a low\u2011price audit. From there, two implementation tracks designed to cover most of the real needs of an Italian SMB.' },

    /* Audit detail */
    'offerte.audit.eyebrow':{ it: 'OFFERTA 1', en: 'OFFER 1' },
    'offerte.audit.title':  { it: 'Audit Express', en: 'Audit Express' },
    'offerte.audit.tag':    { it: 'PER CHI SENTE LA FATICA, MA NON LA SA NOMINARE', en: 'FOR THOSE WHO FEEL THE DRAG BUT CAN\u2019T NAME IT' },
    'offerte.audit.timeline.l': { it: 'TEMPI', en: 'TIMELINE' },
    'offerte.audit.timeline.v': { it: '5 giorni lavorativi', en: '5 working days' },
    'offerte.audit.metric.l':   { it: 'METRICA DI SUCCESSO', en: 'SUCCESS METRIC' },
    'offerte.audit.metric.v':   { it: 'Lista numerata di cosa sistemare e quanto vale', en: 'Numbered list of what to fix and what it\u2019s worth' },
    'offerte.audit.format.l':   { it: 'FORMATO', en: 'FORMAT' },
    'offerte.audit.format.v':   { it: 'Remoto o in presenza in Umbria', en: 'Remote or in person in Umbria' },
    'offerte.audit.promise.h':  { it: 'La promessa', en: 'The promise' },
    'offerte.audit.promise.p':  { it: 'In una settimana mappiamo i tuoi tre colli di bottiglia operativi principali, quantifichiamo le ore e gli euro che ti costano e ti consegniamo un piano d\u2019azione prioritizzato.', en: 'In one week we map your top three operational bottlenecks, quantify the hours and euros they cost you, and hand you a prioritized action plan.' },
    'offerte.audit.del.h':      { it: 'Cosa ricevi', en: 'What you get' },
    'offerte.audit.del.l1':     { it: 'Call di scoperta da <strong>90 minuti</strong> con titolare e 1\u20132 persone chiave', en: '<strong>90\u2011minute</strong> discovery call with owner and 1\u20132 key staff' },
    'offerte.audit.del.l2':     { it: 'Walkthrough dei processi \u2014 remoto o in presenza, una sessione', en: 'Process walkthrough \u2014 remote or on\u2011site, one session' },
    'offerte.audit.del.l3':     { it: 'Report scritto: i 3 colli di bottiglia principali, ore ed euro persi al mese, interventi consigliati, stima ROI per intervento', en: 'Written report: top 3 bottlenecks, hours and euros wasted per month, recommended interventions, ROI estimate per intervention' },
    'offerte.audit.del.l4':     { it: 'Call di restituzione da <strong>30 minuti</strong> per leggere insieme i risultati', en: '<strong>30\u2011minute</strong> readout call to walk through findings' },
    'offerte.audit.note.h':     { it: 'Il prezzo del primo passo', en: 'The price of the first step' },
    'offerte.audit.note.p':     { it: 'Se entro <strong>30 giorni</strong> prenoti una Quick Win o un Operations Upgrade, i <strong>\u20ac250</strong> sono interamente detratti dal prezzo dell\u2019implementazione.', en: 'If you book a Quick Win or Operations Upgrade within <strong>30 days</strong>, the <strong>\u20ac250</strong> is fully deducted from the implementation price.' },

    /* Quick Win detail */
    'offerte.qw.eyebrow':   { it: 'OFFERTA 2', en: 'OFFER 2' },
    'offerte.qw.title':     { it: 'Quick Win', en: 'Quick Win' },
    'offerte.qw.tag':       { it: 'UNA ROUTINE NOTA, AUTOMATIZZATA END\u2011TO\u2011END', en: 'ONE KNOWN ROUTINE, AUTOMATED END\u2011TO\u2011END' },
    'offerte.qw.price.sub': { it: 'tariffa fondatori', en: 'founding rate' },
    'offerte.qw.timeline.v':{ it: '2 settimane', en: '2 weeks' },
    'offerte.qw.metric.v':  { it: 'Ore risparmiate per settimana, verificate dopo 30 giorni', en: 'Hours saved per week, verified after 30 days' },
    'offerte.qw.scope.l':   { it: 'AMBITO', en: 'SCOPE' },
    'offerte.qw.scope.v':   { it: 'Una routine singola, scelta durante l\u2019audit', en: 'One single routine, chosen during the audit' },
    'offerte.qw.promise.h': { it: 'La promessa', en: 'The promise' },
    'offerte.qw.promise.p': { it: 'In due settimane automatizziamo end\u2011to\u2011end una routine dolorosa. Il tuo team riprende quel tempo, in modo permanente.', en: 'In two weeks we automate one painful routine end\u2011to\u2011end. Your team gets that time back, permanently.' },
    'offerte.qw.del.h':     { it: 'Cosa ricevi', en: 'What you get' },
    'offerte.qw.del.l1':    { it: 'Un flusso automatizzato, oppure un assistente AI focalizzato, oppure una pipeline di elaborazione documenti', en: 'One automated workflow, OR one focused AI assistant, OR one document\u2011processing pipeline' },
    'offerte.qw.del.l2':    { it: 'Integrazione con gli strumenti che gi\u00e0 usi', en: 'Integration with the tools you already use' },
    'offerte.qw.del.l3':    { it: 'Test e sessione di onboarding per il personale', en: 'Testing and a staff onboarding session' },
    'offerte.qw.del.l4':    { it: 'Documentazione in italiano', en: 'Documentation in Italian' },
    'offerte.qw.del.l5':    { it: '<strong>30 giorni</strong> di supporto post\u2011lancio', en: '<strong>30 days</strong> of post\u2011launch support' },
    'offerte.qw.note.h':    { it: 'Per chi \u00e8', en: 'Who it\u2019s for' },
    'offerte.qw.note.p':    { it: 'PMI che sanno gi\u00e0 quale routine sta bruciando ore: reinserimento dati, risposte ripetitive, gestione fatture, intake lead, documenti dei fornitori, e cose simili.', en: 'SMBs who already know which routine is burning hours: data re\u2011entry, repeated email replies, invoice handling, lead intake, supplier documents, and similar single\u2011point pains.' },

    /* Operations Upgrade detail */
    'offerte.ou.eyebrow':   { it: 'OFFERTA 3', en: 'OFFER 3' },
    'offerte.ou.title':     { it: 'Operations Upgrade', en: 'Operations Upgrade' },
    'offerte.ou.tag':       { it: 'UN\u2019INTERA AREA DI PROCESSO, RIPROGETTATA', en: 'AN ENTIRE PROCESS AREA, REDESIGNED' },
    'offerte.ou.price.sub': { it: 'tariffa fondatori', en: 'founding rate' },
    'offerte.ou.timeline.v':{ it: '4 settimane', en: '4 weeks' },
    'offerte.ou.metric.v':  { it: 'Ore risparmiate + una metrica secondaria (tempo di risposta, tasso di errore, ricavi)', en: 'Hours saved + one secondary metric (response time, error rate, revenue)' },
    'offerte.ou.scope.l':   { it: 'AMBITO', en: 'SCOPE' },
    'offerte.ou.scope.v':   { it: 'Un\u2019area di processo intera (es. ordine\u2011fattura)', en: 'A whole process area (e.g. order\u2011to\u2011invoice)' },
    'offerte.ou.promise.h': { it: 'La promessa', en: 'The promise' },
    'offerte.ou.promise.p': { it: 'In quattro settimane trasformiamo un\u2019intera area di processo end\u2011to\u2011end, combinando automazione e AI dove ognuna si guadagna il posto.', en: 'In four weeks we transform an entire process area end\u2011to\u2011end, combining automation and AI where each earns its place.' },
    'offerte.ou.del.h':     { it: 'Cosa ricevi', en: 'What you get' },
    'offerte.ou.del.l1':    { it: '<strong>2\u20134 automazioni</strong> connesse e/o un assistente AI allenato sul tuo contesto', en: '<strong>2\u20134 connected automations</strong> and/or an AI assistant trained on your context' },
    'offerte.ou.del.l2':    { it: 'Integrazione tra gestionale, CRM, email e altri strumenti rilevanti', en: 'Integration across gestionale, CRM, email, and other relevant tools' },
    'offerte.ou.del.l3':    { it: 'Sessione di formazione di gruppo per il personale', en: 'Group staff training session' },
    'offerte.ou.del.l4':    { it: 'Documentazione completa e handover', en: 'Full documentation and handover' },
    'offerte.ou.del.l5':    { it: '<strong>60 giorni</strong> di supporto e ottimizzazione', en: '<strong>60 days</strong> of post\u2011launch support and tuning' },
    'offerte.ou.note.h':    { it: 'Per chi \u00e8', en: 'Who it\u2019s for' },
    'offerte.ou.note.p':    { it: 'PMI pronte a riprogettare un\u2019intera area di processo \u2014 ad esempio l\u2019intero flusso ordine\u2011fattura, il setup di customer support, o l\u2019intake documenti end\u2011to\u2011end.', en: 'SMBs ready to rework a whole process area \u2014 for example the entire order\u2011to\u2011invoice flow, customer support setup, or end\u2011to\u2011end document intake.' },

    'offerte.cta.h':        { it: 'Non sai ancora quale offerta fa per te?', en: 'Not sure which offer fits you yet?' },
    'offerte.cta.p':        { it: 'Lo decidiamo insieme nell\u2019audit. \u00c8 esattamente per questo che esiste.', en: 'We decide together during the audit. That\u2019s exactly what it\u2019s for.' },

    /* ===================== COME FUNZIONA ===================== */
    'come.title':       { it: 'Come funziona \u2014 Faperia', en: 'How It Works \u2014 Faperia' },
    'come.meta':        { it: 'Il processo dell\u2019audit Faperia: cinque giorni, dal primo contatto al report finale.', en: 'The Faperia audit process: five days from first contact to final report.' },

    'come.hero.h1':     { it: 'Cinque giorni dal primo contatto al report.', en: 'Five days from first contact to the report.' },
    'come.hero.lead':   { it: 'Un processo strutturato, pensato per consegnarti decisioni chiare \u2014 non solo osservazioni. Ogni passaggio ha uno scopo, un tempo definito e un output preciso.', en: 'A structured process designed to give you clear decisions \u2014 not just observations. Every step has a purpose, a defined time, and a precise output.' },

    'come.steps.eyebrow':{ it: 'IL PROCESSO', en: 'THE PROCESS' },
    'come.steps.heading':{ it: 'Cinque passaggi, niente sorprese.', en: 'Five steps, no surprises.' },

    'come.s1.t': { it: 'Prenotazione e pagamento',  en: 'Booking and payment' },
    'come.s1.p': { it: 'Compili un breve modulo di contatto. Confermiamo l\u2019audit e processiamo il pagamento di <strong>\u20ac250</strong>. Subito dopo ricevi il pre\u2011questionario.', en: 'You fill a short contact form. We confirm the audit and process the <strong>\u20ac250</strong> payment. Right after, you receive the pre\u2011form.' },
    'come.s1.d': { it: 'GIORNO 0', en: 'DAY 0' },

    'come.s2.t': { it: 'Pre\u2011form (5 domande, 3 minuti)', en: 'Pre\u2011form (5 questions, 3 minutes)' },
    'come.s2.p': { it: 'Cinque domande mirate per capire ruolo, dimensione del team, settore e urgenza. Il pre\u2011form decide quale questionario diagnostico ricevi: combinato, oppure split tra titolare e operativi.', en: 'Five targeted questions to understand your role, team size, sector, and urgency. The pre\u2011form decides which diagnostic questionnaire you receive: combined, or split between owner and operations.' },
    'come.s2.d': { it: 'GIORNO 1', en: 'DAY 1' },

    'come.s3.t': { it: 'Questionario diagnostico (~20 minuti)', en: 'Diagnostic questionnaire (~20 min)' },
    'come.s3.p': { it: 'Un questionario di 20\u201329 domande sul tuo business: contesto, strumenti, dolori reali, errori ricorrenti, passaggi manuali tra sistemi, dove vorresti andare. Niente gergo, scrittura come la useresti tu.', en: 'A 20\u201329 question questionnaire about your business: context, tools, real pains, recurring errors, manual handoffs between systems, where you\u2019d like to go. No jargon, written the way you\u2019d say it.' },
    'come.s3.d': { it: 'GIORNI 1\u20132', en: 'DAYS 1\u20132' },

    'come.s4.t': { it: 'Discovery call (90 minuti)', en: 'Discovery call (90 minutes)' },
    'come.s4.p': { it: 'Un\u2019ora e mezza insieme \u2014 video, telefono, in azienda o in studio in Umbria. Camminiamo dentro al business: come funziona, dove si forma l\u2019attrito, cosa il questionario non ha catturato. Esce sempre qualcosa che il modulo da solo non vede.', en: 'Ninety minutes together \u2014 video, phone, on\u2011site, or in our studio in Umbria. We walk through the business: how it runs, where friction forms, what the questionnaire didn\u2019t catch. Something always surfaces that the form alone can\u2019t.' },
    'come.s4.d': { it: 'GIORNO 3', en: 'DAY 3' },

    'come.s5.t': { it: 'Analisi e report scritto', en: 'Analysis and written report' },
    'come.s5.p': { it: 'Mappiamo i flussi che hai descritto, identifichiamo dove si formano i colli di bottiglia, calcoliamo il loro costo con i tuoi numeri reali. Ricevi un report di 6\u20138 pagine: tre colli di bottiglia, ROI per ognuno, raccomandazioni concrete \u2014 anche cosa puoi fare da solo, senza di noi.', en: 'We map the flows you described, identify where bottlenecks form, calculate their cost using your real numbers. You receive a 6\u20138 page report: three bottlenecks, ROI for each, concrete recommendations \u2014 including what you can do on your own, without us.' },
    'come.s5.d': { it: 'GIORNI 4\u20135', en: 'DAYS 4\u20135' },

    'come.method.eyebrow':{ it: 'IL METODO', en: 'THE METHOD' },
    'come.method.heading':{ it: 'Quattro principi che non neghiamo.', en: 'Four principles we don\u2019t bend.' },

    'come.m1.h': { it: 'La voce del cliente, sopra ogni cosa', en: 'The customer\u2019s voice, above all' },
    'come.m1.b': { it: 'Quando una checkbox basterebbe, chiediamo comunque una risposta libera. \u00c8 l\u00ec che si vede come pensi davvero al tuo business.', en: 'Where a checkbox would suffice, we still ask for a free\u2011text answer. That\u2019s where we see how you actually think about your business.' },

    'come.m2.h': { it: 'Numeri tuoi, non nostri', en: 'Your numbers, not ours' },
    'come.m2.b': { it: 'I costi nel report sono calcolati con la tariffa oraria, la frequenza degli errori e il loro costo che hai confermato tu durante la call. Mai inflazionati.', en: 'The costs in the report are computed with the hourly rate, error frequency, and per\u2011mistake cost that you confirmed during the call. Never inflated.' },

    'come.m3.h': { it: 'Onesti su cosa non facciamo', en: 'Honest about what we don\u2019t do' },
    'come.m3.b': { it: 'L\u2019audit copre il livello operativo. Non tocca strategia, posizionamento o pianificazione finanziaria. Quando il problema non \u00e8 nel nostro perimetro, lo diciamo.', en: 'The audit covers the operational layer. It does not touch strategy, positioning, or financial planning. When the problem is outside our scope, we say so.' },

    'come.m4.h': { it: 'Confidenza onesta', en: 'Honest confidence' },
    'come.m4.b': { it: 'Ogni stima nel report ha un livello di confidenza dichiarato \u2014 alta, media o bassa. Una bassa confidenza dichiarata \u00e8 meglio di un\u2019alta gonfiata.', en: 'Every estimate in the report has a stated confidence level \u2014 high, medium, or low. A stated low confidence beats an inflated high.' },

    'come.quote':       { it: 'L\u2019audit di Faperia non \u00e8 un checklist generico. Quello che ti consegniamo \u00e8 quello che abbiamo trovato nel tuo business, non un template applicato.', en: 'The Faperia audit is not a generic checklist. What we hand you is what we found in your business \u2014 not a template applied to you.' },

    'come.cta.h':       { it: 'Cinque giorni. Tre colli di bottiglia. Una decisione chiara.', en: 'Five days. Three bottlenecks. One clear decision.' },
    'come.cta.p':       { it: 'L\u2019audit \u00e8 il modo a basso rischio per scoprire se Faperia fa per te.', en: 'The audit is the low\u2011risk way to find out if Faperia is right for you.' },

    /* ===================== CHI SIAMO ===================== */
    'chi.title':        { it: 'Chi siamo \u2014 Faperia', en: 'Who We Are \u2014 Faperia' },
    'chi.meta':         { it: 'Faperia: visione, voce, e il modo in cui scegliamo di lavorare con le PMI italiane.', en: 'Faperia: vision, voice, and the way we choose to work with Italian SMBs.' },

    'chi.hero.h1':      { it: 'Pratici, italiani, concentrati sul risultato.', en: 'Pragmatic, Italian, focused on outcomes.' },
    'chi.hero.lead':    { it: 'Faperia esiste per una ragione semplice: le PMI italiane meritano gli stessi vantaggi operativi che le grandi aziende danno per scontati \u2014 senza il prezzo, la complessit\u00e0 o il gergo da consulenti.', en: 'Faperia exists for a simple reason: Italian SMBs deserve the same operational advantages large companies take for granted \u2014 without the price, complexity, or consultant\u2011speak.' },

    'chi.vision.eyebrow':{ it: 'LA VISIONE', en: 'THE VISION' },
    'chi.vision.h':     { it: 'Trasformiamo il lavoro quotidiano.', en: 'We transform everyday work.' },
    'chi.vision.p1':    { it: 'Le PMI italiane sono la spina dorsale dell\u2019economia del paese. Eppure passano ancora ore ogni settimana su lavoro manuale ripetitivo: rincorrere fatture, copiare dati tra strumenti, rispondere alle stesse domande, reinserire informazioni che dovrebbero gi\u00e0 esistere da qualche parte.', en: 'Italian SMBs are the backbone of the country\u2019s economy. Yet they still spend hours every week on repetitive manual work: chasing invoices, copying data between tools, answering the same questions, re\u2011entering information that should already exist somewhere.' },
    'chi.vision.p2':    { it: 'Il software pronto raramente calza. La consulenza enterprise \u00e8 fuori portata. Risultato: un divario di produttivit\u00e0 che si allarga ogni anno. Faperia esiste per chiudere quel divario, una routine alla volta.', en: 'Off\u2011the\u2011shelf software rarely fits. Enterprise consulting is out of reach. The result: a productivity gap that grows wider every year. Faperia exists to close that gap, one routine at a time.' },

    'chi.diff.eyebrow': { it: 'COME LAVORIAMO', en: 'HOW WE WORK' },
    'chi.diff.h':       { it: 'Cinque scelte che facciamo, ogni volta.', en: 'Five choices we make, every time.' },
    'chi.d1.h': { it: 'Embedded, non bolted on', en: 'Embedded, not bolted on' },
    'chi.d1.b': { it: 'Costruiamo soluzioni che vivono dentro i flussi reali, non in sistemi paralleli che il tuo team deve ricordarsi di usare.', en: 'We build solutions that live inside real workflows, not parallel systems your team has to remember to use.' },
    'chi.d2.h': { it: 'Outcome\u2011first', en: 'Outcome\u2011first' },
    'chi.d2.b': { it: 'Ogni intervento \u00e8 misurato su un risultato concreto: ore restituite, errori ridotti, tempo di risposta tagliato, ricavi catturati.', en: 'Every engagement is measured by a concrete result: hours given back, errors reduced, response time cut, revenue captured.' },
    'chi.d3.h': { it: 'Contesto italiano', en: 'Italian context' },
    'chi.d3.b': { it: 'Conosciamo lo stack che usate davvero \u2014 fatturazione elettronica, SDI, gestionali, sistemi bancari regionali \u2014 e progettiamo intorno.', en: 'We know the stack you actually use \u2014 fatturazione elettronica, SDI, gestionali, regional banking \u2014 and design around it.' },
    'chi.d4.h': { it: 'AI dove serve, automazione semplice quando basta', en: 'AI where it earns its place' },
    'chi.d4.b': { it: 'Usiamo AI quando si guadagna lo spazio. Quando un\u2019automazione semplice basta, spediamo un\u2019automazione semplice.', en: 'We use AI when it earns its place. When a simple automation does the job, we ship a simple automation.' },
    'chi.d5.h': { it: 'Documentato, tuo, fatto per crescere', en: 'Documented, yours, built to grow' },
    'chi.d5.b': { it: 'Le soluzioni sono documentate, di propriet\u00e0 del cliente e progettate per evolversi insieme al business. Niente lock\u2011in.', en: 'Solutions are documented, owned by the customer, and designed to grow with the business. No lock\u2011in.' },

    'chi.voice.eyebrow':{ it: 'LA VOCE', en: 'THE VOICE' },
    'chi.voice.h':      { it: 'Pratici, mai gridati.', en: 'Practical, never loud.' },
    'chi.voice.p':      { it: 'Niente parole gonfiate. Niente punti esclamativi. I numeri parlano da soli, e il valore si vede nel risultato \u2014 non nel pitch.', en: 'No inflated words. No exclamation marks. The numbers speak for themselves, and value shows up in the result \u2014 not in the pitch.' },
    'chi.voice.l1':     { it: 'Pratici, non hype', en: 'Practical, not hype' },
    'chi.voice.l2':     { it: 'Caldi, non corporate', en: 'Warm, not corporate' },
    'chi.voice.l3':     { it: 'Italiani nel sentire, globali nella forma', en: 'Italian in feel, global in form' },
    'chi.voice.l4':     { it: 'Outcome\u2011first, mai feature\u2011first', en: 'Outcome\u2011first, never feature\u2011first' },
    'chi.voice.l5':     { it: 'Embedded, mai bolted on', en: 'Embedded, never bolted on' },

    'chi.team.eyebrow': { it: 'IL TEAM', en: 'THE TEAM' },
    'chi.team.h':       { it: 'Un team piccolo, vicino ai clienti.', en: 'A small team, close to the customer.' },
    'chi.team.p':       { it: 'Faperia \u00e8 fondato e guidato direttamente \u2014 nessun livello tra te e chi costruisce. Ogni audit \u00e8 condotto da una delle persone che firmer\u00e0 anche l\u2019implementazione, se ci sar\u00e0.', en: 'Faperia is founded and run directly \u2014 no layers between you and the people who build. Every audit is led by someone who would also sign the implementation, if it happens.' },

    'chi.cta.h':        { it: 'Iniziamo dall\u2019audit.', en: 'Let\u2019s start with the audit.' },
    'chi.cta.p':        { it: 'Cinque giorni, prezzo bloccato, e una decisione chiara di cosa fare \u2014 con noi o senza.', en: 'Five days, locked price, and a clear decision on what to do \u2014 with us or without.' },

    /* ===================== CONTATTI ===================== */
    'cont.title':       { it: 'Contatti \u2014 Faperia', en: 'Contact \u2014 Faperia' },
    'cont.meta':        { it: 'Prenota un audit Faperia o scrivici per qualsiasi domanda.', en: 'Book a Faperia audit or get in touch with any question.' },

    'cont.hero.h1':     { it: 'Parliamone.', en: 'Let\u2019s talk.' },
    'cont.hero.lead':   { it: 'Compila il modulo qui sotto per prenotare un audit, oppure scrivici direttamente. Rispondiamo entro <strong>24 ore lavorative</strong>.', en: 'Fill the form below to book an audit, or write to us directly. We reply within <strong>24 working hours</strong>.' },

    'cont.form.h':      { it: 'Scrivi a Faperia', en: 'Write to Faperia' },
    'cont.form.intent.l':   { it: 'Cosa ti serve', en: 'What you need' },
    'cont.form.intent.o1':  { it: 'Voglio prenotare l\u2019audit (\u20ac250)', en: 'I want to book the audit (\u20ac250)' },
    'cont.form.intent.o2':  { it: 'Una domanda generale', en: 'A general question' },
    'cont.form.intent.o3':  { it: 'Sono un commercialista o un partner', en: 'I\u2019m an accountant or partner' },
    'cont.form.name.l':     { it: 'Nome e cognome', en: 'First and last name' },
    'cont.form.email.l':    { it: 'Email', en: 'Email' },
    'cont.form.business.l': { it: 'Nome dell\u2019azienda', en: 'Business name' },
    'cont.form.message.l':  { it: 'Raccontaci in due righe', en: 'Tell us in two lines' },
    'cont.form.message.p':  { it: 'Cosa fa la tua azienda e cosa ti pesa di pi\u00f9 oggi?', en: 'What does your business do, and what weighs on you most today?' },
    'cont.form.submit':     { it: 'Invia richiesta', en: 'Send request' },
    'cont.form.note':       { it: 'Cliccando \u201cInvia\u201d apriamo il tuo client di posta con il messaggio precompilato. Nessun dato viene salvato sul nostro server.', en: 'Clicking \u201cSend\u201d opens your email client with the pre\u2011filled message. No data is stored on our server.' },

    'cont.info.email.h':    { it: 'Email', en: 'Email' },
    'cont.info.email.p':    { it: 'Risposta entro 24 ore lavorative.', en: 'Response within 24 working hours.' },
    'cont.info.studio.h':   { it: 'Studio', en: 'Studio' },
    'cont.info.studio.p':   { it: 'Umbria, Italia. Visite su appuntamento.', en: 'Umbria, Italy. Visits by appointment.' },
    'cont.info.partners.h': { it: 'Commercialisti e partner', en: 'Accountants and partners' },
    'cont.info.partners.p': { it: 'Lavoriamo volentieri con commercialisti e consulenti che vogliono offrire automazione ai loro clienti.', en: 'We\u2019re glad to work with accountants and consultants who want to offer automation to their clients.' },
    'cont.info.social.h':   { it: 'Social', en: 'Social' },
    'cont.form.intent.placeholder': { it: 'Seleziona\u2026', en: 'Select\u2026' },

    /* ===================== QUESTIONNAIRE (home) ===================== */
    'quiz.eyebrow':     { it: 'QUESTIONARIO', en: 'QUESTIONNAIRE' },
    'quiz.heading':     { it: 'Raccontaci la tua operativit\u00e0 in due minuti.', en: 'Tell us about your operations in two minutes.' },
    'quiz.lead':        { it: 'Quattro passaggi rapidi. Ti rispondiamo entro 24 ore con i prossimi passi, senza impegno.', en: 'Four quick steps. We reply within 24 hours with next steps, no obligation.' },

    'quiz.s1.tab':      { it: 'Contatti', en: 'Contact' },
    'quiz.s2.tab':      { it: 'Azienda', en: 'Company' },
    'quiz.s3.tab':      { it: 'Interesse', en: 'Interest' },
    'quiz.s4.tab':      { it: 'Messaggio', en: 'Message' },

    'quiz.s1.title':    { it: 'I tuoi contatti', en: 'Your contacts' },
    'quiz.s2.title':    { it: 'La tua azienda', en: 'Your company' },
    'quiz.s3.title':    { it: 'Interesse e colli di bottiglia', en: 'Interest and bottlenecks' },
    'quiz.s4.title':    { it: 'Un ultimo messaggio', en: 'One last message' },

    'quiz.f.name':      { it: 'Nome e cognome *', en: 'Full name *' },
    'quiz.f.email':     { it: 'Email *', en: 'Email *' },
    'quiz.f.company':   { it: 'Azienda *', en: 'Company *' },
    'quiz.f.phone':     { it: 'Telefono (opzionale)', en: 'Phone (optional)' },

    'quiz.f.sector':    { it: 'Settore *', en: 'Sector *' },
    'quiz.f.size':      { it: 'Dimensione *', en: 'Size *' },
    'quiz.opt.placeholder': { it: 'Seleziona\u2026', en: 'Select\u2026' },
    'quiz.sector.manifattura': { it: 'Manifattura', en: 'Manufacturing' },
    'quiz.sector.commercio':   { it: 'Commercio / Retail', en: 'Retail / Commerce' },
    'quiz.sector.servizi':     { it: 'Servizi', en: 'Services' },
    'quiz.sector.ecommerce':   { it: 'E-commerce', en: 'E-commerce' },
    'quiz.sector.edilizia':    { it: 'Edilizia / Impianti', en: 'Construction / Installations' },
    'quiz.sector.food':        { it: 'Food &amp; Beverage', en: 'Food &amp; Beverage' },
    'quiz.sector.finanza':     { it: 'Finanza / Contabilità', en: 'Finance / Accounting' },
    'quiz.sector.altro':       { it: 'Altro', en: 'Other' },
    'quiz.f.sectorOther':      { it: 'Descrivi brevemente la tua attività *', en: 'Briefly describe your business *' },
    'quiz.f.sectorOther.p':    { it: 'Di cosa si occupa la tua azienda?', en: 'What does your company do?' },
    'quiz.size.s1':     { it: '1\u20135 dipendenti', en: '1\u20135 employees' },
    'quiz.size.s2':     { it: '6\u201320 dipendenti', en: '6\u201320 employees' },
    'quiz.size.s3':     { it: '21\u201350 dipendenti', en: '21\u201350 employees' },
    'quiz.size.s4':     { it: '50+ dipendenti', en: '50+ employees' },

    'quiz.f.interest':  { it: 'A cosa sei interessato? *', en: 'What are you interested in? *' },
    'quiz.int.audit':   { it: 'Audit Express \u2014 <strong>\u20ac250</strong>', en: 'Audit Express \u2014 <strong>\u20ac250</strong>' },
    'quiz.int.quickwin':{ it: 'Quick Win', en: 'Quick Win' },
    'quiz.int.ops':     { it: 'Operations Upgrade', en: 'Operations Upgrade' },
    'quiz.int.unsure':  { it: 'Non so ancora', en: 'Not sure yet' },

    'quiz.f.tools':     { it: 'Strumenti che usi oggi', en: 'Tools you use today' },
    'quiz.tool.gestionale': { it: 'Gestionale', en: 'ERP / management system' },
    'quiz.tool.crm':    { it: 'CRM', en: 'CRM' },
    'quiz.tool.email':  { it: 'Email', en: 'Email' },
    'quiz.tool.ecommerce': { it: 'E-commerce', en: 'E-commerce' },
    'quiz.tool.excel':  { it: 'Excel / fogli', en: 'Excel / spreadsheets' },
    'quiz.tool.contabilita': { it: 'Software di contabilità', en: 'Accounting software' },
    'quiz.tool.altro':  { it: 'Altro', en: 'Other' },

    'quiz.f.bottleneck':   { it: 'Secondo te, qual \u00e8 il collo di bottiglia principale?', en: 'In your opinion, what is your main bottleneck?' },
    'quiz.f.bottleneck.p': { it: 'Dove si perde pi\u00f9 tempo oggi?', en: 'Where is the most time lost today?' },
    'quiz.f.routine':      { it: 'C\u2019\u00e8 un\u2019attivit\u00e0 ripetitiva che svolgi o produci spesso? Descrivila e dicci ogni quanto la fai', en: 'Is there a repetitive task you carry out or produce often? Describe it and tell us how frequently' },
    'quiz.f.routine.hint': { it: 'Per esempio: preparare a mano file Excel per scambiarli, correggerli o cambiarne il formato prima di importarli in un altro software; creare report diversi cambiando le query su dati che arrivano da sistemi separati; gestire la chat o il software di vendita per rispondere alle richieste reali dei clienti; organizzare il flusso documentale e l\u2019archiviazione sicura per categorie, cos\u00ec da ritrovare tutto facilmente; inserire dati nel gestionale ogni giorno.', en: 'For example: manually preparing Excel files to exchange, correct or reformat them before importing into another software; building different reports by changing queries on data coming from separate systems; running the sales chat or software to meet real customer requests; organising document flow and safe storage by category so everything is easy to find; entering data into your software every day.' },
    'quiz.f.routine.p':    { it: 'Descrivi l\u2019attivit\u00e0 e con quale frequenza (ogni giorno, ogni settimana\u2026)', en: 'Describe the task and how often (daily, weekly\u2026)' },
    'quiz.f.message':      { it: 'Raccontaci in due righe', en: 'Tell us in a couple of lines' },
    'quiz.f.message.p':    { it: 'Cosa fa la tua azienda e cosa vorresti migliorare?', en: 'What does your company do and what would you improve?' },
    'quiz.f.consent':      { it: 'Acconsento al trattamento dei miei dati per essere ricontattato, secondo la <a href="privacy.html" target="_blank" rel="noopener">privacy policy</a>. *', en: 'I consent to the processing of my data to be contacted, per the <a href="privacy.html" target="_blank" rel="noopener">privacy policy</a>. *' },

    'quiz.prev':        { it: 'Indietro', en: 'Back' },
    'quiz.next':        { it: 'Avanti', en: 'Next' },
    'quiz.submit':      { it: 'Invia richiesta', en: 'Send request' },

    /* ---- Privacy policy page ---- */
    'priv.title':    { it: 'Privacy Policy — Faperia', en: 'Privacy Policy — Faperia' },
    'priv.meta':     { it: 'Come Faperia raccoglie, usa e protegge i tuoi dati personali.', en: 'How Faperia collects, uses and protects your personal data.' },
    'priv.hero.h1':  { it: 'Privacy Policy', en: 'Privacy Policy' },
    'priv.hero.lead':{ it: 'Questa pagina spiega quali dati personali raccogliamo attraverso questo sito, perché li raccogliamo e come li trattiamo. Ultimo aggiornamento: <strong>3 luglio 2026</strong>.', en: 'This page explains what personal data we collect through this website, why we collect it and how we handle it. Last updated: <strong>3 July 2026</strong>.' },

    'priv.s1.h': { it: 'Titolare del trattamento', en: 'Data controller' },
    'priv.s1.b': { it: 'Il titolare del trattamento è <strong>Faperia</strong> (Umbria, Italia). Per qualsiasi richiesta relativa ai tuoi dati puoi scriverci tramite la <a href="contatti.html">pagina contatti</a>.', en: 'The data controller is <strong>Faperia</strong> (Umbria, Italy). For any request concerning your data you can reach us via the <a href="contatti.html">contact page</a>.' },

    'priv.s2.h': { it: 'Quali dati raccogliamo', en: 'What data we collect' },
    'priv.s2.b': { it: '<strong>Questionario e moduli di contatto:</strong> nome, email, azienda, telefono (facoltativo), settore, dimensione, interesse, strumenti usati e il messaggio che scrivi. Li raccogliamo solo se compili e invii un modulo.<br><br><strong>Chat:</strong> i messaggi che invii all’assistente sul sito, usati solo per generare la risposta.<br><br><strong>Dati tecnici:</strong> l’indirizzo IP viene usato in forma temporanea per limitare l’abuso dei moduli (rate limiting) e non viene associato al tuo profilo.', en: '<strong>Questionnaire and contact forms:</strong> name, email, company, phone (optional), sector, company size, interest, tools used and the message you write. We collect them only if you fill in and submit a form.<br><br><strong>Chat:</strong> the messages you send to the on-site assistant, used only to generate the reply.<br><br><strong>Technical data:</strong> your IP address is used temporarily to limit form abuse (rate limiting) and is not linked to your profile.' },

    'priv.s3.h': { it: 'Perché li usiamo', en: 'Why we use it' },
    'priv.s3.b': { it: 'Usiamo i dati esclusivamente per <strong>rispondere alla tua richiesta</strong> e ricontattarti in merito ai nostri servizi. Base giuridica: il tuo consenso (art. 6.1.a GDPR) e le misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR). Nessuna profilazione, nessuna cessione a terzi per marketing.', en: 'We use your data exclusively to <strong>answer your request</strong> and get back to you about our services. Legal basis: your consent (art. 6.1.a GDPR) and pre-contractual steps taken at your request (art. 6.1.b GDPR). No profiling, no sale or transfer to third parties for marketing.' },

    'priv.s4.h': { it: 'Dove sono conservati', en: 'Where it is stored' },
    'priv.s4.b': { it: 'Il sito e i moduli sono gestiti tramite l’infrastruttura di <strong>Cloudflare</strong> (hosting, elaborazione e database), che agisce come responsabile del trattamento. Se in futuro attiveremo notifiche email, i dati potranno transitare da un fornitore di invio email, sempre nel rispetto del GDPR.', en: 'The website and its forms run on <strong>Cloudflare</strong> infrastructure (hosting, processing and database), acting as data processor. If we enable email notifications in the future, data may pass through an email delivery provider, always in compliance with the GDPR.' },

    'priv.s5.h': { it: 'Per quanto tempo', en: 'For how long' },
    'priv.s5.b': { it: 'Conserviamo i dati per il tempo necessario a gestire la tua richiesta e l’eventuale rapporto di lavoro che ne segue. Puoi chiederne la cancellazione in qualsiasi momento.', en: 'We keep your data for as long as needed to handle your request and any working relationship that follows. You can ask for deletion at any time.' },

    'priv.s6.h': { it: 'I tuoi diritti', en: 'Your rights' },
    'priv.s6.b': { it: 'Ai sensi degli artt. 15–22 GDPR puoi chiedere in qualsiasi momento: accesso ai tuoi dati, rettifica, cancellazione, limitazione del trattamento, opposizione e portabilità. Puoi inoltre revocare il consenso e presentare reclamo al <strong>Garante per la protezione dei dati personali</strong>.', en: 'Under articles 15–22 GDPR you can at any time request: access to your data, rectification, deletion, restriction of processing, objection and portability. You can also withdraw your consent and lodge a complaint with the Italian data protection authority (<strong>Garante per la protezione dei dati personali</strong>).' },

    'priv.s7.h': { it: 'Cookie e archiviazione locale', en: 'Cookies and local storage' },
    'priv.s7.b': { it: 'Questo sito <strong>non usa cookie di profilazione né strumenti di tracciamento</strong>. Salviamo nel tuo browser (localStorage) solo la lingua scelta. I font e le librerie grafiche sono caricati da CDN esterne (Google Fonts, Cloudflare), che possono registrare l’IP della richiesta.', en: 'This website <strong>uses no profiling cookies and no tracking tools</strong>. We only store your language preference in your browser (localStorage). Fonts and graphics libraries are loaded from external CDNs (Google Fonts, Cloudflare), which may log the request IP.' },

    'priv.s8.h': { it: 'Domande', en: 'Questions' },
    'priv.s8.b': { it: 'Per qualsiasi dubbio su questa policy o sui tuoi dati, scrivici dalla <a href="contatti.html">pagina contatti</a>. Rispondiamo entro <strong>24 ore lavorative</strong>.', en: 'For any question about this policy or your data, write to us via the <a href="contatti.html">contact page</a>. We reply within <strong>24 business hours</strong>.' }
  };

  /* ---------------- Apply translations ---------------- */
  const STORAGE_KEY = 'faperia-lang';

  function currentLang() {
    return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'it';
  }

  function applyTranslations(lang) {
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const entry = T[key];
      if (!entry || !entry[lang]) return;
      el.innerHTML = entry[lang];
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        const entry = T[key];
        if (!entry || !entry[lang] || !attr) return;
        el.setAttribute(attr, entry[lang].replace(/<[^>]+>/g, ''));
      });
    });

    document.querySelectorAll('.lang-toggle button').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n');
      if (T[key] && T[key][lang]) {
        document.title = T[key][lang].replace(/<[^>]+>/g, '');
      }
    }
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyTranslations(lang);
  }

  /* ---------------- Boot ---------------- */
  document.addEventListener('DOMContentLoaded', () => {

    /* Language: read storage, apply once */
    let lang = 'it';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'it') lang = stored;
    } catch (e) {}
    applyTranslations(lang);

    /* Toggle clicks */
    document.querySelectorAll('.lang-toggle button').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
    });

    /* Mobile nav */
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('mainNav');
    if (hamburger && nav) {
      hamburger.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        hamburger.classList.toggle('is-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      nav.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
          nav.classList.remove('is-open');
          hamburger.classList.remove('is-open');
          document.body.style.overflow = '';
        });
      });
    }

    /* Header scrolled state */
    const header = document.querySelector('.header');
    if (header) {
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* GSAP reveals (with reduced-motion fallback) */
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    } else if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      document.querySelectorAll('.reveal').forEach((el) => {
        window.ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => el.classList.add('visible')
        });
      });
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    }

    /* Contact form -> mailto fallback */
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const lang2 = currentLang();
        const intent = (data.get('intent') || '').toString();
        const name = (data.get('name') || '').toString().trim();
        const email = (data.get('email') || '').toString().trim();
        const business = (data.get('business') || '').toString().trim();
        const message = (data.get('message') || '').toString().trim();

        const subjectIt = `[Faperia] ${intent || 'Richiesta'} \u2014 ${business || name}`;
        const subjectEn = `[Faperia] ${intent || 'Request'} \u2014 ${business || name}`;
        const subject = lang2 === 'en' ? subjectEn : subjectIt;

        const bodyLines = lang2 === 'en'
          ? [
              `Name: ${name}`,
              `Email: ${email}`,
              `Business: ${business}`,
              `Intent: ${intent}`,
              '',
              'Message:',
              message
            ]
          : [
              `Nome: ${name}`,
              `Email: ${email}`,
              `Azienda: ${business}`,
              `Richiesta: ${intent}`,
              '',
              'Messaggio:',
              message
            ];

        const mailto = 'mailto:hello@faperia.it'
          + '?subject=' + encodeURIComponent(subject)
          + '&body=' + encodeURIComponent(bodyLines.join('\n'));

        window.location.href = mailto;

        const status = document.getElementById('formStatus');
        if (status) {
          status.textContent = lang2 === 'en'
            ? 'Opening your email client\u2026 if nothing happens, write to hello@faperia.it'
            : 'Apertura del client email\u2026 se non succede nulla, scrivici a hello@faperia.it';
        }
      });
    }

    /* Lead questionnaire (multi-step) -> Worker POST, mailto fallback */
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
      const LEAD_API = 'https://faperia-chat.nikita-zakaidze.workers.dev/lead';
      const steps = Array.prototype.slice.call(leadForm.querySelectorAll('.quiz-step'));
      const dots = Array.prototype.slice.call(document.querySelectorAll('.quiz-dot'));
      const card = leadForm.closest('.quiz-card');
      const prevBtn = document.getElementById('quizPrev');
      const nextBtn = document.getElementById('quizNext');
      const submitBtn = document.getElementById('quizSubmit');
      const curEl = document.getElementById('quizCurrent');
      const statusEl = document.getElementById('leadStatus');
      const total = steps.length;
      let idx = 0;

      // Step 2: reveal the free-text business description only when "Other" sector is chosen,
      // and make it required only while visible so it counts as a mandatory field.
      const sectorSel = leadForm.querySelector('#q-sector');
      const sectorOtherField = document.getElementById('q-sector-other-field');
      const sectorOtherInput = document.getElementById('q-sector-other');
      function syncSectorOther() {
        if (!sectorSel || !sectorOtherField || !sectorOtherInput) return;
        const v = sectorSel.value;
        const isOther = v === 'Altro' || v === 'Other';
        sectorOtherField.hidden = !isOther;
        sectorOtherInput.required = isOther;
        if (!isOther) sectorOtherInput.value = '';
      }
      if (sectorSel) sectorSel.addEventListener('change', syncSectorOther);
      syncSectorOther();

      const msg = (it, en) => (currentLang() === 'en' ? en : it);
      const fieldsOf = (step) => step.querySelectorAll('input, select, textarea');
      // Trim text entries so a whitespace-only value can't satisfy a required field.
      const trimFields = (step) => {
        Array.prototype.forEach.call(fieldsOf(step), (f) => {
          if (f.value && (f.tagName === 'TEXTAREA' || f.type === 'text' || f.type === 'email' || f.type === 'tel')) {
            f.value = f.value.trim();
          }
        });
      };
      const stepValid = (n) => {
        trimFields(steps[n]);
        return Array.prototype.every.call(fieldsOf(steps[n]), (f) => f.checkValidity());
      };
      const reportStep = (n) => {
        trimFields(steps[n]);
        const invalid = Array.prototype.find.call(fieldsOf(steps[n]), (f) => !f.checkValidity());
        if (invalid) { invalid.reportValidity(); return false; }
        return true;
      };

      function showStep(n) {
        idx = Math.max(0, Math.min(n, total - 1));
        steps.forEach((s, i) => {
          const on = i === idx;
          s.classList.toggle('is-active', on);
          if (on) s.removeAttribute('hidden'); else s.setAttribute('hidden', '');
        });
        dots.forEach((d, i) => {
          d.classList.toggle('is-active', i === idx);
          d.classList.toggle('is-done', i < idx);
        });
        if (curEl) curEl.textContent = String(idx + 1);
        const last = idx === total - 1;
        if (prevBtn) prevBtn.hidden = idx === 0;
        if (nextBtn) nextBtn.hidden = last;
        if (submitBtn) submitBtn.hidden = !last;
        if (statusEl) statusEl.textContent = '';
      }

      if (nextBtn) nextBtn.addEventListener('click', () => {
        if (reportStep(idx)) showStep(idx + 1);
      });
      if (prevBtn) prevBtn.addEventListener('click', () => showStep(idx - 1));

      leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        for (let i = 0; i < total; i++) {
          if (!stepValid(i)) { showStep(i); reportStep(i); return; }
        }

        const data = new FormData(leadForm);
        const lang2 = currentLang();
        const payload = {
          lang: lang2,
          name: (data.get('name') || '').toString().trim(),
          email: (data.get('email') || '').toString().trim(),
          company: (data.get('company') || '').toString().trim(),
          phone: (data.get('phone') || '').toString().trim(),
          sector: (data.get('sector') || '').toString(),
          sectorOther: (data.get('sectorOther') || '').toString().trim(),
          size: (data.get('size') || '').toString(),
          interest: (data.get('interest') || '').toString(),
          tools: data.getAll('tools').map(String),
          bottleneck: (data.get('bottleneck') || '').toString().trim(),
          routine: (data.get('routine') || '').toString().trim(),
          message: (data.get('message') || '').toString().trim(),
          consent: !!data.get('consent'),
          page: location.pathname,
          url: location.href
        };

        if (statusEl) statusEl.textContent = msg('Invio in corso\u2026', 'Sending\u2026');
        if (submitBtn) submitBtn.disabled = true;

        const finishOk = () => {
          if (card) card.classList.add('is-done');
          if (submitBtn) { submitBtn.hidden = true; submitBtn.disabled = false; }
          if (nextBtn) nextBtn.hidden = true;
          if (prevBtn) prevBtn.hidden = true;
          if (statusEl) statusEl.textContent = msg(
            'Grazie. Abbiamo ricevuto la tua richiesta e ti rispondiamo entro 24 ore.',
            'Thank you. We received your request and will reply within 24 hours.'
          );
        };

        const fallbackMailto = () => {
          const subject = '[Faperia] ' + msg('Questionario', 'Questionnaire')
            + ' \u2014 ' + (payload.company || payload.name);
          const lines = [
            msg('Nome', 'Name') + ': ' + payload.name,
            'Email: ' + payload.email,
            msg('Azienda', 'Company') + ': ' + payload.company,
            msg('Telefono', 'Phone') + ': ' + payload.phone,
            msg('Settore', 'Sector') + ': ' + payload.sector,
            payload.sectorOther ? msg('Dettaglio attività', 'Business detail') + ': ' + payload.sectorOther : null,
            msg('Dimensione', 'Size') + ': ' + payload.size,
            msg('Interesse', 'Interest') + ': ' + payload.interest,
            msg('Strumenti', 'Tools') + ': ' + payload.tools.join(', '),
            msg('Collo di bottiglia', 'Bottleneck') + ': ' + payload.bottleneck,
            msg('Attività ripetitiva', 'Repetitive task') + ': ' + payload.routine,
            '',
            msg('Messaggio', 'Message') + ':',
            payload.message
          ];
          window.location.href = 'mailto:hello@faperia.it'
            + '?subject=' + encodeURIComponent(subject)
            + '&body=' + encodeURIComponent(lines.filter((l) => l !== null).join('\n'));
          if (statusEl) statusEl.textContent = msg(
            'Apertura del client email\u2026 se non succede nulla, scrivici a hello@faperia.it',
            'Opening your email client\u2026 if nothing happens, write to hello@faperia.it'
          );
          if (submitBtn) submitBtn.disabled = false;
        };

        fetch(LEAD_API, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then((resp) => resp.json().then((j) => ({ ok: resp.ok && j && j.ok })).catch(() => ({ ok: false })))
          .then((res) => { if (res.ok) finishOk(); else fallbackMailto(); })
          .catch(() => fallbackMailto());
      });

      showStep(0);
    }
  });
})();
