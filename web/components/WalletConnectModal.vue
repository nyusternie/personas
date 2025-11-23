<!-- components/WalletConnectModal.vue -->

<script setup lang="ts">
    /* Initialize stores */
    const Wallet = useWalletStore()
    const System = useSystemStore()
    const Profile = useProfileStore()

    /* Define emits */
    const emit = defineEmits<{
        close: []
    }>()

    /* Modal state */
    const isOpen = ref(true)
    const isLoading = ref(false)

    /* Available wallet providers */
    const walletProviders = [
        {
            id: 'bch-wallet',
            name: 'Bitcoin Cash Wallet',
            icon: 'BCH',
            description: 'Connect your Bitcoin Cash wallet',
            supported: true
        },
        {
            id: 'metamask',
            name: 'MetaMask',
            icon: '🦊',
            description: 'Connect via MetaMask',
            supported: true
        },
        {
            id: 'walletconnect',
            name: 'WalletConnect',
            icon: '🔗',
            description: 'Connect with WalletConnect',
            supported: true
        },
        {
            id: 'ledger',
            name: 'Ledger',
            icon: '💎',
            description: 'Connect your Ledger device',
            supported: false
        }
    ]

    /* Connection methods */
    const connectWithProvider = async (providerId: string) => {
        if (isLoading.value) return

        const provider = walletProviders.find(p => p.id === providerId)
        if (!provider?.supported) {
            System.showNotification({
                title: 'Wallet Not Supported',
                description: `${provider?.name} integration is coming soon!`,
                icon: '⚠️'
            })
            return
        }

        isLoading.value = true

        try {
            switch (providerId) {
                case 'bch-wallet':
                    await connectBCHWallet()
                    break
                case 'metamask':
                    await connectMetaMask()
                    break
                case 'walletconnect':
                    await connectWalletConnect()
                    break
                case 'ledger':
                    await connectLedger()
                    break
                default:
                    throw new Error('Unsupported wallet provider')
            }

            // Close modal on successful connection
            closeModal()

            System.showNotification({
                title: 'Wallet Connected',
                description: 'Your wallet has been successfully connected',
                icon: '✅'
            })

        } catch (error) {
            console.error('Wallet connection error:', error)
            System.setError(`Failed to connect: ${error.message}`)
        } finally {
            isLoading.value = false
        }
    }

    const connectBCHWallet = async () => {
        console.log('Connecting to BCH wallet...')

        // Simulate connection delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock successful connection
        Wallet.setConnected(true)
        Wallet.setAddress('bitcoincash:qp2nf429j50uxk4y7yprgpyc7wq3d6hfkc6jn90wnq')
        Wallet.setBalance('2.45')
        Wallet.setNetwork('mainnet')
        Wallet.setAccounts(['bitcoincash:qp2nf429j50uxk4y7yprgpyc7wq3d6hfkc6jn90wnq'])
        Wallet.setChainId('0x01')

        // Update auto-connect preference
        Profile.setPreference('autoConnect', true)
    }

    const connectMetaMask = async () => {
        console.log('Connecting to MetaMask...')
        await new Promise(resolve => setTimeout(resolve, 1500))

        Wallet.setConnected(true)
        Wallet.setAddress('0x742d35Cc6634C0532925a3b8D7B2e2a7D04689dE')
        Wallet.setBalance('1.75')
        Wallet.setNetwork('mainnet')
        Wallet.setAccounts(['0x742d35Cc6634C0532925a3b8D7B2e2a7D04689dE'])
        Wallet.setChainId('0x01')

        Profile.setPreference('autoConnect', true)
    }

    const connectWalletConnect = async () => {
        console.log('Connecting via WalletConnect...')
        await new Promise(resolve => setTimeout(resolve, 1500))

        Wallet.setConnected(true)
        Wallet.setAddress('0x456...c0dE')
        Wallet.setBalance('3.21')
        Wallet.setNetwork('mainnet')
        Wallet.setAccounts(['0x456...c0dE'])
        Wallet.setChainId('0x01')

        Profile.setPreference('autoConnect', true)
    }

    const connectLedger = async () => {
        // This would be implemented for actual Ledger connection
        throw new Error('Ledger support coming soon')
    }

    const closeModal = () => {
        isOpen.value = false
        emit('close')
    }

    const toggleAutoConnect = () => {
        Profile.setPreference('autoConnect', !Profile.preferences.autoConnect)
    }

    /* Keyboard events */
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModal()
        }
    }

    onMounted(() => {
        document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeydown)
    })
</script>

<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        @click="closeModal"
    >
        <div
            class="relative w-full max-w-md"
            @click.stop
        >
            <div class="relative bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-700">
                    <div>
                        <h2 class="text-xl font-bold text-white">
                            Connect Your Wallet
                        </h2>
                        <p class="text-gray-400 text-sm mt-1">
                            Choose your preferred wallet to connect to Personas
                        </p>
                    </div>
                    <button
                        @click="closeModal"
                        class="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                    >
                        ✕
                    </button>
                </div>

                <!-- Wallet Providers -->
                <div class="p-6 space-y-3 max-h-96 overflow-y-auto">
                    <button
                        v-for="provider in walletProviders"
                        :key="provider.id"
                        @click="connectWithProvider(provider.id)"
                        :disabled="isLoading || !provider.supported"
                        :class="[
                            'w-full flex items-center space-x-4 p-4 rounded-xl border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group',
                            provider.supported
                                ? 'border-gray-700 hover:border-purple-500 hover:bg-gray-800/50'
                                : 'border-gray-800 bg-gray-800/30 cursor-not-allowed'
                        ]"
                    >
                        <div class="flex-shrink-0">
                            <span
                                :class="[
                                    'text-2xl',
                                    provider.supported
                                        ? 'text-gray-400 group-hover:text-purple-400'
                                        : 'text-gray-600'
                                ]"
                            >
                                {{ provider.icon }}
                            </span>
                        </div>
                        <div class="flex-1 text-left">
                            <div class="flex items-center space-x-2">
                                <span
                                    :class="[
                                        'font-semibold',
                                        provider.supported
                                            ? 'text-white group-hover:text-purple-300'
                                            : 'text-gray-500'
                                    ]"
                                >
                                    {{ provider.name }}
                                </span>
                                <span
                                    v-if="!provider.supported"
                                    class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                                >
                                    Coming Soon
                                </span>
                            </div>
                            <div
                                :class="[
                                    'text-sm',
                                    provider.supported ? 'text-gray-400' : 'text-gray-500'
                                ]"
                            >
                                {{ provider.description }}
                            </div>
                        </div>
                        <div
                            v-if="isLoading"
                            class="h-5 w-5 text-purple-400 animate-spin rounded-full border-2 border-purple-400 border-t-transparent"
                        ></div>
                        <span
                            v-else-if="provider.supported"
                            :class="[
                                'text-lg',
                                provider.supported
                                    ? 'text-gray-400 group-hover:text-purple-400'
                                    : 'text-gray-600'
                            ]"
                        >
                            →
                        </span>
                    </button>
                </div>

                <!-- Auto-Connect Toggle -->
                <div class="px-6 py-4 border-t border-gray-700 bg-gray-800/30">
                    <label class="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            :checked="Profile.preferences.autoConnect"
                            @change="toggleAutoConnect"
                            class="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-900"
                        />
                        <span class="text-sm text-gray-300">
                            Auto-connect to this wallet in the future
                        </span>
                    </label>
                </div>

                <!-- Footer -->
                <div class="px-6 py-4 bg-gray-800/50 rounded-b-2xl">
                    <p class="text-xs text-gray-400 text-center">
                        By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
                        Your funds and data are secure.
                    </p>
                </div>
            </div>

            <!-- Loading Overlay -->
            <div
                v-if="isLoading"
                class="absolute inset-0 bg-gray-900/80 rounded-2xl flex items-center justify-center"
            >
                <div class="text-center">
                    <div class="h-8 w-8 text-purple-400 animate-spin rounded-full border-2 border-purple-400 border-t-transparent mx-auto mb-3"></div>
                    <p class="text-white font-medium">Connecting Wallet...</p>
                    <p class="text-gray-400 text-sm mt-1">Please approve the connection in your wallet</p>
                </div>
            </div>
        </div>
    </div>
</template>
