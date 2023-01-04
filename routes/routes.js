const router = require('express').Router();
const auth = require('../auth/authorize');

const {
    getLoginPage,
    getRegisterPage,
    registerUser,
    loginUser,
    authorizeUser,
    getDashboardPage,
    getNotes,
    addNote,
    editNote,
    deleteNote
} = require('../controllers/routes');


router.route('/').get(getLoginPage).post(loginUser);
router.route('/register').get(getRegisterPage).post(registerUser);
router.route('/auth').get(auth,authorizeUser);
router.route('/dashboard').get(getDashboardPage);
router.route('/dashboard/notes').get(auth,getNotes).post(auth,addNote).put(auth,editNote).delete(auth,deleteNote);


module.exports = router;