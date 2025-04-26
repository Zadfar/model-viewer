import multer, { memoryStorage as _memoryStorage } from 'multer';

const storage = _memoryStorage();


const fileFilter = (req, file, cb) => {
  const isGLB = file.mimetype === 'model/gltf-binary' || file.originalname.endsWith('.glb');
  const isGLTF = file.mimetype === 'model/gltf+json' || file.originalname.endsWith('.gltf');
  if (isGLB || isGLTF) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only GLB/GLTF files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50 // Limit file size (50MB)
  },
  fileFilter: fileFilter
});

const uploadSingle = upload.single('modelFile');

export default uploadSingle;