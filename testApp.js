const cypress = require('cypress')

cypress.run({
  spec: './cypress/integration/searchPerson.spec.js',
  reporter: 'junit',
  browser: 'chrome',
  headed: false,
  config: {
    baseUrl: 'http://localhost:3000'
  },
  env: {
    foo: 'bar',
    baz: 'quux',
  }
})
  .then((results) => {
    console.log("fim")
  })
  .catch((err) => {
    console.error(err)
  })