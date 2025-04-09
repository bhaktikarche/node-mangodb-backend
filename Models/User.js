const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    fullName:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    age:{type:Number,required:true},
    password:{type:String,required:true}
})

module.exports = mongoose.model('User',UserSchema)