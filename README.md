# SIP2 communication for Node.js
## Installation
```bash
$ npm install sip2
```

## Usage
```
const async = require('async');
const SIP2 = require('sip2');
const sip2connection = new SIP2.Connection(host, port);

function connect(cb) {
  sip2connection.connect(cb);
}

function requestLogin(cb) {
  // Login request
  const loginRequest = new SIP2.LoginRequest(username, password);
  loginRequest.sequence = 1;
  sip2connection.send(loginRequest.getMessage(), cb);
}

function requestPatronInformation(loginResponse, cb) {
  if (!loginResponse.ok) {
    return cb(new Error('Could not login'));
  }
  // Patron information request
  const type = 'hold';
  const patronInformationRequest = new SIP2.PatronInformationRequest(type, 1, 2);
  patronInformationRequest.sequence = 2;
  patronInformationRequest.institutionId = 'OBA';
  patronInformationRequest.patronIdentifier = '900000001025';
  sip2connection.send(patronInformationRequest.getMessage(), cb);
}

async.waterfall([
  connect,
  requestLogin,
  requestPatronInformation,
], (err, patronInformationResponse) => {
  console.log(err, patronInformationResponse);
});
```

## Tests
To run the test suite, first install the dependencies then run `npm test`:
```bash
$ npm install
$ npm test
```
