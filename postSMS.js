    // const credentials = {
    //     apiKey: ' 
    //     username: '',
        
    //   }

    const Africastalking = require('africastalking')(credentials);
   
    const sms = Africastalking.SMS
  
    const sendSMS =  async (to, message) => {
      const options = {
        // to: [''],
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

    //sendSMS("+255699496430", "test" )
    
    console.log(sendSMS)