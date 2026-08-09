import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for all requests that have a locale prefix
    "/(es|fr)/:path*",
    // Exclude files with extensions, api routes, _next
    "/((?!_next|api|studio|favicon.ico|.*\\..*).*)",
  ],
};
