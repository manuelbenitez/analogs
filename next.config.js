/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.mbdev.to",
      },
    ],
  },
};

export default config;
