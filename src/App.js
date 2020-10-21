import React, { useEffect, useState } from "react";
import "./App.css";

const ConvertorApp = () => {

  const [inputs, setInputs] = useState({});
  const [country, setCountry] = useState({});
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(0);
  const [load, setLoad] = useState(false);
  const [converting, setConverting] = useState(false);

  useEffect(async () => {
    setLoad(true);
    const response = await fetch(
      "https:free.currconv.com/api/v7/currencies?apiKey=4243fc3911f7ede50d57"
    );
    const data = await response.json(); // response of json for list of countries
    setCountry(data.results);
    setLoad(false);
  }, []);

  const convert = async () => {
    setConverting(true);

    try {
      const response1 = await fetch(
        `https://free.currconv.com/api/v7/convert?q=${rate}_LKR&compact=ultra&apiKey=4243fc3911f7ede50d57`
      );
      // to get the rate
      const finalJson = await response1.json();
      setResult(inputs.txtSlRs * finalJson[`${rate}_LKR`]);
      //   setTimeout(() => {
      // }, 1000);
      setConverting(false);
    } catch (e) {
      console.log("Error in converitng");
      console.log(e);
      setConverting(false);
      alert("Something went wrong. Try again")
    }
  };

  return (
    <div className="container">
      <br></br>
      <div className="title">
        Let's convert your money into preffered currency...
      </div>
      <br></br>
      <input
        type="number"
        name="txtSlRs"
        placeholder="Amount in SL Rs."
        value={inputs.txtSlRs}
        onChange={(inputEvent) => {
          setInputs({ [inputEvent.target.name]: inputEvent.target.value });
          //get the input value
        }}
      ></input>
      <br></br>
      <br></br>
      {load == false ? (
        country !== null ? (
          <select
            className="select"
            value={rate}
            onChange={(chooseEvent) => {
              setRate(chooseEvent.target.value);
            }}
          >
            <option value="">---choose--</option>
            {Object.keys(country).map((currency) => {
              return (
                <option className="option" value={currency}>
                  {currency}-{country[currency].currencyName}
                </option>
              );
            })}
          </select>
        ) : (
          "countries not available"
        )
      ) : (
        "loading"
      )}{" "}
      <br></br>
      <br></br>
      <button
        onClick={() => {
          //validation
          if (rate !== "" && inputs.txtSlRs > 0) {
            convert();
          }
          if (rate === "") {
            alert("choose a currency type");
          }
          if (inputs.txtSlRs < 0 || inputs.txtSlRs === 0) {
            alert("enter a correct amount");
          }
        }}
      >
        Convert
      </button>
      <br></br>
      <br></br>
      <div className="converted">
        {converting ? (
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div>{result}</div>
        )}
      </div>
      <br></br>
    </div>
  );
};

export default ConvertorApp;
