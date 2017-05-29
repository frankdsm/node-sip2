# SIP2 communication for Node.js
## Installation
```bash
$ npm install sip2
```

## Usage
```
const async = require('async');
const sip2 = new SIP2(host, port);

function connect(cb) {
  sip2.connect(cb);
}

function requestLogin(cb) {
  // Login request
  const loginRequest = new Login(username, password);
  loginRequest.sequence = 1;
  sip2.send(loginRequest.getMessage(), cb);
}

function requestPatronInformation(loginResponse, cb) {
  if (!loginResponse.ok) {
    return cb(new Error('Could not login'));
  }
  // Patron information request
  const type = 'hold';
  const patronInformationRequest = new PatronInformation(type, 1, 2);
  patronInformationRequest.sequence = 2;
  patronInformationRequest.institutionId = 'OBA';
  patronInformationRequest.patronIdentifier = '900000001025';
  sip2.send(patronInformationRequest.getMessage(), cb);
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
To run the test suite, first install the dependencies, the run `npm test`:
```bash
$ npm install
$ npm test
```