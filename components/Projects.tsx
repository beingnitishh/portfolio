"use client";

import SectionHeader from "@/components/SectionHeader";
import ProjectGrid from "@/components/ProjectGrid";
import { PROJECT_CARDS } from "@/lib/projects";

export default function Projects() {
  return (
    <section className="w-full flex justify-center bg-[#080808] pt-0 pb-12 sm:pb-16 md:pb-24 px-4 md:px-6">
      <div className="w-full max-w-[1200px] flex flex-col gap-24 md:gap-32">
        {/* BLOCK: PROJECTS */}
        <div id="projects" className="flex flex-col">
          <SectionHeader
            accent="#3B82F6"
            eyebrow="BUILT"
            title="Projects"
            aside={
              <a
                href="https://sellermetric.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left sm:text-right text-[12px] text-[#3B82F6] hover:underline break-all"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                ↗ sellermetric.vercel.app
              </a>
            }
          />

          <ProjectGrid cards={PROJECT_CARDS} />
        </div>
      </div>
    </section>
  );
}
