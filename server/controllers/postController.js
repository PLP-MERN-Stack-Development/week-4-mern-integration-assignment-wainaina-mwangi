// server/controllers/postController.js
const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
  // Populate author field to get username for frontend
  const posts = await Post.find({})
    .populate('author', 'username') // Only include username from User model
    .sort({ createdAt: -1 }); // Latest posts first
  res.json(posts);
});

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'username') // Populate author
    .populate('comments.author', 'username'); // Populate comment authors

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Path to uploaded image

  if (!title || !content) {
    res.status(400);
    throw new Error('Please add a title and content for the post');
  }

  const post = await Post.create({
    title,
    content,
    author: req.user._id, // User ID from authenticated middleware
    imageUrl,
  });

  res.status(201).json(post);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (Author only)
const updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl; // Keep existing if no new file, or update

  const post = await Post.findById(req.params.id);

  if (post) {
    // Check if the logged-in user is the author or an admin
    if (post.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized to update this post');
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.imageUrl = imageUrl !== undefined ? imageUrl : post.imageUrl; // Handles removing image or updating

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (Author only)
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    // Check if the logged-in user is the author or an admin
    if (post.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized to delete this post');
    }

    await Post.deleteOne({ _id: post._id }); // Use deleteOne with query
    res.json({ message: 'Post removed' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (post) {
        const comment = {
            text,
            author: req.user._id, // User ID from authenticated middleware
        };

        post.comments.push(comment);
        await post.save();

        // Populate the author of the newly added comment for the response
        // This requires finding the new comment within the post's comments array
        const newComment = post.comments[post.comments.length - 1];
        await newComment.populate('author', 'username');

        res.status(201).json(newComment);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});


module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
};