const withPWA = require("next-pwa");

const production = process.env.NODE_ENV === "production";
const apiHost = process.env.API_HOST;
const mediaBlob = process.env.MEDIA_BLOB_BASE_PATH;
const defaultSource = process.env.NEXTAUTH_URL;
/*
  default-src 'none'; // none is default
  NextJS requires 'unsafe-eval' in dev (faster source maps)
   https://ctsdevmedia.blob.core.windows.net
*/

const cspHeader = `
    default-src 'self' ${defaultSource};
    connect-src 'self' ${apiHost} https://dc.services.visualstudio.com/v2/track data:;
    media-src 'self' ${mediaBlob};
    frame-src 'self' blob:;
    script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' ${
      production ? "" : "'unsafe-eval'"
    };
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspHeader.replace(/\n/g, "")
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on"
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload"
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  },
  {
    key: "Referrer-Policy",
    value: "same-origin"
  }
];
const nextConfig = {
  output: "standalone",
  // distDir: "dist",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      }
    ];
  },
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
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
  })
};

module.exports = nextConfig;

//module.exports = withPWA(nextConfig);

// const withPWA = require('next-pwa');

// const nextConfig = {
//   output: "standalone",
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/dashboard",
//         permanent: false
//       }
//     ];
//   },
//   webpack5: true,
//   webpack: (config) => {
//     config.resolve.fallback = { fs: false };

//     return config;
//   },
//   ...withPWA({
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
//     disable: process.env.NODE_ENV === "development"
//   }
//   )
// };

// module.exports = nextConfig;

// //module.exports = withPWA(nextConfig);
