import cloudinary from "../config/cloudinary.js";
import dataModel from "../models/dataModel.js";
import streamifier from "streamifier";

export const uploadModel = async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded. Please include a GLB file named "modelFile".' });
      }
      const {dataName} = req.body;
      if (!dataName) {
        return res.status(400).json({ success: false, message: 'Model name is required.' });
      }
  
      const uploadStream = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'models',
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary Upload Error:', error);
                reject(new Error('Failed to upload file to Cloudinary.'));
              } else {
                resolve(result);
              }
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };
  
      const result = await uploadStream(req.file.buffer);
  
      const newModel = await dataModel.create({
        dataName: dataName,
        dataUrl: result.secure_url,
        dataPublicId: result.public_id,
        fileSize: req.file.size,
      });
  
      res.status(201).json({
        success: true,
        message: 'Model uploaded successfully!',
        data: newModel,
      });
  
    } catch (error) {
       if (error.message.includes('Invalid file type')) {
          return res.status(400).json({ success: false, message: error.message });
        }
       if (error.message.includes('Failed to upload file')) {
          return res.status(500).json({ success: false, message: error.message });
       }
       console.error('Upload Error:', error);
       res.status(500).json({ success: false, message: 'Server error during upload.' });
    }
};

export const getAllModels = async (req, res, next) => {
    try {
      const models = await dataModel.find().sort({ uploadedAt: -1 });
      res.status(200).json({
        success: true,
        count: models.length,
        data: models,
      });
    } catch (error) {
      console.error('Get All Models Error:', error);
       res.status(500).json({ success: false, message: 'Server error fetching models.' });
    }
};

export const getModelById = async (req, res, next) => {
    try {
      const model = await dataModel.findById(req.params.id);
  
      if (!model) {
        return res.status(404).json({ success: false, message: `Model not found with id ${req.params.id}` });
      }
  
      res.status(200).json({
        success: true,
        data: model,
      });
    } catch (error) {
       console.error('Get Model By ID Error:', error);
      if (error.name === 'CastError') {
         return res.status(400).json({ success: false, message: `Invalid model ID format: ${req.params.id}` });
      }
       res.status(500).json({ success: false, message: 'Server error fetching model.' });
    }
};

export const deleteModel = async (req, res, next) => {
    try {
      const model = await dataModel.findById(req.params.id);
 
      if (!model) {
        return res.status(404).json({ success: false, message: `Model not found with id ${req.params.id}` });
      }
 
      await cloudinary.uploader.destroy(model.dataPublicId);
      await model.deleteOne();
 
      res.status(200).json({
        success: true,
        message: 'Model deleted successfully.',
        data: {}
      });
 
    } catch (error) {
      console.error('Delete Model Error:', error);
      if (error.name === 'CastError') {
         return res.status(400).json({ success: false, message: `Invalid model ID format: ${req.params.id}` });
      }
      res.status(500).json({ success: false, message: 'Server error deleting model.' });
    }
};

