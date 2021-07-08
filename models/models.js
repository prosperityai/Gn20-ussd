const {Schema, model}= require('mongoose')

const Mjasiriamali = new Schema({
    eneo: {
        type: String,
        required: true
    },
    mazao: [{
            type: String,
            required: true
    }],
    kiasi: [{
        type: String,
        required: true
    }],
    mawasiliano: [{
        type: String,
        required: true
    }],
    mawazoAnayopukuchua: [{
        type: String,
        required: true
    }],
    bei: [{
        type: String,
        required: true
    }]
})

const Wasindikaji = new Schema({
    // name: {
    //     type: String
    // },
    // mobile: {
    //     type: String
    // }
})

const WauzajiWaJumla = new Schema({
    name: {
        type: String
    }
})


const WauzajiPembejeo = new Schema({
    name: {
        type: String
    }
})

const HudumaHughani = new Schema({
    name: {
        type: String
    }
})

const WashauriBiashara = new Schema({
    name: {
        type: String
    }
})

const Benki = new Schema({
    name: {
        type: String
    }
})

const WakalaUsafiri = new Schema({
    name: {
        type: String
    }
})

const WauzajiMashine = new Schema({
    name: {
        type: String
    }
})

const Eneo = new Schema({
    region: {
        type: String,
        unique: true
    },
    districts: [{
        name: {
              type: String
          },
          wards: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
    }]
})


module.exports = model("Mjasiriamali", Mjasiriamali)
module.exports = model("Wasindikaji", Wasindikaji)
module.exports = model("WauzajiWaJumla", WauzajiWaJumla)
module.exports = model("WauzajiPembejeo", WauzajiPembejeo)
module.exports = model("HudumaHughani", HudumaHughani)
module.exports = model("WashauriBiashara", WashauriBiashara)
module.exports = model("Benki", Benki)
module.exports = model("WakalaUsafiri", WakalaUsafiri)
module.exports = model("WauzajiMashine", WauzajiMashine)
module.exports = model("Eneo", Eneo)
