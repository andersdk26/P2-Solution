import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // images: {
    //     path: '/node0/_next/image',
    // },
};

module.exports = {
    images: {
        domains: [
            'www.amazon.org',
            'm.media-amazon.com',
            'media.themoviedb.org',
        ], // Add m.media-amazon.com here
    },
};

export default nextConfig;
