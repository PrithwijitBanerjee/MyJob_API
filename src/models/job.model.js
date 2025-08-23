import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    jobLogo: {
        type: String,
        required: [true, 'Job Logo is required!!!'],
    },
    jobTitle: {
        type: String,
        required: [true, 'Job Title is required!!!'],
    },
    jobTags: {
        type: String,
        required: [true, 'Job Tags is required!!!'],
    },
    jobRole: {
        type: String,
        required: [true, 'Job Role is required!!!'],
    },
    minSalary: {
        type: Number,
        default: 0,
    },
    maxSalary: {
        type: Number,
        default: 0,
    },
    salType: {
        type: String,
        required: [true, 'Salary Type is required!!!'],
    },
    education: {
        type: String,
        required: [true, "Education is required!!!"],
    },
    experience: {
        type: String,
        required: [true, "Experience is required!!!"],
    },
    jobType: {
        type: String,
        required: [true, "Job Type is required!!!"],
        enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Remote'],
    },
    vacancies: {
        type: String,
        required: [true, "Vacancies is required!!!"],
    },
    expiredOn: {
        type: Date,
        required: true,
    },
    jobLevel: {
        type: String,
        required: [true, "Job Level is required!!!"],
        enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'],
    },
    applyJobOn: {
        type: String,
        required: true,
        enum: ['On Jobpilot', 'External Platform', 'On Your Email'],
    },
    description: {
        type: String,
        required: [true, "Job Description is required!!!"],
    },
    jobResponsibility: {
        type: String,
        required: [true, 'Job Responsibility is required!!!'],
    },
    employerId: {
        type: mongoose.Types.ObjectId,
    }

}, {
    versionKey: false,
    timestamps: true,
});

const JobModel = new mongoose.model('Job', jobSchema);

export default JobModel;