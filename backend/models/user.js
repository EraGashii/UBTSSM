import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    FullName: {
        type: String,
    },
    email: {
        type: String,
    },
    profileImage: { // Dëgjoni se ky është emri i fushës që përdorni për imazhin
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    userID: { // Sigurohuni që fusha e employeeID është e pranishme
        type: String,
    },
    dateOfBirth: { // Sigurohuni që fusha e dateOfBirth është e pranishme
        type: String,
    },
    department: { // Sigurohuni që fusha e department është e pranishme
        type: String,
    }
}, { timestamps: true });

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
