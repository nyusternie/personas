// stores/system.ts

/* Import modules. */
import { defineStore } from 'pinia'

/* Initialize constants. */
const UPDATE_TICKER_INTERVAL = 30000 // 30 seconds

/**
 * System Store
 */
export const useSystemStore = defineStore('system', {
    state: () => ({
        /* Set constants. */
        ONE_SAT: BigInt('1'),
        ONE_NEX: BigInt('100'),
        ONE_KEX: BigInt('100000'),
        ONE_MEX: BigInt('100000000'),
        ONE_META: BigInt('1000000000000000000'),

        /* Initialize notifications. */
        notif: {
            isShowing: false,
            icon: null,
            title: null,
            description: null,
            delay: 7000,
        },

        /**
         * Flags
         *
         * 1. Dark mode
         * 2. Unconfirmed transactions
         */
        _flags: null,

        /**
         * Locale
         *
         * Controls the localization language.
         * (default is english)
         */
        _locale: null,

        /**
         * Notices
         *
         * System notices that nag/remind the user of some important action or
         * information; which can be permanently disabled ("Do Not Show Again")
         * via checkbox and confirmation.
         *
         * NOTE: Unique 1-byte (hex) codes (up to 255) are used to reduce the size
         *       of this storage field.
         */
        _notices: null,

        /**
         * Tickers
         *
         * Support for multiple exchange tickers across multiple currencies.
         */
        _tickers: null,

        /* Track app starts */
        _appStarts: 0,

        /* System states */
        isLoading: false,
        error: null as string | null,
        success: null as string | null,
        isInitialized: false
    }),

    getters: {
        nex() {
            if (!this._tickers?.NEXA) {
                return null
            }

            return this._tickers.NEXA.quote.USD.price
        },

        usd() {
            if (!this.nex) {
                return null
            }

            return this.nex * 10**6
        },

        locale() {
            if (!this._locale) {
                return null
            }

            return this._locale
        },

        tickers() {
            return this._tickers || {}
        },

        flags() {
            return this._flags || {}
        },

        notices() {
            return this._notices || {}
        }
    },

    actions: {
        /**
         * Initialize Application
         *
         * Performs startup activities.
         */
        init() {
            if (this.isInitialized) {
                return
            }

            this._appStarts++

            /* Validate tickers. */
            if (!this._tickers) {
                /* Initialize tickers. */
                this._tickers = {}
            }

            /* Initialize ticker interval. */
            setInterval(this.updateTicker, UPDATE_TICKER_INTERVAL)

            /* Update ticker. */
            this.updateTicker()

            if (this._locale === null) {
                /* Set (library) locale from (store) locale. */
                this._locale = navigator.language || navigator.userLanguage
                console.log(`User's preferred language is:`, this.locale)
            }

            this.isInitialized = true

            console.log('System store initialized successfully')
        },

        async updateTicker () {
            if (!this._tickers.NEXA) {
                this._tickers.NEXA = {}
            }

            try {
                this._tickers.NEXA = await $fetch('https://nexa.exchange/ticker')
                console.log('Ticker updated successfully:', this._tickers.NEXA)
            } catch (error) {
                console.error('Failed to update ticker:', error)
                this.setError('Failed to fetch market data')
            }
        },

        setLoading(loading: boolean) {
            this.isLoading = loading
        },

        setError(error: string | null) {
            this.error = error
            if (error) {
                console.error('System error:', error)
            }
        },

        setSuccess(success: string | null) {
            this.success = success
        },

        clearMessages() {
            this.error = null
            this.success = null
        },

        setFlag(flag: string, value: boolean) {
            if (!this._flags) {
                this._flags = {}
            }
            this._flags[flag] = value
        },

        getFlag(flag: string): boolean {
            return this._flags?.[flag] || false
        },

        setNotice(noticeCode: string, dismissed: boolean) {
            if (!this._notices) {
                this._notices = {}
            }
            this._notices[noticeCode] = dismissed
        },

        isNoticeDismissed(noticeCode: string): boolean {
            return this._notices?.[noticeCode] || false
        },

        showNotification(notification: { icon?: string, title: string, description?: string, delay?: number }) {
            this.notif = {
                isShowing: true,
                icon: notification.icon || null,
                title: notification.title,
                description: notification.description || null,
                delay: notification.delay || 7000
            }

            // Auto-hide notification after delay
            if (this.notif.delay > 0) {
                setTimeout(() => {
                    this.hideNotification()
                }, this.notif.delay)
            }
        },

        hideNotification() {
            this.notif.isShowing = false
            this.notif.icon = null
            this.notif.title = null
            this.notif.description = null
        }
    },
})
