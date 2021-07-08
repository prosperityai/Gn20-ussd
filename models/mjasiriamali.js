const {Schema,model} = require("mongoose")
const SmeSchema = new Schema({
    enterprenuer: {
        type: String
    },
    business: {
        type: String
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
    town: {
        type: String
    }
})


module.exports  = model("SmesModel",SmeSchema,'mjasiriamali')