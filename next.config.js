/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
 
  env: {
    REACT_APP_API_DOMAIN: "https://chippisoft.com/API",
  },
};
