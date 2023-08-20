import mongoose from 'mongoose'
var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'please provide field!'],
        unique:[true, 'usernam exist'],
    },
    email:{
        type:String,
        required:[true, 'please provide field!'],
        unique:true,
    },
    profile:{
        type:String,
        default: 'https://www.pngmart.com/files/21/Account-User-PNG-Photo.png',
    },
    password:{
        type:String,
        required:[true, 'please provide field!'],
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
}, { timestamps : true });

export default mongoose.model('User', userSchema);