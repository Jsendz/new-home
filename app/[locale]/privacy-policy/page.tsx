import { createLegalPage } from "@/lib/legal-page-factory";

const { generateMetadata, Page } = createLegalPage("privacy_policy", "/privacy-policy");

export { generateMetadata };
export default Page;
