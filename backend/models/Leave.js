import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Status: Pending, Approved, Rejected
  createdAt: { type: Date, default: Date.now },
});

const Leave = mongoose.model("Leave",LeaveSchema)
export default Leave
