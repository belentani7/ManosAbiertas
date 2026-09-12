/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/ux-academy/:path*',
        destination: 'https://ux-academy-professional-program.vercel.app/:path*',
      },
      {
        source: '/manos-abiertas/:path*',
        destination: 'https://manosabiertas-seven.vercel.app/:path*',
      },
      {
        source: '/belentani-judas/:path*',
        destination: 'https://belentani-judas.vercel.app/:path*',
      },
    ];
  },
};

module.exports = nextConfig;