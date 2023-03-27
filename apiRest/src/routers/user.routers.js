const {Router} =require("express")
const router = Router();
const userCtrl = require("../controller/user.controller");




router.post('/register', userCtrl.postUser);

router.post('/login', userCtrl.loginUser);

router.put('/usuarios', userCtrl.putUser);





module.exports = router;