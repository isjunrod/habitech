import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: [
        "@photo-sphere-viewer/core",
        "react-photo-sphere-viewer",
    ],
};

export default nextConfig;