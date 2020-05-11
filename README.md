# Gmail helper
> Email verification using gmail

A set of functions that can be used to interact with a gmail account (e.g. retrieve labels, messages, delete messages, etc.). Could be used in E2E tests to verify emails sent from the system under test.
More details at: https://medium.com/@ali.haydar/email-verification-gmail-helper-utility-2e6858d83244

* Note: this project is a poc at the moment. It is not complete and misses a few functions to be fully functional (e.g. list Messages). Contributions are most welcome

## Setup

### Pre-requisites
* Install Node.js and npm. This site explains what are these and how to install them https://www.npmjs.com/get-npm
* Install typescript https://www.npmjs.com/package/typescript
* Create a gmail account for testing

### Installation
* Clone this repository: `git clone https://github.com/AHaydar/gmail-helper.git`
* Run `npm install` to install the used node modules

## Usage example

When doing E2E tests, lots of times the email verification are skipped because of the hassle of implementation, and the dependencies on external services (e.g. an email client).

```javascript
// retrieve the content of an email message
import { getMessageContent } from 'gmailHelper';

const messageContent = getMessageContent('123') // 123 is the ID of the message

expect(messageContent).to.have.string('bar'); // This requires to have Chai installed and imported in this file
```

## Development setup
Same as Installation -  to re-create the project from scratch check the following post: https://medium.com/@ali.haydar/email-verification-gmail-helper-utility-2e6858d83244 

## Meta
Ali Haydar – [@Alee_Haydar](https://twitter.com/Alee_Haydar)

This project does not require a Contributor License Agreement.

## Contributing

1. Fork it (<https://github.com/AHaydar/gmail-helper/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
