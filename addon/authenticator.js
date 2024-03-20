/* eslint-disable prettier/prettier */
import { isEmpty } from '@ember/utils';
import { Promise as EmberPromise } from 'rsvp';
import Base from 'ember-simple-auth/authenticators/base';
import config from 'ember-get-config';
import window from 'ember-window-mock';

const { authmaker } = config;

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

  authenticate: function() {
    if (window.location.hash) {
      return new EmberPromise((resolve) => {
        resolve({
          access_token: window.location.hash.replace('#', ''),
          oauthUrl: authmaker.domainUrl //save so we know where to invalidate token later
        });
      });
    } else {

      return new EmberPromise(function(){
        window.location.href = `${authmaker.domainUrl}/signin?response_type=token&client_id=${authmaker.clientId}&redirect_uri=${encodeURIComponent(authmaker.redirectUri)}&previous_location=${encodeURIComponent(window.location)}`;
      });
    }
  },
  invalidate: async function(data) {
    try {
      await fetch(`${data.oauthUrl}/token?access_token=${data.access_token}`, {
        credentials: "include",
        method: 'DELETE',
      });
    } catch (err) {
      //ignore this error
    }

    return this._super();
  }
});
