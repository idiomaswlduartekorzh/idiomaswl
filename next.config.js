/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Optimizaciones para evitar crashear

  // 1. Turbopack optimizaciones
  experimental: {
    // Memoria limitada para Turbopack
    turbopack: {
      // Disable parallelization if causing memory issues
      // disablePartialMatching: false,
    },
  },

  // 2. Compilación perezosa (lazy)
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 min
    pagesBufferLength: 5, // Compilar solo 5 páginas a la vez
  },

  // 3. SWC optimizaciones
  swcMinify: true,

  // 4. Reduce output
  productionBrowserSourceMaps: false,

  // 5. Webpack cache
  webpack: (config, { dev }) => {
    if (dev) {
      // En desarrollo, usar cache de webpack más agresivo
      config.cache = {
        type: 'filesystem',
        cacheDirectory: '.webpack_cache',
        buildDependencies: {
          config: [__filename],
        },
        version: 'v1',
      }
    }
    return config
  },

  // 6. Image optimization
  images: {
    unoptimized: true, // En dev, no optimizar imágenes
  },

  // 7. Avoid full page recompilation
  reactStrictMode: false, // Menos re-renders en dev

  // 8. Incremental static regeneration
  staticPageGenerationTimeout: 1000, // 1s timeout
}

module.exports = nextConfig
