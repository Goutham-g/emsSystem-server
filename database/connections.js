// file to connect server and database
const mongoose = require('mongoose')

mongoose.connect(process.env.baseUrl, {
    useNewUrlParser: 'true',
    useUnifiedTopology: 'true'
}).then(() => {
    console.log('______mongodb Atlas Connected_______');
}).catch(() => {
    console.log('-----Atlas Error!-----');
})
