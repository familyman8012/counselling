module.exports = {
  reactStrictMode: true,
  target: "experimental-serverless-trace",
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("@prisma/client");
    }

    return config;
  },
  images: {
    loader: "imgix",
    path: "",
  },
};
