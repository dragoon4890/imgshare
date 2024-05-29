const express = require('express');
const router = express.Router();
const Img = require('../models/image_model');
const shortid = require('shortid');
const multer = require('multer');
const verifyToken = require('./auth'); // Import the JWT middleware

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle file upload
router.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    if (req.file.mimetype.split('/')[0] !== 'image') {
        return res.status(400).json({ error: 'Only image files are allowed.' });
    }
    const uniqueId = shortid.generate();

    try {
        const username = req.username; // Get the user ID from the token

        // Create a new image document
        await Img.create({
            image: req.file.buffer,
            username: username,
            link: uniqueId
        });

        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error during file upload:', error); // Improved error logging
        res.status(500).json({ error: 'Could not upload the file' });
    }
});

// Route to get all images for the authenticated user
router.get('/getAll', verifyToken, async (req, res) => {
    try {
        const username = req.username; // Get the user ID from the token
        const images = await Img.find({ username: username }); // Query the database for images
        res.status(200).json(images); // Send the images as JSON response
    } catch (error) {
        console.error('Error retrieving images:', error); // Improved error logging
        res.status(500).json({ error: 'Could not retrieve the images' });
    }
});


router.get('/:id', async (req, res) => {
    const link = req.params.id;
  
    try {
      const result = await Img.findOneAndUpdate(
       { link},  // Assuming 'id' is the ObjectId
        { $push: { visited: Date.now() } },  // Push the current timestamp to the 'visited' array
        { new: true, useFindAndModify: false }  // Options to return the updated document
      ).select('image');
  
      if (!result) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      res.json(result.image);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });



  router.get('/analytics/:id', verifyToken , async (req, res) => {
    const link = req.params.id;
  
    try {
      const result = await Img.find({link}).select('visited')
  
      if (!result) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;
