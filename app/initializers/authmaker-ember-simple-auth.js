import authenticator from 'authmaker-ember-simple-auth/authenticator';
import authorizer from 'authmaker-ember-simple-auth/authorizer';

export default {
  name: 'authmaker-ember-simple-auth',
  initialize: function(container){
    container.register('authmaker-ember-simple-auth:authenticator', authenticator);
    container.register('authmaker-ember-simple-auth:authorizer', authorizer);
  }
};
