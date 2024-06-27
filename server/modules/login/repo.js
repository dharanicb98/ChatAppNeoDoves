const UserSchema = require('../../schema/user')

const createUser = async ( payload ) => {
    try {
      const data = await new UserSchema(payload).save()
      return data
    }
    catch (e) {
        throw new Error(`db error ${e?.message}`)
    }
}

const userQuery = async ( payload) => {
    try {
        const data = await  UserSchema.find( payload )
        return data
      }
      catch (e) {
          throw new Error(`db error ${e?.message}`)
      }
}
 
module.exports.createUser = createUser
module.exports.userQuery = userQuery