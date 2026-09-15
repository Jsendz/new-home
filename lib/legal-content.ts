// Content for the three footer-only legal pages (legal notice, privacy
// policy, cookie policy). Kept as plain structured data — rather than in
// messages/*.json — because it's long-form prose, not short UI strings.
//
// cookie_policy and privacy_policy content was supplied in full by the
// business owner and published as given (privacy_policy intentionally
// references a different address/domain/jurisdiction than the rest of
// this site — confirmed, not a bug). legal_notice is still a DRAFT built
// from facts already public elsewhere on this site, with a `placeholders`
// entry for anything only the business owner (or their lawyer) can supply
// — have that one reviewed before treating it as final.

export interface LegalSubsection {
  heading: string;
  body: string[];
}

export interface LegalTable {
  columns: string[];
  rows: string[][];
}

export interface LegalSection {
  heading: string;
  /** Paragraphs before the list/table. */
  body?: string[];
  list?: string[];
  table?: LegalTable;
  /** Paragraphs after the list/table (sections often close with a couple
   *  more numbered points once the bulleted/tabular part is done). */
  afterList?: string[];
  subsections?: LegalSubsection[];
}

export interface LegalDocument {
  pageLabel: string;
  title: string;
  updated: string;
  intro?: string[];
  sections: LegalSection[];
  links?: { label: string; url: string }[];
  /** Rendered as visible amber callouts — facts only the business owner
   *  (or their lawyer) can supply, not invented by us. */
  placeholders?: string[];
}

export interface LegalLocaleContent {
  legal_notice: LegalDocument;
  privacy_policy: LegalDocument;
  cookie_policy: LegalDocument;
}

const AGENCY_NAME = "The Sweet Home Co.";
const AGENCY_ADDRESS = "Avinguda Meritxell, 1, AD500 Andorra la Vella, Andorra";
const AGENCY_PHONE = "+376 800 100";
const AGENCY_EMAIL = "info@thesweethomeco.ad";

export const LEGAL_CONTENT: Record<string, LegalLocaleContent> = {
  en: {
    legal_notice: {
      pageLabel: "Legal",
      title: "Legal Notice",
      updated: "Last updated: 2026",
      sections: [
        {
          heading: "1. Website owner",
          body: [
            `This website is owned and operated by ${AGENCY_NAME}, with registered address at ${AGENCY_ADDRESS}.`,
            `Contact: ${AGENCY_EMAIL} · ${AGENCY_PHONE}`,
          ],
        },
        {
          heading: "2. Purpose of this website",
          body: [
            "This website provides information about residential properties for sale and rent in Andorra, and allows visitors to contact the agency and request information about specific listings.",
          ],
        },
        {
          heading: "3. Conditions of use",
          body: [
            "By using this website, you agree to do so lawfully and in good faith, and not to use it in any way that could damage, disable, or impair the site or interfere with any other party's use of it.",
          ],
        },
        {
          heading: "4. Intellectual property",
          body: [
            `All content on this website — including text, photographs, graphics, logos, and design — is owned by or licensed to ${AGENCY_NAME} and may not be reproduced, distributed, or used without prior written permission.`,
          ],
        },
        {
          heading: "5. Liability",
          body: [
            "We take reasonable care to keep listing information accurate and up to date, but property details (price, availability, features) are subject to change and should be confirmed directly with the agency before making any decision. We do not guarantee uninterrupted or error-free access to this website.",
          ],
        },
        {
          heading: "6. Applicable law and jurisdiction",
          body: [
            "These terms are governed by the applicable law of the jurisdiction in which the business is registered.",
          ],
        },
      ],
      placeholders: [
        "Company registration / tax identification number (NRT), to be added to Section 1.",
        "Confirm the governing law and competent courts for Section 6.",
      ],
    },
    privacy_policy: {
      pageLabel: "Legal",
      title: "Privacy Policy",
      updated: "Last updated: 2026",
      intro: [
        "The Sweet Home, headquartered at C/Roc de l'Aldias, nº7, esc.B, Planta Baixa and VAT number [see note below], is the owner of the domain www.thesweethomecompany.com, where its WEBSITE is hosted.",
        "The Sweet Home IS COMMITTED TO PROTECTING THE PRIVACY AND PERSONAL DATA OF ITS CUSTOMERS AND WEBSITE USERS. THEREFORE, IT HAS DEVELOPED AND ADOPTED THE PRESENT POLICY AND THE PRACTICES DESCRIBED HEREIN.",
        "THIS PRIVACY POLICY EXPLAINS HOW YOUR PERSONAL DATA IS COLLECTED AND PROCESSED, AND WE ADVISE YOU TO READ IT TO UNDERSTAND THE CONDITIONS UNDER WHICH YOUR PERSONAL DATA IS COLLECTED AND USED.",
        "Our privacy policy is in accordance with the applicable Portuguese legislation, namely Law No. 58/2019 of August 8 on the Protection of Personal Data, other applicable national laws, and the General Data Protection Regulation (GDPR) 2016/679 of April 27. Data protection legislation is subject to review, and we recommend that users regularly consult our privacy statement. For reference, you can visit the website www.cnpd.pt. This website complies with national and community legislation. Portuguese courts will have exclusive jurisdiction over any dispute arising from the use of this website.",
      ],
      sections: [
        {
          heading: "1. What does this policy cover?",
          body: [
            "1.1. This Privacy Policy explains how we collect and process the personal data necessary for the provision of services available through the WEBSITE.",
            "1.2. Examples of these services include subscribing to newsletters or contacting us and sending us your application.",
            "1.3. The aim is to provide these services in an efficient and hassle-free manner, describing the practices adopted for this purpose.",
          ],
        },
        {
          heading: "2. What are personal data?",
          body: [
            "2.1. Personal data refers to any information relating to a person that identifies or can identify them, regardless of the nature and medium of the information, including sound and image.",
            "2.2. Examples of personal data we collect include name, surname, email, and telephone or mobile number.",
            "2.3. Identifiable means a person who can be identified directly or indirectly, in particular by reference to an identification number or other specific elements of their physical, physiological, mental, economic, cultural, or social identity.",
          ],
        },
        {
          heading: "3. How will we use your personal data?",
          body: ["3.1. The Sweet Home will use the personal data you provide us for the following purposes:"],
          list: [
            "(a) To analyze and respond to your messages, customer support, and information requests;",
            "(b) To analyze and process your job application to work with The Sweet Home;",
            "(c) To send newsletters or other publications that you have requested and/or may be of interest to you;",
            "(d) For website management operations;",
            "(e) To maintain a record of your contact details;",
            "(f) For business purposes such as data analysis, audits;",
            "(g) For fraud prevention and security of information systems;",
            "(h) To adapt, improve, and modify services, including the identification of usage trends or determining the effectiveness of promotional campaigns.",
          ],
          afterList: [
            "3.2. These personal data processing operations are essential for your satisfaction and for the activity of The Sweet Home, and they are carried out in accordance with applicable legislation and best practices.",
            "3.3. Your personal data will not be reused for purposes other than those previously identified or unrelated to the purposes for which they were initially collected.",
          ],
        },
        {
          heading: "4. What are the legal grounds for processing the personal data we collect?",
          body: [
            "4.1. The personal data processed by The Sweet Home have specific legal grounds depending on the purposes for which they are intended.",
            "4.2. In the following table, you can see the legal grounds according to the above-mentioned purposes:",
          ],
          table: {
            columns: ["Purpose", "Basis", "Collected data"],
            rows: [
              [
                "To analyse and respond to your messages, customer support and enquiries.",
                "Consent for this purpose.",
                "Name, phone number, email address.",
              ],
              [
                "So that we can send you newsletters or other publications that you have requested and/or that may be of your interest.",
                "Consent for this specific purpose.",
                "Email address.",
              ],
              [
                "For website management operations.",
                "Consent for this specific purpose (cookies); Legitimate interests pursued by The Sweet Home.",
                "Cookies, IP address",
              ],
              [
                "For commercial purposes, such as data analysis or audits.",
                "Consent for this specific purpose (cookies); Legitimate interests pursued by The Sweet Home.",
                "Cookies, IP address",
              ],
              [
                "For the fraud prevention and information systems security.",
                "Legitimate interests pursued by The Sweet Home.",
                "IP address",
              ],
              [
                "For the adaptation, improvement and modification of services, particularly by identifying user trends, or to determine the effectiveness of promotional campaigns.",
                "Consent for this specific purpose (cookies); Legitimate interests pursued by The Sweet Home.",
                "Cookies, IP address",
              ],
            ],
          },
        },
        {
          heading: "5. How do we collect your personal data?",
          body: [
            "5.1. We will collect your personal data through the forms on the WEBSITE, as well as through the WEBSITE itself and the communication it establishes with your device, and the email messages you send us.",
            "5.2. Your personal data is collected from your device in the following ways:",
          ],
          list: [
            "(a) Through your contact request;",
            "(b) Through the submission of an application;",
            "(c) Through your subscription to the newsletter;",
            "(d) Through your browser;",
            "(e) Through cookies;",
            "(f) IP address.",
          ],
          afterList: [
            "5.3. The Sweet Home is committed to treating your data in accordance with the law and in a legitimate manner.",
            "5.4. The Sweet Home will not sell, rent, or share your personal data with third parties, except in cases clearly identified in this Privacy Policy (see Point 9 to understand how).",
            "5.5. The Sweet Home services are not directed at minors, and intentional processing of personal data of minors is not carried out.",
          ],
        },
        {
          heading: "6. What are cookies?",
          body: [
            "6.1. Cookies are small information files that help identify your browser and can store information, such as User settings and preferences.",
            "6.2. The Sweet Home will store cookies on your device to personalize and facilitate navigation to the fullest extent, as well as for troubleshooting, statistics, quality assurance, and monitoring system security.",
            "6.3. Except for cookies specifically necessary for the performance of the website, the storage of other cookies will always depend on the User's acceptance and consent, which can be withdrawn at any time through specific browser tools.",
            "6.4. To learn more about the cookies we use, please refer to our Cookie Policy.",
          ],
        },
        {
          heading: "7. How do we protect your personal data?",
          body: [
            "7.1. Your personal data is kept secure through the adoption of various technical and organizational security measures that ensure that only Employees who need to access the data do so in accordance with established rules.",
            "7.2. To protect your personal data, we only rely on data center providers that offer adequate and documented security measures, including guarantees that your personal data is stored on servers maintained in controlled environments with limited access.",
            "7.3. Personal data is stored on secure servers located at PORTUGAL TELECOM DATA CENTER, S.A with tax identification number 510.030.785 and headquarters at Rua Data Center 6200-065 Covilhã, which provides us with appropriate security guarantees for protecting personal data against unauthorized disclosure, loss, misuse, alteration, unauthorized access, or any other form of unlawful processing.",
            "7.4. Similarly, when you browse the WEBSITE, we protect your data with encryption, such as Hyper Text Transfer Protocol Secure (HTTPS), which is an internet protocol that aims to establish communication between devices and servers worldwide. The HTTPS protocol emerged as an evolution of its predecessor, HTTP, and the difference between them is that HTTPS encrypts device communication.",
            "7.5. Although we take precautions and measures we consider appropriate to protect the personal data you provide and we collect, it should be noted that no security system is impenetrable.",
          ],
        },
        {
          heading: "8. How can you exercise your rights:",
          body: [
            "8.1. Before explaining how you can exercise your rights, it is important to know what they are. Therefore, the legislation grants you the right to request the exercise of the following rights:",
          ],
          list: [
            "(a) Access: the right to obtain confirmation as to whether personal data concerning you is being processed and, if so, the right to access your personal data;",
            "(b) Rectification: the right to obtain the rectification of inaccurate personal data concerning you and the right to have incomplete personal data completed;",
            "(c) Erasure: the right to obtain the erasure of your personal data when one of the reasons listed in the legislation applies;",
            "(d) Restriction of processing: the right to obtain the restriction of processing if one of the situations listed in the legislation applies;",
            "(e) Objection: the right to object at any time to the processing of personal data concerning you;",
            "(f) Portability: the right to receive the personal data concerning you in a structured, commonly used, and machine-readable format.",
          ],
          afterList: [
            "8.2. You also have the right to lodge a complaint with the competent supervisory authority (in Portugal, the National Data Protection Commission at www.cnpd.pt).",
            "8.3. To exercise the above-mentioned rights, please contact The Sweet Home via the following email: info@thesweethomecompany.com.",
            "8.4. If you request the deletion of some or all of your personal data, some of the requested services may not be provided to you, and The Sweet Home will retain only the personal data necessary to fulfill the legal obligations to which it is bound.",
          ],
        },
        {
          heading: "9. When do we disclose data to third parties?",
          body: [
            "9.1. The Sweet Home may rely on third parties for the provision of certain services, such as maintenance, technical support, marketing, billing, or payment management, and these third parties may have access to some personal data, namely, the data necessary for the contracted purposes.",
            "9.2. The Sweet Home ensures that the entities that have access to the data are credible and provide high guarantees of protection. They will not be provided with data beyond what is necessary for the provision of the contracted service, while The Sweet Home remains responsible for the personal data provided.",
            "9.3. The Sweet Home may also disclose data to third parties in the context of investigations, inquiries, judicial and/or administrative proceedings, or similar proceedings, provided that it is duly ordered to do so by a court order.",
          ],
        },
        {
          heading: "10. Third-party websites.",
          body: [
            "10.1. The WEBSITE may contain links to other websites that may collect and process your personal data. The processing of data on these websites is the sole responsibility of the owners of those websites, and The Sweet Home assumes no responsibility for their policies and/or practices.",
            "10.2. Examples of such third parties are Facebook, Instagram, YouTube, WhatsApp, and LinkedIn through the buttons present on the WEBSITE.",
          ],
        },
        {
          heading: "11. Data transfers outside the European Union.",
          body: [
            "11.1. In the event of data transfers to third countries outside the European Union, The Sweet Home will comply with legal requirements, particularly regarding the adequacy of the destination country with regard to the protection of personal data and the requirements applicable to such transfers. Personal data will not be transferred to jurisdictions that do not provide adequate security and protection guarantees.",
          ],
        },
        {
          heading: "12. Minors.",
          body: [
            "12.1. The WEBSITE is not intended for individuals under the age of 16, and we kindly request that minors do not provide us with personal data through the WEBSITE, application, social networks and social media, or emails.",
          ],
        },
        {
          heading: "13. Sensitive personal data.",
          body: [
            "13.1. The Sweet Home kindly requests that you do not send or disclose any sensitive personal data, meaning information that reveals racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic or biometric data, data concerning health, or data concerning a person's sex life or sexual orientation.",
            "13.2. If you still send or disclose such categories of personal data, they will be promptly deleted.",
          ],
        },
        {
          heading: "14. Changes to the Privacy Policy.",
          body: [
            "14.1. The Sweet Home reserves the right to readjust or change this Privacy Policy at any time, with such changes being advertised.",
          ],
        },
        {
          heading: "15. Our contact details.",
          body: [
            "15.1. If you have any questions or concerns regarding this Privacy Policy, please contact us in writing via email at info@thesweethomecompany.com.",
          ],
        },
      ],
      placeholders: ["VAT number for the business identification line at the top of this page."],
    },
    cookie_policy: {
      pageLabel: "Legal",
      title: "Cookie Policy",
      updated: "Last updated: 2026",
      sections: [
        {
          heading: "1. What are cookies?",
          body: [
            "\"Cookies\" are small software tags that are stored on your computer through the browser, retaining only information related to your preferences and not including your personal data.",
          ],
        },
        {
          heading: "2. What are cookies used for?",
          body: [
            "Cookies are used to help determine the usefulness, interest, and number of uses of websites, allowing for faster and more efficient navigation, eliminating the need to repeatedly enter the same information.",
          ],
        },
        {
          heading: "3. What types of cookies do we use?",
          body: ["There are two groups of cookies that can be used:"],
          list: [
            "Permanent cookies - These are cookies that are stored at the browser level on your access devices (PC, mobile, and tablet) and are used whenever you visit one of our websites. They are generally used to tailor navigation to the user's interests, allowing us to provide a more personalized service.",
            "Session cookies - These are temporary cookies that remain in your browser's cookie file until you leave the website. The information obtained through these cookies is used to analyze web traffic patterns, enabling us to identify issues and provide a better browsing experience.",
          ],
        },
        {
          heading: "4. How long are cookies stored on my device?",
          body: ["Two types of cookies can be stored:"],
          list: [
            "Session cookies: These are automatically deleted when you close your browser.",
            "Persistent cookies: These remain on your computer until they are deleted or expire. Persistent cookies can retain your user preferences to make future navigation easier and more relevant.",
          ],
        },
        {
          heading: "5. Where are your information stored and processed?",
          body: [
            `We may transfer and store the information we collect about you outside your country of origin. It may be processed by our in-house team or by third-party companies providing services to ${AGENCY_NAME}, and when we do so, we ensure that the information is secure and properly protected. These measures are based on adequacy decisions or the implementation of appropriate safeguards (e.g., standard contractual clauses).`,
          ],
        },
        {
          heading: "6. How can I change my cookie preferences?",
          body: ["You can change your cookie preferences through the cookie settings."],
        },
        {
          heading: "7. Cookie Type and Purpose",
          subsections: [
            {
              heading: "7.1. Strictly Necessary Cookies",
              body: [
                "These allow you to navigate the website and use its applications, as well as access secure areas of the website. Without these cookies, the requested services cannot be provided.",
              ],
            },
            {
              heading: "7.2. Analytical Cookies",
              body: [
                "These are used anonymously for the purpose of creating and analyzing statistics to improve the website's functioning.",
              ],
            },
            {
              heading: "7.3. Functionality Cookies",
              body: [
                "These store user preferences regarding site usage so that you do not need to reconfigure the site each time you visit.",
              ],
            },
            {
              heading: "7.4. Third-Party Cookies",
              body: [
                "These measure the success of applications and the effectiveness of third-party advertising. They can also be used to personalize a widget with user data.",
              ],
            },
            {
              heading: "7.5. Advertising Cookies",
              body: [
                "These target advertising based on each user's interests, and also limit the number of times an ad is shown, helping to measure the effectiveness of advertising and the success of website organization.",
              ],
            },
            {
              heading: "7.6. Technical cookies",
              body: [
                "This website only uses cookies that allow its proper functioning and the provision of the services offered on it, and, if applicable, proprietary cookies with the sole purpose of measuring its audience, which are therefore exempt from consent. Therefore, according to Article 22 of the Information Society Services Act, your consent is not required for their installation.",
              ],
            },
          ],
        },
      ],
      links: [{ label: "allaboutcookies.org", url: "https://allaboutcookies.org/" }],
    },
  },

  ca: {
    legal_notice: {
      pageLabel: "Legal",
      title: "Avís Legal",
      updated: "Darrera actualització: 2026",
      sections: [
        {
          heading: "1. Titular del lloc web",
          body: [
            `Aquest lloc web és propietat de ${AGENCY_NAME}, amb domicili a ${AGENCY_ADDRESS}.`,
            `Contacte: ${AGENCY_EMAIL} · ${AGENCY_PHONE}`,
          ],
        },
        {
          heading: "2. Objecte del lloc web",
          body: [
            "Aquest lloc web ofereix informació sobre immobles residencials en venda i lloguer a Andorra, i permet als visitants contactar amb l'agència i sol·licitar informació sobre propietats concretes.",
          ],
        },
        {
          heading: "3. Condicions d'ús",
          body: [
            "En utilitzar aquest lloc web, us comprometeu a fer-ho de manera lícita i de bona fe, i a no utilitzar-lo de cap manera que pugui perjudicar, inhabilitar o afectar el lloc web ni interferir en l'ús que en facin altres persones.",
          ],
        },
        {
          heading: "4. Propietat intel·lectual",
          body: [
            `Tot el contingut d'aquest lloc web —incloent textos, fotografies, gràfics, logotips i disseny— és propietat de ${AGENCY_NAME} o n'ostenta la llicència corresponent, i no pot ser reproduït, distribuït ni utilitzat sense autorització prèvia per escrit.`,
          ],
        },
        {
          heading: "5. Responsabilitat",
          body: [
            "Posem tota la cura raonable per mantenir la informació de les propietats actualitzada i precisa, però les dades (preu, disponibilitat, característiques) estan subjectes a canvis i s'han de confirmar directament amb l'agència abans de prendre cap decisió. No garantim un accés ininterromput ni lliure d'errors a aquest lloc web.",
          ],
        },
        {
          heading: "6. Legislació aplicable i jurisdicció",
          body: [
            "Aquestes condicions es regeixen per la legislació aplicable a la jurisdicció on l'empresa està registrada.",
          ],
        },
      ],
      placeholders: [
        "Número de registre / NRT de l'empresa, per afegir a l'apartat 1.",
        "Confirmar la legislació aplicable i els tribunals competents per a l'apartat 6.",
      ],
    },
    privacy_policy: {
      pageLabel: "Legal",
      title: "Política de Privacitat",
      updated: "Darrera actualització: 2026",
      intro: [
        "The Sweet Home, amb domicili social a C/Roc de l'Aldias, nº7, esc.B, Planta Baixa i número de NIF [vegeu la nota més avall], és titular del domini www.thesweethomecompany.com, on s'allotja el seu LLOC WEB.",
        "The Sweet Home ES COMPROMET A PROTEGIR LA PRIVACITAT I LES DADES PERSONALS DELS SEUS CLIENTS I DELS USUARIS DEL LLOC WEB. PER AQUEST MOTIU, HA DESENVOLUPAT I ADOPTAT AQUESTA POLÍTICA I LES PRÀCTIQUES QUE S'HI DESCRIUEN.",
        "AQUESTA POLÍTICA DE PRIVACITAT EXPLICA COM ES RECULLEN I ES TRACTEN LES VOSTRES DADES PERSONALS, I US RECOMANEM QUE LA LLEGIU PER ENTENDRE EN QUINES CONDICIONS ES RECULLEN I S'UTILITZEN.",
        "La nostra política de privacitat s'ajusta a la legislació portuguesa aplicable, concretament la Llei núm. 58/2019, de 8 d'agost, de Protecció de Dades Personals, altra normativa nacional aplicable, i el Reglament General de Protecció de Dades (RGPD) 2016/679, de 27 d'abril. La normativa de protecció de dades pot ser objecte de revisió, per la qual cosa recomanem als usuaris que consultin periòdicament aquesta declaració de privacitat. Com a referència, podeu visitar www.cnpd.pt. Aquest lloc web compleix la legislació nacional i comunitària. Els tribunals portuguesos tindran jurisdicció exclusiva sobre qualsevol controvèrsia derivada de l'ús d'aquest lloc web.",
      ],
      sections: [
        {
          heading: "1. Què cobreix aquesta política?",
          body: [
            "1.1. Aquesta Política de Privacitat explica com recollim i tractem les dades personals necessàries per prestar els serveis disponibles a través del LLOC WEB.",
            "1.2. Exemples d'aquests serveis són la subscripció a butlletins informatius o el fet de contactar-nos i enviar-nos la vostra sol·licitud.",
            "1.3. L'objectiu és prestar aquests serveis de manera eficient i sense complicacions, i per això es descriuen les pràctiques adoptades amb aquesta finalitat.",
          ],
        },
        {
          heading: "2. Què són les dades personals?",
          body: [
            "2.1. Les dades personals són qualsevol informació relativa a una persona que la identifiqui o la faci identificable, independentment de la naturalesa i el suport de la informació, inclosos el so i la imatge.",
            "2.2. Exemples de dades personals que recollim són el nom, els cognoms, el correu electrònic i el número de telèfon o mòbil.",
            "2.3. S'entén per identificable una persona que pot ser identificada directament o indirectament, en particular mitjançant referència a un número d'identificació o a un o diversos elements específics de la seva identitat física, fisiològica, psíquica, econòmica, cultural o social.",
          ],
        },
        {
          heading: "3. Com utilitzarem les vostres dades personals?",
          body: ["3.1. The Sweet Home utilitzarà les dades personals que ens faciliteu per a les finalitats següents:"],
          list: [
            "(a) Analitzar i respondre als vostres missatges, atenció al client i sol·licituds d'informació;",
            "(b) Analitzar i tramitar la vostra candidatura per treballar a The Sweet Home;",
            "(c) Enviar-vos butlletins informatius o altres publicacions que hàgiu sol·licitat i/o que puguin ser del vostre interès;",
            "(d) Per a operacions de gestió del lloc web;",
            "(e) Mantenir un registre de les vostres dades de contacte;",
            "(f) Per a finalitats empresarials, com l'anàlisi de dades o auditories;",
            "(g) Per a la prevenció del frau i la seguretat dels sistemes d'informació;",
            "(h) Per adaptar, millorar i modificar els serveis, inclosa la identificació de tendències d'ús o la determinació de l'eficàcia de les campanyes promocionals.",
          ],
          afterList: [
            "3.2. Aquestes operacions de tractament de dades personals són essencials per a la vostra satisfacció i per a l'activitat de The Sweet Home, i es duen a terme d'acord amb la legislació aplicable i les millors pràctiques.",
            "3.3. Les vostres dades personals no es reutilitzaran per a finalitats diferents de les anteriorment identificades o no relacionades amb les finalitats per a les quals van ser recollides inicialment.",
          ],
        },
        {
          heading: "4. Quines són les bases legals per al tractament de les dades personals que recollim?",
          body: [
            "4.1. Les dades personals tractades per The Sweet Home tenen bases legals específiques en funció de les finalitats a què es destinen.",
            "4.2. A la taula següent podeu veure les bases legals segons les finalitats esmentades anteriorment:",
          ],
          table: {
            columns: ["Finalitat", "Base", "Dades recollides"],
            rows: [
              [
                "Analitzar i respondre als vostres missatges, atenció al client i sol·licituds.",
                "Consentiment per a aquesta finalitat.",
                "Nom, número de telèfon, adreça electrònica.",
              ],
              [
                "Perquè us puguem enviar butlletins informatius o altres publicacions que hàgiu sol·licitat i/o que puguin ser del vostre interès.",
                "Consentiment per a aquesta finalitat específica.",
                "Adreça electrònica.",
              ],
              [
                "Per a operacions de gestió del lloc web.",
                "Consentiment per a aquesta finalitat específica (cookies); Interessos legítims perseguits per The Sweet Home.",
                "Cookies, adreça IP",
              ],
              [
                "Per a finalitats comercials, com l'anàlisi de dades o auditories.",
                "Consentiment per a aquesta finalitat específica (cookies); Interessos legítims perseguits per The Sweet Home.",
                "Cookies, adreça IP",
              ],
              [
                "Per a la prevenció del frau i la seguretat dels sistemes d'informació.",
                "Interessos legítims perseguits per The Sweet Home.",
                "Adreça IP",
              ],
              [
                "Per a l'adaptació, millora i modificació dels serveis, en particular mitjançant la identificació de tendències d'ús, o per determinar l'eficàcia de les campanyes promocionals.",
                "Consentiment per a aquesta finalitat específica (cookies); Interessos legítims perseguits per The Sweet Home.",
                "Cookies, adreça IP",
              ],
            ],
          },
        },
        {
          heading: "5. Com recollim les vostres dades personals?",
          body: [
            "5.1. Recollirem les vostres dades personals a través dels formularis del LLOC WEB, així com a través del mateix LLOC WEB i de la comunicació que estableix amb el vostre dispositiu, i dels missatges de correu electrònic que ens envieu.",
            "5.2. Les vostres dades personals es recullen des del vostre dispositiu de les maneres següents:",
          ],
          list: [
            "(a) Mitjançant la vostra sol·licitud de contacte;",
            "(b) Mitjançant l'enviament d'una candidatura;",
            "(c) Mitjançant la vostra subscripció al butlletí informatiu;",
            "(d) A través del vostre navegador;",
            "(e) A través de cookies;",
            "(f) Adreça IP.",
          ],
          afterList: [
            "5.3. The Sweet Home es compromet a tractar les vostres dades d'acord amb la llei i de manera legítima.",
            "5.4. The Sweet Home no vendrà, llogarà ni compartirà les vostres dades personals amb tercers, excepte en els casos clarament identificats en aquesta Política de Privacitat (vegeu el punt 9 per saber com).",
            "5.5. Els serveis de The Sweet Home no van dirigits a menors, i no es duu a terme cap tractament intencionat de dades personals de menors.",
          ],
        },
        {
          heading: "6. Què són les cookies?",
          body: [
            "6.1. Les cookies són petits fitxers d'informació que ajuden a identificar el vostre navegador i poden emmagatzemar informació, com ara la configuració i les preferències de l'usuari.",
            "6.2. The Sweet Home emmagatzemarà cookies al vostre dispositiu per personalitzar i facilitar la navegació al màxim, així com per a la resolució d'incidències, l'estadística, la garantia de qualitat i el seguiment de la seguretat del sistema.",
            "6.3. Excepte les cookies estrictament necessàries per al funcionament del lloc web, l'emmagatzematge de la resta de cookies dependrà sempre de l'acceptació i el consentiment de l'Usuari, que es pot retirar en qualsevol moment mitjançant eines específiques del navegador.",
            "6.4. Per saber-ne més sobre les cookies que utilitzem, consulteu la nostra Política de Cookies.",
          ],
        },
        {
          heading: "7. Com protegim les vostres dades personals?",
          body: [
            "7.1. Les vostres dades personals es mantenen segures mitjançant l'adopció de diverses mesures de seguretat tècniques i organitzatives que garanteixen que només hi accedeixin els Empleats que ho necessitin, d'acord amb les normes establertes.",
            "7.2. Per protegir les vostres dades personals, només confiem en proveïdors de centres de dades que ofereixen mesures de seguretat adequades i documentades, incloses garanties que les vostres dades personals s'emmagatzemen en servidors mantinguts en entorns controlats amb accés limitat.",
            "7.3. Les dades personals s'emmagatzemen en servidors segurs situats a PORTUGAL TELECOM DATA CENTER, S.A, amb número d'identificació fiscal 510.030.785 i seu a Rua Data Center 6200-065 Covilhã, que ens proporciona les garanties de seguretat adequades per protegir les dades personals davant divulgació no autoritzada, pèrdua, ús indegut, alteració, accés no autoritzat o qualsevol altra forma de tractament il·lícit.",
            "7.4. De la mateixa manera, quan navegueu pel LLOC WEB, protegim les vostres dades amb xifratge, com el protocol Hyper Text Transfer Protocol Secure (HTTPS), un protocol d'internet que té per objectiu establir la comunicació entre dispositius i servidors a tot el món. El protocol HTTPS va sorgir com una evolució del seu predecessor, l'HTTP, i la diferència entre tots dos és que l'HTTPS xifra la comunicació entre dispositius.",
            "7.5. Tot i que adoptem les precaucions i mesures que considerem adequades per protegir les dades personals que ens faciliteu i que recollim, cal tenir en compte que cap sistema de seguretat és inexpugnable.",
          ],
        },
        {
          heading: "8. Com podeu exercir els vostres drets:",
          body: [
            "8.1. Abans d'explicar com podeu exercir els vostres drets, és important conèixer quins són. Per això, la legislació us atorga el dret a sol·licitar l'exercici dels drets següents:",
          ],
          list: [
            "(a) Accés: el dret a obtenir confirmació sobre si s'estan tractant dades personals que us concerneixen i, en cas afirmatiu, el dret a accedir-hi;",
            "(b) Rectificació: el dret a obtenir la rectificació de les dades personals inexactes que us concerneixen i el dret que es completin les dades personals incompletes;",
            "(c) Supressió: el dret a obtenir la supressió de les vostres dades personals quan sigui aplicable algun dels motius previstos a la legislació;",
            "(d) Limitació del tractament: el dret a obtenir la limitació del tractament si és aplicable alguna de les situacions previstes a la legislació;",
            "(e) Oposició: el dret a oposar-vos en qualsevol moment al tractament de les dades personals que us concerneixen;",
            "(f) Portabilitat: el dret a rebre les dades personals que us concerneixen en un format estructurat, d'ús comú i de lectura mecànica.",
          ],
          afterList: [
            "8.2. També teniu dret a presentar una reclamació davant l'autoritat de control competent (a Portugal, la Comissió Nacional de Protecció de Dades, a www.cnpd.pt).",
            "8.3. Per exercir els drets esmentats, contacteu amb The Sweet Home mitjançant el correu electrònic següent: info@thesweethomecompany.com.",
            "8.4. Si sol·liciteu la supressió d'algunes o totes les vostres dades personals, és possible que alguns dels serveis sol·licitats no us puguin ser prestats, i The Sweet Home conservarà únicament les dades personals necessàries per complir les obligacions legals a què està subjecta.",
          ],
        },
        {
          heading: "9. Quan revelem dades a tercers?",
          body: [
            "9.1. The Sweet Home pot recórrer a tercers per a la prestació de determinats serveis, com el manteniment, el suport tècnic, el màrqueting, la facturació o la gestió de pagaments, i aquests tercers poden tenir accés a algunes dades personals, concretament les necessàries per a les finalitats contractades.",
            "9.2. The Sweet Home garanteix que les entitats que tenen accés a les dades són fiables i ofereixen altes garanties de protecció. No se'ls facilitaran dades més enllà del que sigui necessari per a la prestació del servei contractat, i The Sweet Home continua sent responsable de les dades personals facilitades.",
            "9.3. The Sweet Home també pot revelar dades a tercers en el context d'investigacions, indagacions, procediments judicials i/o administratius o procediments similars, sempre que ho ordeni degudament una resolució judicial.",
          ],
        },
        {
          heading: "10. Llocs web de tercers.",
          body: [
            "10.1. El LLOC WEB pot contenir enllaços a altres llocs web que poden recollir i tractar les vostres dades personals. El tractament de dades en aquests llocs web és responsabilitat exclusiva dels titulars d'aquests llocs, i The Sweet Home no assumeix cap responsabilitat per les seves polítiques i/o pràctiques.",
            "10.2. Exemples d'aquests tercers són Facebook, Instagram, YouTube, WhatsApp i LinkedIn, a través dels botons presents al LLOC WEB.",
          ],
        },
        {
          heading: "11. Transferències de dades fora de la Unió Europea.",
          body: [
            "11.1. En cas de transferència de dades a tercers països fora de la Unió Europea, The Sweet Home complirà els requisits legals, en particular pel que fa a l'adequació del país de destinació en matèria de protecció de dades personals i als requisits aplicables a aquestes transferències. Les dades personals no es transferiran a jurisdiccions que no ofereixin garanties adequades de seguretat i protecció.",
          ],
        },
        {
          heading: "12. Menors.",
          body: [
            "12.1. El LLOC WEB no està destinat a persones menors de 16 anys, i demanem als menors que no ens facilitin dades personals a través del LLOC WEB, l'aplicació, les xarxes socials i mitjans socials, o el correu electrònic.",
          ],
        },
        {
          heading: "13. Dades personals sensibles.",
          body: [
            "13.1. The Sweet Home us demana que no envieu ni reveleu cap dada personal sensible, és a dir, informació que reveli l'origen racial o ètnic, les opinions polítiques, les conviccions religioses o filosòfiques, l'afiliació sindical, dades genètiques o biomètriques, dades relatives a la salut, o dades relatives a la vida sexual o l'orientació sexual d'una persona.",
            "13.2. Si tot i així envieu o reveleu aquestes categories de dades personals, seran suprimides de manera immediata.",
          ],
        },
        {
          heading: "14. Canvis a la Política de Privacitat.",
          body: [
            "14.1. The Sweet Home es reserva el dret de reajustar o modificar aquesta Política de Privacitat en qualsevol moment, i aquests canvis seran degudament anunciats.",
          ],
        },
        {
          heading: "15. Les nostres dades de contacte.",
          body: [
            "15.1. Si teniu qualsevol pregunta o inquietud sobre aquesta Política de Privacitat, contacteu-nos per escrit mitjançant el correu electrònic info@thesweethomecompany.com.",
          ],
        },
      ],
      placeholders: ["Número de NIF de l'empresa per a la línia d'identificació de la part superior d'aquesta pàgina."],
    },
    cookie_policy: {
      pageLabel: "Legal",
      title: "Política de Cookies",
      updated: "Darrera actualització: 2026",
      sections: [
        {
          heading: "1. Què són les cookies?",
          body: [
            "Les «cookies» són petites etiquetes de programari que s'emmagatzemen al vostre ordinador a través del navegador, i que només conserven informació relacionada amb les vostres preferències, sense incloure les vostres dades personals.",
          ],
        },
        {
          heading: "2. Per a què s'utilitzen les cookies?",
          body: [
            "Les cookies s'utilitzen per ajudar a determinar la utilitat, l'interès i el nombre d'usos dels llocs web, la qual cosa permet una navegació més ràpida i eficient, i elimina la necessitat d'introduir repetidament la mateixa informació.",
          ],
        },
        {
          heading: "3. Quins tipus de cookies utilitzem?",
          body: ["Hi ha dos grups de cookies que es poden utilitzar:"],
          list: [
            "Cookies permanents - Són cookies que s'emmagatzemen a nivell del navegador als vostres dispositius d'accés (PC, mòbil i tauleta) i s'utilitzen cada cop que visiteu un dels nostres llocs web. Generalment s'utilitzen per adaptar la navegació als interessos de l'usuari, cosa que ens permet oferir un servei més personalitzat.",
            "Cookies de sessió - Són cookies temporals que romanen a l'arxiu de cookies del navegador fins que abandoneu el lloc web. La informació obtinguda mitjançant aquestes cookies s'utilitza per analitzar patrons de trànsit web, cosa que ens permet identificar problemes i oferir una millor experiència de navegació.",
          ],
        },
        {
          heading: "4. Durant quant de temps s'emmagatzemen les cookies al meu dispositiu?",
          body: ["Es poden emmagatzemar dos tipus de cookies:"],
          list: [
            "Cookies de sessió: S'eliminen automàticament en tancar el navegador.",
            "Cookies persistents: Romanen a l'ordinador fins que s'eliminen o caduquen. Les cookies persistents poden conservar les vostres preferències d'usuari per facilitar una navegació futura més senzilla i rellevant.",
          ],
        },
        {
          heading: "5. On s'emmagatzema i es tracta la vostra informació?",
          body: [
            `Podem transferir i emmagatzemar la informació que recopilem sobre vosaltres fora del vostre país d'origen. Pot ser tractada pel nostre equip intern o per empreses terceres que presten serveis a ${AGENCY_NAME}, i quan ho fem, ens assegurem que la informació estigui segura i degudament protegida. Aquestes mesures es basen en decisions d'adequació o en la implementació de garanties adequades (per exemple, clàusules contractuals tipus).`,
          ],
        },
        {
          heading: "6. Com puc canviar les meves preferències de cookies?",
          body: ["Podeu canviar les vostres preferències de cookies a través de la configuració de cookies."],
        },
        {
          heading: "7. Tipus de cookies i finalitat",
          subsections: [
            {
              heading: "7.1. Cookies estrictament necessàries",
              body: [
                "Us permeten navegar pel lloc web i utilitzar-ne les aplicacions, així com accedir a àrees segures del lloc web. Sense aquestes cookies, no es poden prestar els serveis sol·licitats.",
              ],
            },
            {
              heading: "7.2. Cookies analítiques",
              body: [
                "S'utilitzen de manera anònima amb la finalitat de crear i analitzar estadístiques per millorar el funcionament del lloc web.",
              ],
            },
            {
              heading: "7.3. Cookies de funcionalitat",
              body: [
                "Emmagatzemen les preferències de l'usuari respecte a l'ús del lloc perquè no calgui tornar a configurar-lo cada cop que el visiteu.",
              ],
            },
            {
              heading: "7.4. Cookies de tercers",
              body: [
                "Mesuren l'èxit de les aplicacions i l'efectivitat de la publicitat de tercers. També es poden utilitzar per personalitzar un widget amb dades de l'usuari.",
              ],
            },
            {
              heading: "7.5. Cookies publicitàries",
              body: [
                "Dirigeixen la publicitat en funció dels interessos de cada usuari, i també limiten el nombre de vegades que es mostra un anunci, cosa que ajuda a mesurar l'efectivitat de la publicitat i l'èxit de l'organització del lloc web.",
              ],
            },
            {
              heading: "7.6. Cookies tècniques",
              body: [
                "Aquest lloc web només utilitza cookies que en permeten el correcte funcionament i la prestació dels serveis que s'hi ofereixen i, si escau, cookies pròpies amb l'única finalitat de mesurar-ne l'audiència, per la qual cosa estan exemptes de consentiment. Per tant, d'acord amb l'article 22 de la Llei de Serveis de la Societat de la Informació, no cal el vostre consentiment per a la seva instal·lació.",
              ],
            },
          ],
        },
      ],
      links: [{ label: "allaboutcookies.org", url: "https://allaboutcookies.org/" }],
    },
  },

  es: {
    legal_notice: {
      pageLabel: "Legal",
      title: "Aviso Legal",
      updated: "Última actualización: 2026",
      sections: [
        {
          heading: "1. Titular del sitio web",
          body: [
            `Este sitio web es propiedad de ${AGENCY_NAME}, con domicilio en ${AGENCY_ADDRESS}.`,
            `Contacto: ${AGENCY_EMAIL} · ${AGENCY_PHONE}`,
          ],
        },
        {
          heading: "2. Objeto del sitio web",
          body: [
            "Este sitio web ofrece información sobre inmuebles residenciales en venta y alquiler en Andorra, y permite a los visitantes contactar con la agencia y solicitar información sobre propiedades concretas.",
          ],
        },
        {
          heading: "3. Condiciones de uso",
          body: [
            "Al utilizar este sitio web, se compromete a hacerlo de manera lícita y de buena fe, y a no utilizarlo de ninguna forma que pueda dañar, inhabilitar o afectar el sitio web, ni interferir en el uso que hagan de él otras personas.",
          ],
        },
        {
          heading: "4. Propiedad intelectual",
          body: [
            `Todo el contenido de este sitio web —incluyendo textos, fotografías, gráficos, logotipos y diseño— es propiedad de ${AGENCY_NAME} o cuenta con la licencia correspondiente, y no puede ser reproducido, distribuido ni utilizado sin autorización previa por escrito.`,
          ],
        },
        {
          heading: "5. Responsabilidad",
          body: [
            "Ponemos todo el cuidado razonable en mantener la información de las propiedades actualizada y precisa, pero los datos (precio, disponibilidad, características) están sujetos a cambios y deben confirmarse directamente con la agencia antes de tomar cualquier decisión. No garantizamos un acceso ininterrumpido ni libre de errores a este sitio web.",
          ],
        },
        {
          heading: "6. Legislación aplicable y jurisdicción",
          body: [
            "Estas condiciones se rigen por la legislación aplicable en la jurisdicción donde la empresa está registrada.",
          ],
        },
      ],
      placeholders: [
        "Número de registro / NRT de la empresa, para añadir al apartado 1.",
        "Confirmar la legislación aplicable y los tribunales competentes para el apartado 6.",
      ],
    },
    privacy_policy: {
      pageLabel: "Legal",
      title: "Política de Privacidad",
      updated: "Última actualización: 2026",
      intro: [
        "The Sweet Home, con domicilio social en C/Roc de l'Aldias, nº7, esc.B, Planta Baixa y número de NIF [véase la nota a continuación], es titular del dominio www.thesweethomecompany.com, donde se aloja su SITIO WEB.",
        "The Sweet Home SE COMPROMETE A PROTEGER LA PRIVACIDAD Y LOS DATOS PERSONALES DE SUS CLIENTES Y DE LOS USUARIOS DEL SITIO WEB. POR ELLO, HA DESARROLLADO Y ADOPTADO LA PRESENTE POLÍTICA Y LAS PRÁCTICAS QUE EN ELLA SE DESCRIBEN.",
        "ESTA POLÍTICA DE PRIVACIDAD EXPLICA CÓMO SE RECOPILAN Y TRATAN SUS DATOS PERSONALES, Y LE RECOMENDAMOS QUE LA LEA PARA COMPRENDER LAS CONDICIONES EN LAS QUE SE RECOPILAN Y UTILIZAN.",
        "Nuestra política de privacidad se ajusta a la legislación portuguesa aplicable, en particular la Ley n.º 58/2019, de 8 de agosto, de Protección de Datos Personales, otra normativa nacional aplicable, y el Reglamento General de Protección de Datos (RGPD) 2016/679, de 27 de abril. La legislación de protección de datos está sujeta a revisión, por lo que recomendamos a los usuarios consultar periódicamente esta declaración de privacidad. Como referencia, puede visitar www.cnpd.pt. Este sitio web cumple con la legislación nacional y comunitaria. Los tribunales portugueses tendrán jurisdicción exclusiva sobre cualquier controversia derivada del uso de este sitio web.",
      ],
      sections: [
        {
          heading: "1. ¿Qué cubre esta política?",
          body: [
            "1.1. Esta Política de Privacidad explica cómo recopilamos y tratamos los datos personales necesarios para la prestación de los servicios disponibles a través del SITIO WEB.",
            "1.2. Ejemplos de estos servicios son la suscripción a boletines informativos o el hecho de contactarnos y enviarnos su solicitud.",
            "1.3. El objetivo es prestar estos servicios de forma eficiente y sin complicaciones, describiendo las prácticas adoptadas para ello.",
          ],
        },
        {
          heading: "2. ¿Qué son los datos personales?",
          body: [
            "2.1. Los datos personales se refieren a cualquier información relativa a una persona que la identifique o pueda identificarla, independientemente de la naturaleza y el soporte de la información, incluidos el sonido y la imagen.",
            "2.2. Ejemplos de datos personales que recopilamos son el nombre, los apellidos, el correo electrónico y el número de teléfono o móvil.",
            "2.3. Se entiende por identificable a una persona que puede ser identificada directa o indirectamente, en particular mediante referencia a un número de identificación u otros elementos específicos de su identidad física, fisiológica, psíquica, económica, cultural o social.",
          ],
        },
        {
          heading: "3. ¿Cómo utilizaremos sus datos personales?",
          body: ["3.1. The Sweet Home utilizará los datos personales que nos facilite para las siguientes finalidades:"],
          list: [
            "(a) Analizar y responder a sus mensajes, atención al cliente y solicitudes de información;",
            "(b) Analizar y tramitar su candidatura para trabajar en The Sweet Home;",
            "(c) Enviarle boletines informativos u otras publicaciones que haya solicitado y/o que puedan ser de su interés;",
            "(d) Para operaciones de gestión del sitio web;",
            "(e) Mantener un registro de sus datos de contacto;",
            "(f) Para fines comerciales, como el análisis de datos o auditorías;",
            "(g) Para la prevención del fraude y la seguridad de los sistemas de información;",
            "(h) Para adaptar, mejorar y modificar los servicios, incluida la identificación de tendencias de uso o la determinación de la eficacia de las campañas promocionales.",
          ],
          afterList: [
            "3.2. Estas operaciones de tratamiento de datos personales son esenciales para su satisfacción y para la actividad de The Sweet Home, y se llevan a cabo de acuerdo con la legislación aplicable y las mejores prácticas.",
            "3.3. Sus datos personales no se reutilizarán para fines distintos de los anteriormente identificados ni ajenos a los fines para los que fueron recopilados inicialmente.",
          ],
        },
        {
          heading: "4. ¿Cuáles son las bases legales para el tratamiento de los datos personales que recopilamos?",
          body: [
            "4.1. Los datos personales tratados por The Sweet Home tienen bases legales específicas en función de las finalidades a las que se destinan.",
            "4.2. En la siguiente tabla puede ver las bases legales según las finalidades mencionadas anteriormente:",
          ],
          table: {
            columns: ["Finalidad", "Base", "Datos recopilados"],
            rows: [
              [
                "Analizar y responder a sus mensajes, atención al cliente y consultas.",
                "Consentimiento para esta finalidad.",
                "Nombre, número de teléfono, dirección de correo electrónico.",
              ],
              [
                "Para poder enviarle boletines informativos u otras publicaciones que haya solicitado y/o que puedan ser de su interés.",
                "Consentimiento para esta finalidad específica.",
                "Dirección de correo electrónico.",
              ],
              [
                "Para operaciones de gestión del sitio web.",
                "Consentimiento para esta finalidad específica (cookies); Intereses legítimos perseguidos por The Sweet Home.",
                "Cookies, dirección IP",
              ],
              [
                "Para fines comerciales, como el análisis de datos o auditorías.",
                "Consentimiento para esta finalidad específica (cookies); Intereses legítimos perseguidos por The Sweet Home.",
                "Cookies, dirección IP",
              ],
              [
                "Para la prevención del fraude y la seguridad de los sistemas de información.",
                "Intereses legítimos perseguidos por The Sweet Home.",
                "Dirección IP",
              ],
              [
                "Para la adaptación, mejora y modificación de los servicios, en particular mediante la identificación de tendencias de uso, o para determinar la eficacia de las campañas promocionales.",
                "Consentimiento para esta finalidad específica (cookies); Intereses legítimos perseguidos por The Sweet Home.",
                "Cookies, dirección IP",
              ],
            ],
          },
        },
        {
          heading: "5. ¿Cómo recopilamos sus datos personales?",
          body: [
            "5.1. Recopilaremos sus datos personales a través de los formularios del SITIO WEB, así como a través del propio SITIO WEB y de la comunicación que este establece con su dispositivo, y de los mensajes de correo electrónico que nos envíe.",
            "5.2. Sus datos personales se recopilan desde su dispositivo de las siguientes formas:",
          ],
          list: [
            "(a) Mediante su solicitud de contacto;",
            "(b) Mediante el envío de una candidatura;",
            "(c) Mediante su suscripción al boletín informativo;",
            "(d) A través de su navegador;",
            "(e) A través de cookies;",
            "(f) Dirección IP.",
          ],
          afterList: [
            "5.3. The Sweet Home se compromete a tratar sus datos de acuerdo con la ley y de forma legítima.",
            "5.4. The Sweet Home no venderá, alquilará ni compartirá sus datos personales con terceros, salvo en los casos claramente identificados en esta Política de Privacidad (véase el punto 9 para saber cómo).",
            "5.5. Los servicios de The Sweet Home no están dirigidos a menores, y no se lleva a cabo ningún tratamiento intencionado de datos personales de menores.",
          ],
        },
        {
          heading: "6. ¿Qué son las cookies?",
          body: [
            "6.1. Las cookies son pequeños archivos de información que ayudan a identificar su navegador y pueden almacenar información, como la configuración y las preferencias del usuario.",
            "6.2. The Sweet Home almacenará cookies en su dispositivo para personalizar y facilitar la navegación al máximo, así como para la resolución de incidencias, estadísticas, garantía de calidad y supervisión de la seguridad del sistema.",
            "6.3. Excepto las cookies estrictamente necesarias para el funcionamiento del sitio web, el almacenamiento de las demás cookies dependerá siempre de la aceptación y el consentimiento del Usuario, que puede retirarse en cualquier momento mediante herramientas específicas del navegador.",
            "6.4. Para saber más sobre las cookies que utilizamos, consulte nuestra Política de Cookies.",
          ],
        },
        {
          heading: "7. ¿Cómo protegemos sus datos personales?",
          body: [
            "7.1. Sus datos personales se mantienen seguros mediante la adopción de diversas medidas de seguridad técnicas y organizativas que garantizan que solo accedan a ellos los Empleados que lo necesiten, de acuerdo con las normas establecidas.",
            "7.2. Para proteger sus datos personales, solo confiamos en proveedores de centros de datos que ofrecen medidas de seguridad adecuadas y documentadas, incluidas garantías de que sus datos personales se almacenan en servidores mantenidos en entornos controlados con acceso limitado.",
            "7.3. Los datos personales se almacenan en servidores seguros ubicados en PORTUGAL TELECOM DATA CENTER, S.A, con número de identificación fiscal 510.030.785 y sede en Rua Data Center 6200-065 Covilhã, que nos proporciona las garantías de seguridad adecuadas para proteger los datos personales frente a divulgación no autorizada, pérdida, uso indebido, alteración, acceso no autorizado o cualquier otra forma de tratamiento ilícito.",
            "7.4. Asimismo, cuando navega por el SITIO WEB, protegemos sus datos mediante cifrado, como el protocolo Hyper Text Transfer Protocol Secure (HTTPS), un protocolo de internet cuyo objetivo es establecer la comunicación entre dispositivos y servidores en todo el mundo. El protocolo HTTPS surgió como una evolución de su predecesor, el HTTP, y la diferencia entre ambos es que HTTPS cifra la comunicación entre dispositivos.",
            "7.5. Aunque adoptamos las precauciones y medidas que consideramos adecuadas para proteger los datos personales que nos facilita y que recopilamos, cabe señalar que ningún sistema de seguridad es inexpugnable.",
          ],
        },
        {
          heading: "8. ¿Cómo puede ejercer sus derechos?:",
          body: [
            "8.1. Antes de explicar cómo puede ejercer sus derechos, es importante conocer cuáles son. Por ello, la legislación le otorga el derecho a solicitar el ejercicio de los siguientes derechos:",
          ],
          list: [
            "(a) Acceso: el derecho a obtener confirmación sobre si se están tratando datos personales que le conciernen y, en su caso, el derecho a acceder a ellos;",
            "(b) Rectificación: el derecho a obtener la rectificación de los datos personales inexactos que le conciernen y el derecho a que se completen los datos personales incompletos;",
            "(c) Supresión: el derecho a obtener la supresión de sus datos personales cuando sea aplicable alguno de los motivos previstos en la legislación;",
            "(d) Limitación del tratamiento: el derecho a obtener la limitación del tratamiento si es aplicable alguna de las situaciones previstas en la legislación;",
            "(e) Oposición: el derecho a oponerse en cualquier momento al tratamiento de los datos personales que le conciernen;",
            "(f) Portabilidad: el derecho a recibir los datos personales que le conciernen en un formato estructurado, de uso común y lectura mecánica.",
          ],
          afterList: [
            "8.2. También tiene derecho a presentar una reclamación ante la autoridad de control competente (en Portugal, la Comisión Nacional de Protección de Datos, en www.cnpd.pt).",
            "8.3. Para ejercer los derechos mencionados, contacte con The Sweet Home a través del siguiente correo electrónico: info@thesweethomecompany.com.",
            "8.4. Si solicita la supresión de algunos o todos sus datos personales, es posible que no se le puedan prestar algunos de los servicios solicitados, y The Sweet Home conservará únicamente los datos personales necesarios para cumplir las obligaciones legales a las que está sujeta.",
          ],
        },
        {
          heading: "9. ¿Cuándo revelamos datos a terceros?",
          body: [
            "9.1. The Sweet Home puede recurrir a terceros para la prestación de determinados servicios, como el mantenimiento, el soporte técnico, el marketing, la facturación o la gestión de pagos, y estos terceros pueden tener acceso a algunos datos personales, concretamente los necesarios para las finalidades contratadas.",
            "9.2. The Sweet Home garantiza que las entidades que tienen acceso a los datos son fiables y ofrecen altas garantías de protección. No se les facilitarán datos más allá de lo necesario para la prestación del servicio contratado, y The Sweet Home sigue siendo responsable de los datos personales facilitados.",
            "9.3. The Sweet Home también puede revelar datos a terceros en el contexto de investigaciones, indagaciones, procedimientos judiciales y/o administrativos o procedimientos similares, siempre que así lo ordene debidamente una resolución judicial.",
          ],
        },
        {
          heading: "10. Sitios web de terceros.",
          body: [
            "10.1. El SITIO WEB puede contener enlaces a otros sitios web que pueden recopilar y tratar sus datos personales. El tratamiento de datos en dichos sitios web es responsabilidad exclusiva de los titulares de esos sitios, y The Sweet Home no asume ninguna responsabilidad por sus políticas y/o prácticas.",
            "10.2. Ejemplos de dichos terceros son Facebook, Instagram, YouTube, WhatsApp y LinkedIn, a través de los botones presentes en el SITIO WEB.",
          ],
        },
        {
          heading: "11. Transferencias de datos fuera de la Unión Europea.",
          body: [
            "11.1. En caso de transferencia de datos a terceros países fuera de la Unión Europea, The Sweet Home cumplirá los requisitos legales, en particular en lo relativo a la adecuación del país de destino en materia de protección de datos personales y a los requisitos aplicables a dichas transferencias. Los datos personales no se transferirán a jurisdicciones que no ofrezcan garantías adecuadas de seguridad y protección.",
          ],
        },
        {
          heading: "12. Menores.",
          body: [
            "12.1. El SITIO WEB no está dirigido a personas menores de 16 años, y solicitamos a los menores que no nos faciliten datos personales a través del SITIO WEB, la aplicación, las redes sociales y medios sociales, o el correo electrónico.",
          ],
        },
        {
          heading: "13. Datos personales sensibles.",
          body: [
            "13.1. The Sweet Home le solicita que no envíe ni revele ningún dato personal sensible, es decir, información que revele el origen racial o étnico, las opiniones políticas, las convicciones religiosas o filosóficas, la afiliación sindical, datos genéticos o biométricos, datos relativos a la salud, o datos relativos a la vida sexual o la orientación sexual de una persona.",
            "13.2. Si aun así envía o revela dichas categorías de datos personales, serán eliminados de inmediato.",
          ],
        },
        {
          heading: "14. Cambios en la Política de Privacidad.",
          body: [
            "14.1. The Sweet Home se reserva el derecho de reajustar o modificar esta Política de Privacidad en cualquier momento, y dichos cambios serán debidamente anunciados.",
          ],
        },
        {
          heading: "15. Nuestros datos de contacto.",
          body: [
            "15.1. Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad, contáctenos por escrito a través del correo electrónico info@thesweethomecompany.com.",
          ],
        },
      ],
      placeholders: ["Número de NIF de la empresa para la línea de identificación en la parte superior de esta página."],
    },
    cookie_policy: {
      pageLabel: "Legal",
      title: "Política de Cookies",
      updated: "Última actualización: 2026",
      sections: [
        {
          heading: "1. ¿Qué son las cookies?",
          body: [
            "Las «cookies» son pequeñas etiquetas de software que se almacenan en su ordenador a través del navegador, conservando únicamente información relacionada con sus preferencias y sin incluir sus datos personales.",
          ],
        },
        {
          heading: "2. ¿Para qué se utilizan las cookies?",
          body: [
            "Las cookies se utilizan para ayudar a determinar la utilidad, el interés y el número de usos de los sitios web, lo que permite una navegación más rápida y eficiente, y elimina la necesidad de introducir repetidamente la misma información.",
          ],
        },
        {
          heading: "3. ¿Qué tipos de cookies utilizamos?",
          body: ["Existen dos grupos de cookies que se pueden utilizar:"],
          list: [
            "Cookies permanentes - Son cookies que se almacenan a nivel del navegador en sus dispositivos de acceso (PC, móvil y tableta) y se utilizan cada vez que visita uno de nuestros sitios web. Generalmente se utilizan para adaptar la navegación a los intereses del usuario, lo que nos permite ofrecer un servicio más personalizado.",
            "Cookies de sesión - Son cookies temporales que permanecen en el archivo de cookies del navegador hasta que abandona el sitio web. La información obtenida mediante estas cookies se utiliza para analizar patrones de tráfico web, lo que nos permite identificar problemas y ofrecer una mejor experiencia de navegación.",
          ],
        },
        {
          heading: "4. ¿Durante cuánto tiempo se almacenan las cookies en mi dispositivo?",
          body: ["Se pueden almacenar dos tipos de cookies:"],
          list: [
            "Cookies de sesión: Se eliminan automáticamente al cerrar el navegador.",
            "Cookies persistentes: Permanecen en su ordenador hasta que se eliminan o caducan. Las cookies persistentes pueden conservar sus preferencias de usuario para facilitar una navegación futura más sencilla y relevante.",
          ],
        },
        {
          heading: "5. ¿Dónde se almacena y trata su información?",
          body: [
            `Podemos transferir y almacenar la información que recopilamos sobre usted fuera de su país de origen. Puede ser tratada por nuestro equipo interno o por empresas terceras que prestan servicios a ${AGENCY_NAME}, y cuando lo hacemos, nos aseguramos de que la información esté segura y debidamente protegida. Estas medidas se basan en decisiones de adecuación o en la implementación de garantías adecuadas (por ejemplo, cláusulas contractuales tipo).`,
          ],
        },
        {
          heading: "6. ¿Cómo puedo cambiar mis preferencias de cookies?",
          body: ["Puede cambiar sus preferencias de cookies a través de la configuración de cookies."],
        },
        {
          heading: "7. Tipo de cookies y finalidad",
          subsections: [
            {
              heading: "7.1. Cookies estrictamente necesarias",
              body: [
                "Le permiten navegar por el sitio web y utilizar sus aplicaciones, así como acceder a áreas seguras del sitio web. Sin estas cookies, no se pueden prestar los servicios solicitados.",
              ],
            },
            {
              heading: "7.2. Cookies analíticas",
              body: [
                "Se utilizan de forma anónima con la finalidad de crear y analizar estadísticas para mejorar el funcionamiento del sitio web.",
              ],
            },
            {
              heading: "7.3. Cookies de funcionalidad",
              body: [
                "Almacenan las preferencias del usuario respecto al uso del sitio para que no sea necesario volver a configurarlo cada vez que lo visite.",
              ],
            },
            {
              heading: "7.4. Cookies de terceros",
              body: [
                "Miden el éxito de las aplicaciones y la efectividad de la publicidad de terceros. También pueden utilizarse para personalizar un widget con datos del usuario.",
              ],
            },
            {
              heading: "7.5. Cookies publicitarias",
              body: [
                "Dirigen la publicidad en función de los intereses de cada usuario, y también limitan el número de veces que se muestra un anuncio, ayudando a medir la efectividad de la publicidad y el éxito de la organización del sitio web.",
              ],
            },
            {
              heading: "7.6. Cookies técnicas",
              body: [
                "Este sitio web únicamente utiliza cookies que permiten su correcto funcionamiento y la prestación de los servicios ofrecidos en él y, en su caso, cookies propias con la única finalidad de medir su audiencia, por lo que están exentas de consentimiento. Por lo tanto, de acuerdo con el artículo 22 de la Ley de Servicios de la Sociedad de la Información, no se requiere su consentimiento para su instalación.",
              ],
            },
          ],
        },
      ],
      links: [{ label: "allaboutcookies.org", url: "https://allaboutcookies.org/" }],
    },
  },

  fr: {
    legal_notice: {
      pageLabel: "Légal",
      title: "Mentions Légales",
      updated: "Dernière mise à jour : 2026",
      sections: [
        {
          heading: "1. Titulaire du site",
          body: [
            `Ce site web est détenu et exploité par ${AGENCY_NAME}, domicilié à ${AGENCY_ADDRESS}.`,
            `Contact : ${AGENCY_EMAIL} · ${AGENCY_PHONE}`,
          ],
        },
        {
          heading: "2. Objet du site web",
          body: [
            "Ce site web fournit des informations sur des biens résidentiels à vendre et à louer en Andorre, et permet aux visiteurs de contacter l'agence et de demander des informations sur des annonces spécifiques.",
          ],
        },
        {
          heading: "3. Conditions d'utilisation",
          body: [
            "En utilisant ce site web, vous vous engagez à le faire de manière licite et de bonne foi, et à ne pas l'utiliser d'une manière susceptible d'endommager, de désactiver ou de nuire au site, ni de gêner son utilisation par d'autres personnes.",
          ],
        },
        {
          heading: "4. Propriété intellectuelle",
          body: [
            `L'ensemble du contenu de ce site web — textes, photographies, graphismes, logos et design — appartient à ${AGENCY_NAME} ou est utilisé sous licence, et ne peut être reproduit, distribué ou utilisé sans autorisation écrite préalable.`,
          ],
        },
        {
          heading: "5. Responsabilité",
          body: [
            "Nous veillons raisonnablement à ce que les informations sur les biens soient exactes et à jour, mais les caractéristiques (prix, disponibilité, éléments) sont susceptibles d'évoluer et doivent être confirmées directement auprès de l'agence avant toute décision. Nous ne garantissons pas un accès ininterrompu ou exempt d'erreurs à ce site web.",
          ],
        },
        {
          heading: "6. Droit applicable et juridiction",
          body: [
            "Les présentes conditions sont régies par le droit applicable dans la juridiction où l'entreprise est enregistrée.",
          ],
        },
      ],
      placeholders: [
        "Numéro d'enregistrement / d'identification fiscale (NRT) de l'entreprise, à ajouter à la section 1.",
        "Confirmer le droit applicable et les tribunaux compétents pour la section 6.",
      ],
    },
    privacy_policy: {
      pageLabel: "Légal",
      title: "Politique de Confidentialité",
      updated: "Dernière mise à jour : 2026",
      intro: [
        "The Sweet Home, dont le siège social est situé C/Roc de l'Aldias, nº7, esc.B, Planta Baixa et le numéro de TVA [voir la note ci-dessous], est titulaire du domaine www.thesweethomecompany.com, où est hébergé son SITE WEB.",
        "The Sweet Home S'ENGAGE À PROTÉGER LA VIE PRIVÉE ET LES DONNÉES PERSONNELLES DE SES CLIENTS ET DES UTILISATEURS DU SITE WEB. C'EST POURQUOI ELLE A ÉLABORÉ ET ADOPTÉ LA PRÉSENTE POLITIQUE AINSI QUE LES PRATIQUES QUI Y SONT DÉCRITES.",
        "LA PRÉSENTE POLITIQUE DE CONFIDENTIALITÉ EXPLIQUE COMMENT VOS DONNÉES PERSONNELLES SONT COLLECTÉES ET TRAITÉES, ET NOUS VOUS CONSEILLONS DE LA LIRE POUR COMPRENDRE LES CONDITIONS DANS LESQUELLES VOS DONNÉES PERSONNELLES SONT COLLECTÉES ET UTILISÉES.",
        "Notre politique de confidentialité est conforme à la législation portugaise applicable, notamment la loi n° 58/2019 du 8 août relative à la protection des données personnelles, aux autres lois nationales applicables, ainsi qu'au Règlement Général sur la Protection des Données (RGPD) 2016/679 du 27 avril. La législation en matière de protection des données est susceptible d'évoluer, et nous recommandons aux utilisateurs de consulter régulièrement notre déclaration de confidentialité. Pour référence, vous pouvez consulter le site www.cnpd.pt. Ce site web est conforme à la législation nationale et communautaire. Les tribunaux portugais auront compétence exclusive pour tout litige découlant de l'utilisation de ce site web.",
      ],
      sections: [
        {
          heading: "1. Que couvre cette politique ?",
          body: [
            "1.1. Cette Politique de Confidentialité explique comment nous collectons et traitons les données personnelles nécessaires à la fourniture des services disponibles via le SITE WEB.",
            "1.2. Ces services incluent, par exemple, l'inscription à des newsletters ou le fait de nous contacter et de nous envoyer votre candidature.",
            "1.3. L'objectif est de fournir ces services de manière efficace et sans contrainte, en décrivant les pratiques adoptées à cette fin.",
          ],
        },
        {
          heading: "2. Que sont les données personnelles ?",
          body: [
            "2.1. Les données personnelles désignent toute information relative à une personne qui l'identifie ou permet de l'identifier, quels que soient la nature et le support de l'information, y compris le son et l'image.",
            "2.2. Parmi les données personnelles que nous collectons figurent notamment le nom, le prénom, l'adresse e-mail et le numéro de téléphone fixe ou mobile.",
            "2.3. Est réputée identifiable une personne qui peut être identifiée, directement ou indirectement, notamment par référence à un numéro d'identification ou à un ou plusieurs éléments spécifiques propres à son identité physique, physiologique, psychique, économique, culturelle ou sociale.",
          ],
        },
        {
          heading: "3. Comment utiliserons-nous vos données personnelles ?",
          body: ["3.1. The Sweet Home utilisera les données personnelles que vous nous fournissez aux fins suivantes :"],
          list: [
            "(a) Analyser et répondre à vos messages, assurer le support client et traiter vos demandes d'informations ;",
            "(b) Analyser et traiter votre candidature pour travailler chez The Sweet Home ;",
            "(c) Vous envoyer des newsletters ou d'autres publications que vous avez demandées et/ou susceptibles de vous intéresser ;",
            "(d) Pour les opérations de gestion du site web ;",
            "(e) Conserver un enregistrement de vos coordonnées ;",
            "(f) À des fins commerciales, telles que l'analyse de données ou les audits ;",
            "(g) Pour la prévention de la fraude et la sécurité des systèmes d'information ;",
            "(h) Pour adapter, améliorer et modifier les services, notamment par l'identification des tendances d'utilisation ou la détermination de l'efficacité des campagnes promotionnelles.",
          ],
          afterList: [
            "3.2. Ces opérations de traitement de données personnelles sont essentielles à votre satisfaction et à l'activité de The Sweet Home, et sont réalisées conformément à la législation applicable et aux meilleures pratiques.",
            "3.3. Vos données personnelles ne seront pas réutilisées à des fins autres que celles préalablement identifiées ou sans lien avec les finalités pour lesquelles elles ont été initialement collectées.",
          ],
        },
        {
          heading: "4. Quelles sont les bases légales du traitement des données personnelles que nous collectons ?",
          body: [
            "4.1. Les données personnelles traitées par The Sweet Home reposent sur des bases légales spécifiques selon les finalités auxquelles elles sont destinées.",
            "4.2. Le tableau suivant présente les bases légales correspondant aux finalités mentionnées ci-dessus :",
          ],
          table: {
            columns: ["Finalité", "Base", "Données collectées"],
            rows: [
              [
                "Analyser et répondre à vos messages, assurer le support client et traiter vos demandes.",
                "Consentement à cette finalité.",
                "Nom, numéro de téléphone, adresse e-mail.",
              ],
              [
                "Pour pouvoir vous envoyer des newsletters ou d'autres publications que vous avez demandées et/ou susceptibles de vous intéresser.",
                "Consentement à cette finalité spécifique.",
                "Adresse e-mail.",
              ],
              [
                "Pour les opérations de gestion du site web.",
                "Consentement à cette finalité spécifique (cookies) ; Intérêts légitimes poursuivis par The Sweet Home.",
                "Cookies, adresse IP",
              ],
              [
                "À des fins commerciales, telles que l'analyse de données ou les audits.",
                "Consentement à cette finalité spécifique (cookies) ; Intérêts légitimes poursuivis par The Sweet Home.",
                "Cookies, adresse IP",
              ],
              [
                "Pour la prévention de la fraude et la sécurité des systèmes d'information.",
                "Intérêts légitimes poursuivis par The Sweet Home.",
                "Adresse IP",
              ],
              [
                "Pour l'adaptation, l'amélioration et la modification des services, notamment par l'identification des tendances d'utilisation, ou pour déterminer l'efficacité des campagnes promotionnelles.",
                "Consentement à cette finalité spécifique (cookies) ; Intérêts légitimes poursuivis par The Sweet Home.",
                "Cookies, adresse IP",
              ],
            ],
          },
        },
        {
          heading: "5. Comment collectons-nous vos données personnelles ?",
          body: [
            "5.1. Nous collecterons vos données personnelles via les formulaires du SITE WEB, ainsi que via le SITE WEB lui-même et la communication qu'il établit avec votre appareil, et via les e-mails que vous nous envoyez.",
            "5.2. Vos données personnelles sont collectées depuis votre appareil des façons suivantes :",
          ],
          list: [
            "(a) Via votre demande de contact ;",
            "(b) Via l'envoi d'une candidature ;",
            "(c) Via votre inscription à la newsletter ;",
            "(d) Via votre navigateur ;",
            "(e) Via les cookies ;",
            "(f) Adresse IP.",
          ],
          afterList: [
            "5.3. The Sweet Home s'engage à traiter vos données conformément à la loi et de manière légitime.",
            "5.4. The Sweet Home ne vendra, ne louera ni ne partagera vos données personnelles avec des tiers, sauf dans les cas clairement identifiés dans la présente Politique de Confidentialité (voir le point 9 pour en savoir plus).",
            "5.5. Les services de The Sweet Home ne s'adressent pas aux mineurs, et aucun traitement intentionnel de données personnelles de mineurs n'est effectué.",
          ],
        },
        {
          heading: "6. Que sont les cookies ?",
          body: [
            "6.1. Les cookies sont de petits fichiers d'information qui permettent d'identifier votre navigateur et peuvent stocker des informations, telles que les paramètres et préférences de l'Utilisateur.",
            "6.2. The Sweet Home stockera des cookies sur votre appareil afin de personnaliser et de faciliter au maximum la navigation, ainsi qu'à des fins de dépannage, de statistiques, d'assurance qualité et de surveillance de la sécurité du système.",
            "6.3. À l'exception des cookies strictement nécessaires au fonctionnement du site web, le stockage des autres cookies dépendra toujours de l'acceptation et du consentement de l'Utilisateur, qui peut être retiré à tout moment via des outils spécifiques du navigateur.",
            "6.4. Pour en savoir plus sur les cookies que nous utilisons, veuillez consulter notre Politique de Cookies.",
          ],
        },
        {
          heading: "7. Comment protégeons-nous vos données personnelles ?",
          body: [
            "7.1. Vos données personnelles sont conservées en sécurité grâce à l'adoption de diverses mesures de sécurité techniques et organisationnelles garantissant que seuls les Employés qui en ont besoin y accèdent, conformément aux règles établies.",
            "7.2. Pour protéger vos données personnelles, nous ne faisons appel qu'à des fournisseurs de centres de données proposant des mesures de sécurité adéquates et documentées, incluant des garanties que vos données personnelles sont stockées sur des serveurs maintenus dans des environnements contrôlés à accès limité.",
            "7.3. Les données personnelles sont stockées sur des serveurs sécurisés situés chez PORTUGAL TELECOM DATA CENTER, S.A, dont le numéro d'identification fiscale est 510.030.785 et le siège est situé Rua Data Center 6200-065 Covilhã, lequel nous fournit les garanties de sécurité appropriées pour protéger les données personnelles contre toute divulgation non autorisée, perte, utilisation abusive, altération, accès non autorisé ou toute autre forme de traitement illicite.",
            "7.4. De même, lorsque vous naviguez sur le SITE WEB, nous protégeons vos données par chiffrement, notamment via le protocole Hyper Text Transfer Protocol Secure (HTTPS), un protocole internet visant à établir la communication entre appareils et serveurs dans le monde entier. Le protocole HTTPS est né comme une évolution de son prédécesseur, le HTTP, la différence entre les deux étant que HTTPS chiffre la communication entre appareils.",
            "7.5. Bien que nous prenions les précautions et mesures que nous jugeons appropriées pour protéger les données personnelles que vous nous fournissez et que nous collectons, il convient de noter qu'aucun système de sécurité n'est inviolable.",
          ],
        },
        {
          heading: "8. Comment pouvez-vous exercer vos droits :",
          body: [
            "8.1. Avant d'expliquer comment vous pouvez exercer vos droits, il est important de savoir quels sont ces droits. Ainsi, la législation vous accorde le droit de demander l'exercice des droits suivants :",
          ],
          list: [
            "(a) Accès : le droit d'obtenir la confirmation que des données personnelles vous concernant sont ou non traitées et, le cas échéant, le droit d'accéder à vos données personnelles ;",
            "(b) Rectification : le droit d'obtenir la rectification des données personnelles inexactes vous concernant et le droit de faire compléter les données personnelles incomplètes ;",
            "(c) Effacement : le droit d'obtenir l'effacement de vos données personnelles lorsque l'un des motifs prévus par la législation s'applique ;",
            "(d) Limitation du traitement : le droit d'obtenir la limitation du traitement si l'une des situations prévues par la législation s'applique ;",
            "(e) Opposition : le droit de vous opposer à tout moment au traitement des données personnelles vous concernant ;",
            "(f) Portabilité : le droit de recevoir les données personnelles vous concernant dans un format structuré, couramment utilisé et lisible par machine.",
          ],
          afterList: [
            "8.2. Vous avez également le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente (au Portugal, la Commission nationale de protection des données, sur www.cnpd.pt).",
            "8.3. Pour exercer les droits mentionnés ci-dessus, veuillez contacter The Sweet Home à l'adresse e-mail suivante : info@thesweethomecompany.com.",
            "8.4. Si vous demandez la suppression de tout ou partie de vos données personnelles, certains des services demandés pourraient ne plus pouvoir vous être fournis, et The Sweet Home ne conservera que les données personnelles nécessaires au respect de ses obligations légales.",
          ],
        },
        {
          heading: "9. Quand divulguons-nous des données à des tiers ?",
          body: [
            "9.1. The Sweet Home peut faire appel à des tiers pour la fourniture de certains services, tels que la maintenance, le support technique, le marketing, la facturation ou la gestion des paiements, et ces tiers peuvent avoir accès à certaines données personnelles, à savoir les données nécessaires aux finalités contractées.",
            "9.2. The Sweet Home veille à ce que les entités ayant accès aux données soient fiables et offrent de solides garanties de protection. Elles ne recevront pas de données au-delà de ce qui est nécessaire à la fourniture du service contracté, The Sweet Home restant responsable des données personnelles fournies.",
            "9.3. The Sweet Home peut également divulguer des données à des tiers dans le cadre d'enquêtes, d'investigations, de procédures judiciaires et/ou administratives ou de procédures similaires, à condition qu'elle y soit dûment tenue par une décision de justice.",
          ],
        },
        {
          heading: "10. Sites web tiers.",
          body: [
            "10.1. Le SITE WEB peut contenir des liens vers d'autres sites web susceptibles de collecter et de traiter vos données personnelles. Le traitement des données sur ces sites relève de la seule responsabilité des propriétaires de ces sites, et The Sweet Home décline toute responsabilité quant à leurs politiques et/ou pratiques.",
            "10.2. Facebook, Instagram, YouTube, WhatsApp et LinkedIn, via les boutons présents sur le SITE WEB, en sont des exemples.",
          ],
        },
        {
          heading: "11. Transferts de données en dehors de l'Union européenne.",
          body: [
            "11.1. En cas de transfert de données vers des pays tiers en dehors de l'Union européenne, The Sweet Home se conformera aux exigences légales, notamment en ce qui concerne l'adéquation du pays de destination en matière de protection des données personnelles et les exigences applicables à ces transferts. Les données personnelles ne seront pas transférées vers des juridictions n'offrant pas de garanties adéquates de sécurité et de protection.",
          ],
        },
        {
          heading: "12. Mineurs.",
          body: [
            "12.1. Le SITE WEB ne s'adresse pas aux personnes de moins de 16 ans, et nous demandons aux mineurs de ne pas nous fournir de données personnelles via le SITE WEB, l'application, les réseaux sociaux et médias sociaux, ou les e-mails.",
          ],
        },
        {
          heading: "13. Données personnelles sensibles.",
          body: [
            "13.1. The Sweet Home vous demande de ne pas envoyer ni divulguer de données personnelles sensibles, c'est-à-dire des informations révélant l'origine raciale ou ethnique, les opinions politiques, les convictions religieuses ou philosophiques, l'appartenance syndicale, des données génétiques ou biométriques, des données relatives à la santé, ou des données relatives à la vie sexuelle ou à l'orientation sexuelle d'une personne.",
            "13.2. Si vous envoyez ou divulguez malgré tout de telles catégories de données personnelles, elles seront rapidement supprimées.",
          ],
        },
        {
          heading: "14. Modifications de la Politique de Confidentialité.",
          body: [
            "14.1. The Sweet Home se réserve le droit de réajuster ou de modifier la présente Politique de Confidentialité à tout moment, ces modifications étant dûment annoncées.",
          ],
        },
        {
          heading: "15. Nos coordonnées.",
          body: [
            "15.1. Pour toute question ou préoccupation concernant la présente Politique de Confidentialité, veuillez nous contacter par écrit à l'adresse e-mail info@thesweethomecompany.com.",
          ],
        },
      ],
      placeholders: ["Numéro de TVA de l'entreprise pour la ligne d'identification en haut de cette page."],
    },
    cookie_policy: {
      pageLabel: "Légal",
      title: "Politique de Cookies",
      updated: "Dernière mise à jour : 2026",
      sections: [
        {
          heading: "1. Que sont les cookies ?",
          body: [
            "Les « cookies » sont de petites balises logicielles stockées sur votre ordinateur par l'intermédiaire du navigateur, qui conservent uniquement des informations relatives à vos préférences et n'incluent pas vos données personnelles.",
          ],
        },
        {
          heading: "2. À quoi servent les cookies ?",
          body: [
            "Les cookies servent à déterminer l'utilité, l'intérêt et le nombre d'utilisations des sites web, permettant une navigation plus rapide et plus efficace, et supprimant la nécessité de saisir à plusieurs reprises les mêmes informations.",
          ],
        },
        {
          heading: "3. Quels types de cookies utilisons-nous ?",
          body: ["Il existe deux groupes de cookies pouvant être utilisés :"],
          list: [
            "Cookies permanents - Ce sont des cookies stockés au niveau du navigateur sur vos appareils d'accès (PC, mobile et tablette) et utilisés à chaque visite de l'un de nos sites web. Ils sont généralement utilisés pour adapter la navigation aux intérêts de l'utilisateur, nous permettant de fournir un service plus personnalisé.",
            "Cookies de session - Ce sont des cookies temporaires qui restent dans le fichier de cookies de votre navigateur jusqu'à ce que vous quittiez le site web. Les informations obtenues grâce à ces cookies sont utilisées pour analyser les tendances de trafic web, ce qui nous permet d'identifier les problèmes et d'offrir une meilleure expérience de navigation.",
          ],
        },
        {
          heading: "4. Pendant combien de temps les cookies sont-ils stockés sur mon appareil ?",
          body: ["Deux types de cookies peuvent être stockés :"],
          list: [
            "Cookies de session : Ils sont automatiquement supprimés à la fermeture de votre navigateur.",
            "Cookies persistants : Ils restent sur votre ordinateur jusqu'à leur suppression ou expiration. Les cookies persistants peuvent conserver vos préférences utilisateur afin de faciliter une navigation future plus simple et plus pertinente.",
          ],
        },
        {
          heading: "5. Où vos informations sont-elles stockées et traitées ?",
          body: [
            `Nous pouvons transférer et stocker les informations que nous recueillons à votre sujet en dehors de votre pays d'origine. Elles peuvent être traitées par notre équipe interne ou par des entreprises tierces fournissant des services à ${AGENCY_NAME}, et lorsque nous le faisons, nous veillons à ce que les informations soient sécurisées et correctement protégées. Ces mesures reposent sur des décisions d'adéquation ou sur la mise en œuvre de garanties appropriées (par exemple, des clauses contractuelles types).`,
          ],
        },
        {
          heading: "6. Comment puis-je modifier mes préférences en matière de cookies ?",
          body: ["Vous pouvez modifier vos préférences en matière de cookies via les paramètres des cookies."],
        },
        {
          heading: "7. Type de cookies et finalité",
          subsections: [
            {
              heading: "7.1. Cookies strictement nécessaires",
              body: [
                "Ils vous permettent de naviguer sur le site web et d'utiliser ses applications, ainsi que d'accéder aux zones sécurisées du site. Sans ces cookies, les services demandés ne peuvent pas être fournis.",
              ],
            },
            {
              heading: "7.2. Cookies analytiques",
              body: [
                "Ils sont utilisés de manière anonyme dans le but de créer et d'analyser des statistiques afin d'améliorer le fonctionnement du site web.",
              ],
            },
            {
              heading: "7.3. Cookies de fonctionnalité",
              body: [
                "Ils enregistrent les préférences de l'utilisateur concernant l'utilisation du site afin que vous n'ayez pas besoin de le reconfigurer à chaque visite.",
              ],
            },
            {
              heading: "7.4. Cookies tiers",
              body: [
                "Ils mesurent le succès des applications et l'efficacité de la publicité de tiers. Ils peuvent également être utilisés pour personnaliser un widget avec les données de l'utilisateur.",
              ],
            },
            {
              heading: "7.5. Cookies publicitaires",
              body: [
                "Ils ciblent la publicité en fonction des intérêts de chaque utilisateur, et limitent également le nombre de fois qu'une publicité est affichée, contribuant à mesurer l'efficacité de la publicité et le succès de l'organisation du site web.",
              ],
            },
            {
              heading: "7.6. Cookies techniques",
              body: [
                "Ce site web utilise uniquement des cookies permettant son bon fonctionnement et la fourniture des services qui y sont proposés et, le cas échéant, des cookies propriétaires ayant pour seul objectif de mesurer son audience, et qui sont donc exemptés de consentement. Par conséquent, conformément à l'article 22 de la Loi sur les services de la société de l'information, votre consentement n'est pas requis pour leur installation.",
              ],
            },
          ],
        },
      ],
      links: [{ label: "allaboutcookies.org", url: "https://allaboutcookies.org/" }],
    },
  },
};

export function getLegalContent(locale: string): LegalLocaleContent {
  return LEGAL_CONTENT[locale] ?? LEGAL_CONTENT.en;
}
