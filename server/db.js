const mongoose = require('mongoose')

// connect to mongodb
const connectMongodb = async () => {
    
    let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-demo'
    try {
       const data = await mongoose.connect(MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true});
       console.log('mongo db connected successfully');
    }
    catch (e) {
        console.log('error in mongodb error connect------', e?.message)
    }
}

module.exports.connectMongodb  = connectMongodb