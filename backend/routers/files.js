const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");

// Setting configuration parameters globally
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload Image --> Only admin can use
router.post("/upload", auth, authAdmin, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  const file = req.files.file;

  if (file.size > 1024 * 1024) {
    removeTmp(file.tempFilePath);
    res.status(400).send("File size is too large.");
    return;
  }

  if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
    removeTmp(file.tempFilePath);
    res.status(400).send("Unsupported file format.");
    return;
  }

  cloudinary.v2.uploader.upload(
    file.tempFilePath,
    { folder: "Marvelous Fashion" },
    (error, result) => {
      if (error) {
        throw error;
      }

      removeTmp(file.tempFilePath);

      res.json({ public_id: result.public_id, url: result.secure_url });
    }
  );
});

// Delete Image --> Only admin can use
router.post("/destroy", auth, authAdmin, (req, res) => {
  if (!req.body.public_id) {
    res.status(400).send("No image Selected.");
    return;
  }

  cloudinary.v2.uploader.destroy(req.body.public_id, (error, result) => {
    if (error) {
      throw error;
    }

    res.send("The image was deleted.");
  });
});

const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) {
      throw error;
    }
  });
};

module.exports = router;
