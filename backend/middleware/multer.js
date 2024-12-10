
import multer from 'multer';
import path from 'path';

// Konfigurimi i ruajtjes së skedarëve
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use absolute path to avoid any path issues
    const uploadPath = path.resolve('uploads/');
    cb(null, uploadPath); // Dosja ku ruhen skedarët
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filtri për të pranuar vetëm imazhe
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File must be an image'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
