const UserSchema = require('../../schema/user')
const MessageSchema = require('../../schema/message')

const getUsers = async () => {
    try {
       const data  = await  UserSchema.find({});
       return data 
    }
    catch (e) {
        throw new Error(`mongo db error ${e?.message}`)
    }
}

const saveMessage = async ( payload ) => {
   try {
    const data = await new MessageSchema(payload).save();
    return data
   }
   catch (e ) {
    throw new Error(`Mongo db error ${e?.message}`)
   }
}

const getAllMessages = async ( query ) => {
    try {
       const data = await MessageSchema.find( query );
       return data
    }
    catch (e) {
        throw new Error(`Mongo db error ${e?.message}`)
    }
}


module.exports.getUsers = getUsers
module.exports.saveMessage = saveMessage
module.exports.getAllMessages  = getAllMessages