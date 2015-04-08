import authorizerBase from 'simple-auth/authorizers/base';

export default authorizerBase.extend({
  authorize: function(jqXHR, requestOptions) {
    console.log("authorizing");
  }
});
