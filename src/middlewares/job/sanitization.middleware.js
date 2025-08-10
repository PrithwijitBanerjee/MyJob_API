import { validationResult } from "express-validator"
import CreateError from "http-errors";
import AllStatusCodes from "../../../utils/allStatusCodes.js";

/** Define the custom middleware to apply the sanitization the req objects based on validation rules **/
export const sanitizeReq = (req, res, next) => {
    const errors = validationResult(req);
    const errorMsgArr = errors?.array()?.map(error => error?.msg);
    let errorMsgStr = '';
    errorMsgArr?.forEach((errorItem, i) => {
        if(i === errorMsgArr?.length - 1) {
            errorMsgStr += `${i+ 1}. ${errorItem}.`;
        } else {
            errorMsgStr += `${i+ 1}. ${errorItem}, `;
        }
    })
    
    if (!errors.isEmpty()) {
        return next(CreateError(AllStatusCodes.UnprocessableEntity, errorMsgStr));
    }

    next();
};