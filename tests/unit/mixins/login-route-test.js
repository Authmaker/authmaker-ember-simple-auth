import Ember from 'ember';
import LoginRouteMixin from '../../../mixins/login-route';
import { module, test } from 'qunit';

module('LoginRouteMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var LoginRouteObject = Ember.Object.extend(LoginRouteMixin);
  var subject = LoginRouteObject.create();
  assert.ok(subject);
});
