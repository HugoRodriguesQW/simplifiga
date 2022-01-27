import { Database } from "./database"

const handler = async (req, res) => {
  
  const {event_type, resource} = typeof req.body === "object" && req.body || {}

  if(!event_type || ! resource) return res.status(400).send('Missing parameters')
  res.status(200).send('success')

  const eventScope = event_type.split('.')[1]
  const status = event_type.split('.')[2]

  const db = new Database()
  await db.connect()

  switch(eventScope) {
    case 'ORDER': 
      const orderId = resource.purchase_units[0].reference_id
      const payee = resource.purchase_units[0].payee
      const orderRef = resource.id
      db.setOrderReference({orderRef, orderId, payee})
      break
    case 'CAPTURE':
      const captureId = resource.supplementary_data.related_ids.order_id
      db.receivePaymentStatus({captureId}).then((payment) => {
        if(payment.status === status) return
        db.changePaymentState({captureId, status})
      },
      ()=> {
        db.createNewPaymentStatus({captureId, status})
      })
      
  }

}



export default handler