/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        GITHUB_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_SECRET: process.env.GITHUB_CLIENT_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
}

module.exports = nextConfig
