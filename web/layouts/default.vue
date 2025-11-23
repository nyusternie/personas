<!-- layouts/default.vue -->
<script setup lang="ts">
/* Initialize stores */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'

const Profile = useProfileStore()
const System = useSystemStore()
const Wallet = useWalletStore()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900">
        <!-- Loading Screen -->
        <div
            v-if="$nuxt?.isInitializing"
            class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
        >
            <div class="text-center">
                <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <h2 class="text-white text-xl font-semibold mb-2">Initializing Personas</h2>
                <p class="text-gray-400">Setting up your secure session...</p>
            </div>
        </div>

        <Header
            :is-mobile-menu-open="isMobileMenuOpen"
            @toggle-mobile-menu="toggleMobileMenu"
        />

        <!-- System Notification -->
        <div
            v-if="System.notif.isShowing"
            class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
            <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-4">
                <div class="flex items-start space-x-3">
                    <div v-if="System.notif.icon" class="flex-shrink-0">
                        <span class="text-lg">{{ System.notif.icon }}</span>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-white font-semibold text-sm">
                            {{ System.notif.title }}
                        </h3>
                        <p v-if="System.notif.description" class="text-gray-300 text-sm mt-1">
                            {{ System.notif.description }}
                        </p>
                    </div>
                    <button
                        @click="System.hideNotification()"
                        class="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>

        <!-- System Error -->
        <div
            v-if="System.error"
            class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
            <div class="bg-red-900 border border-red-700 rounded-lg shadow-2xl p-4">
                <div class="flex items-start space-x-3">
                    <span class="text-red-400 flex-shrink-0">⚠️</span>
                    <div class="flex-1">
                        <h3 class="text-white font-semibold text-sm">
                            Error
                        </h3>
                        <p class="text-red-200 text-sm mt-1">
                            {{ System.error }}
                        </p>
                    </div>
                    <button
                        @click="System.setError(null)"
                        class="flex-shrink-0 text-red-400 hover:text-red-200 transition-colors duration-200"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>

        <!-- Loading Overlay -->
        <div
            v-if="System.isLoading"
            class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
            <div class="bg-gray-800 rounded-2xl p-6 shadow-2xl">
                <div class="flex items-center space-x-3">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                    <span class="text-white font-medium">Loading...</span>
                </div>
            </div>
        </div>

        <main>
            <slot />
        </main>

        <Footer />
    </div>
</template>
