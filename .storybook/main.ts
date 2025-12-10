import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    return mergeConfig(config, {
      server: {
        proxy: {
          "/api/potterdb": {
            target: "https://api.potterdb.com",
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api\/potterdb/, ""),
            secure: false,
          },
        },
      },
    });
  },
};
export default config;