import { createLegalPage } from "@/lib/legal-page-factory";

const { generateMetadata, Page } = createLegalPage("legal_notice", "/legal-notice");

export { generateMetadata };
export default Page;
