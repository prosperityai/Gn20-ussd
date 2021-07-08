




const credentials = {
    apiKey: 'e9f5a3430deeadab1f5fa31c2d0e652f395c83340e561c0e96a42b3083afe91b', // use your sandbox app API key for development in the test environment
    username: 'tapbds', // use 'sandbox' for development in the test environment
  }
  const Africastalking = require('africastalking')(credentials)
  
  // Initialize a service e.g. SMS
  const sms = Africastalking.SMS
  
  const sendSMS =  async (to, message) => {
    const options = {
      to: ['+255769079406'],
      message: message,
      enque: true
    }
  
    sms
      .send(options)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log('Error', error)
      })
  }

const main = async () => {
    await  sendSMS('', 'Hello')
}

main()