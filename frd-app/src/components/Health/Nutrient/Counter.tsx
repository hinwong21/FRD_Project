import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./store";
import { Action } from "./store";

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: AppState) => state.count);

  const handleIncrement = () => {
    const incrementAction: Action = { type: "INCREMENT" };
    dispatch(incrementAction);
  };

  const handleDecrement = () => {
    const decrementAction: Action = { type: "DECREMENT" };
    dispatch(decrementAction);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

export default Counter;
