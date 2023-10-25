// connect env file
require('dotenv').config()
//import router
const router = require('./routes/router')


const express = require('express')
const cors = require('cors')

//Import connection file

require('./database/connections')

const server = express()
server.use(cors())   //tell server to use cors
server.use(express.json()) // convert to json
server.use(router)

//integrate react port
// const port = 4000 || process.env.port
const port = process.env.PORT || 4000;

//export upload folders to client
server.use('/uploads', express.static('./uploads'))


server.listen(port, () => {
    console.log(`------Ems server Started at port ${port}--------`);
})
