const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const sendEmail = require('send-email');

const utils = require('../../utils/utils');
const customerModel = require('../../models/customer');
const projectModel = require('../../models/project');
const teamModel = require('../../models/team');

var request= {};

request.inviteCustomerQuery = async ( (data) =>  {
    
       return new Promise( (resolve, reject) => {
       
        resolve("invitation_token")
                 
        })
    })
            

module.exports = request;


 // let [invitation] = await(customerModel.customer_invitation.findAll({
        //                                                                     where:{
        //                                                                         email: data.email,
        //                                                                          project_id: data.project_id
        //                                                                         }
        //                                                                     }
        //                                                                 )
        //                                                             );
        // if(!invitation){
        //     reject('Error')
        //     return;
        // }

 