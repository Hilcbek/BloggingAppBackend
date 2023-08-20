import mongoose from "mongoose";
var TagSchema = new mongoose.Schema({
    tag:{
        type:String
    }
});
export default mongoose.model('Tag', TagSchema);