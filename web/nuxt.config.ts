// nuxt.config.ts

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Personas - Personal Finance AI Assistants',
            meta: [
                {
                    name: 'description',
                    content: 'Personal Finance AI Assistants designed to grow and adapt to your busy digital lifestyle. Revolutionizing Bitcoin Cash with AI-powered wallet interactions.'
                },
                { name: 'keywords', content: 'Bitcoin Cash, BCH, AI Assistant, Web3, Wallet, Crypto, Personal Finance, Account Abstraction' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
        },
    },

    /* Application Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',
    ],

    /* Runtime Configuration */
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            siteName: 'Personas',
            siteDescription: 'Personal Finance AI Assistants for Bitcoin Cash',
            language: 'en'
        }
    },

    /* Route Rules */
    routeRules: {
        /* Add CORS headers to root. */
        '/**': { cors: true },

        /* Cache static assets */
        '/assets/**': { headers: { 'cache-control': 'public, max-age=31536000' } },
    },

    /* Development Tools */
    devtools: { enabled: true },

    /* Compatibility Date */
    compatibilityDate: '2024-11-16',
})
