import CreateError from 'http-errors';
import AllStatusCodes from '../../../utils/allStatusCodes.js';
import JobServices from '../../services/jobs/index.services.js';
import { successResponseHandler } from '../../../utils/response.js';

export const applyJob = async (req, res, next) => {
    try {
        const appliedJob = await JobServices.applyNewJob({
            ...req.body,
            userId: req.userId,
        });
        if (!appliedJob) {
            return next(CreateError(AllStatusCodes.BadRequest, "Invalid Client Request!!!, You already applied for this job"));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.Created,
            message: 'Job application sent successfully',
            payload: {
                ...appliedJob?._doc,
            },
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const getUserWiseJobs = async (req, res, next) => {
    try {
        const userId = req.userId;
        const jobs = await JobServices.fetchJobsUserWise(userId);
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'Jobs List has been fetched successfully',
            payload: {
                jobs,
            },
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};


export const postNewJob = async (req, res, next) => {
    try {
        const job = await JobServices.jobPost({
            ...req.body,
            employerId: req.userId,
        });
        if (!job) {
            return next(CreateError(AllStatusCodes.NotFound, "Job not posted successfully, Invalid Client Request!!!"));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.Created,
            message: 'Job Posted Successfully',
            payload: {
                ...job?._doc,
            },
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};


export const fetchAllJobs = async (req, res, next) => {
    try {
        const page = +(req.query.page) || 1;
        const limit = +(req.query.limit) || 1;
        const {
            search,
            jobTitle,
            jobTags,
            jobRole,
            minSalary,
            maxSalary,
            experience,
            jobType,
        } = req.query;

        // Build the search query object
        const searchQuery = {};

        // If general search term is provided, search across multiple fields
        if (search) {
            searchQuery.$or = [
                { jobTitle: { $regex: search, $options: 'i' } },
                { jobTags: { $regex: search, $options: 'i' } },
                { jobRole: { $regex: search, $options: 'i' } },
                { experience: { $regex: search, $options: 'i' } }
            ];
        } else {
            // Individual field searches
            if (jobTitle) {
                searchQuery.jobTitle = { $regex: jobTitle, $options: 'i' };
            }
            if (jobTags) {
                searchQuery.jobTags = { $regex: jobTags, $options: 'i' };
            }
            if (jobRole) {
                searchQuery.jobRole = { $regex: jobRole, $options: 'i' };
            }
            if (experience) {
                searchQuery.experience = { $regex: experience, $options: 'i' };
            }
        }

        // Numeric and exact match filters
        if (minSalary) {
            searchQuery.minSalary = { $gte: Number(minSalary) };
        }
        if (maxSalary) {
            searchQuery.maxSalary = { $lte: Number(maxSalary) };
        }
        if (jobType) {
            searchQuery.jobType = jobType;
        }

        const { jobs, count } = await JobServices.getAllJobList(page, limit, searchQuery);
        if (!jobs?.length) {
            return successResponseHandler(res, {
                status: AllStatusCodes.NotFound,
                message: 'No Jobs Data Found ...',
                payload: {
                    jobs,
                    pagination: {
                        totalNoOfJobs: count,
                        noOfPages: Math.ceil(count / limit),
                        prevPage: page - 1 > 0 ? page - 1 : null,
                        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                        currentPage: page,
                    },
                }
            });
        }
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'All Jobs list has been fetched successfully',
            payload: {
                jobs,
                pagination: {
                    totalNoOfJobs: count,
                    noOfPages: Math.ceil(count / limit),
                    prevPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                    currentPage: page,
                },
            },
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const fetchSingleJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await JobServices.getJobById(id);
        if (!job) {
            return next(CreateError(AllStatusCodes.NotFound, `Job of given id: ${id} does not exist!!!`));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'Job List has been fetched successfully',
            payload: {
                job,
            },
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};


export const viewUserWiseAppliedJob = async (req, res, next) => {
    try {
        const jobs = await JobServices.fetchJobsUserWise(req.userId);
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'All Applied Jobs list has been fetched successfully',
            payload: {
                ...jobs[0],
            },
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const postBookMarkJob = async (req, res, next) => {
    try {
        const bookmarkJob = await JobServices.saveBookmarkJobs({
            ...req.body,
            userId: req.userId,
        });
        if (!bookmarkJob) {
            return next(CreateError(AllStatusCodes.BadRequest, 'Bookmark Job not saved, Invalid Client Request!!!'));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.Created,
            message: 'Your Job has been saved successfully',
            payload: {
                ...bookmarkJob?._doc,
            },
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const fetchAllBookmarkJobsUserWise = async (req, res, next) => {
    try {
        const jobs = await JobServices.getBookmarkJobUserWise(req.userId);
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'Bookmarked Job list has been fetched successfully',
            payload: {
                ...jobs[0],
            },
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const deleteBookmarkById = async (req, res, next) => {
    try {
        const bookmark = await JobServices.getSingleBookmarkById(req.userId);
        if (!bookmark) {
            return next(CreateError(AllStatusCodes.NotFound, "Can not delete bookmark as it does not exist!!!"));
        }
        const delRes = await JobServices.removeBookmarkById(req.userId, req.params.id);
        if (!delRes) {
            return next(CreateError(AllStatusCodes.NotFound, `Bookmark deletion failed, Job id: ${req.params.id} not found on this job bookmark`));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'Job bookmark has been deleted successfully',
            payload: {
                ...delRes?._doc,
            }
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};


export const deleteJobByEmployer = async (req, res, next) => {
    try {
        const job = await JobServices.getJobById(req.params.id);
        if (!job) {
            return next(CreateError(AllStatusCodes.NotFound, `Job deletion failed, as job id: ${req.params.id} does not exist!!!`));
        }
        const delRes = await JobServices.removeJobById(req.params.id);
        if (!delRes) {
            return next(CreateError(AllStatusCodes.BadRequest, "Job deletion failed, Invalid Client Request !!!"));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: `Job id: ${req.params?.id} has been deleted successfully`,
            payload: {
                ...job?._doc,
            },
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};


export const updateJobByEmployer = async (req, res, next) => {
    try {
        if (req.method !== "PUT" && req.method !== "PATCH") {
            return next(CreateError(AllStatusCodes.MethodNotAllowed, `Job updation failed, ${req.method} method is not allowed!!!`));
        }
        const job = await JobServices.getJobById(req.params.id);
        if (!job) {
            return next(CreateError(AllStatusCodes.NotFound, `Job updation failed, as job id: ${req.params.id} does not exist!!!`));
        }
        const updatedJob = await JobServices.editJobByEmployer(req.params.id, {
            ...req.body,
        });
        if (!updatedJob) {
            return next(CreateError(AllStatusCodes.BadRequest, "Job updation failed, Invalid Client Request !!!"));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: `Job id: ${req.params.id} has been updated successfully`,
            payload: {
                ...updatedJob?._doc,
            }
        });
    } catch (error) {
        next(CreateError(AllStatusCodes.InternalServerError, error?.message));
    }
};