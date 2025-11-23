// stores/profile.ts

/* Import modules. */
import { defineStore } from 'pinia'

/**
 * Profile Store
 */
export const useProfileStore = defineStore('profile', {
    state: () => ({
        /* Initialize session. */
        _session: null as any,

        _apiKeys: {} as Record<string, any>,

        /* User profile data */
        name: null as string | null,
        email: null as string | null,
        avatar: null as string | null,

        /* User preferences */
        preferences: {
            theme: 'dark',
            currency: 'USD',
            language: 'en',
            notifications: true,
            autoConnect: false,
            gaslessTransactions: true
        },

        /* Activity tracking */
        createdAt: null as number | null,
        lastActive: null as number | null,
        sessionCount: 0
    }),

    getters: {
        session(_state) {
            return _state._session || null
        },

        sessionid(_state) {
            return _state._session?.id || null
        },

        challenge(_state) {
            return _state._session?.challenge || null
        },

        apiKey: (_state) => {
            return (_exchangeid: string) => _state._apiKeys[_exchangeid] || null
        },

        displayName: (state) => {
            return state.name || 'Anonymous'
        },

        hasProfile: (state) => {
            return !!(state.name || state.email)
        },

        preferencesSummary: (state) => {
            return {
                theme: state.preferences.theme,
                currency: state.preferences.currency,
                language: state.preferences.language,
                notificationsEnabled: state.preferences.notifications,
                autoConnectEnabled: state.preferences.autoConnect,
                gaslessEnabled: state.preferences.gaslessTransactions
            }
        },

        isAuthenticated: (state) => {
            return !!state._session?.id
        },

        sessionExpires: (state) => {
            return state._session?.expires || null
        }
    },

    actions: {
        async initSession () {
            console.log('INIT SESSION (before):', this._session)
            /* Check for existing session. */
            if (this._session) {
                return this._session
            }

            /* Request new session. */
            const session = await $fetch('/api/newSession')
            console.log('INIT SESSION (after fetch):', session)

            /* Set session. */
            this._setSession(session)

            /* Initialize profile if first session */
            if (!this.createdAt) {
                this.initializeProfile()
            }

            /* Return session. */
            return session
        },

        deleteSession() {
            /* Set session. */
            this._setSession(null)
        },

        saveSession(_session: any) {
            /* Set session. */
            this._setSession(_session)
        },

        /**
         * Set Session
         *
         * @param {Object} _session Save session details.
         */
        _setSession (_session: any) {
            /* Set session. */
            this._session = _session
            console.log('SET SESSION', this._session)
        },

        /**
         * Set API Key
         *
         * @param {Object} _key Information for the Exchange's API key.
         */
        setApiKey (_key: { exchangeid: string, [key: string]: any }) {
            /* Set session. */
            this._apiKeys[_key.exchangeid] = _key
            console.log('SET API KEY', this._apiKeys)
        },

        /* Extended profile actions */
        setProfile(profile: Partial<{
            name: string | null
            email: string | null
            avatar: string | null
            preferences: Partial<typeof this.preferences>
            createdAt: number | null
            lastActive: number | null
        }>) {
            if (profile.preferences) {
                this.preferences = { ...this.preferences, ...profile.preferences }
            }

            if (profile.name !== undefined) this.name = profile.name
            if (profile.email !== undefined) this.email = profile.email
            if (profile.avatar !== undefined) this.avatar = profile.avatar
            if (profile.createdAt !== undefined) this.createdAt = profile.createdAt
            if (profile.lastActive !== undefined) this.lastActive = profile.lastActive

            this.updateLastActive()
        },

        updatePreferences(preferences: Partial<typeof this.preferences>) {
            this.preferences = { ...this.preferences, ...preferences }
            this.updateLastActive()
        },

        setPreference<T extends keyof typeof this.preferences>(key: T, value: typeof this.preferences[T]) {
            this.preferences[key] = value
            this.updateLastActive()
        },

        initializeProfile() {
            if (!this.createdAt) {
                this.createdAt = Date.now()
            }
            this.updateLastActive()
            this.sessionCount++
        },

        updateLastActive() {
            this.lastActive = Date.now()
        },

        resetProfile() {
            this.name = null
            this.email = null
            this.avatar = null
            this._session = null
            this._apiKeys = {}
            this.preferences = {
                theme: 'dark',
                currency: 'USD',
                language: 'en',
                notifications: true,
                autoConnect: false,
                gaslessTransactions: true
            }
            this.lastActive = Date.now()
        },

        removeApiKey(exchangeid: string) {
            if (this._apiKeys[exchangeid]) {
                delete this._apiKeys[exchangeid]
                console.log('REMOVED API KEY FOR:', exchangeid)
            }
        },

        getAllApiKeys() {
            return { ...this._apiKeys }
        },

        hasApiKey(exchangeid: string): boolean {
            return !!this._apiKeys[exchangeid]
        },

        // Session validation
        validateSession(): boolean {
            if (!this._session) return false

            const now = Date.now()
            const expires = this.sessionExpires

            if (expires && now > expires) {
                console.log('Session expired')
                this.deleteSession()
                return false
            }

            return true
        },

        // Profile validation and utilities
        validateProfile(): { isValid: boolean, errors: string[] } {
            const errors: string[] = []

            if (this.email && !this.isValidEmail(this.email)) {
                errors.push('Invalid email format')
            }

            if (this.name && this.name.length < 2) {
                errors.push('Name must be at least 2 characters long')
            }

            return {
                isValid: errors.length === 0,
                errors
            }
        },

        isValidEmail(email: string): boolean {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(email)
        },

        // Session management helpers
        async refreshSession() {
            if (!this.validateSession()) {
                return await this.initSession()
            }

            // Optionally refresh the session with the server
            try {
                const refreshedSession = await $fetch('/api/refreshSession', {
                    method: 'POST',
                    body: { sessionId: this.sessionid }
                })
                this._setSession(refreshedSession)
                return refreshedSession
            } catch (error) {
                console.error('Failed to refresh session:', error)
                // If refresh fails, create a new session
                return await this.initSession()
            }
        },

        // API key management
        updateApiKey(exchangeid: string, updates: Partial<any>) {
            if (this._apiKeys[exchangeid]) {
                this._apiKeys[exchangeid] = { ...this._apiKeys[exchangeid], ...updates }
                console.log('UPDATED API KEY FOR:', exchangeid, updates)
            }
        },

        // Bulk operations
        bulkSetApiKeys(apiKeys: Record<string, any>) {
            this._apiKeys = { ...this._apiKeys, ...apiKeys }
            console.log('BULK SET API KEYS:', this._apiKeys)
        },

        clearAllApiKeys() {
            this._apiKeys = {}
            console.log('CLEARED ALL API KEYS')
        }
    },
})
