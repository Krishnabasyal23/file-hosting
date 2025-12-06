const mongoose= require ("mongoose");
const fileSchema= new mongoose.Schema({
    filename: String,
    path: String,
    size: Number,
    privacy:{
        type:String,
        enum:["public", "private"],
        default:"private"
    },
    uploaded_by:{
        type:String,// temporary, until prev bugs are fixed
        default: "test-user"
    },
    uploaded_at:{
        type: Date,
        default: Date.now
    }

});
module.exports= mongoose.model("File", fileSchema);