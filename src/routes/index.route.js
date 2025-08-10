import express from "express"
import UserRouter from "./user.route.js";
import AdminRouter from "./admin.route.js";
import UploadRouter from "./upload.route.js";
import JobRouter from "./job.route.js";


const RootRouter = express.Router({
    caseSensitive: true,
});

/** ... All User related routes ... **/
RootRouter.use("/user", UserRouter);

/** ... All Admin related routes ... **/
RootRouter.use('/admin', AdminRouter);

/** ... All Job Related Routes ... **/
RootRouter.use('/job', JobRouter);

/** ... All uploas related routes ... **/
RootRouter.use(UploadRouter);

export default RootRouter;