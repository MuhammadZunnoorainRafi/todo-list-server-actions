import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: ['enter title', true],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
