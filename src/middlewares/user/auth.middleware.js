import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import AllStatusCodes from '../../../utils/allStatusCodes.js';
import dev from '../../../config/config.js';

export const isLoggedIn = async (req, res, next) => {
   const accessToken = req.headers['authorization'];
   if (!accessToken) {
      throw createError(AllStatusCodes.Unauthorized, 'Access token is required!!! Please Login!!!');
   }
   const decoded = await jwt.verify(accessToken, dev.app.jwtSecretKey);
   if (!decoded) {
      throw createError(AllStatusCodes.Unauthorized, 'Invalid Access Token!!! Please login again!!!');
   }
   
   req.email = decoded?.email;
   req.userId = decoded.id;
   req.userType = decoded?.typeOfUser;
   next(); // point to next level middleware ....
};



export const isEmployer = (req, res, next) => {
   if (req.userType !== "Employer") {
      throw createError(AllStatusCodes.Forbidden, "Only Employeer can access this route!!!");
   }
   next(); // calling the next middleware if success ...
};