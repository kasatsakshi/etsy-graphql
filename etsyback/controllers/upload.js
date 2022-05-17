import path from 'path';
import multer from 'multer';
import fs from 'fs';
import formidable from 'formidable';
import AWS from 'aws-sdk';
import { updateOneEntity } from '../models';
import Shop from '../models/shop';

const BUCKET_NAME = 'cmpe273sakshi';
const s3 = new AWS.S3({
  accessKeyId: 'AKIA3UMIWUHMD2YBFSTL',
  secretAccessKey: '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',
});

export default async function upload(req, res) {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB

  let avatarUrl = '';

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: 'Unable to parse Input',
      });
    }

    if (files.myImage) {
      const tempFilePath = files.myImage.filepath;
      const fileContent = fs.readFileSync(tempFilePath);
      const fileName = `image-${Date.now()}${path.extname(files.myImage.originalFilename)}`;

      // Setting up S3 upload parameters
      const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent,
      };

      // Uploading files to the bucket
      const data = await s3.upload(params).promise();
      console.log(`User image uploaded successfully. ${data.Location}`);
      avatarUrl = data.Location;

      if (req.body.type === 'shop') {
        await updateOneEntity(Shop, { _id: req.body.id }, { avatarUrl: req.file.path });
      }

      const {
        shopId,
        type,
      } = fields;

      if (type === 'shop') {
        await updateOneEntity(Shop, { _id: shopId }, { avatarUrl });
      }
    }
    return res.status(200).json(avatarUrl);
  });
}
