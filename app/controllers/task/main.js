const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../../validators/task/main')
const responses = require('../../utils/responses')
const queries = require('../../queries/task/main')

var controller = {};

controller.createTask = async ((req, res) => {
  req.body.collaborator_id = req.session.user_id;
  const validation = validate(req.body , validator.createTask, { format: 'flat' });
  if(!validation) {

      try { 

          let response = await (queries.createTaskQuery(req.body));
          response = responses.successWithData(response);
          res.status(200).send(response);

      } catch(error) {

          error = responses.error(error);
          res.status(500).send(error);
          console.log(error)

      }
      
  } else {
      console.log('catch 2')
      const error = responses.error(validation);
      res.status(500).send(error);

  }

})


controller.updateTask = async ((req, res) => {
    req.body.collaborator_id = req.session.user_id;

    const validation = validate(req.body , validator.updateTask, { format: 'flat' });
    if(!validation) {     

        try {
            let response = await (queries.updateTaskQuery(req.body));
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

  controller.deleteTask = async ((req, res) => {
    req.params.collaborator_id = req.session.user_id;

    const validation = validate(req.params , validator.deleteTask, { format: 'flat' });
    if(!validation) {     

        try {
            let response = await (queries.deleteTaskQuery(req.params));
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

