const express = require('express');
const routes = require('./startup')
const { Server} = require('socket.io')
const http = require('http');
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();
const db = require('./db')
const socketfile = require('./socket')

const app = express();
const expressServer = http.createServer( app );

// app.use(bodyParser())
app.use(express.json());
app.use(cors())

socketfile.io


try {
    db.connectMongodb();
}
catch (e) {
    console.log('error in connecting mongodb', e?.message)
}

routes.setUpRoutes( app );


const io = new Server( expressServer );


expressServer.listen(3001, () => {
    console.log('server started port at 3001')
})