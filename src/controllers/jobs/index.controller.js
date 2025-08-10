import { applyJob, fetchAllJobs, fetchSingleJobById, getUserWiseJobs, postNewJob, viewUserWiseAppliedJob } from "./jobs.controller.js";

const JobController = {
    applyJob,
    getUserWiseJobs,
    postNewJob,
    fetchAllJobs,
    fetchSingleJobById,
    viewUserWiseAppliedJob,
};

export default JobController;