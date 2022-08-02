import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionName : {
        type : String,
        required : true
    },
    answerType : {
        type : String,
        required : true
    },
    options : {
        type : [ String ],
        required : false
    }
});

export default mongoose.model('questions',questionSchema);