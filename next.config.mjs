/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.morestudio.co.th",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "thaicarbonlabel.tgo.or.th",
        pathname: "/**"
      }
    ]
  },  
};

export default nextConfig;
