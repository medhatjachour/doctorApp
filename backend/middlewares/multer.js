import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        callback(null, uploadPath);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
export default upload;
