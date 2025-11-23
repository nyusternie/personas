import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface WalletState {
    isInitialized: boolean
    balance: number
    addresses: string[]
    transactions: any[]
    currentAddress: string
    network: 'mainnet' | 'testnet'
}

export const useWalletStore = defineStore('wallet', () => {
    const state = ref<WalletState>({
        isInitialized: false,
        balance: 0,
        addresses: [],
        transactions: [],
        currentAddress: '',
        network: 'mainnet'
    })

    const isInitialized = computed(() => state.value.isInitialized)
    const balance = computed(() => state.value.balance)
    const currentAddress = computed(() => state.value.currentAddress)
    const network = computed(() => state.value.network)

    const initializeWallet = async (method: 'passkey' | 'seed' | 'social') => {
        state.value.isInitialized = true
    }

    const sendTransaction = async (to: string, amount: number) => {
        console.log(`Sending ${amount} BCH to ${to}`)
    }

    const refreshBalance = async () => {
        state.value.balance = 0
    }

    return {
        state,
        isInitialized,
        balance,
        currentAddress,
        network,
        initializeWallet,
        sendTransaction,
        refreshBalance
    }
})
