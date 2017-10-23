var validator = {};

validator.createCollaborator =
{
  first_name : {
    presence: true
  },
  last_name : {
    presence: true
  },
  email : {
    presence: true
  },
  password : {
    presence: true
  },
  type : {
    presence: true
  },
  cellphone : {
    presence: true
  },
  skype : {
    presence: true
  },
  country : {
    presence: true
  },
  city : {
    presence: true
  },
  description : {
    presence: true
  }
}
validator.updateCollaborator =
{
  id : {
    presence: true
  },
  first_name : {
    presence: true
  },
  last_name : {
    presence: true
  },
  email : {
    presence: true
  },
  password : {
    presence: true
  },
  type : {
    presence: true
  },
  cellphone : {
    presence: true
  },
  skype : {
    presence: true
  },
  country : {
    presence: true
  },
  city : {
    presence: true
  },
  description : {
    presence: true
  }
}
validator.loginCollaborator =
{
  email : {
    presence: true
  },
  password : {
    presence: true
  }
}
validator.getCollaborator =
{
  id : {
    presence: true
  }
}

module.exports = validator;
