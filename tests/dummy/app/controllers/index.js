/* eslint-disable ember/no-classic-classes, ember/no-actions-hash, prettier/prettier, ember/no-get */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  session: service(),
  actions: {
    invalidateSession() {
      get(this, 'session').invalidate();
    }
  }
});
