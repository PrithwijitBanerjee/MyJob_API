import createError from "http-errors";
import AllStatusCodes from "../../../utils/allStatusCodes.js";
import userService from "../../services/users/index.service.js";
import { successResponseHandler } from "../../../utils/response.js";
import bcrypt from "bcryptjs";
import { createJWTToken } from "../../../utils/createJWT.js";
import dev from "../../../config/config.js";

export const signUpNewUser = async (req, res, next) => {
    try {
        const { password, confirmPassword } = req.body;
        const user = await userService.findUserByEmail(req.body.email);
        if (user) {
            return next(createError(AllStatusCodes.Conflict, `User already exists!!!`));
        }
        if (password !== confirmPassword) {
            return next(createError(AllStatusCodes.BadRequest, 'Password and confirm password must be same!!!'));
        }
        const userRes = await userService.signUpUser(req.body);
        if (!userRes) {
            return next(createError(400, 'Invalid Request Format'));
        }
        successResponseHandler(res, {
            status: 201,
            message: 'User Registration Successful',
            payload: {
                ...userRes,
            }
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};


export const signInUser = async (req, res, next) => {
    try {
        const { email, password, fullName, typeOfUser } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return next(createError(AllStatusCodes.NotFound, 'User Not Found!!!'));
        }

        const isPassMatched = await bcrypt.compare(password, user?.password);
        if (!isPassMatched) {
            return next(createError(AllStatusCodes.Unauthorized, 'User Login Failed!!! Invalid email or, password!!!'));
        }

        const accessToken = createJWTToken({
            id: user?._id,
            email,
            fullName,
            typeOfUser: user?._doc?.typeOfUser
        }, dev.app.jwtSecretKey, '1d');
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: `Welcome ${user?._doc?.fullName} greetings to our website`,
            payload: {
                data: {
                    email,
                    fullName: user?._doc?.fullName,
                    userName: user?._doc?.userName,
                    typeOfUser: user?._doc?.typeOfUser,
                },
                accessToken,
            }

        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const resetPassword = async (req, res, next) => {
    try {

        const { oldPassword, newPassword, email } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return next(createError(AllStatusCodes.NotFound, 'User Not Found!!!'));
        }
        const isPassMatched = await bcrypt.compare(oldPassword, user?.password);
        if (!isPassMatched) {
            return next(createError(AllStatusCodes.Unauthorized, 'Invalid Old password!!!'));
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 60000); // 1 minute from now

        const otpData = await userService.storeUserOTP(user?._id, otp, otpExpires);

        if (!otpData) {
            return next(createError(AllStatusCodes.BadRequest, 'Failed to generate OTP: '));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'OTP sent successfully. Valid for 1 minute.',
            payload: {
                otp,
                email,
                newPassword,
            }
        });

    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const verifyOTP = async (req, res, next) => {
    try {

        const { userId, email, otp, newPassword } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return next(createError(AllStatusCodes.NotFound, 'User Not Found!!!'));
        }
        // Check if OTP exists and matches
        if (user?.otp !== +otp) {
            return next(createError(AllStatusCodes.Unauthorized, 'Invalid OTP!!!'));
        }

        // Check if OTP is expired
        if (new Date() > new Date(user?.otpExpiry)) {
            return next(createError(AllStatusCodes.Unauthorized, 'Your OTP has expired!!! Please request a new one!!!'));
        }
        const newPassStored = await userService.updateUserPassByEmail(email, newPassword);
        if (!newPassStored) {
            return next(createError(AllStatusCodes.BadRequest, 'Invalid Password!!!'));
        }
        // Clear the OTP fields after successful verification
        await userService.clearUserOTP(userId);
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'Password reset successful',
        });

    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const uploadUserPersonalProfile = async (req, res, next) => {
    try {
        const personalData = await userService.addUserPersonalProfile({
            ...req.body,
            userId: req.userId,
        });
        if (!personalData) {
            return next(createError(AllStatusCodes.BadRequest, 'Invalid Request !!!'));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.Created,
            message: 'User Personal Profile added sucessfully',
            payload: personalData,
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};


export const uploadUserProfile = async (req, res, next) => {
    try {
        const profileData = await userService.addUserProfile({
            ...req.body,
            userId: req.userId,
        });
        if (!profileData) {
            return next(createError(AllStatusCodes.BadRequest, 'Invalid Request!!!'));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.Created,
            message: 'User Profile has been added successfully',
            payload: {
                ...profileData?._doc,
            },
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};

export const getUserProfile = async (req, res, next) => {
    try {
        const userProfile = await userService.fetchEntireUserProfile(req.userId);
        if (!userProfile) {
            return next(createError(AllStatusCodes.BadRequest, "Invalid Client Request!!!"));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: 'User Profile has been fetched successfully',
            payload: {
                userProfile,
            },
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error?.message));
    }
};