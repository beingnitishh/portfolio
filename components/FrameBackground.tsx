"use client";

import { useEffect, useRef } from "react";
import { TOTAL_FRAMES, drawCoverFrame, getFramePath } from "@/lib/frames";

/** How many frames download at once after the page has loaded. */
const LOAD_CONCURRENCY = 3;

/**
 * Fixed full-screen background made from the homepage's hero frame sequence.
 * Unlike the homepage hero it has no loading overlay, it follows page scroll,
 * it pauses while the tab is hidden, and under prefers-reduced-motion it shows
 * a single still frame.
 */
export default function FrameBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const frames: (HTMLImageElement | undefined)[] = new Array(TOTAL_FRAMES);
        const queue: number[] = motionQuery.matches
            ? [0]
            : Array.from({ length: TOTAL_FRAMES }, (_, i) => i);

        let disposed = false;
        let paused = document.hidden;
        let rafId = 0;
        let active = 0;

        const frameForScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            return Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
        };

        const render = () => {
            if (disposed || paused) return;
            const target = motionQuery.matches ? 0 : frameForScroll();
            // Draw the nearest frame that has already loaded so scrolling never waits on the network.
            let i = target;
            while (i > 0 && !frames[i]) i--;
            const img = frames[i];
            if (img && img.complete && img.naturalWidth > 0) drawCoverFrame(canvas, img);
        };

        const loadNext = () => {
            while (!disposed && active < LOAD_CONCURRENCY && queue.length > 0) {
                const index = queue.shift() as number;
                const img = new Image();
                active++;
                const finish = (ok: boolean) => {
                    active--;
                    if (!disposed && ok) {
                        frames[index] = img;
                        render();
                    }
                    loadNext();
                };
                img.onload = () => finish(true);
                img.onerror = () => finish(false);
                img.src = getFramePath(index);
            }
        };

        const start = () => loadNext();
        if (document.readyState === "complete") start();
        else window.addEventListener("load", start, { once: true });

        const onScroll = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = 0;
                render();
            });
        };
        const onResize = () => render();
        const onVisibility = () => {
            paused = document.hidden;
            if (!paused) render();
        };
        const onMotionChange = () => render();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        document.addEventListener("visibilitychange", onVisibility);
        motionQuery.addEventListener("change", onMotionChange);

        return () => {
            disposed = true;
            if (rafId) window.cancelAnimationFrame(rafId);
            window.removeEventListener("load", start);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVisibility);
            motionQuery.removeEventListener("change", onMotionChange);
        };
    }, []);

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#080808]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-[0.28]" role="presentation" />
            <div className="absolute inset-0 bg-[#080808]/70" />
        </div>
    );
}
