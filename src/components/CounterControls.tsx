import React from "react";
import { useCounter } from "../store/appStore";

const CounterControls: React.FC = () => {
  const { increment, decrement, reset, setStep, step } = useCounter();

  return (
    <div className="counter-controls">
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>

      <div style={{ marginTop: "10px" }}>
        <label>
          Step size:
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            style={{ marginLeft: "5px", width: "60px" }}
          />
        </label>
      </div>
    </div>
  );
};

export default CounterControls;
