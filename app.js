// require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const ussd = require('./routes/ussd')
const mongoose = require('mongoose')
const Eneo = require('./models/models')
const Farmer = require('./models/farmer')
const auth = require('./middleware/auth')
const MongoClient = require('mongodb').MongoClient


app = express()
const port = 5000

const multer = require('multer')
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: Infinity
    },
    fileFilter(req, file, cb) {

        // if(!file.originalname.endsWith('.pdf')){
        //     return cb(new Error('Please upload a PDF file'))
        // }

        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a word document'))
        }

        cb(undefined, true)

    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())




const DB_URI = `mongodb://mavuno_user:mavuno2021@cluster0-shard-00-00.rh3ns.mongodb.net:27017,cluster0-shard-00-01.rh3ns.mongodb.net:27017,cluster0-shard-00-02.rh3ns.mongodb.net:27017/mavunodata?ssl=true&replicaSet=atlas-k45xih-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  
  .then((res) => {
    console.info("database connected");
    // const filename = join(__dirname, "farmers.csv");
    // createReadStream(filename)
    //   .pipe(parse({ headers: true }))
    //   .on("error", (error) => console.error(error))
    //   .on("data", async (data) => {
    //     const values = Object.values(data);
    //     await new FarmerModel({
    //       farmer: values[1],
    //       phoneNumber: values[2],
    //       age: values[4],
    //       gender: values[3],
    //       region: values[7],
    //       district: values[6],
    //       ward: values[5],
    //       crop: values[8],
    //       farmSize: values[9]
    //     }).save();
    //     console.log("save")
    //   })
    //   .on("error", (error) => console.error(error));
  })
  .catch((error) => {
    console.log(error);
  });

// mongoose
//   .connect(
//     'mongodb+srv://mavuno-test:zIc7E95ofCTIzqtx@cluster0.rh3ns.mongodb.net/mavuno?retryWrites=true&w=majority',
//     {
//       useNewUrlParser: true,
//     }
//   )
//   .then(() => {
//     console.log('Mongo DB Running')
//   })
//   .catch((error) => {
//     console.log('Error Connecting', error)
//   })




const test = async () => {
  console.log(await getFarmers(region='KAGERA', district='MULEBA', ward='KASHALUNGA', crop='MAHINDI'))
}

app.get('/farmers', index.getFarmers)
app.route("/farmers/:id").get(index.getFarmer)
app.route("/farmers/:id").patch(index.updateFarmer)
app.route("/farmer").post(index.addFarmer)

app.get('/smes', index.getSmes)
app.route("/smes/:id").get(index.getSmeById)
app.route("/smes/:id").patch(index.updateSme)
app.route("/sme").post(index.addSme)
app.post('/callback', ussd.ussd)

app.route("/admin/login").post(index.Login)
app.route("/admin/signup").post(index.admin)
app.route("/sendSMS").post(index.sendSMS)


app.listen(port, () => {
  // test()
  console.log('server started')
})
