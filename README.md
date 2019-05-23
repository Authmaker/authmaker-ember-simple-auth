authmaker-ember-simple-auth
==============================================================================

This addon allows you to get started very quickly with [Authmaker](https://authmaker.com) and [ember-simple-auth](https://github.com/simplabs/ember-simple-auth). This Readme has some basic information about how to use the addon but if you want a more in-depth description on how to use it you can check the [Authmaker Guides](https://beginner-guides.authmaker.com/release/)

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

Install this addon.

```bash
ember install authmaker-ember-simple-auth
```

this will setup a few defaults in your application and add a basic configuration
to your environment config that you will need to update with the real config
from the Authmaker Dashboard. Read the [official
documentation](https://beginner-guides.authmaker.com/release/implement-login/configure-app/)
for more information.


Usage
------------------------------------------------------------------------------

When you install this addon it will automatically generate a login route for
you, along with a few other useful files. If you are starting an Ember app from
scratch this should all be ok, but if you are adding Authmaker to an existing
Ember app you might need to have a look at the diffs and see how to integrate
your code into the provided files.

This addon ultimately uses
[ember-simple-auth](https://github.com/simplabs/ember-simple-auth) to provide
the login functionality and you can follow their documentation to find out more.

Here is an example of a controller that is providing a login action that makes
use of Ember Simple Auth's `session.authenticate()` functionality:

```js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service'

export default Controller.extend({
  session: service(),
  actions: {
    login() {
      this.get('session').authenticate('authenticator:authmaker');
    },
    logout() {
      this.get('session').invalidate();
    }
  }
});
```

with this in place you can make use of these actions in the template as follows:

```handlebars
{{#if session.isAuthenticated}}
  <button {{action 'logout'}}>logout</button>
{{else}}
  <button {{action 'login'}}>login</button>
{{/if}}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
