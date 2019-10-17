### ExchangeRate API client

[exchangerate-api.com](http://exchangerate-api.com)

### Installing the client library

```bash
npm install exchangerate-api
```

### Using the client library

```javascript
// Imports the library
const exchangeRateClient = require('exchangerate-api');

const result = await exchangeRateClient.ratesFor('USD')
  
result.getRate('EUR')

for(let [code, rate] of result){
  console.log(code, rate)
}

result.conversion('EUR', 10)
```

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).