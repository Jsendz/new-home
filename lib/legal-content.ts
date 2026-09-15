// Content for the three footer-only legal pages (legal notice, privacy
// policy, cookie policy). Kept as plain structured data — rather than in
// messages/*.json — because it's long-form prose, not short UI strings.
//
// IMPORTANT: legal_notice and privacy_policy are DRAFTS built from the
// business facts already public elsewhere on this site (name, address,
// phone, email) plus an accurate description of what this site's forms
// and integrations actually do (Sanity CMS, HubSpot CRM, Vercel hosting).
// Anywhere a specific legal fact is needed that isn't known — company
// registration number, applicable jurisdiction, data retention periods,
// supervisory authority — is marked with a `placeholders` entry, which
// renders as a visible callout on the page. Have these reviewed (ideally
// by a lawyer) and the placeholders filled in before treating them as
// final compliance documents. cookie_policy content was supplied in full
// and is not a placeholder document.

export interface LegalSubsection {
  heading: string;
  body: string[];
}

export interface LegalSection {
  heading: string;
  body?: string[];
  list?: string[];
  subsections?: LegalSubsection[];
}

export interface LegalDocument {
  pageLabel: string;
  title: string;
  updated: string;
  intro?: string;
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
      sections: [
        {
          heading: "1. Data controller",
          body: [
            `${AGENCY_NAME}, ${AGENCY_ADDRESS} — ${AGENCY_EMAIL} — ${AGENCY_PHONE}, is the data controller responsible for the personal data described in this policy.`,
          ],
        },
        {
          heading: "2. What personal data we collect",
          body: [
            "When you submit a contact or property enquiry form on this website, we collect the information you provide: full name, email address, phone number (if given), your message, and, where relevant, the property you are enquiring about.",
          ],
        },
        {
          heading: "3. Purpose and legal basis",
          body: [
            "We use this data to respond to your enquiry and provide the information or service you requested. The legal basis for this processing is your consent, given at the point you submit the form.",
          ],
        },
        {
          heading: "4. Who processes your data",
          body: [
            "Enquiries are managed through our CRM system (HubSpot) to track and follow up with you. The website itself is hosted on Vercel and its content managed through Sanity. These providers act as processors on our behalf and only handle your data to provide these services to us.",
          ],
        },
        {
          heading: "5. International transfers",
          body: [
            "Some of our service providers may process data outside your country of residence. Where this happens, we rely on appropriate safeguards such as adequacy decisions or standard contractual clauses to keep your data protected.",
          ],
        },
        {
          heading: "6. Data retention",
          body: [
            "We keep your enquiry data for as long as necessary to respond to you and manage our relationship with you, after which it is deleted or anonymized.",
          ],
        },
        {
          heading: "7. Your rights",
          body: [
            `You have the right to access, rectify, erase, and object to the processing of your personal data, and to request data portability. To exercise any of these rights, contact us at ${AGENCY_EMAIL}.`,
          ],
        },
        {
          heading: "8. Changes to this policy",
          body: [
            "We may update this privacy policy from time to time. The date at the top of this page reflects the most recent revision.",
          ],
        },
      ],
      placeholders: [
        "Exact data retention period for Section 6 (e.g. \"24 months after last contact\").",
        "Name and contact details of the supervisory authority for Section 7 (e.g. Andorra's Agència Andorrana de Protecció de Dades, if the business is Andorra-registered).",
      ],
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
      sections: [
        {
          heading: "1. Responsable del tractament",
          body: [
            `${AGENCY_NAME}, ${AGENCY_ADDRESS} — ${AGENCY_EMAIL} — ${AGENCY_PHONE}, és el responsable del tractament de les dades personals descrites en aquesta política.`,
          ],
        },
        {
          heading: "2. Quines dades personals recollim",
          body: [
            "Quan ompliu un formulari de contacte o de sol·licitud d'informació sobre una propietat en aquest lloc web, recollim la informació que ens proporcioneu: nom complet, adreça electrònica, telèfon (si el faciliteu), el vostre missatge i, si escau, la propietat sobre la qual consulteu.",
          ],
        },
        {
          heading: "3. Finalitat i base legal",
          body: [
            "Utilitzem aquestes dades per respondre a la vostra consulta i oferir-vos la informació o el servei sol·licitat. La base legal d'aquest tractament és el vostre consentiment, atorgat en el moment d'enviar el formulari.",
          ],
        },
        {
          heading: "4. Qui tracta les vostres dades",
          body: [
            "Les consultes es gestionen a través del nostre sistema CRM (HubSpot) per fer-ne seguiment. El lloc web s'allotja a Vercel i el seu contingut es gestiona mitjançant Sanity. Aquests proveïdors actuen com a encarregats del tractament i només tracten les vostres dades per prestar-nos aquests serveis.",
          ],
        },
        {
          heading: "5. Transferències internacionals",
          body: [
            "Alguns dels nostres proveïdors de serveis poden tractar dades fora del vostre país de residència. Quan això passa, ens basem en garanties adequades, com decisions d'adequació o clàusules contractuals tipus, per mantenir les vostres dades protegides.",
          ],
        },
        {
          heading: "6. Conservació de les dades",
          body: [
            "Conservem les dades de la vostra consulta durant el temps necessari per respondre-us i gestionar la relació amb vosaltres, després del qual s'eliminen o s'anonimitzen.",
          ],
        },
        {
          heading: "7. Els vostres drets",
          body: [
            `Teniu dret a accedir, rectificar i suprimir les vostres dades personals, oposar-vos-hi al tractament i sol·licitar-ne la portabilitat. Per exercir qualsevol d'aquests drets, contacteu-nos a ${AGENCY_EMAIL}.`,
          ],
        },
        {
          heading: "8. Canvis en aquesta política",
          body: [
            "Podem actualitzar aquesta política de privacitat periòdicament. La data que apareix a la part superior d'aquesta pàgina reflecteix la darrera revisió.",
          ],
        },
      ],
      placeholders: [
        "Termini exacte de conservació de les dades per a l'apartat 6 (p. ex. «24 mesos des de l'últim contacte»).",
        "Nom i dades de contacte de l'autoritat de control per a l'apartat 7 (p. ex. l'Agència Andorrana de Protecció de Dades, si l'empresa està registrada a Andorra).",
      ],
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
      sections: [
        {
          heading: "1. Responsable del tratamiento",
          body: [
            `${AGENCY_NAME}, ${AGENCY_ADDRESS} — ${AGENCY_EMAIL} — ${AGENCY_PHONE}, es el responsable del tratamiento de los datos personales descritos en esta política.`,
          ],
        },
        {
          heading: "2. Qué datos personales recopilamos",
          body: [
            "Cuando rellena un formulario de contacto o de solicitud de información sobre una propiedad en este sitio web, recopilamos la información que nos proporciona: nombre completo, dirección de correo electrónico, teléfono (si lo facilita), su mensaje y, en su caso, la propiedad sobre la que consulta.",
          ],
        },
        {
          heading: "3. Finalidad y base legal",
          body: [
            "Utilizamos estos datos para responder a su consulta y ofrecerle la información o el servicio solicitado. La base legal de este tratamiento es su consentimiento, otorgado en el momento de enviar el formulario.",
          ],
        },
        {
          heading: "4. Quién trata sus datos",
          body: [
            "Las consultas se gestionan a través de nuestro sistema CRM (HubSpot) para su seguimiento. El sitio web se aloja en Vercel y su contenido se gestiona mediante Sanity. Estos proveedores actúan como encargados del tratamiento y solo tratan sus datos para prestarnos estos servicios.",
          ],
        },
        {
          heading: "5. Transferencias internacionales",
          body: [
            "Algunos de nuestros proveedores de servicios pueden tratar datos fuera de su país de residencia. Cuando esto ocurre, nos basamos en garantías adecuadas, como decisiones de adecuación o cláusulas contractuales tipo, para mantener sus datos protegidos.",
          ],
        },
        {
          heading: "6. Conservación de los datos",
          body: [
            "Conservamos los datos de su consulta durante el tiempo necesario para responderle y gestionar la relación con usted, tras lo cual se eliminan o anonimizan.",
          ],
        },
        {
          heading: "7. Sus derechos",
          body: [
            `Tiene derecho a acceder, rectificar y suprimir sus datos personales, oponerse a su tratamiento y solicitar su portabilidad. Para ejercer cualquiera de estos derechos, contáctenos en ${AGENCY_EMAIL}.`,
          ],
        },
        {
          heading: "8. Cambios en esta política",
          body: [
            "Podemos actualizar esta política de privacidad periódicamente. La fecha que aparece en la parte superior de esta página refleja la última revisión.",
          ],
        },
      ],
      placeholders: [
        "Plazo exacto de conservación de los datos para el apartado 6 (p. ej. «24 meses desde el último contacto»).",
        "Nombre y datos de contacto de la autoridad de control para el apartado 7 (p. ej. la Agència Andorrana de Protecció de Dades, si la empresa está registrada en Andorra).",
      ],
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
      sections: [
        {
          heading: "1. Responsable du traitement",
          body: [
            `${AGENCY_NAME}, ${AGENCY_ADDRESS} — ${AGENCY_EMAIL} — ${AGENCY_PHONE}, est le responsable du traitement des données personnelles décrites dans cette politique.`,
          ],
        },
        {
          heading: "2. Quelles données personnelles collectons-nous",
          body: [
            "Lorsque vous remplissez un formulaire de contact ou de demande d'information sur un bien via ce site, nous collectons les informations que vous fournissez : nom complet, adresse e-mail, téléphone (si renseigné), votre message et, le cas échéant, le bien concerné par votre demande.",
          ],
        },
        {
          heading: "3. Finalité et base légale",
          body: [
            "Nous utilisons ces données pour répondre à votre demande et vous fournir l'information ou le service demandé. La base légale de ce traitement est votre consentement, donné au moment de l'envoi du formulaire.",
          ],
        },
        {
          heading: "4. Qui traite vos données",
          body: [
            "Les demandes sont gérées via notre système CRM (HubSpot) afin d'en assurer le suivi. Le site est hébergé sur Vercel et son contenu géré via Sanity. Ces prestataires agissent en tant que sous-traitants pour notre compte et ne traitent vos données que pour nous fournir ces services.",
          ],
        },
        {
          heading: "5. Transferts internationaux",
          body: [
            "Certains de nos prestataires peuvent traiter des données en dehors de votre pays de résidence. Le cas échéant, nous nous appuyons sur des garanties appropriées, telles que des décisions d'adéquation ou des clauses contractuelles types, pour assurer la protection de vos données.",
          ],
        },
        {
          heading: "6. Conservation des données",
          body: [
            "Nous conservons les données de votre demande le temps nécessaire pour vous répondre et gérer notre relation avec vous, après quoi elles sont supprimées ou anonymisées.",
          ],
        },
        {
          heading: "7. Vos droits",
          body: [
            `Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles, d'opposition à leur traitement, ainsi que d'un droit à la portabilité. Pour exercer l'un de ces droits, contactez-nous à ${AGENCY_EMAIL}.`,
          ],
        },
        {
          heading: "8. Modifications de cette politique",
          body: [
            "Nous pouvons mettre à jour cette politique de confidentialité périodiquement. La date en haut de cette page reflète la dernière révision.",
          ],
        },
      ],
      placeholders: [
        "Durée exacte de conservation des données pour la section 6 (ex. « 24 mois après le dernier contact »).",
        "Nom et coordonnées de l'autorité de contrôle pour la section 7 (ex. l'Agència Andorrana de Protecció de Dades, si l'entreprise est enregistrée en Andorre).",
      ],
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
