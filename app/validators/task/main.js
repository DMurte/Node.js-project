var validator = {};

validator.createTask =
{
  project_id : {
    presence: true
  },
  title : {
    presence: true
  },
  description : {
    presence: true
  },
  dificulty_level : {
    presence: true
  },
  price : {
    presence: true
  },
  points : {
    presence: true
  }
}
validator.updateTask =
{
  project_id : {
    presence: true
  },
  title : {
    presence: true
  },
  description : {
    presence: true
  },
  dificulty_level : {
    presence: true
  },
  price : {
    presence: true
  },
  points : {
    presence: true
  }
}

validator.deleteTask =
{
  id : {
    presence: true
  }
}

module.exports = validator;
