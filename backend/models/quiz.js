import mongoose from "mongoose";

const Schema = mongoose.Schema;

const asnwerSchema = new Schema({
    questionId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    asnwer : {
        type : String,
        required : true
    }
});

const quizSchema = new Schema({
    answers : [asnwerSchema]
});

export default mongoose.model('quiz',quizSchema);