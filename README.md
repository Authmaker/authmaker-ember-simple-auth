# authmaker-ember-simple-auth

## Installation - quick start

Install Ember Simple Auth:
```
ember install ember-simple-auth
```

Install this package:
```
ember install authmaker-ember-simple-auth
```

Add Authmaker config to your environment:
```
authmaker: {
  domainUrl = "http://localhost:5000",
  redirectUri = "http://localhost:4200/login",
  clientId = "some client Id"
},
```

Add a login route using `ember g route login` and make it use the Authmaker Login Route Mixin:
```
import Ember from 'ember';
import AuthmakerLoginRoute from 'authmaker-ember-simple-auth/mixins/login-route';
import Config from 'your-app/config/environment';

export default Ember.Route.extend(AuthmakerLoginRoute, {
  config: Config.authmaker //this is very important, do not forget to add this
});
```

## Authmaker Simple Auth Specific Usage

Add `application-route-mixin` to your application route:

```
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
});
```

To allow your user to login you can use the Ember Simple Auth's `session.authenticate()` as follows:

```
import Ember from 'ember';
import Config from 'your-app/config/environment';

export default Ember.Controller.extend({
  actions: {
    login() {
      return this.get('session').authenticate('authenticator:authmaker', Config.authmaker);
    }
  }
});
```

Authmaker automatically provides an application authorizer which you can use as follows:
```
import ApplicationAdapter from './application';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default ApplicationAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
});
```

### General Simple Auth Usage
If you want to be able to logout using an action such as this `{{action "logout"}}` you just need to call

```
import Ember from 'ember';
import Config from 'your-app/config/environment';

export default Ember.Controller.extend({
  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
```
