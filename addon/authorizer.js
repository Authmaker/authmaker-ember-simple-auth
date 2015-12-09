import authorizerBase from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';

export default authorizerBase.extend({
  authorize(data, block) {
    const accessToken = data['access_token'];
    if (!Ember.isEmpty(accessToken)) {
      block('Authorization', `Bearer ${accessToken}`);
    }
  }
});
