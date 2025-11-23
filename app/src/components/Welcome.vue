<template>
    <div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div class="container mx-auto px-4 py-16">
            <div class="max-w-md mx-auto text-center">
                <!-- Logo/Brand -->
                <div class="mb-8">
                    <div class="w-20 h-20 mx-auto bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                        Personas Wallet
                    </h1>
                    <p class="mt-2 text-gray-600 dark:text-gray-400">
                        Your Bitcoin Cash wallet, reimagined
                    </p>
                </div>

                <!-- Feature Grid -->
                <div class="grid grid-cols-1 gap-4 mb-8">
                    <div class="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <svg class="w-6 h-6 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span class="text-5xl text-gray-700 dark:text-gray-300">Passkey Authentication</span>
                    </div>

                    <div class="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <svg class="w-6 h-6 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span class="text-gray-700 dark:text-gray-300">Social Recovery</span>
                    </div>

                    <div class="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <svg class="w-6 h-6 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span class="text-gray-700 dark:text-gray-300">Bitcoin Cash Focus</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-4">
                    <button
                        @click="createWallet"
                        class="btn-primary w-full py-3 px-6 text-lg"
                    >
                        Create New Wallet
                    </button>

                    <button
                        @click="restoreWallet"
                        class="btn-secondary w-full py-3 px-6 text-lg"
                    >
                        Restore Wallet
                    </button>

                    <button
                        @click="usePasskey"
                        class="w-full border-2 border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        Use Passkey
                    </button>
                </div>

                <!-- Advanced Options -->
                <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        @click="showAdvanced = !showAdvanced"
                        class="text-sm text-primary-500 hover:text-primary-600 font-medium"
                    >
                        Advanced Options
                    </button>

                    <div v-if="showAdvanced" class="mt-4 space-y-3">
                        <button
                            @click="importSeedPhrase"
                            class="w-full text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 py-2 px-4 rounded transition-colors duration-200"
                        >
                            Import Seed Phrase (BIP-44)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showAdvanced = ref(false)

const createWallet = () => {
    console.log('Creating new wallet...')
}

const restoreWallet = () => {
    console.log('Restoring wallet...')
}

const usePasskey = () => {
    console.log('Using passkey...')
}

const importSeedPhrase = () => {
    console.log('Importing seed phrase...')
}
</script>
