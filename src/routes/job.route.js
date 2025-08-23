import express from 'express';
import JobController from '../controllers/jobs/index.controller.js';
import { isEmployer, isLoggedIn } from '../middlewares/user/auth.middleware.js';
import JobValidation from '../validation/job/index.validation.js';
import { sanitizeReq } from '../middlewares/job/sanitization.middleware.js';

const JobRouter = express.Router({
    caseSensitive: true,
});


/** Get All Jobs .../GET **/
JobRouter.get('/allJobs', JobController.fetchAllJobs)

    /** Get Single Job By :id .../GET **/
    .get('/allJobs/:id', JobController.fetchSingleJobById)

    .use(isLoggedIn)

    /** Apply job .../POST **/
    .post('/apply-job', JobController.applyJob)

    /** Get all applied Jobs user wise ...GET **/
    .get('/applied-jobs', JobController.viewUserWiseAppliedJob)

    /** Add Bookmark Job .../POST **/
    .post('/bookmark-job', JobController.postBookMarkJob)

    /** Get all Bookmark Jobs user wise .../GET **/
    .get('/bookmark-job', JobController.fetchAllBookmarkJobsUserWise)

    /** Delete bookmarked job by :id .../DELETE  **/
    .delete('/bookmark-job/:id', JobController.deleteBookmarkById)

    .use(isEmployer)
    /** Post a new Job .../POST **/
    .post('/create-job', JobValidation.jobPostValidationRules(), sanitizeReq, JobController.postNewJob)

    /** Delete Job by :id .../DELETE **/
    .delete('/cancel-job/:id', JobController.deleteJobByEmployer)

    /** Single as well as Bulk Update Job by :id .../PUT or, /PATCH **/
    .all('/edit-job/:id', JobController.updateJobByEmployer);

export default JobRouter;