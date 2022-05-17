import path from 'path';
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const folder = './public/shop/';
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    callback(null, folder);
  },
  filename(req, file, cb) {
    cb(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadImage = multer({
  storage,
  limits: { fileSize: 2000000 }, // 2 MB
}).single('myImage');

export default async function upload(req, res) {
  uploadImage(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json('Error in uploading file');
    }

    console.log('Image Uploaded Successfully!');
    return res.status(200).json(req.file.path);
  });
}
