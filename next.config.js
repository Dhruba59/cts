/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
