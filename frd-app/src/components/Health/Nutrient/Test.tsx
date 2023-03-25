import { SetStateAction, useState } from "react";
import { Provider } from "react-redux";
import Counter from "./Counter";
import { store } from "./store";

function MyComponent() {
  const [inputValues, setInputValues] = useState<
    { name: string; value: string | JSX.Element }[]
  >([]);
  const [newInputName, setNewInputName] = useState<string>("");
  const [elements, setElements] = useState<JSX.Element[][]>(
    Array(inputValues.length).fill([])
  );

  const handleNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewInputName(event.target.value);
  };

  const addInput = () => {
    if (newInputName === "") {
      return;
    }
    setInputValues([...inputValues, { name: newInputName, value: "" }]);
    setElements([...elements, []]); // add empty array for new input row
    setNewInputName("");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[index].value = event.target.value;
    setInputValues(newInputValues);
  };

  const removeInput = (index: number) => {
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);
    setInputValues(newInputValues);
    const newElements = [...elements];
    newElements.splice(index, 1); // remove corresponding elements array
    setElements(newElements);
  };

  const addFood = (index: number) => {
    const inputElement = document.querySelector(
      `tr:nth-child(${index + 1}) .input-element`
    ) as HTMLInputElement;
    const newElement = <div>{inputElement.value}</div>;
    const newElements = [...elements]; // copy elements array
    newElements[index] = newElements[index].concat(newElement); // update corresponding elements array
    setElements(newElements);
    console.log(newElements);
    inputElement.value = "";
  };

  return (
    <div>
      <div>
        <label htmlFor="new-input-name">Input Name:</label>
        <select
          className="select-meal-type"
          value={newInputName}
          onChange={handleNameChange}
        >
          <option value="">Select meal type</option>
          <option value="Breakfast">breakfast</option>
          <option value="Brunch">brunch</option>
          <option value="Lunch">lunch</option>
          <option value="Tea">tea</option>
          <option value="Snack">snack</option>
          <option value="Dinner">dinner</option>
          <option value="Siu Ye">siu ye</option>
        </select>
        <button onClick={addInput}>Add Input</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inputValues.map((input, index) => (
            <tr key={`input-${index}`}>
              <td>{input.name}</td>
              <td>
                <input
                  className="input-element"
                  type="text"
                  value={input.value as string}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </td>
              <td>
                <button onClick={() => removeInput(index)}>Remove</button>
                <button onClick={() => addFood(index)}>Add Food</button>
              </td>
              <td>
                {elements[index].map((element, elementIndex) => (
                  <div key={`element-${index}-${elementIndex}`}>{element}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
}

export default MyComponent;
