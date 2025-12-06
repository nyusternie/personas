<!-- components/Footer.vue -->

<script setup lang="ts">
    /* Social links */
    const socialLinks = [
        {
            name: 'GitHub',
            href: 'https://github.com/nyusternie/personas',
            description: 'View our code and contribute'
        },
        {
            name: 'Twitter',
            href: 'https://x.com/0xShomari',
            description: 'Follow us for updates'
        },
    ]

    /* Navigation sections */
    const navigation = {
        product: [
            { name: 'AI Assistant', href: '#ai-assistant' },
            { name: 'Gasless Transactions', href: '#gasless' },
            { name: 'Wallet Features', href: '#features' },
            { name: 'Security', href: '#security' },
        ],
        developers: [
            { name: 'Documentation', href: '#docs' },
            { name: 'GitHub', href: 'https://github.com/nyusternie/personas' },
            { name: 'WalletConnect', href: '#walletconnect' },
            { name: 'API Reference', href: '#api' },
        ],
        company: [
            { name: 'About', href: '#about' },
            { name: 'Team', href: '#team' },
            { name: 'Contact', href: '#contact' },
        ],
        legal: [
            { name: 'Privacy', href: '#privacy' },
            { name: 'Terms', href: '#terms' },
        ],
    }
</script>

<template>
    <footer class="bg-gray-900 border-t border-gray-800" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
            <div class="xl:grid xl:grid-cols-3 xl:gap-8">
                <!-- Brand Section -->
                <div class="space-y-8">
                    <div class="flex items-center space-x-3">
                        <img class="h-10 w-auto" src="/icon.png" alt="Personas" />
                        <span class="text-2xl font-bold text-white">Personas</span>
                    </div>

                    <p class="text-lg leading-7 text-gray-300 max-w-md">
                        Personal Finance AI Assistants — designed to grow and adapt to your busy digital lifestyle.
                        Revolutionizing Bitcoin Cash with intuitive, secure, and gasless transactions.
                    </p>

                    <!-- Social Links -->
                    <div class="flex space-x-6">
                        <a
                            v-for="item in socialLinks"
                            :key="item.name"
                            :href="item.href"
                            target="_blank"
                            class="text-gray-400 hover:text-white transition-colors duration-200"
                            :title="item.description"
                        >
                            <span class="sr-only">{{ item.name }}</span>
                            {{ item.name }}
                        </a>
                    </div>
                </div>

                <!-- Navigation Links -->
                <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <!-- Product -->
                        <div>
                            <h3 class="text-sm font-semibold leading-6 text-white">Product</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li v-for="item in navigation.product" :key="item.name">
                                    <a
                                        :href="item.href"
                                        class="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {{ item.name }}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Developers -->
                        <div class="mt-10 md:mt-0">
                            <h3 class="text-sm font-semibold leading-6 text-white">Developers</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li v-for="item in navigation.developers" :key="item.name">
                                    <a
                                        :href="item.href"
                                        class="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {{ item.name }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <!-- Company -->
                        <div>
                            <h3 class="text-sm font-semibold leading-6 text-white">Company</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li v-for="item in navigation.company" :key="item.name">
                                    <a
                                        :href="item.href"
                                        class="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {{ item.name }}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Legal -->
                        <div class="mt-10 md:mt-0">
                            <h3 class="text-sm font-semibold leading-6 text-white">Legal</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li v-for="item in navigation.legal" :key="item.name">
                                    <a
                                        :href="item.href"
                                        class="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {{ item.name }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="mt-8 border-t border-gray-800 pt-8 sm:mt-12 lg:mt-16">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <p class="text-sm leading-5 text-gray-400">
                            &copy; 2025 Personas DAO. All rights reserved.
                            <br />
                        </p>

                        <p class="text-xs leading-5 text-gray-500">
                            Created with ❤️ by
                            <a
                                href="https://hos.im"
                                target="_blank"
                                class="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                            >
                                House of Shomari
                            </a>
                        </p>
                    </div>

                    <div class="mt-4 md:mt-0">
                        <p class="text-sm leading-5 text-gray-400">
                            Built for the <a href="https://bitcoincash.org" target="_blank" class="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                                Bitcoin Cash
                            </a> and <a href="https://nexa.org" target="_blank" class="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                                Nexa
                            </a> ecosystems.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
