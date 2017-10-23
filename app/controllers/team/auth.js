const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../../validators/team/auth');
const responses = require('../../utils/responses');
const queries = require('../../queries/team/auth');


var controller = {};

controller.createCollaborator = async ((req, res) => {
    const validation = validate(req.body , validator.createCollaborator, { format: 'flat' });
   
    if(!validation) {

        try { 

            let response = await (queries.createCollaboratorQuery(req.body));
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

controller.updateCollaborator = async ((req, res) => {
    req.body.id = req.session.user_id;

    const validation = validate(req.body , validator.updateCollaborator, { format: 'flat' });
    if(!validation) {     

        try {
            let response = await (queries.updateCollaboratorQuery(req.body));
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

controller.loginCollaborator = async ((req, res) => {
    const validation = validate(req.body , validator.loginCollaborator, { format: 'flat' });
    if(!validation) {

        try { 
            console.log('try')
            let response = await (queries.loginCollaboratorQuery(req.body));
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
controller.getCollaborator = async ((req, res) => {
    req.body.id = req.session.user_id;
    const validation = validate(req.body, validator.getCollaborator, { format: 'flat' });
    if(!validation) {

        try { 
            let response = await (queries.getCollaboratorQuery(req.body));
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
