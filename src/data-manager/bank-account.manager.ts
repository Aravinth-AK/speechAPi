import { ResMsg } from '../enums/resMsg.enum';
import { CommonHelper } from '../helper';
/**
 * @class
 * @name BankAccountsManager
 */

export class BankAccountsManager {

    public readonly dbName = 'APIContest';
    public readonly collectionName = 'bankaccounts';


        /**
     * @public
     * @async
     * @function
     * @name getSelectedAccount
     * @param {string} collectionName collection name for the function
     * @description This Method is Used fetch the user savings account details. 
     * on successfull completion the response will contains user account detail.
     * @returns {promise<object>} Returns Status and data requested by the user
     * Status will be invalid or valid
     * Message will be Error Object if invalid and correct result will be sent incase of proper request
     * @author Team AppComposer
     */



    public getSelectedAccount = async (collectionId) => {
        let collectionName=collectionId;
        return await new Promise((resolve, reject) => {
            try {
                CommonHelper.getCollection(this.dbName, collectionName).find({}).toArray((err, accountDetails) => {
                    if (err) {
                        reject({
                            result: ResMsg.ERROR,
                            message: err
                        });
                    }
                    if (accountDetails.length > 0) {
                        resolve({ result: ResMsg.SUCCESS, content: (accountDetails) });
                    } else {
                        resolve({ result: ResMsg.ACC_UNAVAILABLE, message: ResMsg.ACC_UNAVAILABLE });
                    }
                });
            }
            catch (err) {
                reject({
                    result: ResMsg.ERROR,
                    message: ResMsg.COMMON_ERR_MSG,
                    description: err
                });
            }
        });
    }


           /**
     * @public
     * @async
     * @function
     * @name getTransactionData
     * @param {string} collectionName collection name for the function
     * @description This Method is Used fetch the tranasaction details if the string represent the data for account transactions. 
     * response will consist of users transaction details.
     * @returns {promise<object>} Returns Status and data requested by the user
     * Status will be invalid or valid
     * Message will be Error Object if invalid and correct result will be sent incase of proper request
     * @author Team AppComposer
     */
    
    public getTransactionData = async () => {
        let collectionName='transactiondata';
        return await new Promise((resolve, reject) => {
            try {
                CommonHelper.getCollection(this.dbName, collectionName).find().toArray((err, accounts) => {
                    let resObj = [];
                    if (accounts.length > 0) {
                        resObj = accounts
                    }
                    let respBody = {
                        result: ResMsg.SUCCESS,
                        bank_accounts: resObj
                    }
                    resolve(respBody);
                });
            } catch (err) {
                reject({
                    result: ResMsg.ERROR,
                    message: err
                });
            }
        });
    }


               /**
     * @public
     * @async
     * @function
     * @name getCreditcardData
     * @param {string} collectionName collection name for the function
     * @description This Method is Used fetch the credit card details if the string represent the data for credit card.
     * response for the method will contains all credit card information.
     * @returns {promise<object>} Returns Status and data requested by the user
     * Status will be invalid or valid
     * Message will be Error Object if invalid and correct result will be sent incase of proper request
     * @author Team AppComposer
     */
    public getCreditcardData = async () => {
        let collectionName='creditcard';
        return await new Promise((resolve, reject) => {
            try {
                CommonHelper.getCollection(this.dbName, collectionName).find().toArray((err, accounts) => {

                    let resObj = [];
                    if (accounts.length > 0) {
                        resObj = accounts
                    }
                    let respBody = {
                        result: ResMsg.SUCCESS,
                        bank_accounts: resObj
                    }
                    resolve(respBody);
                });
            } catch (err) {
                reject({
                    result: ResMsg.ERROR,
                    message: err
                });
            }
        });
    }


    
               /**
     * @public
     * @async
     * @function
     * @name getLoanData
     * @param {string} collectionName collection name for the function
     * @description This Method is Used fetch the user loan details if the string represent the enquiry about the  user loans.
     * the response will contain the user loan details
     * @returns {promise<object>} Returns Status and data requested by the user
     * Status will be invalid or valid
     * Message will be Error Object if invalid and correct result will be sent incase of proper request
     * @author Team AppComposer
     */
    
    public getLoanData = async () => {
        let collectionName='loandata';
        return await new Promise((resolve, reject) => {
            try {
                CommonHelper.getCollection(this.dbName, collectionName).find().toArray((err, accounts) => {

                    let resObj = [];
                    if (accounts.length > 0) {
                        resObj = accounts
                    }
                    let respBody = {
                        result: ResMsg.SUCCESS,
                        bank_accounts: resObj
                    }
                    resolve(respBody);
                });
            } catch (err) {
                reject({
                    result: ResMsg.ERROR,
                    message: err
                });
            }
        });
    }

}