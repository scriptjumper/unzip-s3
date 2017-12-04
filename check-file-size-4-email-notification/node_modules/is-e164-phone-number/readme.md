# is-e164-phone-number [![Build Status](https://travis-ci.org/SamVerschueren/is-e164-phone-number.svg?branch=master)](https://travis-ci.org/SamVerschueren/is-e164-phone-number)

> Check if a string is a valid [E. 164 phone number](https://en.wikipedia.org/wiki/E.164)


## Install

```
$ npm install --save is-e164-phone-number
```


## Usage

```js
const isE164PhoneNumber = require('is-e164-phone-number');

isE164PhoneNumber('+14155552671');
//=> true

isE164PhoneNumber('+04155552671');
//=> false
```


## API

### isE164PhoneNumber(input)

#### input

Type: `string`

Phone number to test


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
