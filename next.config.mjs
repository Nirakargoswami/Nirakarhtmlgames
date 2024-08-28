/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

    reactStrictMode: true,
    images: {
      loader: "akamai",
      path: "public/assets/images/*",
    },  
    async rewrites() {
      return [
        {
          source: '/static/:path*',
          destination: '/static/:path*',
        },
      ];
    },
};

export default nextConfig;
