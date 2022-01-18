import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
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

start();
