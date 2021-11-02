import nodeCrypto from "../../utils/crypto"

const handler = async (req, res) => {

  const  {encrypted, clientKey} = JSON.parse(req.body)
  console.warn('Message encrypted with a public server key')
  console.log(encrypted)
  console.warn('Decrypted: ', nodeCrypto.decrypt(encrypted))

  res.json({
    encrypted: nodeCrypto.encryptWithCustomKey('I am here!', clientKey)
  })
}

export default handler