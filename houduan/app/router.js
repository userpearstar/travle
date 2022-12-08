//router.js
module.exports = (app) => {
   const { router, controller } = app;
   router.post("/test.do", controller.testController.test);
   router.get("/test.do", controller.testController.test);
   router.post("/uploadFileWithParams.do", controller.testController.uploadFileWithParams);
   router.post("/login.do", controller.userController.login)
   router.post('/regist.do', controller.userController.regist)
   router.get('/getfood.do', controller.getfoodController.getfood)
   router.get('/getcity.do', controller.getfoodController.getcity)
   router.get('/getcityfood.do', controller.getfoodController.getcityfood)
   router.get('/getsgood.do', controller.getfoodController.getsgood)
   router.get('/getcomment.do', controller.getfoodController.getcomment)
   router.post('/addcomment.do', controller.getfoodController.addcomment)
   router.get('/addgnumber.do', controller.getfoodController.addgnumber)
   router.get('/getcollect.do', controller.getfoodController.getcollect)
   router.get('/addcollect.do', controller.getfoodController.addcollect)
   router.get('/deletecomment.do', controller.getfoodController.deletecomment)
   router.get('/getuser.do', controller.getfoodController.getuser)
   router.get('/foodcollection.do', controller.getfoodController.foodcollection)
   router.get('/getfoodbyid.do', controller.getfoodController.getfoodbyid)
   router.get('/getfoodbyuserid.do', controller.getfoodController.getfoodbyuserid)
   router.get('/getScenicsbyuserid.do', controller.getfoodController.getScenicsbyuserid)
   router.get('/gethousebyuserid.do', controller.getfoodController.gethousebyuserid)


   router.post("/uploadFileWithParams.do", controller.testController.uploadFileWithParams);
   router.get('/getAllScenics.do', controller.houseController.getAllScenics);
   router.get('/getScenicsById.do', controller.houseController.getScenicsById);
   router.post('/login.do', controller.userController.login)
   router.get('/getco.do', controller.houseController.getco)
   router.get('/addcollects.do', controller.houseController.addcollect)


   router.post("/test.do", controller.testController.test);
   router.get("/test.do", controller.testController.test);
   router.get('/getAllScenicss.do', controller.scenicesController.getAllScenics);
   router.get('/getScenicsByIds.do', controller.scenicesController.getScenicsById);
   router.get("/checkedCon.do", controller.collectionController.checkedCon);
   router.get('/conOrCancle.do', controller.collectionController.conOrCancle);
   router.get("/getCommentBySid.do", controller.commentController.getCommentBySid);
   router.post("/addComment.do", controller.commentController.addComment);



};