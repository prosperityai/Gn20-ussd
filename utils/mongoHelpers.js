const Eneo = require('../models/models')


const addEneo = async (data) => {
    try {
        const results = await new Eneo(data).save()
        console.log(results)
    }
    catch(error) {
        console.log(error)
    }
}

const getWakulima = async () => {
    try {
        cons
    } catch (error) {
        console.log(error)
    }
}


// message += '1: Iringa Vijijini \n'
// message += '2: Kilolo \n'
// message += '3: Mufindi \n'
// message += '4: Iringa Manispaa \n'

const index = async() => {
    const data = {
        region: "Iringa",
        districts: [
            {
                name: 'Iringa Vijijini',
                wards: [
                   'Idodi',  'Itunundu'
                ]
            }
        ]
    }
    // await addEneo(data)
}

index()