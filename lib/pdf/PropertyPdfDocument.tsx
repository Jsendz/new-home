import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const NAVY = "#0C2D52";
const ORANGE = "#F07820";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#1A1A1A", paddingBottom: 56 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  logo: { width: 24, height: 24, borderRadius: 5 },
  brand: { fontFamily: "Helvetica-Bold", fontSize: 11, color: NAVY, letterSpacing: 1 },
  heroImage: { width: "100%", height: 260, objectFit: "cover" },
  body: { paddingHorizontal: 36, paddingTop: 20 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4, gap: 12 },
  title: { fontFamily: "Helvetica-Bold", fontSize: 19, color: NAVY, flexGrow: 1, flexShrink: 1 },
  price: { fontFamily: "Helvetica-Bold", fontSize: 19, color: ORANGE, flexShrink: 0 },
  location: { fontSize: 10, color: MUTED, marginBottom: 16 },
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  statBox: { flexGrow: 1, backgroundColor: "#F5F6F8", borderRadius: 6, paddingVertical: 8, paddingHorizontal: 10 },
  statLabel: { fontSize: 7, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 },
  statValue: { fontFamily: "Helvetica-Bold", fontSize: 11, color: "#1A1A1A" },
  sectionLabel: { fontFamily: "Helvetica-Bold", fontSize: 12, color: NAVY, marginBottom: 8 },
  description: { fontSize: 9.5, lineHeight: 1.5, color: "#333333", marginBottom: 20 },
  galleryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  galleryImage: { width: 158, height: 110, borderRadius: 4, objectFit: "cover" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { fontSize: 8, color: MUTED },
});

export interface PropertyPdfStat {
  label: string;
  value: string;
}

export interface PropertyPdfLabels {
  overviewLabel: string;
  galleryLabel: string;
}

export interface PropertyPdfDocumentProps {
  logoImage: Buffer;
  brandName: string;
  title: string;
  priceLabel: string;
  location: string;
  stats: PropertyPdfStat[];
  description: string;
  mainImage?: Buffer;
  galleryImages: Buffer[];
  labels: PropertyPdfLabels;
  agencyPhone: string;
  agencyEmail: string;
  propertyUrl: string;
}

export default function PropertyPdfDocument({
  logoImage,
  brandName,
  title,
  priceLabel,
  location,
  stats,
  description,
  mainImage,
  galleryImages,
  labels,
  agencyPhone,
  agencyEmail,
  propertyUrl,
}: PropertyPdfDocumentProps) {
  return (
    <Document title={title}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={{ data: logoImage, format: "jpg" }} style={styles.logo} />
          <Text style={styles.brand}>{brandName.toUpperCase()}</Text>
        </View>

        {mainImage && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image src={{ data: mainImage, format: "jpg" }} style={styles.heroImage} />
        )}

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{priceLabel}</Text>
          </View>
          <Text style={styles.location}>{location}</Text>

          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statBox}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>{labels.overviewLabel}</Text>
          <Text style={styles.description}>{description}</Text>

          {galleryImages.length > 0 && (
            <>
              <Text style={styles.sectionLabel}>{labels.galleryLabel}</Text>
              <View style={styles.galleryGrid}>
                {galleryImages.map((buffer, i) => (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <Image key={i} src={{ data: buffer, format: "jpg" }} style={styles.galleryImage} />
                ))}
              </View>
            </>
          )}
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{propertyUrl}</Text>
          <Text style={styles.footerText}>{agencyPhone} · {agencyEmail}</Text>
        </View>
      </Page>
    </Document>
  );
}
