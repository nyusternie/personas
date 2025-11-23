<!-- app.vue -->
<script setup lang="ts">
/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'

const Profile = useProfileStore()
const System = useSystemStore()
const Wallet = useWalletStore()

/* State for mobile menu */
const isInitializing = ref(true)

/* Initialize application state */
onBeforeMount(() => {
    initializeStores()
})

/* Watch for state changes and persist to localStorage */
watch([Profile.$state, System.$state, Wallet.$state], (_state) => {
    persistStoreState('profile', _state[0])
    persistStoreState('system', _state[1])
    persistStoreState('wallet', _state[2])
}, { deep: true })

onMounted(async () => {
    /* Initialize system and wallet */
    System.init()

    try {
        // Initialize profile and session
        await Profile.initSession()
        console.log('Profile session initialized')
    } catch (error) {
        console.error('Failed to initialize profile session:', error)
        System.setError('Failed to initialize user session')
    }

    /* Initialize wallet if auto-connect is enabled */
    if (Profile.preferences.autoConnect) {
        await checkWalletConnection()
    }

    isInitializing.value = false
})

/* Helper functions */
const initializeStores = () => {
    try {
        Profile.$state = loadStoreState('profile')
        System.$state = loadStoreState('system')
        Wallet.$state = loadStoreState('wallet')

        console.log('Stores initialized from localStorage')
    } catch (err) {
        console.error('Failed to initialize stores:', err)
        // Initialize default state for stores if loading fails
        initializeDefaultState()
    }
}

const loadStoreState = (storeName: string) => {
    if (process.client) {
        const stored = localStorage.getItem(storeName)
        if (!stored) return {}

        return JSON.parse(stored, (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })
    }
    return {}
}

const persistStoreState = (storeName: string, state: any) => {
    if (process.client) {
        try {
            localStorage.setItem(
                storeName,
                JSON.stringify(state, (key, value) =>
                    typeof value === 'bigint' ? value.toString() + 'n' : value
                )
            )
        } catch (err) {
            console.error(`Failed to persist ${storeName} state:`, err)
        }
    }
}

const initializeDefaultState = () => {
    // Set default values for stores if they don't exist
    if (!Profile.createdAt) {
        Profile.setProfile({
            preferences: {
                theme: 'dark',
                currency: 'USD',
                language: 'en',
                notifications: true,
                autoConnect: false,
                gaslessTransactions: true
            }
        })
    }

    if (!System._tickers) {
        System._tickers = {}
    }

    console.log('Default store state initialized')
}

const checkWalletConnection = async () => {
    // Check if wallet is already connected or should auto-connect
    if (Wallet.isConnected || (Profile.preferences.autoConnect && Wallet.lastConnection)) {
        try {
            await Wallet.checkConnection()
        } catch (error) {
            console.error('Wallet connection check failed:', error)
        }
    }
}

// Watch for system notifications
watch(() => System.notif.isShowing, (isShowing) => {
    if (isShowing) {
        console.log('Notification:', System.notif.title, System.notif.description)
    }
})

// Watch for system errors
watch(() => System.error, (error) => {
    if (error) {
        console.error('System error detected:', error)
    }
})

// Watch for session changes
watch(() => Profile.session, (newSession, oldSession) => {
    if (newSession !== oldSession) {
        console.log('Session updated:', newSession)
        if (newSession && Profile.isAuthenticated) {
            System.showNotification({
                title: 'Session Active',
                description: 'Your session has been initialized',
                icon: '✅'
            })
        }
    }
})
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>

        <!-- Global components that should be outside the layout -->
        <AIAssistantWidget v-if="!isInitializing" />
    </div>
</template>
