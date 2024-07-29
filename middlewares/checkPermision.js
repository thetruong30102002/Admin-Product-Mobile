// code base
import jwt from "jsonwebtoken";
import User from "../models/userModel";



const check = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }
        const data = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(data._id);
        if (!user) {
            return res.status(404).json({
                message: "Not Found"
            })
        }
        if (user.role !== 'admin') {
            return res.status(403).json({
                message: "Bạn không đủ quyền truy cập"
            })
        }
        next();

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};
export { check };