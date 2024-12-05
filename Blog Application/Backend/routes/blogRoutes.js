const express = require('express');
const router = express.Router();
const { saveBlog, getBlog, deleteBlog, updateBlog } = require('../controller/blogController');
const { protect } = require('../middleware/authMiddleware');


router.route('/').get(protect, getBlog)
router.route('/save').post(protect, saveBlog);
router.route('/:id').delete(protect, deleteBlog).put(protect, updateBlog);
module.exports = router;
