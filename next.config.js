/** @type {import('next').NextConfig} */
// Hero frames are drawn on <canvas>, not next/image. Keep unoptimized until
// photography/screenshots migrate to next/image (no remote image hosts today).
const nextConfig = {
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
