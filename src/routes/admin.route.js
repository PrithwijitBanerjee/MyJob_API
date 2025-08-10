import express from 'express';
import AdminController from '../controllers/admin/index.controller.js';

const AdminRouter = express.Router({
    caseSensitive: true,
});

/** Admin Registration ... /POST **/
AdminRouter.post('/registration', AdminController.adminRegistration);

/** Admin login .../POST **/
AdminRouter.post('/login', AdminController.adminLogin);

export default AdminRouter;