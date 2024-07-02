import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

const { RECOMMENDATION_V2_URL } = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
    rewrites: async () => [
        {
            source: '/recommendations-api/:path*',
            destination: `${RECOMMENDATION_V2_URL}/:path*`,
        },
    ],
}

export default withVanillaExtract(nextConfig)
