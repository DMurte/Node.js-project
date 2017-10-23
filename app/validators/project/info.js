var validator = {};

validator.getProject =
{
  id : {
    presence: true
  },
  user_id : {
    presence: true
  }

}
/*
schema.getCustomers =
{
  id : {
    presence: true
  }
}
schema.getTasks =
{
  id : {
    presence: true
  }
}
*/

module.exports = validator;
