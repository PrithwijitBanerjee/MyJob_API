import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const SALT_WORK_FACTOR = 10; // no. of rounds for hashing original password

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, '**user email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not valid email Id`,
        },
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, '**Password is required'],
        set: v => bcryptjs.hashSync(v, bcryptjs.genSaltSync(SALT_WORK_FACTOR)),
    },
    confirmPassword: {
        type: String,
        required: [true, '**Confirm Password is required'],
        set: v => bcryptjs.hashSync(v, bcryptjs.genSaltSync(SALT_WORK_FACTOR)),
    },
    typeOfUser: {
        type: String,
        enum: ['Employer', 'JobSeeker'],
    },
    otp: Number,
    otpExpiry: String,

}, {
    versionKey: false,
    timestamps: true,
});

const UserModel = new mongoose.model('user', userSchema);

export default UserModel;