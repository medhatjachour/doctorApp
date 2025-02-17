import jwt from "jsonwebtoken";

// admin authentication middleware

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res
        .status(401)
        .json({ success: false, message: "not authorized" });
    }
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: ` ${error.message}` });
  }
};
export default authDoctor;
