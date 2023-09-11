const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const { check } = require('express-validator');
const { verifyToken, auth } = require('../middleware/auth');

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/random', userControllers.getRandomUsers);
router.post('/changePassword', verifyToken, userControllers.changePassword);
router.post('/forgotPassword', userControllers.forgotPassword);
router.get('/search', verifyToken, userControllers.searchUser);

router.get('/:username', userControllers.getUser);
router.patch('/:id', verifyToken, userControllers.updateUser);
router.patch('/getAllUser', userControllers.getAllUser);

router.post('/follow/:id', verifyToken, userControllers.follow);
router.delete('/unfollow/:id', verifyToken, userControllers.unfollow);

router.get('/followers/:id', userControllers.getFollowers);
router.get('/following/:id', userControllers.getFollowing);

router.patch('/:id/follow', verifyToken, userControllers.follow);
router.patch('/:id/unfollow', verifyToken, userControllers.unfollow);

module.exports = router;
