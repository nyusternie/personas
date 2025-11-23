// stores/wallet.ts

/* Import modules. */
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallet', {
    state: () => ({
        isConnected: false,
        address: null as string | null,
        balance: '0' as string,
        network: 'mainnet' as string,
        accounts: [] as string[],
        chainId: null as string | null,
        isConnecting: false,
        lastConnection: null as number | null
    }),

    getters: {
        truncatedAddress: (state) => {
            if (!state.address) return ''
            return state.address.slice(0, 8) + '...' + state.address.slice(-6)
        },

        isMainnet: (state) => {
            return state.network === 'mainnet'
        },

        hasAccounts: (state) => {
            return state.accounts.length > 0
        },

        connectionStatus: (state) => {
            if (state.isConnecting) return 'connecting'
            if (state.isConnected) return 'connected'
            return 'disconnected'
        }
    },

    actions: {
        setConnected(connected: boolean) {
            this.isConnected = connected
            if (connected) {
                this.lastConnection = Date.now()
            }
        },

        setAddress(address: string) {
            this.address = address
        },

        setBalance(balance: string) {
            this.balance = balance
        },

        setNetwork(network: string) {
            this.network = network
        },

        setAccounts(accounts: string[]) {
            this.accounts = accounts
        },

        setChainId(chainId: string) {
            this.chainId = chainId
        },

        setConnecting(connecting: boolean) {
            this.isConnecting = connecting
        },

        async connect() {
            if (this.isConnected || this.isConnecting) {
                return
            }

            this.isConnecting = true

            try {
                console.log('Connecting wallet...')
                // Implement actual wallet connection logic here
                // For now, we'll simulate a connection
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Mock connection data
                this.setConnected(true)
                this.setAddress('bitcoincash:qp...personas')
                this.setBalance('2.45')
                this.setNetwork('mainnet')
                this.setAccounts(['bitcoincash:qp...personas'])
                this.setChainId('0x01')

                console.log('Wallet connected successfully')
            } catch (error) {
                console.error('Failed to connect wallet:', error)
                this.setConnected(false)
                throw error
            } finally {
                this.isConnecting = false
            }
        },

        async disconnect() {
            this.isConnected = false
            this.address = null
            this.balance = '0'
            this.accounts = []
            this.chainId = null
            this.lastConnection = null

            console.log('Wallet disconnected')
        },

        async checkConnection() {
            if (!this.isConnected) {
                return false
            }

            try {
                // Implement actual connection check logic here
                // For now, we'll assume the connection is still valid
                console.log('Wallet connection verified')
                return true
            } catch (error) {
                console.error('Wallet connection check failed:', error)
                this.disconnect()
                return false
            }
        },

        async refreshBalance() {
            if (!this.isConnected) {
                return
            }

            try {
                // Implement actual balance refresh logic here
                console.log('Refreshing wallet balance...')
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500))
                // Mock balance update
                this.setBalance((Math.random() * 5).toFixed(8))
            } catch (error) {
                console.error('Failed to refresh balance:', error)
                throw error
            }
        },

        async switchNetwork(network: string) {
            try {
                console.log(`Switching to network: ${network}`)
                // Implement actual network switching logic here
                await new Promise(resolve => setTimeout(resolve, 500))
                this.setNetwork(network)
                console.log(`Network switched to: ${network}`)
            } catch (error) {
                console.error(`Failed to switch network to ${network}:`, error)
                throw error
            }
        }
    },
})
