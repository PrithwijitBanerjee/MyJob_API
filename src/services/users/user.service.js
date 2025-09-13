import mongoose from "mongoose";
import PersonalModel from "../../models/personal.model.js";
import ProfileModel from "../../models/profile.model.js";
import UserModel from "../../models/user.model.js";

export const signUpUser = async userCredentials => {
    try {
        const userDoc = new UserModel(userCredentials);
        const res = await userDoc.save();
        return res?._doc;
    } catch (error) {
        throw new Error(error);
    }
};

export const findUserByEmail = async email => {
    try {
        const user = await UserModel.findOne({ email });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateUserPassByEmail = async (email, newPassword) => {
    try {
        const user = await UserModel.findOneAndUpdate({
            email,
        }, {
            password: newPassword,
            confirmPassword: newPassword,
        }, {
            new: true,
            upsert: false,
        });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

export const storeUserOTP = async (userId, otp, otpExpiry) => {
    try {
        const user = await UserModel.findOneAndUpdate({
            _id: userId,
        }, {
            otp,
            otpExpiry,
        }, {
            new: true,
            upsert: false // Ensure we don't create new documents
        });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

export const clearUserOTP = async (userId) => {
    try {
        return await UserModel.findByIdAndUpdate(
            userId,
            {
                otp: null,
                otpExpiry: null
            },
            { new: true }
        );
    } catch (error) {
        throw error;
    }
};

export const addUserPersonalProfile = async userData => {
    try {
        const isPersonalExist = await PersonalModel.findOne({
            userId: userData?.userId,
        });
        let personalData = null;
        if (isPersonalExist) {
            personalData = await PersonalModel.findOneAndUpdate({
                userId: userData?.userId,
            }, {
                ...userData,
            }, {
                new: true,
            });
        } else {
            const personalDoc = new PersonalModel(userData);
            personalData = await personalDoc.save();
        }
        return personalData;
    } catch (error) {
        throw new Error(error);
    }
};

export const addUserProfile = async userData => {
    try {
        const isPersonalExist = await ProfileModel.findOne({
            userId: userData?.userId,
        });
        let profileData = null;
        if (isPersonalExist) {
            profileData = await ProfileModel.findOneAndUpdate({
                userId: userData?.userId,
            }, {
                ...userData,
            }, {
                new: true,
            });
        } else {
            const profileDoc = new ProfileModel(userData);
            profileData = await profileDoc.save();
        }
        return profileData;
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchEntireUserProfile = async userId => {
    try {
        const userPersonalProfile = await PersonalModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                }
            },
            {
                $project: {
                    userId: 0,
                }
            }
        ]);

        const userProfile = await ProfileModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                }
            },
            {
                $project: {
                    userId: 0,
                }
            }
        ]);

        return (Array.isArray(userPersonalProfile) && Array.isArray(userProfile) && userPersonalProfile?.length && userProfile?.length) ? [
            ...userPersonalProfile,
            ...userProfile,
        ] : [];

    } catch (error) {
        throw new Error(error);
    }
};