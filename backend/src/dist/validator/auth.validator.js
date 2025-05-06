import Joi from "joi";
export const loginValidator = async (req, res, next) => {
    try {
        const schema = Joi.object({
            password: Joi.required(),
            email: Joi.string().email().required(),
            rememberMe: Joi.boolean(),
        });
        const validateError = schema.validate(req.body).error;
        if (validateError) {
            res.status(400).json({
                status: "error",
                message: validateError.message,
            });
            return;
        }
        next();
    }
    catch (error) {
        console.error(error);
    }
};
// Validator for register request
export const registerValidator = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            role: Joi.string().valid("admin", "cashier").required()
        });
        const validateError = schema.validate(req.body).error;
        if (validateError) {
            res.status(400).json({
                status: "error",
                message: validateError.message,
            });
            return;
        }
        next();
    }
    catch (error) {
        console.error(error);
    }
};
