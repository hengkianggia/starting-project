const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi Anda yang sudah ada
  // devIndicators: false,
  output: "standalone",
  images: {
    domains: ["*"],
  },

  // Tambahkan fungsi webpack di sini
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          shared_components: `shared_components@http://localhost:9100/_next/static/chunks/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
        extraOptions: {
          exposePages: true, // Changed to true for Pages Router
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
        },
      }),
    );

    return config;
  },
};

module.exports = nextConfig;