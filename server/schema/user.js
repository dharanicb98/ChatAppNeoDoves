const mongoose =  require('mongoose');

const userShema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
)

const UserSchema = mongoose.model('users', userShema);

module.exports = UserSchema;