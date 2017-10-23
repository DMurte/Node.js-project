const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../../validators/customer/auth');
const responses = require('../../utils/responses');
const queries = require('../../queries/customer/auth');


var controller = {};

controller.createCustomer = async ((req, res) => {
    const validation = validate(req.body , validator.createCustomer, { format: 'flat' });
    if(!validation) {

        try { 

            let response = await (queries.createCustomerQuery(req.body));
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

controller.updateCustomer = async ((req, res) => {
    req.body.id = req.session.user_id;

    const validation = validate(req.body , validator.updateCustomer, { format: 'flat' });
    if(!validation) {     

        try {
            let response = await (queries.updateCustomerQuery(req.body));
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


 


controller.loginCustomer = async ((req, res) => {
    const validation = validate(req.body , validator.loginCustomer, { format: 'flat' });
    if(!validation) {

        try { 
            let response = await (queries.loginCustomerQuery(req.body));
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
controller.getCustomer = async ((req, res) => {
    req.body.id = req.session.user_id;
    const validation = validate(req.body, validator.getCustomer, { format: 'flat' });
    if(!validation) {

        try { 
            let response = await (queries.getCustomerQuery(req.body));
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
controller.updateCustomerPassword = async ((req, res) => {
    req.body.id = req.session.user_id;

    const validation = validate(req.body , validator.updateCustomerPassword, { format: 'flat' });
    if(!validation) {     

        try {
            let response = await (queries.updateCustomerPasswordQuery(req.body));
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
