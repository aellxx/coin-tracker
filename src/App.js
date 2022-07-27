import {useEffect, useState} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [valueUSD, setValueUSD] = useState(0);
  const [valueNew, setValueNew] = useState(0);
  const [currency, setCurrency] = useState("");
  const [coins, setCoins] = useState([]); 

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [])

  const onChange = (event) => {
    setValueUSD(event.target.value);
    const coin = coins.find((item) => item.symbol === currency);
    setValueNew(parseFloat(valueUSD*(1/coin.quotes.USD.price)).toFixed(2));
  }

  const changeCurrency = (event) => {
    const regExp = /\(([^)]+)\)/;
    setCurrency(regExp.exec(event.target.value)[1]);
    setValueUSD(0);
    setValueNew(0);
  }

  return (
    <div>
      <h1>The Coins!</h1>
      {loading ? <strong>Loading...</strong> : null}
      <br />
      <input
        onChange={onChange}
        value={valueUSD}
        type="number"
        min="0"
        placeholder="Enter a value in USD"
      />
      <br />
      <select 
        required 
        onChange={changeCurrency}>
        <option value=" disabled selected hidden">Choose your currency</option>
        {
          coins.map((coin) => 
          <option key={coin.id} id={coin.id}>
            {coin.name} ({coin.symbol})
          </option>)
        }
      </select>
      <h2>
        ${valueUSD===0 ? 0 : valueUSD} USD = {valueNew} {currency}
      </h2>
    </div>
  );
}

export default App;
