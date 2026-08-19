"use client";

import { useState } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import EducationAndFooter from "@/components/EducationAndFooter";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";

export default function HomeClient() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            <a
                href="#skills"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
            >
                Skip to content
            </a>
            <Navigation isVisible={isLoaded} />
            <main id="main" role="main">
                <section id="hero" className="relative" aria-label="Introduction">
                    <ScrollyCanvas onLoaded={() => setIsLoaded(true)} />
                    <Overlay />
                </section>

                <Skills />
                <Experience />
                <Projects />
                <EducationAndFooter />
            </main>
        </>
    );
}
