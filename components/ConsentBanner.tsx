"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

type ConsentChoice = "granted" | "denied";

export default function ConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isEeaVisitor = document.cookie
            .split(";")
            .some((cookie) => cookie.trim() === "eea=1");

        let hasConsentChoice = false;
        try {
            hasConsentChoice = window.localStorage.getItem("consent_choice") !== null;
        } catch {
            hasConsentChoice = false;
        }

        setIsVisible(isEeaVisitor && !hasConsentChoice);

        const openConsent = () => setIsVisible(true);
        window.addEventListener("open-consent", openConsent);

        return () => window.removeEventListener("open-consent", openConsent);
    }, []);

    const chooseConsent = (choice: ConsentChoice) => {
        window.gtag?.("consent", "update", {
            ad_storage: choice,
            ad_user_data: choice,
            ad_personalization: choice,
            analytics_storage: choice,
        });

        try {
            window.localStorage.setItem("consent_choice", choice);
        } catch {
            // Consent still applies for the current page if storage is unavailable.
        }

        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[1000] flex justify-center p-3 sm:p-4">
            <motion.aside
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                role="region"
                aria-label="Cookie consent"
                className="pointer-events-auto flex w-full max-w-3xl flex-col gap-3 rounded-xl border border-white/10 bg-[#121212]/95 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5 sm:py-4"
            >
                <p className="m-0 text-xs leading-relaxed text-white/75 sm:max-w-xl sm:text-sm">
                    I use Google Analytics to understand how visitors use this site.
                </p>
                <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:min-w-[220px]">
                    <button
                        type="button"
                        onClick={() => chooseConsent("granted")}
                        className="min-h-10 rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-brand/70 hover:bg-brand/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                        Accept
                    </button>
                    <button
                        type="button"
                        onClick={() => chooseConsent("denied")}
                        className="min-h-10 rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-brand/70 hover:bg-brand/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                        Decline
                    </button>
                </div>
            </motion.aside>
        </div>
    );
}
