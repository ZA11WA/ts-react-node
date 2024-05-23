const env = process.env.ENV;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination:
          env === "localhost"
            ? process.env.LOCALHOST_DEST
            : env === "prod" && process.env.PROD_DEST,
      },
    ];
  },
};

module.exports = nextConfig;
