module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@/assets': './src/assets',
            '@/components': './src/components',
            '@/constants': './src/constants',
            '@/contexts': './src/contexts',
            '@/errors': './src/errors',
            '@/helpers': './src/helpers',
            '@/hooks': './src/hooks',
            '@/infra': './src/infra',
            '@/interfaces': './src/interfaces',
            '@/main': './src/main',
            '@/models': './src/models',
            '@/screens': './src/screens',
            '@/services': './src/services',
            '@/styles': './src/styles',
          },
        },
      ],
    ],
  }
}
