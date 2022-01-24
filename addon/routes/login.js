/* eslint-disable ember/no-classic-classes, prettier/prettier, ember/no-get */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';

export default Route.extend({
  session: service(),
  router: service(),
  beforeModel: function() {
    var urlDomEle;

    var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('previous_location')) {
      urlDomEle = document.createElement('a');
      urlDomEle.href = urlParams.get('previous_location');
    }

    if (this.get('session.isAuthenticated')) {
      this.transitionTo(urlDomEle ? urlDomEle.pathname : '/');
    } else {
      this.get('session').authenticate('authenticator:authmaker').then(() => {
        next(() => {
          next(() => {
            this.router.transitionTo(urlDomEle ? urlDomEle.pathname : '/');
          });
        });
      });
    }
  }
});
