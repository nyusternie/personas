<!-- components/Header.vue -->

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
</script>

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

                <!-- Wallet Connection -->
                <button
                    v-if="!Wallet.isConnected"
                    @click="openWalletConnect"
                    class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105"
                >
                    Connect Wallet
                </button>

                <!-- Wallet Info -->
                <div v-else class="flex items-center space-x-3">
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

                        <!-- Wallet Section -->
                        <div class="py-6">
                            <div v-if="!Wallet.isConnected" class="space-y-4">
                                <button
                                    @click="openWalletConnect"
                                    class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200"
                                >
                                    Connect Wallet
                                </button>
                            </div>
                            <div v-else class="space-y-4">
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
    </header>
</template>
