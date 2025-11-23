<!-- components/Header.vue -->

<template>
    <header class="absolute inset-x-0 top-0 z-50 bg-transparent">
        <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <!-- Logo -->
            <div class="flex lg:flex-1">
                <NuxtLink to="/" class="-m-1.5 p-1.5 flex items-center space-x-3">
                    <img class="h-12 w-auto" src="/icon.png" alt="Personas" />
                    <span class="text-2xl font-bold text-white">Personas</span>
                </NuxtLink>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden lg:flex lg:gap-x-8">
                <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    class="text-sm font-semibold leading-6 text-white hover:text-purple-300 transition-colors duration-200"
                >
                    {{ item.name }}
                </a>
            </div>

            <!-- Desktop Actions -->
            <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-6">
                <!-- Social Links -->
                <div class="flex items-center space-x-4 mr-4">
                    <a
                        v-for="social in socialLinks"
                        :key="social.name"
                        :href="social.href"
                        target="_blank"
                        class="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                        <span class="sr-only">{{ social.name }}</span>
                        {{ social.name }}
                    </a>
                </div>

                <!-- Launch App Button -->
                <button
                    @click="launchApp"
                    class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105"
                >
                    Launch App
                </button>

                <!-- Wallet Info -->
                <div v-if="Wallet.isConnected" class="flex items-center space-x-3">
                    <div class="bg-green-500/20 border border-green-400/30 rounded-full px-4 py-2">
                        <span class="text-green-300 text-sm font-medium">
                            {{ Wallet.truncatedAddress }}
                        </span>
                    </div>
                    <button
                        @click="Wallet.disconnect"
                        class="text-gray-300 hover:text-white text-sm font-medium"
                    >
                        Disconnect
                    </button>
                </div>
            </div>

            <!-- Mobile Menu Button -->
            <div class="flex lg:hidden">
                <button
                    type="button"
                    @click="toggleMenu"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white transition-colors duration-200"
                >
                    <span class="sr-only">Open main menu</span>
                    <!-- Simple menu icon -->
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div
            v-if="isMobileMenuOpen"
            class="lg:hidden fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm"
            @click="toggleMenu"
        >
            <div
                class="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
                @click.stop
            >
                <div class="flex items-center justify-between">
                    <NuxtLink to="/" class="-m-1.5 p-1.5 flex items-center space-x-3" @click="toggleMenu">
                        <img class="h-10 w-auto" src="/icon.png" alt="Personas" />
                        <span class="text-xl font-bold text-white">Personas</span>
                    </NuxtLink>
                    <button
                        type="button"
                        @click="toggleMenu"
                        class="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white"
                    >
                        <span class="sr-only">Close menu</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-700">
                        <!-- Navigation Links -->
                        <div class="space-y-2 py-6">
                            <a
                                v-for="item in navigation"
                                :key="item.name"
                                :href="item.href"
                                @click="toggleMenu"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                            >
                                {{ item.name }}
                            </a>
                        </div>

                        <!-- Actions Section -->
                        <div class="py-6">
                            <div class="space-y-4">
                                <!-- Launch App Button -->
                                <button
                                    @click="launchApp"
                                    class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200"
                                >
                                    Launch App
                                </button>

                                <!-- Wallet Info (if connected) -->
                                <div v-if="Wallet.isConnected" class="space-y-3">
                                    <div class="bg-green-500/20 border border-green-400/30 rounded-lg px-4 py-3">
                                        <p class="text-green-300 text-sm font-medium text-center">
                                            {{ Wallet.truncatedAddress }}
                                        </p>
                                    </div>
                                    <button
                                        @click="Wallet.disconnect"
                                        class="w-full text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200"
                                    >
                                        Disconnect
                                    </button>
                                </div>
                            </div>

                            <!-- Social Links Mobile -->
                            <div class="flex justify-center space-x-4 pt-4">
                                <a
                                    v-for="social in socialLinks"
                                    :key="social.name"
                                    :href="social.href"
                                    target="_blank"
                                    class="text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    <span class="sr-only">{{ social.name }}</span>
                                    {{ social.name }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Wallet Connect Modal -->
        <WalletConnectModal
            v-if="showWalletConnect"
            @close="closeWalletConnect"
        />

        <!-- Hackathon Modal -->
        <div v-if="showHackathonModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <!-- Modal Header -->
                <div class="bg-green-600 text-white p-6 rounded-t-lg">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold">💖 Fuel Our Mission</h2>
                        <button
                            @click="closeHackathonModal"
                            class="text-white hover:text-gray-200 text-2xl"
                        >
                            &times;
                        </button>
                    </div>
                    <p class="mt-2 text-green-100">Join the revolution! Send EMBERs to power the future of autonomous finance 🚀</p>
                </div>

                <!-- Modal Content -->
                <div class="p-6">
                    <p class="text-center text-gray-600 dark:text-gray-300 mb-6">
                        📱 Scan to Fuel Innovation w/ BCH or EMBERs
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <!-- Cash Address QR -->
                        <div class="text-center">
                            <div class="bg-white p-4 rounded-lg shadow-md">
                                <p class="font-semibold text-gray-700 mb-2">💵 Cash Address (BCH)</p>
                                <a href="bitcoin:qpq8yv3w69474fjmcr2cw7qt729rklx0muzp2vs79j" title="Send BCH">
                                    <img
                                        src="https://i.ibb.co/DPqh49hT/qrcode-qpq8yv3w69474fjmcr2cw7qt729rklx0muzp2vs79j.png"
                                        alt="Send EMBERs - Cash Address"
                                        class="w-48 h-48 mx-auto border border-gray-200 rounded"
                                    />
                                </a>
                            </div>
                        </div>

                        <!-- Token Address QR -->
                        <div class="text-center">
                            <div class="bg-white p-4 rounded-lg shadow-md">
                                <p class="font-semibold text-gray-700 mb-2">🪙 Token Address (EMBER)</p>
                                <a href="bitcoincash:zpq8yv3w69474fjmcr2cw7qt729rklx0mu9tej7c6p" title="Send EMBER Tokens">
                                    <img
                                        src="https://i.ibb.co/DPqh49hT/qrcode-qpq8yv3w69474fjmcr2cw7qt729rklx0muzp2vs79j.png"
                                        alt="Send EMBERs - Token Address"
                                        class="w-48 h-48 mx-auto border border-gray-200 rounded"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Address Buttons -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <a
                                href="https://explorer.salemkode.com/address/bitcoincash:qpq8yv3w69474fjmcr2cw7qt729rklx0muzp2vs79j"
                                target="_blank"
                                class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View Cash Address
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://explorer.salemkode.com/address/bitcoincash:zpq8yv3w69474fjmcr2cw7qt729rklx0mu9tej7c6p"
                                target="_blank"
                                class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View Token Address
                            </a>
                        </div>
                    </div>

                    <p class="text-center text-sm text-gray-500 dark:text-gray-400">
                        ✨ Click buttons to view addresses in explorer
                    </p>
                </div>

                <!-- Modal Footer -->
                <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-b-lg">
                    <div class="flex justify-end">
                        <button
                            @click="closeHackathonModal"
                            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    /* Define properties. */
    interface Props {
        isMobileMenuOpen?: boolean
    }

    const props = defineProps<Props>()

    const emit = defineEmits<{
        toggleMobileMenu: []
    }>()

    /* Initialize stores */
    const Wallet = useWalletStore()
    const System = useSystemStore()

    /* State for WalletConnect modal */
    const showWalletConnect = ref(false)

    /* State for Hackathon modal */
    const showHackathonModal = ref(false)

    /* Navigation items */
    const navigation = [
        { name: 'Features', href: '#features' },
        { name: 'Use Cases', href: '#use-cases' },
        { name: 'Technology', href: '#technology' },
        { name: 'GitHub', href: 'https://github.com/nyusternie' },
    ]

    /* Social links */
    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com/nyusternie' },
        { name: 'Twitter', href: 'https://x.com/0xShomari' },
    ]

    const toggleMenu = () => {
        emit('toggleMobileMenu')
    }

    const openWalletConnect = () => {
        showWalletConnect.value = true
    }

    const closeWalletConnect = () => {
        showWalletConnect.value = false
    }

    const launchApp = () => {
        showHackathonModal.value = true
    }

    const closeHackathonModal = () => {
        showHackathonModal.value = false
    }
</script>
