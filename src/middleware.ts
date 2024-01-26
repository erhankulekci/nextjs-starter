import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "@/root/i18n.config";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-expect-error locales are readonly
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}

export async function middleware(request: NextRequest) {
    const { url, nextUrl, cookies } = request;
    const locale = getLocale(request);
    const AUTH_PAGES = [`/${locale}/login`, `/${locale}/register`, `/${locale}/password-reset`];
    const PUBLIC_FILE = /\.(.*)$/;
    const isAuthPages = (url: string) => AUTH_PAGES.some((page) => page.startsWith(url));
    const pathname = nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
    const { value: token } = cookies.get("token") || { value: null };
    const isAuthPageRequested: boolean = isAuthPages(nextUrl.pathname);
    const hasLoginPage = process.env.NEXT_PUBLIC_HASLOGINPAGE ? process.env.NEXT_PUBLIC_HASLOGINPAGE === "true": true;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    if (isAuthPageRequested) {
        if (!token && hasLoginPage) {
            const response: NextResponse = NextResponse.next();
            response.cookies.delete("token");
            return response;
        }
        const response: NextResponse = NextResponse.redirect(new URL(`/${locale}/portal`, url));
        return response;
    }

    if (!token && hasLoginPage) {
        const response: NextResponse = NextResponse.redirect(new URL(`/${locale}/login`, url));
        return response;
    }

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, url)
        );
    }
}
// Matcher ignoring `/_next/` and `/api/`
export const config = {
    matcher: ["/portal/:path*", "/((?!api|_next/static|/public/:path|_next/image|favicon.ico).*)"]
};
