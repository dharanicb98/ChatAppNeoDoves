const chatRepo = require('./repo');


const getChatUsers = async ( id ) => {
    if (!id ) {
        throw new Error('Please send id in params ');
    }

    const data = await chatRepo.getUsers();
    const users = data.filter((item) => item._id.toString() !== id.toString());
    return users
}


const sendMessage = async ( payload ) => {
    if ( !payload.message ) {
        throw new Error('Please Send Message')
    }

    if ( !payload.sender_id ) {
        throw new Error('Please Send sender_id')
    }

    if ( !payload.receiver_id ) {
        throw new Error('Please Send receiver_id')
    }

    if ( !payload.sender_name ) {
        throw new Error('Please Send sender_name')
    }

    if ( !payload.receivered_name ) {
        throw new Error('Please Send receivered_name')
    }

   const data = await chatRepo.saveMessage( payload ) 
   return data


}

const getAllMessages = async ( payload ) => {
    const {sender_id, receiver_id} = payload;
    if ( !sender_id ) {
        throw new Error('Please send Sender Id');
    }

    if ( !receiver_id ) {
        throw new Error('Please send receiver Id');
    }


    const data = await chatRepo.getAllMessages({});
    let result = data.filter(m=>m.sender_id === sender_id && m.receiver_id === receiver_id || m.receiver_id ===  sender_id && m.sender_id === receiver_id );

   
    return result
}





module.exports.getChatUsers = getChatUsers
module.exports.sendMessage = sendMessage
module.exports.getAllMessages = getAllMessages