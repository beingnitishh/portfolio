"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { TOTAL_FRAMES, drawCoverFrame, getFramePath } from "@/lib/frames";

export default function ScrollyCanvas({ onLoaded }: { onLoaded?: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const currentFrameRef = useRef(0);

    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        drawCoverFrame(canvas, img);
    }, []);

    // Preload all images (first frame only when the user prefers reduced motion)
    useEffect(() => {
        let aborted = false;
        const images: HTMLImageElement[] = [];
        let loaded = 0;
        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const framesToLoad = reduceMotion ? 1 : TOTAL_FRAMES;

        for (let i = 0; i < framesToLoad; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loaded++;
                if (loaded === framesToLoad && !aborted) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                    onLoaded?.();
                    drawFrame(0);
                }
            };
            img.onerror = () => {
                loaded++;
                if (loaded === framesToLoad && !aborted) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                    onLoaded?.();
                    drawFrame(0);
                }
            };
            images.push(img);
        }

        return () => {
            aborted = true;
        };
    }, [drawFrame]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            drawFrame(currentFrameRef.current);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [drawFrame]);

    // Scroll-linked animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(progress * TOTAL_FRAMES)
        );
        if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            requestAnimationFrame(() => drawFrame(frameIndex));
        }
    });

    return (
        <div ref={containerRef} className="relative h-[500vh]" style={{ touchAction: 'pan-y' }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Loading state */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#121212]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                                <div className="h-full animate-pulse rounded-full bg-brand/50" style={{ width: "60%" }} />
                            </div>
                            <span className="text-sm text-white/40 tracking-widest uppercase">
                                Loading experience
                            </span>
                        </div>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full"
                    style={{ background: "#121212", touchAction: "pan-y" }}
                    aria-hidden="true"
                    role="presentation"
                />
            </div>
        </div>
    );
}
