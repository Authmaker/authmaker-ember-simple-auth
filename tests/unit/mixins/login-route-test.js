import Ember from 'ember';
import LoginRouteMixin from 'authmaker-ember-simple-auth/mixins/login-route';
import { module, test } from 'qunit';

module('Unit | Mixin | login route');

// Replace this with your real tests.
test('it works', function(assert) {
  let LoginRouteObject = Ember.Object.extend(LoginRouteMixin);
  let subject = LoginRouteObject.create();
  assert.ok(subject);
});
