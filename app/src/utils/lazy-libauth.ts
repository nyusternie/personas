let libauthInstance: any = null

export async function getLibauth() {
    if (!libauthInstance) {
        const { secp256k1, sha256, sha512, ripemd160 } = await import('@bitauth/libauth')
        libauthInstance = { secp256k1, sha256, sha512, ripemd160 }
    }
    return libauthInstance
}

export async function verifySignature(signature: Uint8Array, publicKey: Uint8Array, message: Uint8Array) {
    const { secp256k1 } = await getLibauth()
    return secp256k1.verifySignatureDERLowS(signature, publicKey, message)
}

export async function generatePrivateKey() {
    const { secp256k1 } = await getLibauth()
    return secp256k1.generatePrivateKey()
}

export async function derivePublicKey(privateKey: Uint8Array) {
    const { secp256k1 } = await getLibauth()
    return secp256k1.derivePublicKeyCompressed(privateKey)
}
