import {useState} from "react";
import styles from "./Inputs.module.css"

function Inputs({coins}) {
    const [valueUSD, setValueUSD] = useState(0);
    const [valueNew, setValueNew] = useState(0);
    const [currency, setCurrency] = useState("");

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
        <div styles={styles.container}>
            <input
                className={styles.input}
                onChange={onChange}
                value={valueUSD}
                type="number"
                min="0"
                placeholder="Enter a value in USD"
            />
            <select 
              className={styles.input}
              required 
              onChange={changeCurrency}>
              <option value="" disabled selected>Select your option</option>
              {
                coins.map((coin) => 
                <option key={coin.id} id={coin.id}>
                  {coin.name} ({coin.symbol})
                </option>)
              }
            </select>
            {currency===""? null : <h2 style={styles.result}>${valueUSD===0 ? 0 : valueUSD} USD = {valueNew} {currency}</h2>}
      </div>
      );
}

export default Inputs;