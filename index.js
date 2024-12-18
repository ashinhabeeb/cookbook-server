require('dotenv').config()
//import express
const express = require("express")
const cors = require('cors')
const routes = require('./routes')
require('./connection')

const cookbookServer = express() // to create server
cookbookServer.use(cors()) // to connect to frontend
// cookbookServer.use(express.json()) // to parse json data to object
cookbookServer.use(express.json({ limit: '10mb' }))

cookbookServer.use(routes)

const PORT = 4009 || process.env.PORT // create port or choose available port

cookbookServer.listen(PORT,()=>{
    console.log('server running successfully')
})


