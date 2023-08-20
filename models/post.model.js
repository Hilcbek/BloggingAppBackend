import mongoose from 'mongoose'
var BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'please provide field!'],
        unique:true,
    },
    desc : {
        type:String,
        required:[true, 'please provide field!'],
    },
    tag:{
        type: [mongoose.Schema.ObjectId],
        ref : 'Tag'
    },
    images:{
        type:[String],
        required:[true, 'please provide field!'],
    },
    author:{
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
}, { timestamps : true });

export default mongoose.model('Blog', BlogSchema);