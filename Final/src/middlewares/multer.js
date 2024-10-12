import multer from "multer";
import { __dirname } from "../utils/utils.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + `../../public/images/${file.fieldname}`);
  },
  filename: function (req, file, cb) {
    const user = req.session?.message;
    cb(null, user?.email + "-" + file.originalname);
  },
});

export const uploader = multer({ storage: storage });
