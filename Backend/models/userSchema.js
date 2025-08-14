import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student"
    },
    cgpa: Number,
    skills: [String],
    education: [String],
    interests: [String],
    certificates: [String],
    verified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
export default User