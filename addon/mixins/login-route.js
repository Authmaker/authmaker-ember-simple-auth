import { next } from '@ember/runloop';
import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  session: service(),
  beforeModel: function(transition) {
    var urlDomEle;
    if (transition.queryParams.previous_location) {
      urlDomEle = document.createElement('a');
      urlDomEle.href = transition.queryParams.previous_location;
    }

    if (this.get('session.isAuthenticated')) {
      this.transitionTo(urlDomEle ? urlDomEle.pathname : '/');
    } else {
      this.get('session').authenticate('authenticator:authmaker', this.get('config')).then(() => {
        next(() => {
          next(() => {
            this.transitionTo(urlDomEle ? urlDomEle.pathname : '/');
          });
        });
      });
    }
  }
});
