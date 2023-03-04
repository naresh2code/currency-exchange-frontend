import React, { useState } from 'react';
import axios from 'axios';
function CurrencyExchange() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('USD');

  const handleFromCurrencyChange = event => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = event => {
    setToCurrency(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios.get('http://localhost:8080/currency-exchange?from='+fromCurrency+'&to='+toCurrency)
      .then(response => {
        setExchangeRates(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className='main'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From:</label>
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option value="INR">INR</option>
            <option value="KRW">KRW</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CNY">CNY</option>
          </select>
        </div>
        <div>
          <label>To:</label>
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            <option value="INR">INR</option>
            <option value="KRW">KRW</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CNY">CNY</option>
          </select>
        </div>
        <button type="submit">Exchange Rates</button>
      </form>
      <div>
        <h2>Exchange Rates</h2>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Exchange Rate</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {exchangeRates.map(rate => (
              <tr key={`${rate.from}-${rate.to}`}>
                <td>{fromCurrency}</td>
                <td>{toCurrency}</td>
                <td>{rate.exchange_rate}</td>
                <td>{rate.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default CurrencyExchange;


