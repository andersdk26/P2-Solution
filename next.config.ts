import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        // path: '/node0/_next/image',
        domains: [
            'www.amazon.org',
            'm.media-amazon.com',
            'media.themoviedb.org',
        ],
    },
};

export default nextConfig;
