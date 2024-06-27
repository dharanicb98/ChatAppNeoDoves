const userRepo = require('./repo')

const createUser  = async ( payload ) => {
    const { first_name, last_name, password, user_name, email } = payload

    if (!first_name) throw new Error('first_name required');

    if (!last_name) throw new Error('last_name required');

    if (!password) throw new Error('password required');

    if (!user_name) throw new Error('user_name required');

    if (!email) throw new Error('email required');

    const [checkEmail] = await userRepo.userQuery( {email});

    const [checkUserName] = await userRepo.userQuery({user_name});

    if ( checkEmail || checkUserName ) {
        throw new Error('Entry already exits')
    }


   const data = await userRepo.createUser( payload );
   return data

}

const loginUser = async ( payload ) => {
    const { email, password } = payload;

    if (!email) throw new Error('Email is missing');
    if (!password) throw new Error('Password is missing');

    
    const [checkEmail] = await userRepo.userQuery( {email});

    console.log('check email',checkEmail )
    if ( !checkEmail ) {
        throw new Error('Email not found')
    }

    if (checkEmail.password !== password ) {
        throw new Error('Incorrect Password')
    }

    return checkEmail

}

module.exports.createUser = createUser
module.exports.loginUser = loginUser