import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    //to avoid RAM overflow
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    },
    //for security validation
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png"
        ) {
            cb(null, true);
        } else {
            const err = new Error("Only JPG and PNG allowed");
            err.status = 400;
            cb(err, false);
        }
    },
});

export default upload;