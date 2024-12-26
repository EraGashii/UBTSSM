import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userID: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  designation: { type: String },
  department: { type: String },
  salary: { type: Number, required: true, },
  password: { type: String, required: true },
  role: { type: String },
  image: { type: String }, // File path for the uploaded image
});

const User = mongoose.model('User', userSchema);

export default User;
