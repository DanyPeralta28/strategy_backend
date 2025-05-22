import * as Joi from 'joi'

export const JoiValidationSchema = Joi.object({
    PORT : Joi.number().default(3000) ,
    HOST_API : Joi.required() ,
    DEFAULT_LIMIT : Joi.number().default(10) ,
    DEFAULT_OFFSET : Joi.number().default(0),

    ENV: Joi.required() || 'DEV',
    FILE_LOG: Joi.required() || 'true'
    
})