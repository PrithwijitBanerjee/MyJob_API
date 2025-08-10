import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'FullName is Required!!!'],
    },
    experience: {
        type: String,
        required: [true, 'Experience is Required!!!'],
    },
    profile: {
        type: String,
        required: [true, 'Profile Image is required!!!'],
    },
    website: {
        type: String,
        required: [true, 'Website URL is required!!!'],
        validate: {
            validator: function (v) {
                // Regular expression for URL validation
                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    documents: [
        {
            type: String,
        }
    ],
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'UserId must be required!!!'],
    }
});

const PersonalModel = new mongoose.model('Personal', personalSchema);

export default PersonalModel;