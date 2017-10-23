var schema = {};

schema.createDeveloper =
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
schema.updateDeveloper =
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
schema.loginDeveloper =
{
  email : {
    presence: true
  },
  password : {
    presence: true
  }
}
schema.getDeveloper =
{
  id : {
    presence: true
  }
}

module.exports = schema;
