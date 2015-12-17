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
authMaker: {
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
  config: Config //this is very important, do not forget to add this
});
```

## Usage

Add `application-route-mixin` to your application route:

```
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
});
```

Now your application will automatically handle the action `{{action "invalidateSession"}}` when you need to logout

To allow your user to login you can use the Ember Simple Auth's `session.authenticate()` as follows:

```
import Ember from 'ember';
import Config from 'your-app/config/environment';

export default Ember.Controller.extend({
  actions: {
    login() {
      return this.get('session').authenticate('authenticator:authmaker', Config.authMaker);
    }
  }
});
```
