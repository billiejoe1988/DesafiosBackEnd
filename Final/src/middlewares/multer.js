import multer from "multer";
import { __dirname } from "../utils/utils.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + `../../public/images/${file.fieldname}`);
  },
  filename: function (req, file, cb) {
    const user = req.session?.message;
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, user?.email + "-" + file.originalname);
  },
});

export const uploader = multer({ storage: storage });
