<!-- components/AIAssistantWidget.vue -->

<script setup lang="ts">
    /* Initialize stores */
    const Wallet = useWalletStore()
    const System = useSystemStore()

    /* Widget state */
    const isOpen = ref(false)
    const isLoading = ref(false)
    const messages = ref<Array<{text: string, isUser: boolean, timestamp: Date}>>([])
    const userInput = ref('')

    /* Example commands for quick actions */
    const quickCommands = [
        'Swap 0.1 BCH for MUSD on Cauldron',
        'Show my portfolio balance',
        'Send 0.05 BCH to Alice',
        'What NFTs do I own?',
        'Check current gas fees'
    ]

    /* Initialize with welcome message */
    onMounted(() => {
        addAIMessage('Hello! I\'m your Personas AI Assistant. How can I help you with your Bitcoin Cash transactions today?')
    })

    /* Message handling */
    const addUserMessage = (text: string) => {
        messages.value.push({
            text,
            isUser: true,
            timestamp: new Date()
        })
        userInput.value = ''

        // Simulate AI response
        simulateAIResponse(text)
    }

    const addAIMessage = (text: string) => {
        messages.value.push({
            text,
            isUser: false,
            timestamp: new Date()
        })
    }

    const simulateAIResponse = async (userMessage: string) => {
        isLoading.value = true

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

        // Simple response logic based on user input
        const lowerMessage = userMessage.toLowerCase()

        if (lowerMessage.includes('swap') || lowerMessage.includes('trade')) {
            addAIMessage('I can help you swap tokens! To swap 0.1 BCH for MUSD on Cauldron, I\'ll need you to confirm the transaction in your connected wallet. Would you like to proceed?')
        } else if (lowerMessage.includes('balance') || lowerMessage.includes('portfolio')) {
            addAIMessage('Your current portfolio balance:\n\n• BCH: 2.45 ($250.75)\n• MUSD: 150.25\n• NFTs: 3 items\n\nTotal value: $400.00\n\nWould you like to see more details about any specific asset?')
        } else if (lowerMessage.includes('send') || lowerMessage.includes('transfer')) {
            addAIMessage('I can help you send BCH! Please make sure you have the recipient\'s Bitcoin Cash address ready. The transaction will be gasless through our Account Abstraction setup.')
        } else if (lowerMessage.includes('nft')) {
            addAIMessage('You currently own 3 NFTs:\n\n1. CryptoPunk #1234\n2. BCH Art #567\n3. Personas Genesis Pass\n\nWould you like to view or transfer any of these?')
        } else {
            addAIMessage('I understand you\'re asking about: "' + userMessage + '". I can help with token swaps, portfolio tracking, NFT management, and secure transactions on Bitcoin Cash. What specific action would you like to take?')
        }

        isLoading.value = false
        scrollToBottom()
    }

    const handleQuickCommand = (command: string) => {
        addUserMessage(command)
    }

    const sendMessage = () => {
        if (userInput.value.trim() && !isLoading.value) {
            addUserMessage(userInput.value.trim())
        }
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
    }

    const toggleWidget = () => {
        isOpen.value = !isOpen.value
        if (isOpen.value) {
            nextTick(() => {
                scrollToBottom()
            })
        }
    }

    const scrollToBottom = () => {
        nextTick(() => {
            const container = document.getElementById('chat-messages')
            if (container) {
                container.scrollTop = container.scrollHeight
            }
        })
    }

    /* Format message time */
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
</script>

<template>
    <div class="fixed bottom-6 right-6 z-40">
        <!-- Chat Widget -->
        <div
            v-if="isOpen"
            class="w-80 h-96 bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl flex flex-col mb-4"
        >
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50 rounded-t-2xl">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span class="text-white text-sm">🤖</span>
                    </div>
                    <div>
                        <h3 class="font-semibold text-white text-sm">AI Assistant</h3>
                        <p class="text-gray-400 text-xs">Powered by Personas</p>
                    </div>
                </div>
                <button
                    @click="toggleWidget"
                    class="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-gray-700"
                >
                    ✕
                </button>
            </div>

            <!-- Messages -->
            <div
                id="chat-messages"
                class="flex-1 overflow-y-auto p-4 space-y-4"
            >
                <div
                    v-for="(message, index) in messages"
                    :key="index"
                    :class="[
                        'flex',
                        message.isUser ? 'justify-end' : 'justify-start'
                    ]"
                >
                    <div
                        :class="[
                            'max-w-[80%] rounded-2xl p-3',
                            message.isUser
                                ? 'bg-purple-600 text-white rounded-br-none'
                                : 'bg-gray-800 text-gray-100 rounded-bl-none'
                        ]"
                    >
                        <div class="whitespace-pre-wrap text-sm">{{ message.text }}</div>
                        <div
                            :class="[
                                'text-xs mt-1',
                                message.isUser ? 'text-purple-200' : 'text-gray-400'
                            ]"
                        >
                            {{ formatTime(message.timestamp) }}
                        </div>
                    </div>
                </div>

                <!-- Loading indicator -->
                <div v-if="isLoading" class="flex justify-start">
                    <div class="max-w-[80%] rounded-2xl rounded-bl-none bg-gray-800 p-3">
                        <div class="flex space-x-2">
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Commands -->
            <div v-if="!isLoading" class="px-4 py-2 border-t border-gray-700">
                <div class="flex overflow-x-auto space-x-2 pb-2" style="scrollbar-width: none; -ms-overflow-style: none;">
                    <div style="scrollbar-width: none; -ms-overflow-style: none;" class="*::-webkit-scrollbar { display: none; }">
                        <button
                            v-for="(command, index) in quickCommands"
                            :key="index"
                            @click="handleQuickCommand(command)"
                            class="flex-shrink-0 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full transition-colors duration-200 border border-gray-600"
                        >
                            {{ command }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Input -->
            <div class="p-4 border-t border-gray-700">
                <div class="flex space-x-2">
                    <input
                        v-model="userInput"
                        @keypress="handleKeyPress"
                        :disabled="isLoading"
                        placeholder="Ask me anything about your wallet..."
                        class="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                    />
                    <button
                        @click="sendMessage"
                        :disabled="!userInput.trim() || isLoading"
                        class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>

        <!-- Floating Action Button -->
        <button
            @click="toggleWidget"
            class="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-110"
            :class="{ 'rotate-45': isOpen }"
        >
            <span class="text-lg">{{ isOpen ? '✕' : '💬' }}</span>
        </button>
    </div>
</template>
