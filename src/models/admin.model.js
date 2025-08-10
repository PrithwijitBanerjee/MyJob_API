import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const SALT_WORK_FACTOR = 10; // no. of rounds for hashing original password

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!!!'],
    },
    email: {
        type: String,
        required: [true, 'Email Id is required!!!'],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not valid email Id`,
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required!!!'],
        set: v => bcryptjs.hashSync(v, bcryptjs.genSaltSync(SALT_WORK_FACTOR)),
    }
}, {
    versionKey: false,
    timestamps: true,
});

const AdminModel = new mongoose.model('Admin', adminSchema);

export default AdminModel;