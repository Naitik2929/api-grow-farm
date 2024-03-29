import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema(
  {
    // regf
    name: {
      type: String,
      required: true,
    },
    gmail: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    // regs
    gender: {
      type: String,
    },
    district: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    roles: {
      type: String,
      enum: ["Farmer", "Doctor", "Shopowner", "Broker", "Other"],
      default: "Farmer",
    },
    profilePicture: {
      type: String,
    },
    posts:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post"
      }
    ],
    followers:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    following:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    ]
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);
export default User;
