# is-sns-topic-arn [![Build Status](https://travis-ci.org/SamVerschueren/is-sns-topic-arn.svg?branch=master)](https://travis-ci.org/SamVerschueren/is-sns-topic-arn)

> Check if a string is an AWS [SNS Topic ARN](http://docs.aws.amazon.com/sns/latest/dg/CreateTopic.html)


## Install

```
$ npm install --save is-sns-topic-arn
```


## Usage

```js
const isTopicArn = require('is-sns-topic-arn');

isTopicArn('foo');
//=> false

isTopicArn('arn:aws:sns:us-west-2:111122223333:app/GCM/MyTopic');
//=> false

isTopicArn('arn:aws:sns:us-west-2:111122223333:MyTopic');
//=> true
```


## API

### isTopicArn(arn)

#### arn

Type: `string`

Topic ARN to check.


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
