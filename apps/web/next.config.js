const { resolve } = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    forceSwcTransforms: true,
    swcPlugins: [[resolve(__dirname, "./swc_remove_apollo_plugin.wasm"), {}]],
  },
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  },
};
