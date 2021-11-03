import {serverEncoder} from "../../utils/crypto"

const handler = async (req, res) => {

  const  {encrypted, clientKey} = JSON.parse(req.body)

  console.warn('Message encrypted with a public server key')
  console.log(encrypted)

  serverEncoder((server)=> {
    console.warn('Decrypted: ', server.decrypt(encrypted))

    res.json({
      encrypted: server.encryptWithCustomKey('I am here!', clientKey)
    })
  })
}

export default handler