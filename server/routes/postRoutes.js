// server/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware'); // Import protect
const upload = require('../middleware/uploadMiddleware'); // Import multer upload

router.route('/')
  .get(getAllPosts)
  .post(protect, upload.single('image'), createPost); // Apply protect and upload middleware

router.route('/:id')
  .get(getPostById)
  .put(protect, upload.single('image'), updatePost) // Apply protect and upload middleware
  .delete(protect, deletePost); // Apply protect middleware

// Comments route for a specific post
router.post('/:id/comments', protect, addComment);

module.exports = router;