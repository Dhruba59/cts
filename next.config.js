
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
