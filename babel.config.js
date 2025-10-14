module.exports = (api) => {
  api.cache(true);
  const plugins = [];

  plugins.push('react-native-worklets/plugin');

  return {
    presets: ['babel-preset-expo'],
    plugins,
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
