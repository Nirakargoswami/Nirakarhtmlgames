/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

    reactStrictMode: true,
    images: {
      loader: "akamai",
      path: "public/assets/images/*",
    },  
    rewrites: [
      {
        "source": "/static/:slug*/index.html",
        "destination": "/public/static/:slug*/index.html"
      }
    ]
};

export default nextConfig;
