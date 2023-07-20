module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@/constants': './src/constants',
            '@/domain': './src/domain',
            '@/errors': './src/errors',
            '@/helpers': './src/helpers',
            '@/infra': './src/infra',
            '@/interfaces': './src/interfaces',
            '@/main': './src/main',
            '@/models': './src/models',
            '@/services': './src/services',
            '@/ui': './src/ui',
            '@/validation': './src/validation',
            '@/test': './test',
            '@/jest': './jest',
          },
        },
      ],
    ],
  }
}
