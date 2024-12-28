// models/Salary.js
import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  employee: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, required: false },
  deductions: { type: Number, required: false },
  payDate: { type: Date, required: true },
});

const Salary = mongoose.model('Salary', salarySchema);
export default Salary;
