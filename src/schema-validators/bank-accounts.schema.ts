const joi = require('@hapi/joi');

export const AccountsReqSchema = joi.object({
    voicePattern: joi.string().required()
});
export class BankAccountsSchema {
    public validateProjectReqBody(){
    return joi.object({
        voicePattern: joi.string().required()
    })
}
}