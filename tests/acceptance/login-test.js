/* eslint-disable prettier/prettier, qunit/no-assert-equal */
import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { default as window } from 'ember-window-mock';
import { setupWindowMock } from 'ember-window-mock/test-support';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);
  setupWindowMock(hooks);

  test('clicking login redirects to the right place', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    await click('[data-test-login-button]')

    assert.startsWith(window.location.href, 'http://localhost:4200/fake-oauth/signin?response_type=token&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI');
  });

  test('after redirect back authenticates properly', async function(assert) {
    await visit('/fake-oauth/signin?response_type=token&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI');

    await click('[data-test-login-button]');

    assert.startsWith(window.location.href, 'http://localhost:4200/login#something');
  });

  test('login redirect authenticates properly', async function(assert) {
    // make window mock match what it should be
    window.location = 'http://localhost:4200/login#something';
    await visit('/login#something');

    assert.dom('[data-test-logout-button]').isVisible();

    await click('[data-test-logout-button]');

    assert.dom('[data-test-login-button]').isVisible();
  });
});
