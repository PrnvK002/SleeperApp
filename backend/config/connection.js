import mongoose from "mongoose";

const MONGO_URI = 'mongodb+srv://user123:accessdata@blogs.ej6tx.mongodb.net/sleeperApp?retryWrites=true&w=majority'
const connectDB = async() => {
    try{
        const connect = await mongoose.connect(MONGO_URI);
        console.log(`mongodb successfully connected ${connect}`)
    }catch(err){
        console.log(err);
    }
}

export default connectDB;