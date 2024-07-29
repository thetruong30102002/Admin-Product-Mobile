// code base

import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { registerValidate, loginValidate } from "../validations/auth";
import User from "../models/userModel";

class AuthController {
    async register(req, res) {
        try {
            const { fullname, email, password } = req.body;
            const { error } = registerValidate.validate(req.body);
            if (error) {
                const errors = error.details.map((err) => err.message);
                return res.status(400).json({
                    message: errors,
                })
            }

            const emailExits = await User.findOne({ email });
            if (emailExits) {
                return res.status(401).json({
                    message: "Email được dùng rồi",
                })
            }
            const hashPassword = await bcryptjs.hash(password, 10);
            const user = await User.create({
                fullname,
                email,
                password: hashPassword
            })
            res.status(200).json({
                message: "Đăng ký thành công",
                data: { ...user.toObject(), password: undefined }
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { error } = loginValidate.validate({ password, email });
            if (error) {
                const errors = error.details.map((err) => err.message);
                return res.status(400).json({
                    message: errors,
                })
            }

            const checkAuth = await User.findOne({ email });
            if (!checkAuth) {
                return res.status(401).json({
                    message: "Email không đúng",
                })
            }
            const checkPassword = await bcryptjs.compare(password, checkAuth.password);
            if (!checkPassword) {
                return res.status(401).json({
                    message: "Mật khẩu không đúng",
                })
            }
            res.status(200).json({
                message: "Đăng nhập thành công",
                data: {
                    _id: checkAuth._id,
                    fullname: checkAuth.fullname,
                    email: checkAuth.email,
                    role: checkAuth.role
                }
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

export default AuthController;