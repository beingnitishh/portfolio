"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 89;

function getFramePath(index: number): string {
    const padded = String(index).padStart(2, "0");
    return `/sequence/frame_${padded}_delay-0.067s.webp`;
}

export default function ScrollyCanvas({ onLoaded }: { onLoaded?: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const currentFrameRef = useRef(0);

    // Draw frame with object-fit: cover logic
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Set canvas to screen size
        const dpr = window.devicePixelRatio || 1;
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
        ctx.scale(dpr, dpr);

        // object-fit: cover calculation
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cw / ch;

        let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

        if (imgRatio > canvasRatio) {
            // Image is wider than canvas — fit height to canvas, crop width horizontally
            drawHeight = ch;
            drawWidth = ch * imgRatio;
            offsetX = (cw - drawWidth) / 2;
            offsetY = 0;
        } else {
            // Image is taller than canvas — fit width to canvas, crop height vertically
            drawWidth = cw;
            drawHeight = cw / imgRatio;
            offsetX = 0;
            offsetY = (ch - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, []);

    // Preload all images
    useEffect(() => {
        let aborted = false;
        const images: HTMLImageElement[] = [];
        let loaded = 0;

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loaded++;
                if (loaded === TOTAL_FRAMES && !aborted) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                    onLoaded?.();
                    // Draw first frame
                    drawFrame(0);
                }
            };
            img.onerror = () => {
                loaded++;
                if (loaded === TOTAL_FRAMES && !aborted) {
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
                />
            </div>
        </div>
    );
}
