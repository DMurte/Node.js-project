var validator = {};

validator.createProject =
{
  title : {
    presence: true
  },
  subtitle : {
    presence: true
  },
  budget : {
    presence: true
  },
  description : {
    presence: true
  }

}
validator.updateProject =
{
  id : {
    presence: true
  },
  title : {
    presence: true
  },
  subtitle : {
    presence: true
  },
  budget : {
    presence: true
  },
  description : {
    presence: true
  }
}

module.exports = validator;
