import AdminModel from "../../models/admin.model.js";


export const adminSignUp = async adminCredentials => {
    try {
        const adminDoc = new AdminModel({
            ...adminCredentials,
        });
        const res = await adminDoc.save();
        return res?._doc;
    } catch (error) {
        throw new Error(error);
    }
};

export const findAdminByEmail = async adminEmail => {
    try {
        const admin = await AdminModel.findOne({
            email: adminEmail,
        });
        return admin?._doc;
    } catch (error) {
        throw new Error(error);
    }
};