module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@/app': './src/app',
          '@/helpers': './src/helpers',
          '@/infra': './src/infra',
          '@/interfaces': './src/interfaces',
          '@/main': './src/main',
          '@/presentation': './src/presentation',
        },
      },
    ],
  ],
}
