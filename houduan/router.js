//router.js
module.exports = (app) => {
   const { router, controller } = app;
   router.post("/test.do", controller.testController.test);
   router.get("/test.do",  controller.testController.test);
   router.post("/uploadFileWithParams.do",  controller.testController.uploadFileWithParams);
   router.get('/getAllScenics.do', controller.houseController.getAllScenics);
   router.get('/getScenicsById.do', controller.houseController.getScenicsById);
   router.post('/login.do',controller.userController.login)
   router.get('/getco.do',controller.houseController.getco)
   router.get('/addcollect.do',controller.houseController.addcollect)
   
};