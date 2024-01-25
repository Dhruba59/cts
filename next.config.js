
const withPWA = require('next-pwa');

const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false
      }
    ];
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
  }
  )
};

module.exports = nextConfig;

//module.exports = withPWA(nextConfig);
