const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../../validators/project/main')
const responses = require('../../utils/responses')
const queries = require('../../queries/project/main')

var controller = {};

controller.createProject = async ((req, res) => {
    req.body.customer_id = req.session.user_id;
    const validation = validate(req.body , validator.createProject, { format: 'flat' });
    if(!validation) {

        try { 

            let response = await (queries.createProjectQuery(req.body));
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

controller.updateProject = async ((req, res) => {
    req.body.user_id = req.session.user_id;

    const validation = validate(req.body , validator.updateProject, { format: 'flat' });
    if(!validation) {     

        try {
            let response = await (queries.updateProjectQuery(req.body));
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
