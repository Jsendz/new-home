import { createLegalPage } from "@/lib/legal-page-factory";

const { generateMetadata, Page } = createLegalPage("cookie_policy", "/cookie-policy");

export { generateMetadata };
export default Page;
