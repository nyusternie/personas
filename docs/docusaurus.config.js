// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`)
// There are various equivalent ways to declare your Docusaurus config
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer'

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Personas',
    tagline: 'Personal Finance AI Assistants — designed to grow and adapt to your busy digital lifestyle.',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://personas-docs.example.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'nyusternie',
    projectName: 'personas',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/nyusternie/personas/tree/main/docs/',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/personas-social-card.jpg',
            navbar: {
                title: 'Personas',
                logo: {
                    alt: 'Personas Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Documentation',
                    },
                    {
                        href: 'https://github.com/nyusternie',
                        label: 'GitHub',
                        position: 'right',
                    },
                    {
                        href: 'https://x.com/0xShomari',
                        label: 'Twitter',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Documentation',
                        items: [
                            {
                                label: 'Introduction',
                                to: '/docs/intro',
                            },
                            {
                                label: 'Features',
                                to: '/docs/features',
                            },
                            {
                                label: 'Getting Started',
                                to: '/docs/getting-started',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/nyusternie',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://x.com/0xShomari',
                            },
                            {
                                label: 'DoraHacks',
                                href: 'https://dorahacks.io/buidl/32734',
                            },
                        ],
                    },
                    {
                        title: 'Technology',
                        items: [
                            {
                                label: 'Nuxt',
                                href: 'https://nuxt.com/',
                            },
                            {
                                label: 'Tailwind CSS',
                                href: 'https://tailwindcss.com/',
                            },
                            {
                                label: 'CashScript',
                                href: 'https://cashscript.org/',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Personas. Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
}

export default config
