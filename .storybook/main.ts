import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.story.@(js|jsx|ts|tsx|mdx)',
    '../docs/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: './vite.config.ts',
      },
    },
  },
  
  core: {
    disableTelemetry: true,
  },
  
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  
  features: {
    buildStoriesJson: true,
    storyStoreV7: true,
  },
  
  env: (config) => ({
    ...config,
    STORYBOOK_AI_ENHANCED: 'true',
    STORYBOOK_VERSION: '8.3.0',
  }),
  
  viteFinal: async (config) => {
    const { resolve } = await import('path');
    
    // Ensure proper handling of absolute imports matching vite.config.ts
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': resolve(__dirname, '../src'),
        '@/components': resolve(__dirname, '../src/components'),
        '@/theme': resolve(__dirname, '../src/theme'),
        '@/hooks': resolve(__dirname, '../src/hooks'),
        '@/utils': resolve(__dirname, '../src/utils'),
        '@/types': resolve(__dirname, '../src/types'),
        '@/providers': resolve(__dirname, '../src/providers'),
        '@/constants': resolve(__dirname, '../src/constants'),
        '@/ai-context': resolve(__dirname, '../src/ai-context'),
        '@/ai-workflow': resolve(__dirname, '../src/ai-workflow'),
      };
    }
    
    return config;
  },
  
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  
  staticDirs: [],
};

export default config;