const mongoose = require("mongoose");

// Define the image schema
const imageSchema = new mongoose.Schema(
    {
        image: {
            type: Buffer,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        visited: {
            type: [Date],
            default: []
        },
        link: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Create the model
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
