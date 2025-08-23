import mongoose from "mongoose";
import AppliedJobModel from "../../models/appliedJob.model.js";
import JobModel from "../../models/job.model.js";
import JobBookMarkModel from "../../models/jobBookmark.model.js";

export const applyNewJob = async appliedJobData => {
    try {
        // Find existing applied jobs for the user
        let appliedJob = await AppliedJobModel.findOne({ userId: appliedJobData?.userId });
        let job;
        if (appliedJob) {
            // If document exists, push the new jobId to the array
            if (!appliedJob?.jobIds?.includes(appliedJobData?.jobId)) {
                appliedJob?.jobIds?.push(appliedJobData?.jobId);
                job = await AppliedJobModel.findOneAndUpdate({
                    userId: appliedJobData?.userId,
                }, {
                    ...appliedJob,
                }, {
                    new: true,
                });
            }
        } else {
            // If no document exists, create a new one
            const jobDoc = new AppliedJobModel({
                userId: appliedJobData?.userId,
                jobIds: [appliedJobData?.jobId],
            });
            job = await jobDoc.save();
        }
        return job;
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchJobsUserWise = async userId => {
    try {
        const jobs = AppliedJobModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: "_id",
                    as: "user_info",
                }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobIds',
                    foreignField: '_id',
                    as: 'applied_jobs',
                }
            },
            { $unwind: "$user_info" },  // Unwind the user_info array (since lookup always returns an array)
            {
                $project: {
                    employerId: 0,
                    userId: 0,
                    jobIds: 0,
                    "user_info.password": 0,
                    "user_info.__v": 0,
                    "applied_jobs.__v": 0,
                    __v: 0,
                }
            }
        ]);
        return jobs;
    } catch (error) {
        throw new Error(error);
    }
};

export const jobPost = async sendJobData => {
    try {
        const jobDoc = new JobModel({
            ...sendJobData,
        });
        const savedJobData = await jobDoc.save();
        return savedJobData;
    } catch (error) {
        throw new Error(error);
    }
};


export const getAllJobList = async (page, limit, searchedQuery) => {
    try {
        const jobs = await JobModel.find(searchedQuery).skip((page - 1) * limit).limit(limit).select("-employerId").sort({ createdAt: -1 }).exec();
        const count = await JobModel.countDocuments(searchedQuery);
        return { jobs, count };
    } catch (error) {
        throw new Error(error);
    }
};

export const getJobById = async jobId => {
    try {
        const job = await JobModel.findById(jobId).select("-employerId").exec();
        return job;
    } catch (error) {
        throw new Error(error);
    }
};

export const saveBookmarkJobs = async bookmarkJobData => {
    try {
        const { userId, jobId } = bookmarkJobData;
        const isExist = await JobBookMarkModel.findOne({
            userId,
        });
        let bookmarkJob;
        if (isExist) {
            if (!isExist.jobIds.includes(jobId)) {
                isExist.jobIds.push(jobId);
                bookmarkJob = await JobBookMarkModel.findOneAndUpdate({
                    userId,
                }, {
                    ...isExist,
                }, {
                    new: true,
                });
            }
        } else {
            const bookmarkJobDoc = await JobBookMarkModel({
                userId,
                jobIds: [jobId],
            });
            bookmarkJob = await bookmarkJobDoc.save();
        }
        return bookmarkJob;
    } catch (error) {
        throw new Error(error);
    }
};

export const getBookmarkJobUserWise = async userId => {
    try {
        const jobs = await JobBookMarkModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user_info',
                }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobIds',
                    foreignField: '_id',
                    as: 'applied_jobs',
                }
            },
            { $unwind: "$user_info" },  // Unwind the user_info array (since lookup always returns an array)
            {
                $project: {
                    employerId: 0,
                    userId: 0,
                    jobIds: 0,
                    "user_info.password": 0,
                    "user_info.__v": 0,
                    "applied_jobs.__v": 0,
                    __v: 0,
                }
            }
        ]);

        return jobs;
    } catch (error) {
        throw new Error(error);
    }
};


export const getSingleBookmarkById = async userId => {
    try {
        const bookmark = await JobBookMarkModel.findOne({
            userId,
        });
        return bookmark;
    } catch (error) {
        throw new Error(error);
    }
};

export const removeBookmarkById = async (userId, bookmarkId) => {
    try {
        const bookmark = await JobBookMarkModel.findOne({
            userId,
        });
        if (!bookmark?.jobIds?.includes(bookmarkId)) {
            return false;
        }
        const deletedBookmarkIdIndex = bookmark?.jobIds?.findIndex(item => item === bookmarkId);
        bookmark?.jobIds?.splice(deletedBookmarkIdIndex, 1);
        const updatedBookmark = await JobBookMarkModel.findOneAndUpdate({
            userId,
        }, {
            ...bookmark,
        }, {
            new: true,
        });
        if (bookmark?.jobIds?.length === 0) {
            await JobBookMarkModel.findByIdAndDelete(bookmark?._id);
        }
        return updatedBookmark;
    } catch (error) {
        throw new Error(error);
    }
};

export const removeJobById = async jobId => {
    try {
        const deletedJob = await JobModel.findByIdAndDelete(jobId);
        return deletedJob;
    } catch (error) {
        throw new Error(error);
    }
};

export const editJobByEmployer = async (jobId, jobData) => {
    try {
        const updatedJob = await JobModel.findByIdAndUpdate(jobId, {
            ...jobData,
        }, {
            new: true,
        });
        return updatedJob;
    } catch (error) {
        throw new Error(error);
    }
};