const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    watchedmovies: {type:[{type: Schema.Types.ObjectId,ref:'Movie'}]}
})

const User = mongoose.model('user',UserSchema);
module.exports = User;