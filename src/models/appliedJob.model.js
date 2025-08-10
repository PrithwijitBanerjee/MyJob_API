import mongoose from 'mongoose';

const appliedJobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'UserId is Required!!!'],
    },
    jobIds: [
        {
            type: mongoose.Types.ObjectId,
            required: [true, 'Job Id is Required!!!'],
        }
    ]
});


const AppliedJobModel = new mongoose.model('AppliedJob', appliedJobSchema);

export default AppliedJobModel;