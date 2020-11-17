import { Router, Request, Response, NextFunction } from 'express';
import { BankAccountsManager } from '../data-manager';
import { Api, ValidatorHelper, JoiValidatorAccRequest } from '../helper';
import { ResMsg } from '../enums';
import {dictionaryMap} from '../constants';
import * as multimatch from 'multimatch'
import { OptionSelectManager } from '../data-manager/optionSelect.manager';

/**
 * @class
 * @name VoicePatternController
 */

export class VoicePatternController {

    public static route = '/api/bank-account';
    public router: Router = Router();
    constructor() {
        this.router.post('/user-query', JoiValidatorAccRequest, this.parseSpeechData);
        this.router.get('/', this.test);
    }

        /**
     * @public
     * @async
     * @function
     * @name parseSpeechData
     * @param req API Request Interface with contains Request body, request header etc.,
     * @param res API Response Interface which is used to send back response with 
     * respond data after processing the Request.
     * @param next This Param is used if there is any other methods to be exected after 
     * completion of current function, the next() will deviate to next method.
     * @description This Method will Get the string pattern from request body.
     * The string pattern will be converted to an array for processing.
     * algorithm will check for the repeating word pattern and return the request if constrain fails
     * here the voice pattern will be parsed and check for the most relevant matching possiblities.
     * @returns {function} returns Functions like Api.ok, Api.badRequest, Api.serverError etc.,
     * @author Team AppComposer
     */


    public async parseSpeechData(req: Request, res: Response, next: NextFunction) {
        // const accounHolderName = req.params['AccountHolderName'];
        const voicePattern = req.body['voicePattern'];
        const detectQuery=new OptionSelectManager();
        let ProcessedArray=voicePattern.split(" ")

        detectQuery.parseData(ProcessedArray).then((count)=>{
            if(count!=0&&count>ProcessedArray.length/2)
            return Api.ok(req, res, "Too many repeating patterns");
            else{
        //match Pattern
        dictionaryMap.forEach((data,key)=>{
            let result = multimatch(ProcessedArray,data)
            data.match=result.length;            
           })
           //sorting Matched data in descending order to find highest possiblity
           const sortedMap=new Map
                               ([...dictionaryMap].sort((a,b) => a[1]['match'] > b[1]['match']? -1 : 1))
              let firstKey=sortedMap.keys().next().value;
              let firstValue=sortedMap.values().next().value;
              //data fetch from DB
              if(firstValue["match"]>0){
               detectQuery.selectService(firstKey).then((result)=>{
                   firstKey=null;
                   return Api.ok(req, res, result);
                  })
              }else{
               return Api.ok(req, res, "Sorry no relevant result found");
              }
            }
        })
    
        
   

     
    }


    public async test(req: Request, res: Response, next: NextFunction) {
        return Api.ok(req, res, 'Parse API works fine');
    }

}