// Shared demo data — no "use client" so it can be imported by both
// server components (page.tsx) and client components (BlogPreview.tsx)
//
// Note: unlike properties, the Sanity `blogPost` schema has no per-locale
// translation fields, so this demo content (like real Sanity content) is
// single-language. Written in Catalan to match the site's default locale.

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  readTime: number;
  mainImage?: string;
  author?: { name: string; role?: string; photo?: string };
  body?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset: { _ref: string } };
    noIndex?: boolean;
  };
}

export const DEMO_POSTS: BlogPost[] = [
  {
    _id: "1",
    title: "Com comprar un immoble a Andorra sent estranger: guia completa",
    slug: { current: "comprar-immoble-andorra-estranger" },
    publishedAt: "2026-03-20",
    excerpt: "Andorra permet la compra d'immobles a no residents, però amb un tràmit específic. Repassem pas a pas què cal saber abans de fer una oferta.",
    readTime: 7,
    mainImage: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&q=80",
    author: { name: "Laura Puig", role: "Fundadora i Agent Principal", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b8c4?w=200&q=80" },
    body: [
      "Una de les preguntes que més ens fan els compradors internacionals és si poden adquirir un immoble a Andorra sense ser-ne residents. La resposta és sí, però amb una particularitat important que distingeix el mercat andorrà d'altres països europeus: cal sol·licitar una autorització d'inversió estrangera al Govern d'Andorra abans de formalitzar la compra.",
      "Aquest tràmit, gestionat pel Ministeri de Finances, no és una simple formalitat burocràtica, sinó un requisit legal imprescindible perquè l'escriptura de compravenda es pugui inscriure al Registre de la Propietat. El procés sol trigar unes setmanes i requereix presentar informació bàsica sobre el comprador i la inversió prevista. A la pràctica, per a la compra d'un únic habitatge destinat a residència pròpia, l'autorització s'acostuma a concedir sense complicacions.",
      "El següent pas és el finançament. Els bancs andorrans ofereixen hipoteques tant a residents com a no residents, encara que les condicions —percentatge finançat, tipus d'interès i documentació requerida— solen variar segons el teu estatus fiscal i el teu país d'origen. És recomanable parlar amb una entitat local des del primer moment per conèixer les teves opcions reals abans de comprometre't amb cap immoble.",
      "Un cop resolts l'autorització i el finançament, el procés de compravenda en si és similar al de la resta d'Europa: contracte d'arres, verificació de càrregues al Registre de la Propietat, i signatura davant notari. Els terminis totals, des que s'accepta una oferta fins a la firma, solen situar-se entre 4 i 8 setmanes.",
      "A The Sweet Home Co. acompanyem els nostres clients estrangers en cada pas d'aquest procés —des de la selecció de l'immoble fins a la coordinació amb notaris, bancs i l'administració— perquè comprar a Andorra sigui una experiència tan clara com comprar a casa teva.",
    ],
  },
  {
    _id: "2",
    title: "Residència fiscal a Andorra: com hi encaixa la compra d'un immoble",
    slug: { current: "residencia-fiscal-andorra-compra-immoble" },
    publishedAt: "2026-02-18",
    excerpt: "La fiscalitat avantatjosa d'Andorra atrau cada any més inversors. T'expliquem com es relaciona la compra d'un habitatge amb els diferents règims de residència.",
    readTime: 8,
    mainImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    author: { name: "Marc Vila", role: "Assessor Immobiliari Senior", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    body: [
      "Andorra s'ha convertit en un destí d'interès per a inversors i famílies que busquen un règim fiscal competitiu dins d'Europa, i la compra d'un immoble hi sol jugar un paper central. Però és important entendre que comprar un habitatge no atorga automàticament la residència fiscal: es tracta de tràmits relacionats però independents.",
      "El país ofereix diverses vies de residència, entre les quals la residència activa (per a qui treballa a Andorra) i la residència passiva (per a qui hi resideix sense exercir-hi una activitat laboral, sovint vinculada a una inversió mínima, que pot incloure béns immobles). Cada modalitat té requisits propis pel que fa a dies de permanència, dipòsits i justificació de mitjans econòmics.",
      "Per als sol·licitants de residència passiva, disposar d'un habitatge a Andorra —en propietat o en lloguer— sol ser un requisit pràctic, ja que cal poder acreditar un domicili al país. Molts dels nostres clients opten per comprar directament, tant per assentar-se de manera estable com per aprofitar la revaloració del mercat immobiliari andorrà.",
      "Un cop obtinguda la residència fiscal, els particulars es beneficien d'un IRPF amb tipus marginal màxim del 10%, sense impost sobre el patrimoni ni sobre successions i donacions en la majoria de casos. Aquesta combinació, sumada a la qualitat de vida i la proximitat a Barcelona i Tolosa, explica el creixent interès internacional pel país.",
      "Cada situació personal és diferent, i els requisits de residència poden canviar. Per això, sempre recomanem als nostres clients complementar el nostre assessorament immobiliari amb un gestor fiscal especialitzat en normativa andorrana, per confirmar quina via de residència s'ajusta millor al seu cas concret.",
    ],
  },
  {
    _id: "3",
    title: "Invertir a prop de les pistes: Grandvalira i Vallnord com a valor immobiliari",
    slug: { current: "invertir-immobles-grandvalira-vallnord" },
    publishedAt: "2026-01-25",
    excerpt: "La proximitat als dominis esquiables de Grandvalira i Vallnord continua sent un dels factors que més revalora un immoble a Andorra. Analitzem per què.",
    readTime: 6,
    mainImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
    author: { name: "Clara Font", role: "Responsable de Relacions amb Clients", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
    body: [
      "Andorra combina dos dominis esquiables de referència a Europa —Grandvalira, a les parròquies de Canillo i Encamp, i Vallnord, entre Ordino i La Massana— i aquesta proximitat és, any rere any, un dels criteris que més pesa a l'hora de decidir on comprar. No és casualitat: els immobles situats a pocs minuts de les pistes mantenen una demanda constant, tant per a ús propi com per a lloguer de temporada.",
      "A Canillo i Encamp, l'accés directe a Grandvalira ha impulsat el desenvolupament de nous àtics i complexos residencials orientats tant a compradors locals com a inversors estrangers que busquen una segona residència amb un potencial de rendibilitat clar durant la temporada d'hivern.",
      "A la banda de Vallnord, Ordino i La Massana ofereixen un perfil més familiar i tranquil, amb xalets i cases unifamiliars que combinen l'accés a l'esquí amb un entorn natural privilegiat, ideal per a qui busca una residència de muntanya per gaudir-ne tot l'any, no només a l'hivern.",
      "Més enllà de l'ús personal, el lloguer de temporada a prop de les pistes continua sent una de les estratègies d'inversió més sòlides del país: l'ocupació durant els mesos d'hivern és elevada de manera consistent, i cada cop més propietaris complementen aquests ingressos amb estades d'estiu, gràcies a l'auge del turisme de muntanya durant tot l'any.",
      "Si estàs valorant una inversió a prop de Grandvalira o Vallnord, el nostre equip et pot ajudar a comparar zones, preus per metre quadrat i potencial de lloguer segons la parròquia, perquè la teva decisió es basi en dades reals del mercat, no només en la vista des del balcó.",
    ],
  },
];
