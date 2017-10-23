const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../../validators/project/info')
const responses = require('../../utils/responses')
const queries = require('../../queries/project/info')

const controller = {};

controller.getProject = async ((req, res) => {
    req.params.user_id = req.session.user_id;
    console.log('Controller')
    const validation = validate(req.params , validator.getProject, { format: 'flat' });
    if(!validation) {

        try { 

            let response = await (queries.getProjectQuery(req.params));
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