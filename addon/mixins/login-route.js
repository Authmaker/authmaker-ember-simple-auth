import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service(),
  beforeModel: function(transition) {
    var urlDomEle;
    if (transition.queryParams.previous_location) {
      urlDomEle = document.createElement('a');
      urlDomEle.href = transition.queryParams.previous_location;
    }

    if (this.get('session.isAuthenticated')) {
      this.transitionTo(urlDomEle ? urlDomEle.pathname : '/');
    } else {
      this.get('session').authenticate('authenticator:authmaker', this.get('config')).then(function() {
        Ember.run.next(() => {
          Ember.run.next(() => {
            this.transitionTo(urlDomEle ? urlDomEle.pathname : '/');
          });
        });
      });
    }
  }
});
