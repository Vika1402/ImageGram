import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  //destination: "./public/uploads",
  filename: function (req, file, cb) {
    if (!file) {
      console.log(file);
      return cb(new Error("file not found"));
    }
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

export default upload;
