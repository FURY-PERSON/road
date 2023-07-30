module.exports = {
  stories: [
    '../../src/**/*.stories.mdx',
    '../../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false
      }
    },
    '@storybook/addon-interactions',
    'storybook-react-i18next',
    'storybook-addon-mock',
    'storybook-addon-themes'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
