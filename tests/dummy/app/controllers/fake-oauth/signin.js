/* eslint-disable ember/no-classic-classes, ember/no-actions-hash, prettier/prettier */
import Controller from '@ember/controller';
import window from 'ember-window-mock';

export default Controller.extend({
  actions: {
    login() {
      window.location.href = 'http://localhost:4200/login#something'
    }
  }
});
