"use client";

import { useState } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

import EducationAndFooter from "@/components/EducationAndFooter";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            <Navigation isVisible={isLoaded} />
            <main>
                {/* Hero section */}
                <div id="hero" className="relative">
                    <ScrollyCanvas onLoaded={() => setIsLoaded(true)} />
                    <Overlay />
                </div>

                {/* Skills section */}
                <div>
                    <Skills />
                </div>

                {/* Experience section */}
                <div id="experience">
                    <Experience />
                </div>

                {/* Projects section */}
                <div>
                    <Projects />
                </div>

                {/* Contact (Education & Footer) section */}
                <div>
                    <EducationAndFooter />
                </div>
            </main>
        </>
    );
}
