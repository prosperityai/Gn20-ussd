const FarmerModel = require('../models/farmer')
const SmesModel = require ('../models/mjasiriamali')
const AdminModel = require ('../models/admin')
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')

exports.index = (req, res) => {
    res.json({
        'message': 'Hello World'
    })
}

//Admin

exports.Login = async(req, res) => {
    try {
    const admin = await AdminModel.findOne({ phoneNumber:req.body.phoneNumber })

    if (!admin) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(req.body.password, admin.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    const token = await admin.generateAuthToken()

    res.json({ admin, token })

    } catch (e) {
        res.status(400).send(e)
    }
}

exports.admin = async(req, res) => {
    const admin = new AdminModel(req.body)
    console.log(admin)
    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.json({ admin , token })
    } catch (e) {
        console.log(e)
    }
}

// Mkulima CRUD
exports.addFarmer = async(req, res) => {
    const farmer = new FarmerModel(req.body)
    try {
        await farmer.save()

        res.json(farmer)
    } catch (e) {
        console.log(e)
    }
}

exports.editFarmerDetails = (req, res) => {}

exports.updateFarmer = async(req, res) => {
        const updates = Object.keys(req.body)
        console.log(req.body)
        const allowedUpdates = [ "farmer","phoneNumber","age","region","district","ward","crop","farmSize" ]

        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))


        try {
             farmer = await FarmerModel.findById(req.params.id)
            updates.forEach((update) => farmer[update] = req.body[update])
            await farmer.save()

             res.json(farmer)
        } catch (e) {
            console.log(e)
        }
}

exports.getFarmer = async(req, res) => {

             try {
                const farmer = await FarmerModel.findById(req.params.id).exec()
                console.log(farmer)
    
               res.json(farmer)
             } catch (e) {
                 console.log(e)
             }
}

exports.getFarmers = async(req, res) => {
    try{
        const farmers =  await FarmerModel.find().limit(1500).exec()
        res.json(farmers)
    }
    catch(error){
        console.log(error)
    }
}

    
//Wajasiriamali CRUD
exports.addSme = async(req, res) => {
    const sme = new SmesModel(req.body)
    try {
        await sme.save()

        res.json(sme)
    } catch (e) {
        console.log(e)
    }
}

exports.editMjasiriamaliDetails = (req, res) => {}

exports.updateSme = async(req, res) => {
    const updates = Object.keys(req.body)
    console.log(req.body)
    const allowedUpdates = [ "enterprenuer","business","age","gender","region","contact","district","town" ]

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    try {
         sme = await SmesModel.findById(req.params.id)
        updates.forEach((update) => sme[update] = req.body[update])
        await sme.save()

         res.json(sme)
    } catch (e) {
        console.log(e)
    }
}

exports.getSmeById = async(req, res) => {
     try {
        const sme = await SmesModel.findById(req.params.id).exec()
        console.log(sme)

       res.json(sme)
     } catch (e) {
         console.log(e)
     }
}

exports.getSmes = async(req, res) => {
    try {
        const sme = await SmesModel.find().limit(100).exec()
        res.json(sme)

    } catch (error) {
        console.log(error)
    }

}

exports.sendSMS = (req, res)=> {

    const credentials = {
        apiKey: 'a3ca87779d39ebbdb1f2aa84a26bac8200c56d880fafee98629679ccc1ecfec6', 
        username: 'tapbds',
      }   

    const Africastalking = require('africastalking')(credentials);

    const sms = Africastalking.SMS

    const {to,message} = req.body || res.status(400).json({Error:"Both 'to' and 'message' are required"})
        
          sms.send({to,message,from:'MAVUNO',enque :true})
          .then(response=>{
              console.log(response)
              res.json(response)
          })
   } 


         

