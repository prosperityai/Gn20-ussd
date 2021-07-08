const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken')

const {Schema,model} = require("mongoose")
const AdminSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password can not contain 'password'")
            }
        },

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    
})

AdminSchema.methods.generateAuthToken = async function() {
    const admin = this
    const token = jwt.sign({ _id: admin._id.toString() }, "mavuno")


    admin.tokens = admin.tokens.concat({ token })
    await admin.save()

    return token
}


// AdminSchema.statics.findByCredentials = async(phoneNumber, password) => {

//     const admin = await AdminModel.findOne({ phoneNumber })
//     console.log(admin)
//     if (!admin) {
//         throw new Error('Unable to login')
//     }
//     const isMatch = await bcrypt.compare(password, admin.password)
//     if (!isMatch) {
//         throw new Error('Unable to login')
//     }
//     return admin 
// }

// Hash the plane text before saving ******
AdminSchema.pre('save', async function(next) {
    const admin = this

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }

    next()
})

module.exports  = model("AdminModel",AdminSchema,'admin')