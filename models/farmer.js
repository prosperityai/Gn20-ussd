
const {Schema,model} = require("mongoose")
const SmeSchema = new Schema({
    farmer: {
        type: String
    },
    phoneNumber: {
        type: String,
    },
    age:{
        type: String
    },
    gender: {
        type: String
    },
    contact: {
        type: String
    },
    region: {
        type: String
    },
    district: {
        type: String
    },
    ward: {
        type: String
    },
    crop: {
        type: String
    },
    farmSize: {
        type: String
    }

})

module.exports  = model("FarmerModel",SmeSchema,'mkulima')