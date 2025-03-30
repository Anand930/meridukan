// utils/cloudinary.js
import multer from "multer";
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "drhktzayo",
  api_key: "928563592583723",
  api_secret: "6M4Hb2uJ0Z9M7xS2Xo_fhOM5zqY",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder name in Cloudinary
    allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed file formats
  },
});

const upload = multer({ storage });

export  {upload};
