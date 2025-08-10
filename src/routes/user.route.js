import express from "express";
import userController from "../controllers/users/index.controller.js";
import { isLoggedIn } from "../middlewares/user/auth.middleware.js";

const UserRouter = express.Router({
    caseSensitive: true,
});


/** Sign up new user ... /POST **/
UserRouter.post('/register', userController.signUpNewUser)


    /** Sign in user .... /POST  **/
    .post('/login', userController.signInUser)

    .use(isLoggedIn)

    /** fetch entire user profile .../GET **/
    .get('/fetch-user-profile', userController.getUserProfile)

    /** Reset password .../POST **/
    .post('/reset-password', userController.resetPassword)

    /** verify OTP .../POST  **/
    .post('/verify-otp', userController.verifyOTP)

    /** Add User personal profile .../POST **/
    .post('/add-personal-profile', userController.uploadUserPersonalProfile)

    /** Add user profile **/
    .post('/add-user-profile', userController.uploadUserProfile);




export default UserRouter;