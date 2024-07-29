// code base
import Joi from "joi";

const registerValidate = Joi.object({
    fullname: Joi.string(),
    email: Joi.string().email().required().messages({
        "string.email": "Không đúng định dạng email",
        "any.required": "Bắt buộc phải nhập email"
    }),
    password: Joi.string().min(6).max(20).required().messages({
        "any.required": "Bắt buộc phải nhập email",
        "string.min": "Password phải lon hơn 6",
        "string.max": "Password phải nho hơn 20"
    }),
}).options({
    abortEarly: false
});
const loginValidate = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Không đúng định dạng email",
        "any.required": "Bắt buộc phải nhập email"
    }),
    password: Joi.string().min(6).max(20).required().messages({
        "any.required": "Bắt buộc phải nhập email",
        "string.min": "Password phải lon hơn 6",
        "string.max": "Password phải nho hơn 20"
    }),
}).options({
    abortEarly: false
});

export { registerValidate, loginValidate }