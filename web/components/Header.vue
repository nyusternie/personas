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
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18-6M6 6l12 12" />
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
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18-6M6 6l12 12" />
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

        <!-- Hackathon Modal -->
        <div v-if="showHackathonModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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

                    <!-- Address Exploration Buttons -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                    <p class="text-center text-sm text-gray-500 dark:text-gray-400">
                        ✨ Click buttons to view addresses in explorer
                    </p>
                </div>

                <!-- Modal Footer with Action Buttons -->
                <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-b-lg">
                    <div class="flex flex-col sm:flex-row gap-3 justify-between items-center">
                        <!-- Action Buttons Left Side -->
                        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <!-- Left: Continue to App -->
                            <button
                                @click="continueToApp"
                                class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2 flex-1"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Continue to App
                            </button>
                        </div>

                        <!-- Action Buttons Center -->
                        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <!-- Center: Take a Tour -->
                            <button
                                @click="takeTour"
                                class="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2 flex-1"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Take a Tour
                            </button>
                        </div>

                        <!-- Action Buttons Right Side -->
                        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <!-- Right: View our BUIDL -->
                            <button
                                @click="viewBuidl"
                                class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2 flex-1"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View our BUIDL
                            </button>
                        </div>

                        <!-- Close Button -->
                        <button
                            @click="closeHackathonModal"
                            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-200 w-full sm:w-auto"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Coming Soon Modal -->
        <div v-if="showComingSoonModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
                <!-- Modal Header -->
                <div class="bg-yellow-500 text-white p-6 rounded-t-lg">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold">🚧 Under Construction</h2>
                        <button
                            @click="closeComingSoonModal"
                            class="text-white hover:text-gray-200 text-2xl"
                        >
                            &times;
                        </button>
                    </div>
                    <p class="mt-2 text-yellow-100">We're building something amazing!</p>
                </div>

                <!-- Modal Content -->
                <div class="p-6 text-center">
                    <div class="w-24 h-24 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg class="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personas Cash is Coming Soon!</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-6">
                        We're working hard to bring you the next generation Bitcoin Cash wallet experience.
                        Stay tuned for updates!
                    </p>
                    <div class="space-y-3">
                        <button
                            @click="closeComingSoonModal"
                            class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded transition-colors duration-200"
                        >
                            Got it!
                        </button>
                        <button
                            @click="viewBuidl"
                            class="w-full border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-700 font-semibold py-3 px-6 rounded transition-colors duration-200"
                        >
                            Check our Progress
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

    /* State for Hackathon modal */
    const showHackathonModal = ref(false)

    /* State for Coming Soon modal */
    const showComingSoonModal = ref(false)

    /* Navigation items */
    const navigation = [
        { name: 'Features', href: '#features' },
        { name: 'Use Cases', href: '#use-cases' },
        { name: 'Technology', href: '#technology' },
        { name: 'GitHub', href: 'https://github.com/nyusternie/personas' },
    ]

    /* Social links */
    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com/nyusternie/personas' },
        { name: 'Twitter', href: 'https://x.com/0xShomari' },
    ]

    const toggleMenu = () => {
        emit('toggleMobileMenu')
    }

    const launchApp = () => {
        showHackathonModal.value = true
    }

    const closeHackathonModal = () => {
        showHackathonModal.value = false
    }

    const continueToApp = () => {
        showHackathonModal.value = false
        showComingSoonModal.value = true
    }

    const closeComingSoonModal = () => {
        showComingSoonModal.value = false
    }

    const takeTour = () => {
        window.open('https://tour.personas.cash', '_blank')
    }

    const viewBuidl = () => {
        window.open('https://dorahacks.io/buidl/32734', '_blank')
    }
</script>
