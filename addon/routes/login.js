import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';

export default Route.extend({
  session: service(),
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
            this.transitionTo(urlDomEle ? urlDomEle.pathname : '/');
          });
        });
      });
    }
  }
});
