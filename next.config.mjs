/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

    reactStrictMode: true,
    images: {
      loader: "akamai",
      path: "public/assets/images/*",
    },  
};

export default nextConfig;
