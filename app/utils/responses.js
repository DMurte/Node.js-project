var responses = {};


responses.successWithData = (data) => {
   const response = {};
   response.success = true;
   response.data = data;
   return response
}

responses.error = (message_error) => {
  const response = {};
  response.success = false;
  response.message_error = message_error;
  return response
}

module.exports = responses;
