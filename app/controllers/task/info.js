const validate = require('validate.js');
const schema = require('../../validators/task/info')
const responses = require('../../utils/responses')
const queries = require('../../queries/task/info')

var controller = {};

controller.getTask = function (req, res) {
  const validation = validate(req.params , validator.getTask, { format: 'flat' });
   if(!validation) {
    queries.getTaskQuery( req.params ,function (response) {
          responses.successWithData(response, (result) => {
            res.status(200).send(result)
          })
        })
  } else {
          responses.error(validation, (response) => {
            res.status(500).send(response)
          })
      }
  }

module.exports = controller;
