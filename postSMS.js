    const credentials = {
        apiKey: '264caac2e28502d4dab759192f75a62d7f50f655e9b2a7fc32b43c0724e90367', 
        username: 'GazetiNet',
        
      }

    const Africastalking = require('africastalking')(credentials);
   
    const sms = Africastalking.SMS
  
    const sendSMS =  async (to, message) => {
      const options = {
        to: ['+255769079406'],
        message: message,
        from:"MAVUNO",
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

    sendSMS("+255699496430", "test" )
    
    console.log(sendSMS)