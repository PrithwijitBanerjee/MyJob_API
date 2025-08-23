import mongoose from 'mongoose';

const jobBookMarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'User Id is required!!!'],
    },
    jobIds: [
        {
            type: mongoose.Types.ObjectId,
            required: [true, 'Job Id is Required!!!'],
        }
    ]
});

const JobBookMarkModel = new mongoose.model('JobBookmark', jobBookMarkSchema);

export default JobBookMarkModel;