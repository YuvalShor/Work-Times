import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employeeSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, "Please add a phone number"],
    unique: true,
    maxlength: [10, "Phone number cannot be more than 10 digits"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  firstname: {
    type: String,
    required: [true, "Please add a first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please add a last name"],
  },
  monthlyhours: {
    type: Number,
    default: 0,
  },
  monthlysessions: {
    type: Number,
    default: 0,
  },
  workingstatus: {
    type: String,
    default: "Not Working",
  },
});

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

employeeSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("No password, can't compare");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password", error.message);
  }
};

module.exports =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
