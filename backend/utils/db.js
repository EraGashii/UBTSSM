import mongoose from 'mongoose';

const DBCon = async () => {
    try {
        console.log('Connecting to MongoDB with URL:', process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB is connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
}

export default DBCon;
