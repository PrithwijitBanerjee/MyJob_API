import { applyNewJob, editJobByEmployer, fetchJobsUserWise, getAllJobList, getAllPostedJobsByEmployer, getBookmarkJobUserWise, getJobById, getSingleBookmarkById, jobPost, removeBookmarkById, removeJobById, saveBookmarkJobs } from "./jobs.services.js";

const JobServices = {
    applyNewJob,
    fetchJobsUserWise,
    jobPost,
    getAllJobList,
    getJobById,
    saveBookmarkJobs,
    getBookmarkJobUserWise,
    getSingleBookmarkById,
    removeBookmarkById,
    removeJobById,
    editJobByEmployer,
    getAllPostedJobsByEmployer,
};

export default JobServices;
