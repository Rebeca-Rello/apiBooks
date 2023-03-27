const {Router} =require("express")
const router = Router();
const booksCtrl = require("../controller/books.controller");



router.get('/books', booksCtrl.getBooks);
router.post('/books', booksCtrl.postBooks);
router.put('/books', booksCtrl.putBooks);
router.delete('/books', booksCtrl.deleteBooks);



module.exports = router;