import React, { useState } from 'react';
import axios from 'axios';
function Convert() {
  
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('USD');

  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  
  const handleFromCurrencyChange = event => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = event => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios.get('http://localhost:8080/convert?from='+fromCurrency+'&to='+toCurrency+"&amount="+amount)
      .then(response => {
        setResult(response.data);
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
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      
      <button type="submit">Convert</button>
    </form>
    
    <div>
      <h2>Conversion Result</h2>
      <p>Maximum Value: {result.maxValue}</p>
      <p>Minimum Value: {result.minValue}</p>
    </div>
  </div>
  );
}

export default Convert;  