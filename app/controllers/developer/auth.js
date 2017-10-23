const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../../validators/developer/auth');
const responses = require('../../utils/responses');
const queries = require('../../queries/developer/auth');


var controller = {};

controller.createDeveloper = async ((req, res) => {
    const validation = validate(req.body , validator.createDeveloper, { format: 'flat' });
   
    if(!validation) {

        try { 

            let response = await (queries.createDeveloperQuery(req.body));
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

controller.updateDeveloper = async ((req, res) => {
    req.body.id = req.session.user_id;

    const validation = validate(req.body , validator.updateDeveloper, { format: 'flat' });
    if(!validation) {     

        try {
            let response = await (queries.updateDeveloperQuery(req.body));
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

controller.loginDeveloper = async ((req, res) => {
    const validation = validate(req.body , validator.loginDeveloper, { format: 'flat' });
    if(!validation) {

        try { 
            console.log('try')
            let response = await (queries.loginDeveloperQuery(req.body));
            response = responses.successWithData(response);
            res.status(200).send(response);

        } catch(error) {
           console.log('errorss');
            error = responses.error(error);
            res.status(500).send(error);

        }

    } else {

        const error = responses.error(validation);
        res.status(500).send(error);

    }
})
controller.getDeveloper = async ((req, res) => {
    req.body.id = req.session.user_id;
    const validation = validate(req.body, validator.getDeveloper, { format: 'flat' });
    if(!validation) {

        try { 
            let response = await (queries.getDeveloperQuery(req.body));
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
