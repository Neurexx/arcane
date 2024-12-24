import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student'
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'role'
    }
  }, {
    timestamps: true
  });

  userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = mongoose.model('User', userSchema);

  export default User