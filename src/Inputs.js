import Conversion from "./Conversion"
import {useState} from "react";
import styles from "./Inputs.module.css"

function Inputs({coins}) {
    const [valueUSD, setValueUSD] = useState(0);
    const [valueNew, setValueNew] = useState(0);
    const [currency, setCurrency] = useState("BTC");

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
        <div className={styles.container}>
            <label for="usd-value">Enter a value in USD</label>
            <input
                className={styles.inputField}
                onChange={onChange}
                value={valueUSD}
                type="number"
                min="0"
                max="1000000000"
                placeholder="Enter a value in USD"
                name="usd-value"
            />
            <br />
            <label for="currency">Enter a value in USD</label>
            <select 
              className={styles.inputField}
              required 
              onChange={changeCurrency}
              name="currency">
              <option defaultValue="" disabled>Select your option</option>
              {
                coins.map((coin) => 
                <option key={coin.id} id={coin.id}>
                  {coin.name} ({coin.symbol})
                </option>)
              }
            </select>
            <Conversion valueUSD={valueUSD} valueNew={valueNew} currency={currency}/>  
      </div>
      );
}

export default Inputs;