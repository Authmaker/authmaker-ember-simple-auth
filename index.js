'use strict';

module.exports = {
  name: require('./package').name,

  included() {
    let app = this._findHost(this);
    app.options['ember-simple-auth'] = {
      useSessionSetupMethod: true,
    };

    this._super.included.apply(this, arguments);
  },
};
