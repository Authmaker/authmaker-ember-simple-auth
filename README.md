# authmaker-ember-simple-auth

## Installation - quick start

Install Ember Simple Auth:
```
ember install ember-cli-simple-auth
```

Install this package:
```
ember install authmaker-ember-simple-auth
```

Add simple auth config to your environment:
```
"simple-auth": {
  authorizer: 'authmaker-ember-simple-auth:authorizer'
},
```

Add Authmaker config to your environment:
```
authMaker: {
  domainUrl = "http://localhost:5000",
  redirectUri = "http://localhost:4200/login",
  clientId = "some client Id"
},
```
