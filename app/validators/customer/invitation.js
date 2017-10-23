var validator = {};

validator.inviteCustomer =
{
  customer_id : {
    presence: true
  },
  email : {
    presence: true
  },
  project_id : {
    presence: true
  },
  company : {
    presence: true
  }
}
validator.incorporationCustomer =
{
  id : {
    presence: true
  }
}

module.exports = validator;
