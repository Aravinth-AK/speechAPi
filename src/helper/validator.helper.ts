import * as joi from 'joi';
import { AccountsReqSchema } from '../schema-validators';
export const JoiValidatorAccRequest = (req, res, next) => {
 const { error } = AccountsReqSchema.validate(req.body);
if(error) return res.status(400).json({ error: error.details[0].message });
next();
}
export class ValidatorHelper {
    public jsonValidator(joiSchema: object, jsonValue: any) {
        return new Promise((resolve, reject) => {
            joi.validate(jsonValue, joiSchema, { stripUnknown: true })
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(new Error(error).toString());
                })
        })
    };
};

