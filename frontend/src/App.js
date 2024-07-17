import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [calculationSymbol, setCalculationSymbol] = useState('+');
  const [error, setError] = useState(null);

  const url = "http://127.0.0.1:8000";

  const getData = () => {
    setError(null); // リクエスト前にエラーをリセット
    axios.post(url, {
      value1: Number(value1),
      value2: Number(value2),
      calculationsymbol: calculationSymbol,
    }).then((res) => {
      setData(res.data);
    }).catch((error) => {
      console.error("Error:", error);
      setError("データの取得中にエラーが発生しました。");
    });
  };

  return (
    <div>
      <div>計算式</div>
      <input
        type="number"
        value={value1}
        onChange={(e) => setValue1(e.target.value)}
        placeholder="Value 1"
      />
      <select
        value={calculationSymbol}
        onChange={(e) => setCalculationSymbol(e.target.value)}
      >
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input
        type="number"
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
        placeholder="Value 2"
      />
      <button onClick={getData}>計算する</button>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {data && <div>結果: {data.processed_value}</div>}
    </div>
  );
}

export default App;
