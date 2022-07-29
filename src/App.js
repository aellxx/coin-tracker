import {useEffect, useState} from "react";
import Title from "./Title";
import Inputs from "./Inputs"
import styles from "./App.module.css"

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]); 

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [])

  return (
    <div className={styles.bg}>
      <div className={styles.box}>
        <Title />
        {loading ? <strong>Loading...</strong> : <Inputs coins={coins}/>}
      </div>
    </div>
  );
}

export default App;
