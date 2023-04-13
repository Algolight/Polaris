module.exports = {
  presets: [
    [
      '@shopify/babel-preset',
      {
        react: true,
        typescript: true,
        isWebpack5: true,
        reactOptions: {
          useBuiltIns: true,
          runtime: 'automatic',
        },
      },
    ],
  ],
  plugins: [['@shopify/react-i18n/babel']],
};
