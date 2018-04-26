import EmberObject from '@ember/object';
import LoginRouteMixin from 'authmaker-ember-simple-auth/mixins/login-route';
import { module, test } from 'qunit';

module('Unit | Mixin | login route', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let LoginRouteObject = EmberObject.extend(LoginRouteMixin);
    let subject = LoginRouteObject.create();
    assert.ok(subject);
  });
});
