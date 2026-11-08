import type { ReactNode } from "react";
import FrameBackground from "@/components/FrameBackground";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";

/**
 * Shared shell for /projects and every /projects/[slug] page: the homepage
 * navbar (with "Projects" active), the frame background, and the homepage footer.
 * The root layout still provides analytics, Consent Mode and the cookie banner.
 */
export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <Navigation mode="page" activeId="projects" />
      <FrameBackground />

      <div
        className="relative z-10 flex min-h-screen flex-col"
        style={{ paddingTop: "calc(64px + env(safe-area-inset-top))" }}
      >
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
