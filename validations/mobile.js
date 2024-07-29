// code base
import Joi from "joi";

const createValidate = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().min(0),
    image: Joi.string().required(),
 
}).options({
    abortEarly: false
});
const updateValidate = Joi.object({
    title: Joi.string().empty().required(),
    price: Joi.number().empty().required().min(0),
    image: Joi.string().empty().required(),
}).options({
    abortEarly: false
});

export { createValidate, updateValidate }