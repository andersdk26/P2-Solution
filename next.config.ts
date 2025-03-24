import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
};

module.exports = {
    images: {
        domains: ['www.themoviedb.org'], //So there is no need to download every single poster.
    },
};

export default nextConfig;
