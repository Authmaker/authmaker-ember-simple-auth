import $ from 'jquery';
import { isEmpty } from '@ember/utils';
import { Promise as EmberPromise } from 'rsvp';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore: function(data) {
    return new EmberPromise(function(resolve, reject) {
      if (!isEmpty(data.access_token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function(options) {
    if (window.location.hash) {
      return new EmberPromise((resolve) => {
        resolve({
          access_token: window.location.hash.replace('#', ''),
          oauthUrl: options.domainUrl //save so we know where to invalidate token later
        });
      });
    } else {

      return new EmberPromise(function(){
        window.location = `${options.domainUrl}/signin?response_type=token&client_id=${options.clientId}&redirect_uri=${encodeURIComponent(options.redirectUri)}&previous_location=${encodeURIComponent(window.location)}`;
      });
    }
  },
  invalidate: function(data) {
    return new EmberPromise(function(resolve) {
      $.ajax({
        url: `${data.oauthUrl}/token?access_token=${data.access_token}`,
        type: 'DELETE',
        crossDomain: true
      }).always(function() {
        resolve();
      });
    });
  }
});
