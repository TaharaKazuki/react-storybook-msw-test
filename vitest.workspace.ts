import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vite.config.ts',
  {
    extends: 'vite.config.ts',
    plugins: [
      storybookTest({
        storybookScript: 'npm run storybook --ci',
      }),
    ],
    test: {
      include: ['src/**/*.stories.?(m)[jt]s?(x)'],
      browser: {
        enabled: true,
        provider: 'playwright',
        // https://vitest.dev/guide/browser/playwright
        instances: [{ browser: 'chromium' }],
        headless: true,
      },
      isolate: false,
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);
