import { isEmpty } from '@ember/utils';
import authorizerBase from 'ember-simple-auth/authorizers/base';

export default authorizerBase.extend({
  authorize(data, block) {
    const accessToken = data['access_token'];
    if (!isEmpty(accessToken)) {
      block('Authorization', `Bearer ${accessToken}`);
    }
  }
});
