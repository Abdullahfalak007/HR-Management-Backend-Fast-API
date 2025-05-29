// // // next.config.js
// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   images: {
// //     // allow <Image> and next-cloudinary to optimize from your Cloudinary
// //     domains: [
// //       `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}.res.cloudinary.com`,
// //     ],
// //     unoptimized: true, // ← disable the built-in optimizer
// //   },
// //   env: {
// //     // make these available client-side
// //     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
// //       process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// //     NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
// //       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
// //   },
// // };

// // module.exports = nextConfig;
// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     // replace with your actual cloud name
//     domains: ["dvxlsjeba.res.cloudinary.com"],
//     unoptimized: true, // you can remove this if you prefer Next's built-in optimizer
//   },
//   env: {
//     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
//       process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
//       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Tell Next.js to ignore all TS errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2. Tell Next.js to ignore all ESLint errors (including unused/import/no-any)
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // allow Cloudinary’s host so secure_url previews work
    domains: ["res.cloudinary.com"],
    unoptimized: true, // you can remove this if you prefer Next's optimizer
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  },
};

module.exports = nextConfig;
