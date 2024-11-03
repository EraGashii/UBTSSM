
import mongoose from "mongoose";

const DBCon = async () => {
    try {
        console.log('Connecting to MongoDB with URL:', process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL); // Removed deprecated options
        console.log('MongoDB is connected');
    } catch (error) {
        console.log('MongoDB error :(', error);
    }
}

export default DBCon;
