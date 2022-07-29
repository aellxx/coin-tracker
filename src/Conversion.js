function Conversion({valueUSD, valueNew, currency}) {
    return (
        <div>
            <h2>${valueUSD} USD = {valueNew} {currency}</h2>
        </div>
    );
}

export default Conversion;