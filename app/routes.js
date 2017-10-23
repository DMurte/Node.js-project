require('express-group-routes');
const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/auth');
const customerAuthController= require('./controllers/customer/auth');
const customerInvitationController= require('./controllers/customer/invitation');
const customerProjectsController= require('./controllers/customer/projects');
const teamAuthController= require('./controllers/team/auth');
const mainProjectController= require('./controllers/project/main');
const developerAuthController= require('./controllers/developer/auth');
const projectInformationController= require('./controllers/project/info');
const mainTaskController= require('./controllers/task/main');

router.group('/customer', (router) => {
    router.get("/", authMiddleware.authCustomer, customerAuthController.getCustomer);
    router.post("/create", customerAuthController.createCustomer);
    router.put("/update", authMiddleware.authCustomer, customerAuthController.updateCustomer);
    router.put("/update/password", authMiddleware.authCustomer, customerAuthController.updateCustomerPassword);
    router.post("/login", customerAuthController.loginCustomer);
    router.get("/projects", authMiddleware.authCustomer, customerProjectsController.getProjects);
    

    router.group('/project',  (router) => {
        router.post("/create",authMiddleware.authCustomer, mainProjectController.createProject);
        router.put("/update",authMiddleware.authCustomer, mainProjectController.updateProject);
        router.get("/:id", authMiddleware.authCustomer, projectInformationController.getProject);
        router.post("/invite", authMiddleware.authCustomer, customerInvitationController.inviteCustomer);
    });
   
});

router.group('/team', (router) => {
    router.get("/", authMiddleware.authCollaborator, teamAuthController.getCollaborator);
    router.post("/create", teamAuthController.createCollaborator);
    router.put("/update", authMiddleware.authCollaborator, teamAuthController.updateCollaborator);
    router.post("/login", teamAuthController.loginCollaborator);

    router.group('/project',  (router) => {
        router.put("/update",authMiddleware.authCollaborator, mainProjectController.updateProject);
        router.get("/:id", authMiddleware.authCollaborator, projectInformationController.getProject);
        //router.get("/tasks", authMiddleware.authCollaborator, taskInformationController.getTasks);

        router.group('/task', (router) => {
               router.post("/create",authMiddleware.authTTask,mainTaskController.createTask);
               router.put("/update",authMiddleware.authTTask, mainTaskController.updateTask);
               router.get("/delete/:id", authMiddleware.authCollaborator, mainTaskController.deleteTask);
               });
    });
});

router.group('/developer', (router) => {
    router.get("/", authMiddleware.authDeveloper, developerAuthController.getDeveloper);
    router.post("/create", developerAuthController.createDeveloper);
    router.put("/update", authMiddleware.authDeveloper, developerAuthController.updateDeveloper);
    router.post("/login", developerAuthController.loginDeveloper);
   
});


module.exports = router;