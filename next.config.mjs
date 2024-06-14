/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakeimg.pl',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'fdaceprsupemkddfcvyg.supabase.co',
                port: '',
                pathname: '/storage/v1/**',
            },
        ],
    },
}

export default nextConfig
