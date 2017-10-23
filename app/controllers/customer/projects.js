const validate = require('validate.js');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const validator = require('../../validators/customer/projects')
const responses = require('../../utils/responses')
const queries = require('../../queries/customer/projects')

var controller = {};
controller.getProjects = async ((req, res) => {
  req.body.id = req.session.user_id;

  const validation = validate(req.body , validator.getProjects, { format: 'flat' });
  if(!validation) {     

      try {
          let response = await (queries.getProjectsQuery(req.body));
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
