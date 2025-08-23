import { applyJob, deleteBookmarkById, deleteJobByEmployer, fetchAllBookmarkJobsUserWise, fetchAllJobs, fetchSingleJobById, getUserWiseJobs, postBookMarkJob, postNewJob, updateJobByEmployer, viewUserWiseAppliedJob } from "./jobs.controller.js";

const JobController = {
    applyJob,
    getUserWiseJobs,
    postNewJob,
    fetchAllJobs,
    fetchSingleJobById,
    viewUserWiseAppliedJob,
    postBookMarkJob,
    fetchAllBookmarkJobsUserWise,
    deleteBookmarkById,
    deleteJobByEmployer,
    updateJobByEmployer,
};

export default JobController;