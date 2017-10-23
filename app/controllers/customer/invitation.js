const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../../validators/customer/invitation')
const responses = require('../../utils/responses')
const queries = require('../../queries/customer/invitation')

var controller = {};


controller.inviteCustomer = async ((req, res) => {
    
        req.body.customer_id = req.session.user_id;
      
        const validation = validate(req.body , validator.inviteCustomer, { format: 'flat' });
        if(!validation) {     
      
            try {
                let response = await (queries.inviteCustomerQuery(req.body));
                response = responses.successWithData(response);
                res.status(200).send(response);
      
            } catch(error) {
      
                error = responses.error(error);
                res.status(500).send(error);
            }
      
        } else {
      
            const error = responses.error(validation);
            res.status(500).send(error);
      
        }
      })
    


module.exports = controller;
