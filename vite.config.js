import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/js/landers/nailrepair/main.tsx',
                'resources/js/landers/scratchrepair/main.tsx',
                // ovde ćemo kasnije dodavati još entry fajlova za landere
            ],
            refresh: true,
        }),
        react(),
    ],
});
