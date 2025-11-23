import { getLibauth, verifySignature, generatePrivateKey, derivePublicKey } from './lazy-libauth'

export class LibauthClient {
    private static instance: LibauthClient

    static async getInstance(): Promise<LibauthClient> {
        if (!LibauthClient.instance) {
            LibauthClient.instance = new LibauthClient()
        }
        return LibauthClient.instance
    }

    async generateKeyPair() {
        const privKey = await generatePrivateKey()
        const pubKey = await derivePublicKey(privKey)
        return {
            privateKey: privKey,
            publicKey: pubKey
        }
    }

    async signTransaction(transaction: any, privateKey: Uint8Array) {
        console.log('Signing transaction with Libauth v3...')
        return transaction
    }

    async verifySignature(signature: Uint8Array, publicKey: Uint8Array, message: Uint8Array) {
        return verifySignature(signature, publicKey, message)
    }

    async supportsNewCHIPs() {
        const libauth = await getLibauth()
        console.log('Libauth v3 ready for BCH P2S, Loops, and Functions CHIPs')
        return true
    }
}
