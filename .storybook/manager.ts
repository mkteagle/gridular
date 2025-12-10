import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';
import packageJson from '../package.json';

const theme = create({
  base: 'light',
  brandTitle: `Gridular v${packageJson.version}`,
  brandUrl: packageJson.homepage,
  brandImage: '/logo.svg',
  brandTarget: '_blank',
});

addons.setConfig({
  theme,
});
