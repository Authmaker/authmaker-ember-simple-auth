import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

window.QUnit.assert.startsWith = function(actual, startingString, message) {
  const startsWith = actual.startsWith(startingString);

  this.pushResult( {
    result: startsWith,
    actual: actual,
    expected: `to start with ${startingString}`,
    message: message
  });
};

setup(QUnit.assert);

start();
