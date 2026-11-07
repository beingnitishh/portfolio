import { NextRequest, NextResponse } from "next/server";

const EEA_COUNTRIES = new Set([
    "AT",
    "BE",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "FR",
    "DE",
    "GR",
    "HU",
    "IS",
    "IE",
    "IT",
    "LV",
    "LI",
    "LT",
    "LU",
    "MT",
    "NL",
    "NO",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES",
    "SE",
    "GB",
    "CH",
]);

export function middleware(request: NextRequest) {
    const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
    const response = NextResponse.next();

    if (country && EEA_COUNTRIES.has(country)) {
        response.cookies.set("eea", "1", {
            path: "/",
            maxAge: 86400,
            sameSite: "lax",
            httpOnly: false,
        });
    } else if (request.cookies.get("eea")?.value === "1") {
        // Clear a previously set regional flag if the visitor is now outside the region.
        response.cookies.set("eea", "", {
            path: "/",
            maxAge: 0,
            sameSite: "lax",
            httpOnly: false,
        });
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!api(?:/|$)|_next(?:/|$)|favicon\\.ico$|.*\\.(?:avif|bmp|css|csv|eot|gif|ico|jpe?g|js|json|map|mp3|mp4|pdf|png|svg|txt|webm|webmanifest|webp|woff2?|xml)$).*)",
    ],
};
