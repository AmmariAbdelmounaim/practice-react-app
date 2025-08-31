import React from "react";
import { useCounter } from "../store/appStore";

const Counter: React.FC = () => {
  const { count, step } = useCounter();

  return (
    <div className="counter-display">
      <h2>Counter: {count}</h2>
      <p>Step: {step}</p>
    </div>
  );
};

export default Counter;
