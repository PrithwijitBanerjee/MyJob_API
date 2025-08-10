import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    nationality: {
        type: String,
        required: [true, 'Nationality is required!!!'],
    },
    dob: {
        type: Date,
        required: [true, 'DOB is required!!!'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: [true, 'Gender is required!!!'],
    },
    maritalStatus: {
        type: String,
        required: [true, 'Marital Status is required!!!'],
    },
    education: {
        type: String,
        required: [true, 'Education is required!!!'],
    },
    experience: {
        type: String,
        required: [true, 'Experience is required!!!'],
    },
    biography: {
        type: String,
        required: [true, 'Biography is required!!!'],
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'userId is required!!!'],
    },
}, {
    timestamps: true,
    versionKey: false,
});

const ProfileModel = new mongoose.model('Profile', profileSchema);


export default ProfileModel;