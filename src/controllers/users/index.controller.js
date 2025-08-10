import { getUserProfile, resetPassword, signInUser, signUpNewUser, uploadUserPersonalProfile, uploadUserProfile, verifyOTP } from "./user.controller.js";


const userController = {
     signUpNewUser,
     signInUser,
     resetPassword,
     verifyOTP,
     uploadUserPersonalProfile,
     uploadUserProfile,
     getUserProfile,
};

export default userController;