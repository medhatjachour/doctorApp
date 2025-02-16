import jwt from "jsonwebtoken";

// admin authentication middleware

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "not authorized" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: ` ${error.message}` });
  }
};
export default authUser;
