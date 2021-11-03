import NodeRSA from 'node-rsa'

const nodeCrypto  = {
  encrypt(message) {
    try {
    const encoder = new NodeRSA(toUTF(process.env.PUBLIC_KEY))
    return encoder.encrypt(message, 'base64')  
    } catch {
      return null
    }
  },

  decrypt(message) {
    try {
    const decoder = new NodeRSA(toUTF(process.env.PRIVATE_KEY));
    return decoder.decrypt(message, 'utf8')
    } catch {
      return null
    }
  },

  encryptWithCustomKey(message, key) {
    try {
      const encoder = new NodeRSA(toUTF(key))
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
    return toBase(this.RSA.exportKey('public'))
  }

  getPrivateKey() {
    return toBase(this.RSA.exportKey('private'))
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
    this.RSA = new NodeRSA(toUTF(publicKey))
    this.key = toUTF(publicKey)
  }

  encrypt(message) {
    try {
    return this.RSA.encrypt(message, 'base64')
    } catch {
      return null
    }
  }
}

export function toUTF(str) {
  return Buffer.from(str, 'base64').toString('utf8')
}

export function toBase(str) {
  return Buffer.from(str).toString('base64')
}

export default nodeCrypto