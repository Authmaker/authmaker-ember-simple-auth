import authorizerBase from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';

export default authorizerBase.extend({
  authorize: function(jqXHR) {
    var accessToken = this.get('session.access_token');

    if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
      jqXHR.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    }
  }
});
