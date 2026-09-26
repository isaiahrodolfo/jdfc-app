const { getDefaultConfig } = require("expo/metro-config");
const { withStorybook } = require("@storybook/react-native/withStorybook");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

// 1. Add the SVG babel transformer
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// 2. Filter out 'svg' from assets and add it to source extensions
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
};

// 3. Export the final config wrapped with Storybook
module.exports = withStorybook(config);
