const { index } = require('.')
const Eneo = require('../models/models')
const MongoClient = require('mongodb').MongoClient


const credentials = {
  apiKey: 'e9f5a3430deeadab1f5fa31c2d0e652f395c83340e561c0e96a42b3083afe91b', // use your sandbox app API key for development in the test environment
  username: 'tapbds', // use 'sandbox' for development in the test environment
}
const Africastalking = require('africastalking')(credentials)

const uri =
  'mongodb://mavuno_user:mavuno2021@cluster0-shard-00-00.rh3ns.mongodb.net:27017,cluster0-shard-00-01.rh3ns.mongodb.net:27017,cluster0-shard-00-02.rh3ns.mongodb.net:27017/mavunodata?ssl=true&replicaSet=atlas-k45xih-shard-0&authSource=admin&retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true })

// Initialize a service e.g. SMS
const sms = Africastalking.SMS

let region = ''
let district = ''
let ward = ''
let crop = ''

const crops = ['Mahindi', 'Maharage', 'Mpunga', 'Mihogo', 'Mtama']
let farmers = []
const getWakulima = async (region, district, ward, crop) => {
  return new Promise((resolve, reject) => {
    client.connect(async (err) => {

      if (err) reject([])

      if (!err) {
        const collection = client.db('mavunodata').collection('mkulima')
        console.log(region, district, ward, crop)
        let results = await collection
          .find({
            $and: [
              { "isBooked": false },
              { "region": region.toUpperCase() },
              { "district": district.toUpperCase() },
              { "ward": ward.toUpperCase() },
              { "crop": crop.toUpperCase() },
            ],
          })
          .limit(10)
          .toArray()
        results =
          !results.length &&
          (await collection
            .find({
              $and: [
                { "region": region.toUpperCase() },
                { "district": district.toUpperCase() },
                { "ward": ward.toUpperCase() },
                { "crop": crop.toUpperCase() },
              ],
            })
            .limit(10)
            .toArray())
        resolve(results)
      }
    })
  })
}



const sendSMS = (to, message) => {
  const options = {
    to: [to],
    message: message,
    from: 'MAVUNO-APP',
  }

  sms
    .send(options)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

exports.ussd = async (req, res) => {
  let message = ''

  const sessionId = req.body.sessionId
  const serviceCode = req.body.serviceCode
  const phoneNumber = req.body.phoneNumber
  let text = req.body.text

  // Welcome Message USSD menu
  if (text === '') {
    message = 'CON GN20 Customer\n'
    message += '1:Kupokea \n'
    message += '2:Kurudisha \n'
    message += '3:Malipo \n'
    message += '4:Toka \n'
  }

  // Kupokea
  else if (text === '1') {
    message = 'CON Ingiza ParcelCode**kilo \n'
    
  }
  else if (text.split('*').length == 60) {
    message = 'END Chaguo lako limepokelewa tutakutumia ujumbe mfupi hivi punde \n'
  }

 

  // Kurudisha
  else if (text === '2') {
    message = 'CON Ingiza ParcelCode*Idadi\n'
    
  }
  else if (text.split('*').length == 60) {
    message = 'END Chaguo lako limepokelewa tutakutumia ujumbe mfupi hivi punde \n'
  }
  
  //Malipo
  else if (text == '3'){
    message ='CON Ingiza Namba ya simu iliyosajiliwa na G20 '
  }
  else if (text.split('*').length == 60) {
    message = 'END Ombi lako limepokelewa tutakutumia ujumbe mfupi hivi punde \n'
  }
    
   

  // Exit
  else if (text === '4') {
    message = 'END Asante kwa kutumia huduma zetu karibu tena'
  }

  // Exit
  else {
    message = 'END Hakuna Taarifa kwa sasa'
  }

  console.log(req.body)

  res.contentType('text/plain')
  res.status(200).send(message)
}
