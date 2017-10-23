var schema = {};

schema.createCustomer =
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
  company : {
    presence: true
  },
  skype : {
    presence: true
  }
}

schema.updateCustomer =
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
  old_email : {
    presence: true
  },
  company : {
    presence: true
  },
  skype : {
    presence: true
  }
  
}


schema.updateCustomerPassword =
{
  
  id : {
    presence: true
  },
  old_password : {
    presence: true
  },
  password: {
    presence: true
  }
  
}


schema.loginCustomer =
{
  email : {
    presence: true
  },
  password : {
    presence: true
  }
}

schema.getCustomer =
{
  id: {
    presence: true
  }
}

module.exports = schema;
