const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter Your Name"],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Email"],
    validate: [validator.isEmail, "Please Enter Valid Email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
  },
  role: {
    type: String,
    default: "normal user",
  },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
  });
  
  userSchema.methods.comparePassword = async function (
    candidatePassword,
    password
  ) {
    return await bcrypt.compare(candidatePassword, password);
  };

const user = mongoose.model("User",userSchema);

module.exports = user;