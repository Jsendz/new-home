import { sanityClient, PROPERTIES_QUERY } from "@/lib/sanity";
import ListingsGrid from "@/components/sections/ListingsGrid";
import PageHeader from "@/components/ui/PageHeader";
import PageTransition from "@/components/ui/PageTransition";

export const revalidate = 60;

export default async function ListingsPage() {
  let properties = [];

  try {
    properties = await sanityClient.fetch(PROPERTIES_QUERY);
  } catch {
    // Sanity not configured — falls back to demo data in ListingsGrid
  }

  return (
    <PageTransition>
      <PageHeader
        label="Browse Properties"
        title="Find Your Perfect Home"
        subtitle="Explore our full collection of handpicked properties across the region."
      />
      <section className="section-padding bg-background">
        <div className="container-site">
          <ListingsGrid properties={properties} />
        </div>
      </section>
    </PageTransition>
  );
}
