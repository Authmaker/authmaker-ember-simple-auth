import Base from 'ember-simple-auth/authenticators/base';
import Ember from 'ember';

export default Base.extend({
  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.access_token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function(options) {
    if (window.location.hash) {
      return new Ember.RSVP.Promise((resolve) => {
        resolve({
          access_token: window.location.hash.replace('#', ''),
          oauthUrl: options.domainUrl //save so we know where to invalidate token later
        });
      });
    } else {

      return new Ember.RSVP.Promise(function(){
        window.location = "%@/signin?response_type=token&client_id=%@&redirect_uri=%@&previous_location=%@".fmt(
          options.domainUrl,
          options.clientId,
          encodeURIComponent(options.redirectUri),
          encodeURIComponent(window.location));
      });
    }
  },
  invalidate: function(data) {
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.$.ajax({
        url: "%@/token?access_token=%@".fmt(data.oauthUrl, data.access_token),
        type: 'DELETE',
        crossDomain: true
      }).always(function() {
        resolve();
      });
    });
  }
});
