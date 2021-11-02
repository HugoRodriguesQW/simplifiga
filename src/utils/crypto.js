import NodeRSA from 'node-rsa'

const nodeCrypto  = {
  encrypt(message) {
    try {
    const encoder = new NodeRSA(process.env.PUBLIC_KEY);
    return encoder.encrypt(message, 'base64')  
    } catch {
      return null
    }
  },

  decrypt(message) {
    try {
    const decoder = new NodeRSA(process.env.PRIVATE_KEY);
    return decoder.decrypt(message, 'utf8')
    } catch {
      return null
    }
  },

  encryptWithCustomKey(message, key) {
    try {
      const encoder = new NodeRSA(key)
      return encoder.encrypt(message, 'base64')
    } catch {
      return null
    }
  }
}

export class webCrypto  {
  constructor({bits}) {
    this.RSA = new NodeRSA({b: bits})
    this.bits = bits
  }

  getPublicKey() {
    return this.RSA.exportKey('public')
  }

  getPrivateKey() {
    return this.RSA.exportKey('private')
  }

  encrypt (message) {
    try {
      return this.RSA.encrypt(message, 'base64')
    } catch {
      return null
    }
  }

  decrypt (message) {
    try {
      return this.RSA.decrypt(message, 'utf8')
    } catch {
      return null
    }
  }
}

export class serverCrypto {
  constructor(publicKey) {
    this.RSA = new NodeRSA(publicKey)
    this.key = publicKey
  }

  encrypt(message) {
    try {
    return this.RSA.encrypt(message, 'base64')
    } catch {
      return null
    }
  }
}

export default nodeCrypto