import { NextFunction , Request , Response } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema<any>) => (req : Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
               error: { message: "Validation error", code: "VALIDATION_ERROR" },
        });
    }
    req.body = result.data;
    next();
}





    
