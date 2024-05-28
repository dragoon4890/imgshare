const express = require("express");
const router = express.Router();
const Img = require("../models/image_model");
const shortid = require('shortid');
const multer = require('multer');

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });





// Route to handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    if (req.file.mimetype.split('/')[0] !== 'image') { // Check if the file is an image
        return res.status(400).send('Only image files are allowed.');
    }
    const uniqueId = shortid.generate();

    try {
        // Assuming `req.user.username` contains the username from the authenticated session
        const username = req.user.username;

        // Create a new image document
        await Img.create({
            image: req.file.buffer,
            username: username,
            link: uniqueId
        });

        res.send("File uploaded successfully");
    } catch (error) {
        res.status(500).send("Could not upload the file");
    }
});

router.get("/getAll", async (req, res) => {
    try {
        const username = req.user.username; // Get the username from the authenticated session
        const images = await Img.find({ username: username }); // Query the database for images
        res.status(200).json(images); // Send the images as JSON response
    } catch (error) {
        res.status(500).send("Could not retrieve the images");
    }
});

module.exports = router;
