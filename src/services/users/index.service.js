import { addUserPersonalProfile, addUserProfile, clearUserOTP, fetchEntireUserProfile, findUserByEmail, signUpUser, storeUserOTP, updateUserPassByEmail, } from "./user.service.js";


const userService = {
    signUpUser,
    findUserByEmail,
    updateUserPassByEmail,
    storeUserOTP,
    clearUserOTP,
    addUserPersonalProfile,
    addUserProfile,
    fetchEntireUserProfile,
};

export default userService;