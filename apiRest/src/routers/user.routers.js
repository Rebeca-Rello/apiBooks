const {Router} =require("express")
const router = Router();
const userCtrl = require("../controller/user.controller");




router.post('/register', userCtrl.postUser);

router.post('/login', userCtrl.loginUser);





module.exports = router;