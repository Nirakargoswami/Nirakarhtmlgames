import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public', // Valid next-pwa configuration
  register: true,
  skipWaiting: true,
  sw: '/sw.js', // Path to service worker
});

export default nextConfig;
