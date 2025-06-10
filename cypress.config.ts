import { defineConfig } from 'cypress';
import setupPlugins from './cypress/plugins/index.cjs';

export default defineConfig({
    screenshotOnRunFailure: false,
    video: false,
    viewportWidth: 1280,
    viewportHeight: 1024,
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            setupPlugins(on, config);
        },
        baseUrl: 'http://localhost:3000',
    },
});
