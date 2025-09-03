module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@themes': './src/themes',
          '@types': './src/types',
          '@utils': './src/utils',
          '@store': './src/store',
        },
      },
    ],
  ],
};
