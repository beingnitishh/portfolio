/** Hero frame sequence shared by the homepage scroll animation and the subpage background. */
export const TOTAL_FRAMES = 89;

export function getFramePath(index: number): string {
    const padded = String(index).padStart(2, "0");
    return `/sequence/frame_${padded}_delay-0.067s.webp`;
}

/** Draws `img` into `canvas` with object-fit: cover, sized to the canvas CSS box at device pixel ratio. */
export function drawCoverFrame(canvas: HTMLCanvasElement, img: HTMLImageElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (imgRatio > canvasRatio) {
        // Image is wider than canvas: fit height, crop width.
        drawHeight = ch;
        drawWidth = ch * imgRatio;
        offsetX = (cw - drawWidth) / 2;
        offsetY = 0;
    } else {
        // Image is taller than canvas: fit width, crop height.
        drawWidth = cw;
        drawHeight = cw / imgRatio;
        offsetX = 0;
        offsetY = (ch - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}
